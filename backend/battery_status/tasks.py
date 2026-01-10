from celery import shared_task
from .services.battery_status_updater import BatteryStatusUpdater
import logging

logger = logging.getLogger(__name__)


@shared_task
def update_battery_status_task():
    """
    This task is intended to be scheduled periodically.
    Check celery setup in the settings file for the schedule details.
    """
    logger.info("Starting battery status update task...")
    try:
        updater = BatteryStatusUpdater()
        updater.update_battery_status()
        logger.info("Battery status update task completed successfully")
    except Exception as e:
        logger.error(f"Battery status update task failed: {e}", exc_info=True)
        raise
