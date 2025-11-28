"""Tests for Tag API views."""
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from tags.models import Tag


class TagViewSetTestCase(TestCase):
    """Test cases for TagViewSet."""

    def setUp(self):
        """Set up test fixtures."""
        self.client = APIClient()
        self.tag1 = Tag.objects.create(
            tag_id="TAG001",
            equipment_name="Test Equipment 1",
            type="Test Type",
            location="Test Location",
            battery_level=85,
            status="Full",
            prediction="5 days left",
            voltage=3.7,
        )
        self.tag2 = Tag.objects.create(
            tag_id="TAG002",
            equipment_name="Test Equipment 2",
            type="Test Type 2",
            location="Test Location 2",
            battery_level=45,
            status="Warning",
            prediction="2 days left",
            voltage=3.2,
        )

    def test_list_tags(self):
        """Test listing all tags."""
        url = reverse("tag-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["tagId"], "TAG001")
        self.assertEqual(response.data[1]["tagId"], "TAG002")

    def test_retrieve_tag_by_id(self):
        """Test retrieving a tag by tag_id."""
        url = reverse("tag-detail", kwargs={"tag_id": "TAG001"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["tagId"], "TAG001")
        self.assertEqual(response.data["equipmentName"], "Test Equipment 1")
        self.assertEqual(response.data["batteryLevel"], 85)
        self.assertEqual(response.data["status"], "Full")

    def test_tag_details_endpoint(self):
        """Test the custom details endpoint."""
        url = reverse("tag-details", kwargs={"tag_id": "TAG001"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["tagId"], "TAG001")
        self.assertEqual(response.data["equipmentName"], "Test Equipment 1")

    def test_tag_not_found(self):
        """Test retrieving a non-existent tag."""
        url = reverse("tag-detail", kwargs={"tag_id": "NONEXISTENT"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_voltage_conversion_to_float(self):
        """Test that voltage is converted to float in response."""
        url = reverse("tag-detail", kwargs={"tag_id": "TAG001"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data["voltage"], float)
        self.assertEqual(response.data["voltage"], 3.7)

    def test_camel_case_field_names(self):
        """Test that response uses camelCase field names."""
        url = reverse("tag-detail", kwargs={"tag_id": "TAG001"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("tagId", response.data)
        self.assertIn("equipmentName", response.data)
        self.assertIn("batteryLevel", response.data)
        self.assertNotIn("tag_id", response.data)
        self.assertNotIn("equipment_name", response.data)
        self.assertNotIn("battery_level", response.data)

