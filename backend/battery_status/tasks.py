import logging
from celery import shared_task
from .services.battery_status_updater import BatteryStatusUpdater
from .services.summary_updater import SummaryUpdater

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

        summary_updater = SummaryUpdater()
        summary_updater.update_summary()
    except Exception as e:
        logger.error("Battery status update task failed: %s", e, exc_info=True)
        raise
