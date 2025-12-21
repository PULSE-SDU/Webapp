"""Models for Tag application."""
from typing import Dict, List, Tuple

from django.db import models


class TagManager(models.Manager):  # pylint: disable=too-few-public-methods
    """Custom manager for Tag model."""

    def bulk_update_or_create(self, tags_data: List[Dict]) -> Tuple[int, int]:
        """
        Bulk update or create tags from a list of tag data dictionaries.

        Args:
            tags_data: List of dictionaries containing tag data

        Returns:
            Tuple of (created_count, updated_count)
        """
        created_count = 0
        updated_count = 0

        for tag_data in tags_data:
            _, created = self.update_or_create(
                tag_id=tag_data["tag_id"], defaults=tag_data
            )
            if created:
                created_count += 1
            else:
                updated_count += 1

        return created_count, updated_count


class Tag(models.Model):
    """
    Model representing a battery tag for medical equipment.
    """

    STATUS_CHOICES = [
        ("Charging", "Charging"),
        ("Critical", "Critical"),
        ("Warning", "Warning"),
        ("Full", "Full"),
    ]

    objects = TagManager()

    tag_id = models.CharField(max_length=100, unique=True, db_index=True)
    battery_level = models.IntegerField(blank=True, null=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, blank=True, null=True
    )
    prediction = models.CharField(max_length=255, blank=True, null=True)
    voltage = models.DecimalField(
        max_digits=5, decimal_places=2, blank=True, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:  # pylint: disable=too-few-public-methods
        """Meta configuration for Tag model."""

        ordering = ["tag_id"]
        db_table = "tags_tag"

    def __str__(self):
        return f"Tag {self.tag_id}"
