# Generated migration to remove equipment_name and location fields
# pylint: disable=missing-module-docstring,invalid-name,missing-class-docstring

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("tags", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="tag",
            name="equipment_name",
        ),
        migrations.RemoveField(
            model_name="tag",
            name="location",
        ),
    ]
