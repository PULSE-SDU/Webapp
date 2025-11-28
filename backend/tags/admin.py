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
        "equipment_name",
        "type",
        "location",
        "battery_level",
        "status",
        "voltage",
        "updated_at",
    ]
    list_filter = ["status", "type", "location"]
    search_fields = ["tag_id", "equipment_name", "location"]
    readonly_fields = ["created_at", "updated_at"]
    ordering = ["tag_id"]
