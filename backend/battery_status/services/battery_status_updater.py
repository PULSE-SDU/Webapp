from battery_status.models import BatteryStatus, StatusTitle
from app.services import fetch_all_latest

def update_battery_status_from_wnt():
    """
    Retrieves the latest node addresses from the WNT API, categorizes them by status, and updates BatteryStatus objects.
    FULL --> voltage > 3.0 and online
    DEPLETING --> placeholder (not handled)
    DEAD --> offline
    """
    tags = fetch_all_latest()
    for tag in tags:
        node_address = tag.get("NODE_ADDRESS")
        voltage = tag.get("VOLTAGE")
        online = tag.get("ONLINE_STATUS_STRING", "online")
        if online:
            if voltage is not None and float(voltage) > 2.8:
                status = StatusTitle.NORMAL
            else:
                status = StatusTitle.LOW  # TODO: change this when we have prediction
        else:
            status = StatusTitle.OFFLINE
        BatteryStatus.objects.update_or_create(
            node_address=node_address,
            defaults={
                "status_title": status,
                "prediction": 0,  # TODO: change this when we have prediction
            },
        )
        