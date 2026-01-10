"""Views for Tag API endpoints."""

from rest_framework import viewsets

from .models import Tag
from .serializers import TagSerializer
from .services.wnt_api_client import WNTAPIClient


class TagViewSet(viewsets.ReadOnlyModelViewSet):  # pylint: disable=too-many-ancestors
    """
    ViewSet for viewing tags.
    Provides list and detail endpoints.
    """

    queryset = Tag.objects.all()  # pylint: disable=no-member
    serializer_class = TagSerializer
    lookup_field = "node_address"
    filterset_fields = ["prediction"]
    search_fields = ["node_address", "prediction", "battery_level", "voltage"]

    wnt_client = WNTAPIClient()
