from ..models import BatteryStatus, StatusTitle, Prediction
import re
from tags.services.wnt_api_client import WNTAPIClient
from tags.models import Tag, OnlineStatus
from .inferencer_client import InferencerClient

class BatteryStatusUpdater:
    """
    Service class to update battery statuses from WNT API and inference service.
    """
    tags = Tag.objects.all()
    wnt_client = WNTAPIClient()
    infer_client = InferencerClient()

    def get_prediction(self, tag: Tag):
        """
        Retrieves predictions for all tags from the inference service.
        """
        try:
            wnt_tag_id = int(float(tag.tag_id))
        except (ValueError, TypeError):
            wnt_tag_id = tag.tag_id
        
        print(
            "DEBUG tag.pk=",
            tag.pk,
            "tag.tag_id=",
            repr(tag.tag_id),
            "wnt_tag_id=",
            wnt_tag_id,
        )

        window = self.wnt_client.get_battery_window(wnt_tag_id)
        pred = None
        if not window or "readings" not in window:
            return pred
        
        try:
            return self.infer_client.predict_from_wnt_window(
                tag_id=str(tag.tag_id),
                wnt_readings=window["readings"],
                baseline_voltage=window.get("baselinevoltage", 3.1),
                cycle_start_epoch=window.get("cyclestartepoch"),
            )
        except Exception as e:
            print(f"Inference Error for {tag.tag_id}: {e}")


    def convert_to_prediction_model(self, tag: Tag):
        def _is_number(value):
            try:
                float(value)
                return True
            except (ValueError, TypeError):
                return False

        def _from_days(d):
            f = float(d)
            return Prediction(days=int(round(f)), hours=int(round(f * 24)))

        def _from_hours(h):
            f = float(h)
            return Prediction(days=int(round(f / 24)), hours=int(round(f)))

        pred = self.get_prediction(tag)
        if pred is None:
            return None
        
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
            return None

        return None


    def get_status_title(self, tag: Tag):
        remaining_time = self.convert_to_prediction_model(tag)

        if tag.online_status == OnlineStatus.OFFLINE:
            status = StatusTitle.OFFLINE
        elif tag.online_status == OnlineStatus.ONLINE:
            if remaining_time is not None:
                if remaining_time.days == 0 and remaining_time.hours <= 24:
                    status = StatusTitle.LOW
                else:
                    status = StatusTitle.NORMAL
            # Fallback: use voltage-based percentage (if there is no prediction)
            else:
                voltage_pct = self.calculate_status_based_on_voltage(float(tag.voltage))
                if voltage_pct > 20:
                    status = StatusTitle.NORMAL
                else:
                    status = StatusTitle.LOW

        return status


    def calculate_status_based_on_voltage(self, voltage: float):
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
        for tag in self.tags:
            node_address = tag.node_address
            status = self.get_status_title(tag)
            prediction = self.convert_to_prediction_model(tag)
            battery_percentage = self.calculate_status_based_on_voltage(float(tag.voltage)) if tag.voltage is not None else 0
            BatteryStatus.objects.update_or_create(
                node_address=node_address,
                defaults={
                    "status_title": status,
                    "prediction": prediction,
                    "battery_percentage": battery_percentage,
                },
            )