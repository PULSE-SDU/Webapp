"""Tests for Tag model."""
from django.test import TestCase
from django.core.exceptions import ValidationError
from tags.models import Tag


class TagModelTestCase(TestCase):
    """Test cases for Tag model."""

    def test_create_tag(self):
        """Test creating a tag."""
        tag = Tag.objects.create(
            tag_id="TAG001",
            equipment_name="Test Equipment",
            type="Test Type",
            location="Test Location",
            battery_level=85,
            status="Full",
            prediction="5 days left",
            voltage=3.7,
        )
        self.assertEqual(tag.tag_id, "TAG001")
        self.assertEqual(tag.equipment_name, "Test Equipment")
        self.assertEqual(tag.battery_level, 85)
        self.assertEqual(tag.status, "Full")

    def test_tag_id_unique(self):
        """Test that tag_id must be unique."""
        Tag.objects.create(tag_id="TAG001", equipment_name="Equipment 1")
        with self.assertRaises(Exception):  # IntegrityError
            Tag.objects.create(tag_id="TAG001", equipment_name="Equipment 2")

    def test_tag_str_representation(self):
        """Test string representation of Tag."""
        tag = Tag.objects.create(
            tag_id="TAG001", equipment_name="Test Equipment"
        )
        self.assertEqual(str(tag), "Tag TAG001 - Test Equipment")

    def test_tag_str_without_equipment_name(self):
        """Test string representation without equipment name."""
        tag = Tag.objects.create(tag_id="TAG001")
        self.assertEqual(str(tag), "Tag TAG001 - Unknown")

    def test_tag_ordering(self):
        """Test that tags are ordered by tag_id."""
        Tag.objects.create(tag_id="TAG002")
        Tag.objects.create(tag_id="TAG001")
        Tag.objects.create(tag_id="TAG003")
        tags = Tag.objects.all()
        self.assertEqual(tags[0].tag_id, "TAG001")
        self.assertEqual(tags[1].tag_id, "TAG002")
        self.assertEqual(tags[2].tag_id, "TAG003")

    def test_status_choices(self):
        """Test that status field accepts valid choices."""
        valid_statuses = ["Charging", "Critical", "Warning", "Full"]
        for status_choice in valid_statuses:
            tag = Tag.objects.create(tag_id=f"TAG{status_choice}", status=status_choice)
            self.assertEqual(tag.status, status_choice)

