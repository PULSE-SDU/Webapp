from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from django.utils import timezone
from datetime import timedelta
from ..models import StatusSummary
from ..serializers import StatusSummarySerializer

class StatusSummaryList(APIView):
    """
    GET: Retrieve historical status summaries.
         Optional query parameter ?days=n returns only the last n days.
    """

    def get(self, request):
        days_param = request.query_params.get("days")

        queryset = StatusSummary.objects.all()

        # time filter if ?days= is provided
        if days_param:
            try:
                days = int(days_param)
            except ValueError:
                raise serializers.ValidationError(
                    {"days": "Query parameter 'days' must be an integer"}
                )

            start_date = timezone.now().date() - timedelta(days=days)
            queryset = queryset.filter(date__gte=start_date)

        queryset = queryset.order_by("-date", "status_title")

        serializer = StatusSummarySerializer(queryset, many=True)
        return Response(serializer.data)
    

class LatestStatusSummary(APIView):
    """
    GET: Retrieve the latest overall status summary for the most recent date.
    """

    def get(self, request):
        latest_entry = StatusSummary.objects.order_by("-date").first()
        
        if not latest_entry:
            return Response([])  # No data available

        summaries = StatusSummary.objects.filter(date=latest_entry.date).order_by("status_title")
        serializer = StatusSummarySerializer(summaries, many=True)
        
        return Response(serializer.data)