"""App configuration for tags application."""
from django.apps import AppConfig


class TagsConfig(AppConfig):
    """Configuration for the tags Django app."""

    default_auto_field = "django.db.models.BigAutoField"
    name = "tags"
