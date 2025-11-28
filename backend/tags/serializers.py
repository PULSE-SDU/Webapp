"""Serializers for Tag model."""
from rest_framework import serializers
from .models import Tag


class TagSerializer(serializers.ModelSerializer):
    """
    Serializer for Tag model that converts between snake_case and camelCase.
    """

    tagId = serializers.CharField(source="tag_id")
    equipmentName = serializers.CharField(
        source="equipment_name", required=False, allow_null=True
    )
    batteryLevel = serializers.IntegerField(
        source="battery_level", required=False, allow_null=True
    )

    class Meta:  # pylint: disable=too-few-public-methods
        """Meta configuration for TagSerializer."""

        model = Tag
        fields = [
            "tagId",
            "equipmentName",
            "type",
            "location",
            "batteryLevel",
            "status",
            "prediction",
            "voltage",
        ]

    def to_representation(self, instance):
        """
        Convert voltage Decimal to float for JSON serialization.
        """
        data = super().to_representation(instance)
        if data.get("voltage") is not None:
            data["voltage"] = float(data["voltage"])
        return data
