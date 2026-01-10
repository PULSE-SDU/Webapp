from django.core.management.base import BaseCommand
from battery_status.tasks import update_battery_status_task

class Command(BaseCommand):
    help = "Trigger battery status update via Celery task."

    def handle(self, *args, **options):
        self.stdout.write("Triggering battery status update...")
        update_battery_status_task.delay()
        self.stdout.write(self.style.SUCCESS("Battery status update task triggered."))
