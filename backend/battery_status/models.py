from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class StatusTitle(models.TextChoices):
    NORMAL = "Normal"
    LOW = "Low"
    OFFLINE = "Offline"

class Prediction:
    """Class representing a battery life prediction."""
    days: int
    hours: int

    def __init__(self, days: int, hours: int):
        self.days = days
        self.hours = hours

class BatteryStatus(models.Model):
    """Model representing a tag's battery status."""

    node_address = models.CharField(max_length=255)
    status_title = models.CharField(max_length=20, choices=StatusTitle.choices)
    battery_percentage = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        default=0
    )
    prediction = Prediction(days=0, hours=0)

    def __str__(self):
        return f"{self.node_address} - {self.status_title} ({self.prediction.days} days, {self.prediction.hours} hours)"


class StatusSummary(models.Model):
    """Aggregate summary of statuses for a date."""

    date = models.DateField()
    status_title = models.CharField(max_length=20, choices=StatusTitle.choices)
    count = models.IntegerField()

    def __str__(self):
        return f"{self.date}: {self.status_title} ({self.count})"
