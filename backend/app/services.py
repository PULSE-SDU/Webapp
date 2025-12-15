"""
Service functions for interacting with the WNT mock API for battery status.
"""

import requests
from django.forms import ValidationError
from .settings import WNT_MOCK_API_URL


def fetch_all_latest():
    """
    Fetch all nodes from the external WNT mock API.
    """
    try:
        url = f"{WNT_MOCK_API_URL}/nodes/all-latest"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise ValidationError(f"Error fetching node addresses: {str(e)}") from e

def fetch_node_latest(node_address):
    """
    Fetch the latest measurement for a single node from the external WNT mock API.
    """
    try:
        url = f"{WNT_MOCK_API_URL}/node/{node_address}/latest"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise ValidationError(
            f"Error fetching latest node data for {node_address}: {str(e)}"
        ) from e

def fetch_node_all(node_address):
    """
    Fetch all measurements for a single node from the external WNT mock API.
    """
    try:
        url = f"{WNT_MOCK_API_URL}/node/{node_address}/all"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise ValidationError(
            f"Error fetching all node data for {node_address}: {str(e)}"
        ) from e

def fetch_nodes_voltage_under(voltage_value):
    """
    Fetch latest measurements for all nodes whose voltage is under the threshold.
    """
    try:
        url = f"{WNT_MOCK_API_URL}/nodes/voltage-under"
        params = {"voltage_value": voltage_value}
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise ValidationError(
            f"Error fetching nodes with voltage under {voltage_value}: {str(e)}"
        ) from e
