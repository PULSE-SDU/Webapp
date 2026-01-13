from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class StatusTitle(models.TextChoices):
    NORMAL = "Normal"
    LOW = "Low"
    OFFLINE = "Offline"


class BatteryStatus(models.Model):
    """Model representing a tag's battery status."""

    node_address = models.CharField(max_length=255)
    title = models.CharField(max_length=20, choices=StatusTitle.choices)
    percentage = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)], default=0
    )
    prediction_days = models.IntegerField(default=0)
    prediction_hours = models.IntegerField(default=0)

    def __str__(self):
        return (
            f"{self.node_address} - {self.title} ("
            f"{self.prediction_days} days, {self.prediction_hours} hours)"
        )


class Summary(models.Model):
    """Model representing a summary of battery statuses."""

    date = models.DateTimeField(auto_now_add=True)
    total_tags = models.IntegerField()
    normal_count = models.IntegerField()
    low_count = models.IntegerField()
    offline_count = models.IntegerField()
    average_percentage = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)], default=0
    )

    def __str__(self):
        return f"Summary for {self.date}"
