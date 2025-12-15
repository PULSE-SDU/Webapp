from rest_framework.response import Response
from ..models import BatteryStatus
from ..serializers import BatteryStatusSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from ..services.battery_status_updater import update_battery_status_from_wnt

class BatteryStatusViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing battery status
    """
    update_battery_status_from_wnt()
    queryset = BatteryStatus.objects.all()
    serializer_class = BatteryStatusSerializer
    lookup_field = "node_address"

    def list(self, request, *args, **kwargs):
        """
        Filter by status_title: GET /battery-status?status={statusTitle}
        Returns a list of node_address strings, or an empty list if no status is provided
        Only accepts status_title values within the StatusTitle enum.
        """
        from ..models import StatusTitle
        status_title = request.query_params.get("status")
        if status_title not in StatusTitle.values:
            return Response({"detail": f"Invalid status_title. Must be one of: {list(StatusTitle.values)}"}, status=400)
        addresses = BatteryStatus.objects.filter(status_title=status_title).values_list(
            "node_address", flat=True
        )
        return Response(list(addresses))
        