import os
from celery import Celery
from celery.signals import beat_init

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")

app = Celery("app")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()


@beat_init.connect
def run_startup_task(**kwargs):
    """Triggered when the Celery beat scheduler starts — enqueue the
    battery status update task once at startup.
    """
    # pylint: disable=import-outside-toplevel
    from battery_status.tasks import update_battery_status_task

    update_battery_status_task.delay()
