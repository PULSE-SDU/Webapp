from rest_framework import serializers
from .models import BatteryStatus, Summary


class BatteryStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = BatteryStatus
        fields = "__all__"


class SummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary
        fields = "__all__"
