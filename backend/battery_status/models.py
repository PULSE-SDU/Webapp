from django.db import models

# Create your models here.

class StatusTitle(models.TextChoices):
    CRITICAL = 'Critical',
    WARNING = 'Warning',
    NORMAL = 'Normal'
    FULL = 'Full',
    CHARGING = 'Charging',

class BatteryStatus(models.Model):
    prediction = models.IntegerField()
    status_title = models.CharField(choices=StatusTitle.choices)
    node_address = models.CharField()

    def __str__(self):
        return f"{self.node_address} - {self.status_title} ({self.prediction} days)"

class StatusSummary(models.Model):
    date = models.DateField()
    status_title = models.CharField(choices=StatusTitle.choices)
    count = models.IntegerField()

    def __str__(self):
        return f"{self.date}: {self.status_title} ({self.count})"