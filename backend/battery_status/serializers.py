from rest_framework import serializers
from .models import BatteryStatus


class BatteryStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = BatteryStatus
        fields = "__all__"
