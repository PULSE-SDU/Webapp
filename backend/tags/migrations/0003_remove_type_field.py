# Generated migration to remove type field
# pylint: disable=missing-module-docstring,invalid-name,missing-class-docstring

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0002_remove_equipment_name_and_location'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tag',
            name='type',
        ),
    ]

