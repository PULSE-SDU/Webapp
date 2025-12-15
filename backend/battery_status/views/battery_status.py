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

        status_title = request.query_params.get("status")
        if status_title not in StatusTitle.values:
            return Response(
                {
                    "detail": f"Invalid status_title. Must be one of: {list(StatusTitle.values)}"
                },
                status=400,
            )
        addresses = BatteryStatus.objects.filter(status_title=status_title).values_list(
            "node_address", flat=True
        )
        return Response(list(addresses))

    def count_by_status(self, request, *args, **kwargs):
        """
        GET /battery-status/count-by-status/
        Returns a count of battery statuses grouped by status_title.
        """
        from django.db.models import Count

        counts = (
            BatteryStatus.objects.values("status_title")
            .annotate(count=Count("status_title"))
            .order_by("status_title")
        )

        return Response(counts)
