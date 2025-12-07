"""Client for interacting with WNT_API_mock service."""
import urllib.request
import urllib.error
import json
from typing import Dict, List, Optional


class WNTAPIClient:
    """Client for fetching data from WNT_API_mock service."""

    def __init__(self, base_url: str = "http://localhost:8001"):
        """
        Initialize the WNT API client.
        
        Args:
            base_url: Base URL of the WNT_API_mock service
        """
        self.base_url = base_url.rstrip("/")

    def get_all_latest_nodes(self) -> Optional[List[Dict]]:
        """
        Fetch the latest measurement for each node.
        
        Returns:
            List of node data dictionaries, or None if request fails
        """
        url = f"{self.base_url}/nodes/all-latest"
        try:
            with urllib.request.urlopen(url, timeout=10) as response:
                data = json.loads(response.read().decode())
                return data
        except urllib.error.URLError as e:
            print(f"Error fetching data from WNT API: {e}")
            return None
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON response: {e}")
            return None

    def get_node_latest(self, node_address: str) -> Optional[Dict]:
        """
        Fetch the latest measurement for a specific node.
        
        Args:
            node_address: The node address to fetch data for
            
        Returns:
            Node data dictionary, or None if request fails
        """
        url = f"{self.base_url}/node/{node_address}/latest"
        try:
            with urllib.request.urlopen(url, timeout=10) as response:
                data = json.loads(response.read().decode())
                return data
        except urllib.error.URLError as e:
            print(f"Error fetching data from WNT API: {e}")
            return None
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON response: {e}")
            return None

    def get_node_all(self, node_address: str) -> Optional[List[Dict]]:
        """
        Fetch all historical measurements for a specific node.
        
        Args:
            node_address: The node address to fetch data for
            
        Returns:
            List of node data dictionaries, or None if request fails
        """
        url = f"{self.base_url}/node/{node_address}/all"
        try:
            with urllib.request.urlopen(url, timeout=10) as response:
                data = json.loads(response.read().decode())
                return data
        except urllib.error.URLError as e:
            print(f"Error fetching data from WNT API: {e}")
            return None
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON response: {e}")
            return None

    def get_nodes_low_voltage(self, voltage_value: float) -> Optional[List[Dict]]:
        """
        Fetch nodes with voltage below threshold.
        
        Args:
            voltage_value: The voltage threshold
            
        Returns:
            List of node data dictionaries, or None if request fails
        """
        url = f"{self.base_url}/nodes/voltage-under?voltage_value={voltage_value}"
        try:
            with urllib.request.urlopen(url, timeout=10) as response:
                data = json.loads(response.read().decode())
                return data
        except urllib.error.URLError as e:
            print(f"Error fetching data from WNT API: {e}")
            return None
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON response: {e}")
            return None
