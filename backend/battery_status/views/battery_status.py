from rest_framework.response import Response
from ..models import BatteryStatus, StatusTitle
from ..serializers import BatteryStatusSerializer
from rest_framework import viewsets


class BatteryStatusViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing battery status
    """

    queryset = BatteryStatus.objects.all()
    serializer_class = BatteryStatusSerializer
    lookup_field = "node_address"

    def list(self, request, *args, **kwargs):
        """
        Filter by status_title: GET /battery-status?status={statusTitle}
        Returns a list of node_address strings, or an empty list if no status is provided
        Only accepts status_title values within the StatusTitle enum.
        """

        title = request.query_params.get("status")
        if title not in StatusTitle.values:
            return Response(
                {
                    "detail": f"Invalid status title. Must be one of: {list(StatusTitle.values)}"
                },
                status=400,
            )
        addresses = BatteryStatus.objects.filter(title=title).values_list(
            "node_address", flat=True
        )
        return Response(list(addresses))
