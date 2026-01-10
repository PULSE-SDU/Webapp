from ..models import BatteryStatus, StatusTitle
import re
import logging
from tags.services.wnt_api_client import WNTAPIClient
from tags.models import Tag, OnlineStatus
from .inferencer_client import InferencerClient

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
        # Skip if inference service is unavailable
        if self.skip_predictions:
            return None
        
        try:
            wnt_tag_id = int(float(tag.node_address))
        except (ValueError, TypeError):
            wnt_tag_id = tag.node_address
        
        logger.debug(
            f"Getting prediction for tag.pk={tag.pk}, tag.node_address={repr(tag.node_address)}, wnt_tag_id={wnt_tag_id}"
        )

        self.wnt_client.get_node_all(tag.node_address)
        window = self.wnt_client.get_battery_window(wnt_tag_id)
        pred = None
        if not window or "readings" not in window:
            logger.warning(f"No battery window data for tag {tag.node_address}")
            return pred

        try:
            return self.infer_client.predict_from_wnt_window(
                tag_id=str(tag.node_address),
                wnt_readings=window["readings"],
                baseline_voltage=window.get("baselinevoltage", 3.1),
                cycle_start_epoch=window.get("cyclestartepoch"),
            )
        except Exception as e:
            logger.error(f"Inference Error for {tag.node_address}: {e}", exc_info=True)
            return None

    def extract_prediction_values(self, tag: Tag):
        """
        Extracts days and hours from prediction data for a tag.
        Returns (days, hours) tuple or (None, None) if unavailable.
        """

        def _is_number(value):
            try:
                float(value)
                return True
            except (ValueError, TypeError):
                return False

        def _from_days(d):
            f = float(d)
            return int(round(f)), int(round(f * 24))

        def _from_hours(h):
            f = float(h)
            return int(round(f / 24)), int(round(f))

        pred = self.get_prediction(tag)
        if pred is None:
            return None, None

        try:
            days = pred.get("predicted_rul_days")
            hours = pred.get("predicted_rul_hours")
            if days is not None and _is_number(days):
                return _from_days(days)
            if hours is not None and _is_number(hours):
                return _from_hours(hours)

            for key in ("remaining_life", "prediction", "result"):
                val = pred.get(key)
                if val is not None and _is_number(val):
                    return _from_days(val)
        except AttributeError:
            pass

        # Handle different prediction formats (e.g. 5 days)
        if isinstance(pred, str):
            s = pred.strip().lower()
            m_days = re.match(r"^([0-9]+(?:\.[0-9]+)?)\s*days?$", s)
            if m_days:
                return _from_days(m_days.group(1))
            m_hours = re.match(r"^([0-9]+(?:\.[0-9]+)?)\s*hours?$", s)
            if m_hours:
                return _from_hours(m_hours.group(1))
            if _is_number(s):
                return _from_days(s)
            return None, None

        return None, None

    def get_status_title(self, tag: Tag, predicted_days=None, predicted_hours=None):
        """
        Determine status using prediction when available; otherwise fallback to voltage.
        """
        days, hours = predicted_days, predicted_hours

        if tag.online_status == OnlineStatus.ONLINE:
            if days is not None and hours is not None:
                if days == 0 and hours <= 24:
                    status = StatusTitle.LOW
                else:
                    status = StatusTitle.NORMAL
            # Fallback to voltage
            else:
                voltage_pct = self.get_battery_percentage(float(tag.voltage))
                status = StatusTitle.NORMAL if voltage_pct > 20 else StatusTitle.LOW
        else:
            status = StatusTitle.OFFLINE

        return status

    def get_battery_percentage(self, voltage: float):
        min_v, max_v = 2.6, 3.1
        calculated_level = 0

        if voltage is not None:
            pct = ((voltage - min_v) / (max_v - min_v)) * 100
            calculated_level = max(0, min(100, round(pct)))
        return calculated_level

    def update_battery_status(self):
        """
        Updates BatteryStatus entries based on **current/latest** Tag data.
        """

        tags_qs = Tag.objects.all()

        self.validate_update_prerequisites(tags_qs)

        existing_statuses = self.get_existing_statuses()

        to_update = []
        to_create = []
        error_count = 0

        for tag in tags_qs.iterator():
            try:
                node_address = tag.node_address
                logger.debug(f"Processing tag {node_address}")

                days, hours = self.extract_prediction_values(tag)
                status = self.get_status_title(tag, predicted_days=days, predicted_hours=hours)
                battery_percentage = (
                    self.get_battery_percentage(float(tag.voltage))
                    if tag.voltage is not None
                    else 0
                )

                existing = existing_statuses.get(node_address)
                if existing:
                    existing = self.update_existing_status(existing, status, days, hours, battery_percentage)
                    to_update.append(existing)
                else:
                    status = self.create_battery_status(node_address, status, days, hours, battery_percentage)
                    to_create.append(status)

                logger.debug(
                    f"Prepared battery status for tag {node_address}: {status}, {days}d/{hours}h, {battery_percentage}%"
                )
            except Exception as e:
                error_count += 1
                logger.error(
                    f"Error updating battery status for tag {getattr(tag, 'node_address', 'unknown')}: {e}",
                    exc_info=True,
                )

        if to_create:
            BatteryStatus.objects.bulk_create(to_create, batch_size=500)
        if to_update:
            BatteryStatus.objects.bulk_update(
                to_update,
                ["status_title", "prediction_days", "prediction_hours", "battery_percentage"],
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

        logger.info("Checking inference service availability...")
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
        for status in (
            BatteryStatus.objects.only("id", "node_address", "status_title", "prediction_days", "prediction_hours", "battery_percentage")
            .order_by("node_address", "-id")
        ):
            if status.node_address not in existing_statuses:
                existing_statuses[status.node_address] = status
        return existing_statuses
    
    def create_battery_status(self, node_address, status_title, days, hours, percentage):
        return BatteryStatus(
            node_address=node_address,
            status_title=status_title,
            prediction_days=days if days is not None else 0,
            prediction_hours=hours if hours is not None else 0,
            battery_percentage=percentage,
        )
    
    def update_existing_status(self, existing: BatteryStatus, status, days, hours, battery_percentage) -> BatteryStatus:
        existing.status_title = status
        existing.prediction_days = days
        existing.prediction_hours = hours
        existing.battery_percentage = battery_percentage
        return existing

    def create_new_status(self, node_address, status, days, hours, battery_percentage) -> BatteryStatus:
        return BatteryStatus(
            node_address=node_address,
            status_title=status,
            prediction_days=days,
            prediction_hours=hours,
            battery_percentage=battery_percentage,
        )