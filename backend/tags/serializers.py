"""Serializers for Tag model."""

from rest_framework import serializers
from .models import Tag


class TagSerializer(serializers.ModelSerializer):
    """
    Serializer for Tag model that converts between snake_case and camelCase.
    """
    class Meta:
        model = Tag
        fields = "__all__"

