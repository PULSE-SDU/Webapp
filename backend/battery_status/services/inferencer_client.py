import json
import urllib.request
import urllib.error
import socket
from typing import Any, Dict, List, Optional


class InferencerClient:
    def __init__(self, base_url: str = "http://host.docker.internal:6767"):
        self.base_url = base_url.rstrip("/")

    def is_available(self) -> bool:
        """
        Check if the inference service is reachable and model is loaded using /health endpoint.
        Returns True if status is ok and model_loaded is True, False otherwise.
        """
        url = f"{self.base_url}/health"
        req = urllib.request.Request(
            url,
            headers={"Content-Type": "application/json"},
            method="GET",
        )
        try:
            with urllib.request.urlopen(req, timeout=5) as resp:
                result = json.loads(resp.read().decode("utf-8"))
                return (
                    result.get("status") == "ok" and result.get("model_loaded") is True
                )
        except (urllib.error.URLError, socket.timeout, ConnectionError, ValueError):
            return False

    def predict(self, payload: Dict[str, Any], max_retries: int = 3, backoff_factor: float = 1.0) -> Dict[str, Any]:
        url = f"{self.base_url}/predict"
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            url,
            data=data,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        last_exception = None
        for attempt in range(1, max_retries + 1):
            try:
                with urllib.request.urlopen(req, timeout=20) as resp:
                    return json.loads(resp.read().decode("utf-8"))
            except (urllib.error.URLError, socket.timeout, ConnectionError) as e:
                last_exception = e
                if attempt < max_retries:
                    import time
                    sleep_time = backoff_factor * (2 ** (attempt - 1))
                    time.sleep(sleep_time)
                else:
                    raise
        # If all retries failed, raise the last exception
        raise last_exception

    @staticmethod
    def _map_wnt_reading(r: Dict[str, Any]) -> Dict[str, Any]:
        out = dict(r)
        if "MEASUREMENTTIMEEPOCH" in out and "MEASUREMENT_TIME_EPOCH" not in out:
            out["MEASUREMENT_TIME_EPOCH"] = out.pop("MEASUREMENTTIMEEPOCH")
        if "MEASUREMENTTIME" in out and "MEASUREMENT_TIME" not in out:
            out["MEASUREMENT_TIME"] = out.pop("MEASUREMENTTIME")
        if "POSITIONMETERX" in out and "POSITION_METER_X" not in out:
            out["POSITION_METER_X"] = out.pop("POSITIONMETERX")
        if "POSITIONMETERY" in out and "POSITION_METER_Y" not in out:
            out["POSITION_METER_Y"] = out.pop("POSITIONMETERY")
        return out

    def predict_from_wnt_window(
        self,
        tag_id: str,
        wnt_readings: List[Dict[str, Any]],
        baseline_voltage: float = 3.1,
        cycle_start_epoch: Optional[float] = None,
    ) -> Dict[str, Any]:
        readings = [self._map_wnt_reading(r) for r in wnt_readings]

        payload = {
            "tag_id": tag_id,
            "baseline_voltage": baseline_voltage,
            "cycle_start_epoch": cycle_start_epoch,
            "readings": readings,
        }
        return self.predict(payload)
