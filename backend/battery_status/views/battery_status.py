from rest_framework.response import Response
from ..models import BatteryStatus, StatusTitle
from ..serializers import BatteryStatusSerializer
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from django_filters import BaseInFilter, NumberFilter, CharFilter


# Custom filters for multi-value support
class CharInFilter(BaseInFilter, CharFilter):
    pass


class NumberInFilter(BaseInFilter, NumberFilter):
    pass


class BatteryStatusFilterSet(FilterSet):
    title = CharInFilter(field_name="title", lookup_expr="in")
    prediction_days = NumberInFilter(field_name="prediction_days", lookup_expr="in")
    prediction_days__gte = NumberFilter(field_name="prediction_days", lookup_expr="gte")
    node_address = CharInFilter(field_name="node_address", lookup_expr="in")

    class Meta:
        model = BatteryStatus
        fields = ["title", "prediction_days", "prediction_days__gte", "node_address"]


class BatteryStatusViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing battery status
    """

    queryset = BatteryStatus.objects.all()
    serializer_class = BatteryStatusSerializer
    lookup_field = "node_address"
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = BatteryStatusFilterSet
    search_fields = ["node_address", "title", "prediction_days"]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        node_addresses = queryset.values_list("node_address", flat=True)
        return Response(list(node_addresses))
