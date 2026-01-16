from ..models import BatteryStatus, StatusTitle
import re
import logging
from tags.services.wnt_api_client import WNTAPIClient
from tags.models import Tag, OnlineStatus
from .inferencer_client import InferencerClient
import time
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed

logger = logging.getLogger(__name__)


class BatteryStatusUpdater:
    """
    Service class to update battery statuses from WNT API and inference service.
    """

    wnt_client = WNTAPIClient()
    infer_client = InferencerClient()

    def __init__(self):
        self.skip_predictions = False

    def get_prediction(self, tag: Tag):
        """
        Retrieves predictions for all tags from the inference service.
        """
        if self.skip_predictions:
            return None
        try:
            wnt_tag_id = int(float(tag.node_address))
        except (ValueError, TypeError):
            wnt_tag_id = tag.node_address
        # Fetch battery window from WNT API
        try:
            window = self.wnt_client.get_battery_window(wnt_tag_id)
        except requests.exceptions.HTTPError as http_err:
            status = getattr(getattr(http_err, "response", None), "status_code", None)
            if status == 400:
                # Expected when there aren't enough readings; avoid noisy error logs
                logger.debug(
                    f"WNT battery window unavailable (400) for tag {tag.node_address}: {http_err}"
                )
                return None
            logger.error(
                f"WNT battery window error for {tag.node_address}: {http_err}",
                exc_info=True,
            )
            return None
        except Exception as e:
            logger.error(
                f"WNT battery window unexpected error for {tag.node_address}: {e}",
                exc_info=True,
            )
            return None

        if not window or "readings" not in window:
            logger.warning(f"No battery window data for tag {tag.node_address}")
            return None

        # Call inference service
        try:
            logger.info(
                f"Fetching prediction from inference service for tag {tag.node_address}"
            )
            return self.infer_client.predict_from_wnt_window(
                tag_id=str(tag.node_address),
                wnt_readings=window["readings"],
                baseline_voltage=window.get("baselinevoltage", 3.1),
                cycle_start_epoch=window.get("cyclestartepoch"),
            )
        except requests.exceptions.HTTPError as http_err:
            status = getattr(getattr(http_err, "response", None), "status_code", None)
            if status in (400, 422):
                logger.debug(
                    f"Inference prediction unavailable ({status}) for tag {tag.node_address}: {http_err}"
                )
                return None
            logger.error(
                f"Inference Error for {tag.node_address}: {http_err}", exc_info=True
            )
            return None
        except Exception as e:
            logger.error(
                f"Inference Error for {tag.node_address}: {e}", exc_info=True
            )
            return None

    def format_days_hours(self, value, input_type="hours"):
        """
        Converts a float value (in hours or days) to (days, hours) tuple.
        input_type: 'hours' or 'days'.
        Ensures hours is always 0-23.
        """
        if input_type == "days":
            total_hours = float(value) * 24
        else:
            total_hours = float(value)
        days = int(total_hours // 24)
        hours = int(round(total_hours % 24))
        if hours == 24:
            days += 1
            hours = 0
        return days, hours

    def extract_prediction_values(self, tag: Tag):
        """
        Always extracts (days, hours) from predicted_rul_hours if present.
        Returns (days, hours) tuple or (None, None) if unavailable.
        """

        def _is_number(value):
            try:
                float(value)
                return True
            except (ValueError, TypeError):
                return False

        pred = self.get_prediction(tag)
        if pred is None:
            return None, None

        try:
            hours = pred.get("predicted_rul_hours")
            if hours is not None and _is_number(hours):
                return self.format_days_hours(hours, input_type="hours")
            days = pred.get("predicted_rul_days")
            if days is not None and _is_number(days):
                return self.format_days_hours(days, input_type="days")
            for key in ("remaining_life", "prediction", "result"):
                val = pred.get(key)
                if val is not None and _is_number(val):
                    return self.format_days_hours(val, input_type="days")
        except AttributeError:
            pass
        return None, None

    def get_status_title(self, tag: Tag, predicted_days=None, predicted_hours=None):
        """
        Determine status using prediction when available; otherwise fallback to voltage.
        """
        days, hours = predicted_days, predicted_hours

        if tag.online_status == OnlineStatus.ONLINE:
            if days is not None and hours is not None:
                if days == 0 and hours <= 24:
                    title = StatusTitle.LOW
                else:
                    title = StatusTitle.NORMAL
            # Fallback to voltage
            else:
                voltage_pct = self.get_battery_percentage(float(tag.voltage))
                title = StatusTitle.NORMAL if voltage_pct > 20 else StatusTitle.LOW
        else:
            title = StatusTitle.OFFLINE

        return title

    def get_battery_percentage(self, voltage: float):
        min_v, max_v = 2.6, 3.1
        calculated_level = 0

        if voltage is not None:
            pct = ((voltage - min_v) / (max_v - min_v)) * 100
            calculated_level = max(0, min(100, round(pct)))
        return calculated_level

    def update_battery_status(self, max_workers=20):
        """
        Updates BatteryStatus entries based on **current/latest** Tag data, using parallel processing.
        """

        tags_qs = Tag.objects.all()

        self.validate_update_prerequisites(tags_qs)

        existing_statuses = self.get_existing_statuses()

        to_update = []
        to_create = []
        error_count = 0
        tags = list(tags_qs.iterator())

        def process_tag(tag):
            try:
                node_address = tag.node_address
                logger.debug(f"Processing tag {node_address}")

                days, hours = self.extract_prediction_values(tag)
                title = self.get_status_title(
                    tag, predicted_days=days, predicted_hours=hours
                )
                percentage = (
                    self.get_battery_percentage(float(tag.voltage))
                    if tag.voltage is not None
                    else 0
                )

                existing = existing_statuses.get(node_address)
                if existing:
                    existing = self.update_existing_status(
                        existing, title, days, hours, percentage
                    )
                    return ("update", existing)
                else:
                    status = self.create_battery_status(
                        node_address, title, days, hours, percentage
                    )
                    return ("create", status)
            except Exception as e:
                logger.error(
                    f"Error updating battery status for tag {getattr(tag, 'node_address', 'unknown')}: {e}",
                    exc_info=True,
                )
                return ("error", None)

        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            futures = {executor.submit(process_tag, tag): tag for tag in tags}
            for future in as_completed(futures):
                result_type, status_obj = future.result()
                if result_type == "update":
                    to_update.append(status_obj)
                elif result_type == "create":
                    to_create.append(status_obj)
                elif result_type == "error":
                    error_count += 1

        if to_create:
            BatteryStatus.objects.bulk_create(to_create, batch_size=500)
        if to_update:
            BatteryStatus.objects.bulk_update(
                to_update,
                ["title", "prediction_days", "prediction_hours", "percentage"],
                batch_size=500,
            )

        logger.info(
            f"Battery status update completed: {len(to_create) + len(to_update)} processed, {error_count} errors"
        )

    def validate_update_prerequisites(self, tags_qs):
        tags_count = tags_qs.count()
        logger.info(f"Starting battery status update for {tags_count} tags")

        if tags_count == 0:
            logger.warning("No tags found in database. Battery status update skipped.")
            return False

        if self.infer_client.is_available():
            self.skip_predictions = False
            return True
        else:
            logger.warning(
                "Inference service is not available. "
                "Skipping predictions. Battery statuses will be based on voltage only."
            )
            self.skip_predictions = True
            return True

    def get_existing_statuses(self):
        existing_statuses = {}
        for status in BatteryStatus.objects.only(
            "id",
            "node_address",
            "title",
            "prediction_days",
            "prediction_hours",
            "percentage",
        ).order_by("node_address", "-id"):
            if status.node_address not in existing_statuses:
                existing_statuses[status.node_address] = status
        return existing_statuses

    def create_battery_status(self, node_address, title, days, hours, percentage):
        return BatteryStatus(
            node_address=node_address,
            title=title,
            prediction_days=days if days is not None else 0,
            prediction_hours=hours if hours is not None else 0,
            percentage=percentage,
        )

    def update_existing_status(
        self, existing: BatteryStatus, title, days, hours, percentage
    ) -> BatteryStatus:
        existing.title = title
        existing.prediction_days = days if days is not None else 0
        existing.prediction_hours = hours if hours is not None else 0
        existing.percentage = percentage
        return existing

    def create_new_status(
        self, node_address, title, days, hours, percentage
    ) -> BatteryStatus:
        return BatteryStatus(
            node_address=node_address,
            title=title,
            prediction_days=days,
            prediction_hours=hours,
            percentage=percentage,
        )
