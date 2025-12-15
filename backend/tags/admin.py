"""Admin configuration for Tag model."""

from django.contrib import admin
from .models import Tag


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    """
    Admin interface for Tag model.
    """

    list_display = [
        "tag_id",
        "battery_level",
        "status",
        "voltage",
        "updated_at",
    ]
    list_filter = ["status"]
    search_fields = ["tag_id"]
    readonly_fields = ["created_at", "updated_at"]
    ordering = ["tag_id"]
