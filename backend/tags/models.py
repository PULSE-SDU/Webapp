from django.db import models


class Tag(models.Model):
    """
    Model representing a battery tag for medical equipment.
    """

    STATUS_CHOICES = [
        ("Charging", "Charging"),
        ("Critical", "Critical"),
        ("Warning", "Warning"),
        ("Full", "Full"),
    ]

    tag_id = models.CharField(max_length=100, unique=True, db_index=True)
    equipment_name = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    battery_level = models.IntegerField(blank=True, null=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, blank=True, null=True
    )
    prediction = models.CharField(max_length=255, blank=True, null=True)
    voltage = models.DecimalField(
        max_digits=5, decimal_places=2, blank=True, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["tag_id"]
        db_table = "tags_tag"

    def __str__(self):
        return f"Tag {self.tag_id} - {self.equipment_name or 'Unknown'}"
