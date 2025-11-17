from django.db import models

# Create your models here.

class StatusTitle(models.TextChoices):
    CRITICAL = "Critical"
    WARNING = "Warning"
    NORMAL = "Normal"
    FULL = "Full"
    CHARGING = "Charging"


class BatteryStatus(models.Model):
    """Model representing a tag's battery status."""

    prediction = models.IntegerField()
    status_title = models.CharField(max_length=20, choices=StatusTitle.choices)
    node_address = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.node_address} - {self.status_title} ({self.prediction} days)"


class StatusSummary(models.Model):
    """Aggregate summary of statuses for a date."""

    date = models.DateField()
    status_title = models.CharField(max_length=20, choices=StatusTitle.choices)
    count = models.IntegerField()

    def __str__(self):
        return f"{self.date}: {self.status_title} ({self.count})"
