from battery_status.models import BatteryStatus, StatusTitle
from app.services import fetch_all_node_addresses

def update_battery_status_from_wnt():
    """
    Retrieves the latest node addresses from the WNT API, categorizes them by status, and updates BatteryStatus objects.
    FULL --> voltage > 3.0 and online
    DEPLETING --> placeholder (not handled)
    DEAD --> offline
    """
    tags = fetch_all_node_addresses()
    for tag in tags:
        node_address = tag.get("NODE_ADDRESS")
        voltage = tag.get("VOLTAGE")
        online = tag.get("ONLINE_STATUS_STRING", "online")
        if online:
            if voltage is not None and float(voltage) > 2.5:
                status = StatusTitle.FULL
            else:
                status = StatusTitle.DEPLETING  # TODO: change this when we have prediction
        else:
            status = StatusTitle.DEAD
        BatteryStatus.objects.update_or_create(
            node_address=node_address,
            defaults={
                "status_title": status,
                "prediction": 0,  # TODO: change this when we have prediction
            },
        )

