from rest_framework import viewsets, filters
from rest_framework.response import Response
from ..models import Summary
from ..serializers import SummarySerializer
from django_filters.rest_framework import (
    DjangoFilterBackend,
    FilterSet,
    DateFilter,
    NumberFilter,
)
from datetime import date, timedelta


class SummaryFilterSet(FilterSet):
    date = DateFilter(field_name="date")
    date__gte = DateFilter(field_name="date", lookup_expr="gte")
    date__lte = DateFilter(field_name="date", lookup_expr="lte")
    total_tags = NumberFilter(field_name="total_tags")

    class Meta:
        model = Summary
        fields = ["date", "date__gte", "date__lte", "total_tags"]


class SummaryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing battery status summaries
    """

    queryset = Summary.objects.all().order_by("-date")
    serializer_class = SummarySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = SummaryFilterSet
    search_fields = ["date"]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        days = request.query_params.get("days")
        if days:
            try:
                days = int(days)
            except ValueError:
                days = 30
            end_date = date.today()
            start_date = end_date - timedelta(days=days)
            queryset = queryset.filter(date__range=(start_date, end_date))
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        if kwargs.get("pk") == "latest":
            summary = Summary.objects.order_by("-date").first()
            data = self.get_serializer(summary).data if summary else None
            return Response(data)
        return super().retrieve(request, *args, **kwargs)
