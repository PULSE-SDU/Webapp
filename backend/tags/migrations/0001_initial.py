# Generated migration for tags app
# pylint: disable=missing-module-docstring,invalid-name,missing-class-docstring

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Tag",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "tag_id",
                    models.CharField(db_index=True, max_length=100, unique=True),
                ),
                (
                    "equipment_name",
                    models.CharField(blank=True, max_length=255, null=True),
                ),
                ("type", models.CharField(blank=True, max_length=100, null=True)),
                (
                    "location",
                    models.CharField(blank=True, max_length=255, null=True),
                ),
                ("battery_level", models.IntegerField(blank=True, null=True)),
                (
                    "status",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("Charging", "Charging"),
                            ("Critical", "Critical"),
                            ("Warning", "Warning"),
                            ("Full", "Full"),
                        ],
                        max_length=20,
                        null=True,
                    ),
                ),
                (
                    "prediction",
                    models.CharField(blank=True, max_length=255, null=True),
                ),
                (
                    "voltage",
                    models.DecimalField(
                        blank=True, decimal_places=2, max_digits=5, null=True
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "db_table": "tags_tag",
                "ordering": ["tag_id"],
            },
        ),
    ]
