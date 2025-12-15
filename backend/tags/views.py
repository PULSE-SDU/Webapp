"""Views for Tag API endpoints."""

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .models import Tag
from .serializers import TagSerializer


class TagViewSet(viewsets.ReadOnlyModelViewSet):  # pylint: disable=too-many-ancestors
    """
    ViewSet for viewing tags.
    Provides list and detail endpoints.
    """

    queryset = Tag.objects.all()  # pylint: disable=no-member
    serializer_class = TagSerializer
    lookup_field = "tag_id"

    @action(detail=True, methods=["get"], url_path="details")
    def details(self, request, tag_id=None):  # pylint: disable=unused-argument
        """
        Custom endpoint for retrieving detailed information about a tag.
        GET /api/tags/{tag_id}/details/
        """
        tag = self.get_object()
        serializer = self.get_serializer(tag)
        return Response(serializer.data, status=status.HTTP_200_OK)
