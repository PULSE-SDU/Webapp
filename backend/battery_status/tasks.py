from celery import shared_task
from .services.battery_status_updater import BatteryStatusUpdater


@shared_task
def update_battery_status_task():
    """
    This task is intended to be scheduled periodically.
    Check celery setup in the settings file for the schedule details.
    """
    BatteryStatusUpdater().update_battery_status()
