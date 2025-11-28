"""Tests for Tag serializers."""
from django.test import TestCase
from decimal import Decimal
from tags.models import Tag
from tags.serializers import TagSerializer


class TagSerializerTestCase(TestCase):
    """Test cases for TagSerializer."""

    def setUp(self):
        """Set up test fixtures."""
        self.tag = Tag.objects.create(
            tag_id="TAG001",
            equipment_name="Test Equipment",
            type="Test Type",
            location="Test Location",
            battery_level=85,
            status="Full",
            prediction="5 days left",
            voltage=Decimal("3.70"),
        )

    def test_serializer_camel_case_fields(self):
        """Test that serializer converts to camelCase."""
        serializer = TagSerializer(self.tag)
        data = serializer.data
        self.assertIn("tagId", data)
        self.assertIn("equipmentName", data)
        self.assertIn("batteryLevel", data)
        self.assertNotIn("tag_id", data)
        self.assertNotIn("equipment_name", data)
        self.assertNotIn("battery_level", data)

    def test_voltage_conversion_to_float(self):
        """Test that voltage Decimal is converted to float."""
        serializer = TagSerializer(self.tag)
        data = serializer.data
        self.assertIsInstance(data["voltage"], float)
        self.assertEqual(data["voltage"], 3.7)

    def test_voltage_null_handling(self):
        """Test that null voltage is handled correctly."""
        tag = Tag.objects.create(tag_id="TAG002", voltage=None)
        serializer = TagSerializer(tag)
        data = serializer.data
        self.assertIsNone(data["voltage"])

    def test_serializer_all_fields(self):
        """Test that all expected fields are present."""
        serializer = TagSerializer(self.tag)
        data = serializer.data
        expected_fields = [
            "tagId",
            "equipmentName",
            "type",
            "location",
            "batteryLevel",
            "status",
            "prediction",
            "voltage",
        ]
        for field in expected_fields:
            self.assertIn(field, data)

