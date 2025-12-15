"""Data transformer for converting WNT_API_mock data to Django Tag model format."""

from typing import Dict, Optional


class WNTDataTransformer:
    """Transforms WNT_API_mock data to Django Tag model format."""

    @staticmethod
    def transform_node_to_tag(node_data: Dict) -> Optional[Dict]:
        """
        Transform a WNT_API_mock node data object to Django Tag format.

        Only extracts basic fields (tag_id and voltage). Battery level, status,
        and prediction are handled by ML endpoints and status endpoints.

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
                print(
                    f"Warning: Invalid voltage value for node {node_address}: {voltage}"
                )
                voltage = None
        else:
            voltage = None

        # Build tag data - only basic fields
        # battery_level, status, and prediction will be populated by ML/status endpoints
        tag_data = {
            "tag_id": str(node_address),
            "voltage": round(voltage, 2) if voltage is not None else None,
            "battery_level": None,
            "status": None,
            "prediction": None,
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
