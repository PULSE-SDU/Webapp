from rest_framework import serializers
from .models import BatteryStatus, StatusSummary


class BatteryStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = BatteryStatus
        fields = "__all__"

class StatusSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusSummary
        fields = "__all__"