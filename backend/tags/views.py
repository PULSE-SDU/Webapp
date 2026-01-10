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
    filterset_fields = ["voltage"]
    search_fields = ["node_address", "voltage"]

    wnt_client = WNTAPIClient()
