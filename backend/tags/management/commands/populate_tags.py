"""Management command to populate database with sample tag data."""
from django.core.management.base import BaseCommand
from tags.models import Tag


class Command(BaseCommand):
    """Command to populate the database with sample tag data."""

    help = "Populate the database with sample tag data"

    def handle(self, *args, **kwargs):  # pylint: disable=unused-argument
        """
        Execute the command to populate the database with sample tag data.
        """
        sample_tags = [
            {
                "tag_id": "TAG001",
                "type": "Infusion Pump",
                "battery_level": 85,
                "status": "Full",
                "prediction": "5 days left",
                "voltage": 3.7,
            },
            {
                "tag_id": "TAG002",
                "type": "Defibrillator",
                "battery_level": 45,
                "status": "Warning",
                "prediction": "2 days left",
                "voltage": 3.2,
            },
            {
                "tag_id": "TAG003",
                "type": "Monitor",
                "battery_level": 15,
                "status": "Critical",
                "prediction": "1 day left",
                "voltage": 2.8,
            },
            {
                "tag_id": "TAG004",
                "type": "Ventilator",
                "battery_level": 100,
                "status": "Charging",
                "prediction": "Charging in progress",
                "voltage": 4.2,
            },
            {
                "tag_id": "TAG005",
                "type": "Syringe Pump",
                "battery_level": 92,
                "status": "Full",
                "prediction": "6 days left",
                "voltage": 3.8,
            },
        ]

        created_count = 0
        updated_count = 0

        for tag_data in sample_tags:  # pylint: disable=duplicate-code
            _, created = Tag.objects.update_or_create(  # pylint: disable=no-member
                tag_id=tag_data["tag_id"], defaults=tag_data
            )
            if created:
                created_count += 1
            else:
                updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(  # pylint: disable=no-member
                f"Successfully populated database: {created_count} created, {updated_count} updated"
            )
        )
