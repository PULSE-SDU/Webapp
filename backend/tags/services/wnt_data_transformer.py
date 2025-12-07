"""Data transformer for converting WNT_API_mock data to Django Tag model format."""
from typing import Dict, Optional


class WNTDataTransformer:
    """Transforms WNT_API_mock data to Django Tag model format."""

    @staticmethod
    def calculate_battery_level(voltage: float) -> int:
        """
        Calculate battery level percentage from voltage.

        Voltage ranges (based on typical Li-ion battery):
        - 4.2V = 100% (Full)
        - 3.7V = ~50-70% (Normal)
        - 3.4V = ~20-30% (Warning)
        - 3.0V = ~5-10% (Critical)
        - Below 3.0V = Critical

        Args:
            voltage: The voltage value

        Returns:
            Battery level as percentage (0-100)
        """
        if voltage >= 4.2:
            return 100
        if voltage >= 3.9:
            # 3.9-4.2V maps to 80-100%
            return int(80 + ((voltage - 3.9) / 0.3) * 20)
        if voltage >= 3.7:
            # 3.7-3.9V maps to 50-80%
            return int(50 + ((voltage - 3.7) / 0.2) * 30)
        if voltage >= 3.4:
            # 3.4-3.7V maps to 20-50%
            return int(20 + ((voltage - 3.4) / 0.3) * 30)
        if voltage >= 3.0:
            # 3.0-3.4V maps to 5-20%
            return int(5 + ((voltage - 3.0) / 0.4) * 15)
        # Below 3.0V
        return max(0, int(voltage * 1.67))

    @staticmethod
    def determine_status(voltage: float, battery_level: int) -> str:
        """
        Determine battery status based on voltage and battery level.

        Args:
            voltage: The voltage value
            battery_level: The battery level percentage

        Returns:
            Status string (Charging, Critical, Warning, or Full)
        """
        # If voltage is very high, assume charging
        if voltage >= 4.1:
            return "Charging"
        # Critical if battery level is low
        if battery_level <= 15:
            return "Critical"
        # Warning if battery level is moderate
        if battery_level <= 40:
            return "Warning"
        # Full otherwise
        return "Full"

    @staticmethod
    def estimate_prediction(battery_level: int, status: str) -> str:
        """
        Estimate battery life prediction based on battery level and status.

        Args:
            battery_level: The battery level percentage
            status: The battery status

        Returns:
            Prediction string
        """
        if status == "Charging":
            return "Charging in progress"
        if status == "Critical":
            return "Less than 1 day left" if battery_level <= 10 else "1 day left"
        if status == "Warning":
            return "2 days left" if battery_level <= 30 else "3 days left"
        # Full status
        if battery_level >= 90:
            return "7+ days left"
        if battery_level >= 70:
            return "5-6 days left"
        return "4-5 days left"

    @staticmethod
    def transform_node_to_tag(node_data: Dict) -> Optional[Dict]:
        """
        Transform a WNT_API_mock node data object to Django Tag format.

        Args:
            node_data: Dictionary containing node data from WNT_API_mock

        Returns:
            Dictionary formatted for Django Tag model, or None if required fields missing
        """
        # Extract required fields with fallback
        node_address = node_data.get("NODE_ADDRESS") or node_data.get("node_address")
        voltage = node_data.get("VOLTAGE") or node_data.get("voltage")

        if not node_address:
            print(f"Warning: Missing NODE_ADDRESS in node data: {node_data}")
            return None

        # Convert voltage to float if present
        if voltage is not None:
            try:
                voltage = float(voltage)
            except (ValueError, TypeError):
                print(f"Warning: Invalid voltage value for node {node_address}: {voltage}")
                voltage = 3.5  # Default safe voltage
        else:
            voltage = 3.5  # Default safe voltage

        # Calculate derived fields
        battery_level = WNTDataTransformer.calculate_battery_level(voltage)
        status = WNTDataTransformer.determine_status(voltage, battery_level)
        prediction = WNTDataTransformer.estimate_prediction(battery_level, status)

        # Build tag data
        tag_data = {
            "tag_id": str(node_address),
            "type": node_data.get("TYPE") or node_data.get("type") or "Unknown Device",
            "battery_level": battery_level,
            "status": status,
            "voltage": round(voltage, 2),
            "prediction": prediction,
        }

        return tag_data

    @staticmethod
    def transform_nodes_to_tags(nodes_data: list) -> list:
        """
        Transform a list of WNT_API_mock nodes to Django Tag format.

        Args:
            nodes_data: List of dictionaries containing node data from WNT_API_mock

        Returns:
            List of dictionaries formatted for Django Tag model
        """
        tags = []
        for node_data in nodes_data:
            tag_data = WNTDataTransformer.transform_node_to_tag(node_data)
            if tag_data:
                tags.append(tag_data)
        return tags
