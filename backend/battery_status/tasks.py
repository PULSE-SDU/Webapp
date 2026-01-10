from celery import shared_task
from .services.battery_status_updater import BatteryStatusUpdater

@shared_task
def update_battery_status_task():
    BatteryStatusUpdater().update_battery_status()