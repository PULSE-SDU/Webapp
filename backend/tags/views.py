"""Views for Tag API endpoints."""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Tag
from .serializers import TagSerializer
from .services.wnt_api_client import WNTAPIClient
from .services.inferencer_client import InferencerClient


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
    infer_client = InferencerClient()

    @action(detail=True, methods=["get"], url_path="prediction")
    def prediction(self, request, pk=None):
        tag = self.get_object()

        try:
            wnt_tag_id = int(float(tag.tag_id))
        except (ValueError, TypeError):
            wnt_tag_id = tag.tag_id

        print(
            "DEBUG tag.pk=",
            tag.pk,
            "tag.tag_id=",
            repr(tag.tag_id),
            "wnt_tag_id=",
            wnt_tag_id,
        )
        window = self.wnt_client.get_battery_window(wnt_tag_id)
        if not window or "readings" not in window:
            return Response(
                {"prediction": None, "detail": "Battery window not found"},
                status=status.HTTP_200_OK,
            )

        try:
            pred = self.infer_client.predict_from_wnt_window(
                tag_id=str(tag.tag_id),
                wnt_readings=window["readings"],
                baseline_voltage=window.get("baselinevoltage", 3.1),
                cycle_start_epoch=window.get("cyclestartepoch"),
            )
            return Response(pred, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Inference Error for {tag.tag_id}: {e}")
            return Response(
                {"detail": "Prediction service unavailable"},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
