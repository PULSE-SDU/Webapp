from django.core.management.base import BaseCommand
from tags.models import Tag


class Command(BaseCommand):
    help = "Populate the database with sample tag data"

    def handle(self, *args, **kwargs):
        sample_tags = [
            {
                "tag_id": "TAG001",
                "equipment_name": "Infusion Pump A",
                "type": "Infusion Pump",
                "location": "Ward 3 - Room 301",
                "battery_level": 85,
                "status": "Full",
                "prediction": "5 days left",
                "voltage": 3.7,
            },
            {
                "tag_id": "TAG002",
                "equipment_name": "Defibrillator B",
                "type": "Defibrillator",
                "location": "Emergency - Bay 2",
                "battery_level": 45,
                "status": "Warning",
                "prediction": "2 days left",
                "voltage": 3.2,
            },
            {
                "tag_id": "TAG003",
                "equipment_name": "Monitor C",
                "type": "Monitor",
                "location": "ICU - Bed 5",
                "battery_level": 15,
                "status": "Critical",
                "prediction": "1 day left",
                "voltage": 2.8,
            },
            {
                "tag_id": "TAG004",
                "equipment_name": "Ventilator D",
                "type": "Ventilator",
                "location": "Ward 2 - Room 205",
                "battery_level": 100,
                "status": "Charging",
                "prediction": "Charging in progress",
                "voltage": 4.2,
            },
            {
                "tag_id": "TAG005",
                "equipment_name": "Syringe Pump E",
                "type": "Syringe Pump",
                "location": "Surgery - Room 1",
                "battery_level": 92,
                "status": "Full",
                "prediction": "6 days left",
                "voltage": 3.8,
            },
        ]

        created_count = 0
        updated_count = 0

        for tag_data in sample_tags:
            tag, created = Tag.objects.update_or_create(
                tag_id=tag_data["tag_id"], defaults=tag_data
            )
            if created:
                created_count += 1
            else:
                updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully populated database: {created_count} created, {updated_count} updated"
            )
        )
