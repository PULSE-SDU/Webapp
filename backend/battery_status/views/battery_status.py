from django.forms import ValidationError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.views import APIView
from ..models import BatteryStatus
from ..serializers import BatteryStatusSerializer
from rest_framework import serializers


class BatteryStatusDetail(RetrieveUpdateAPIView):
    """
    GET: Retrieve battery status for a specific node_address.

    PUT/PATCH: Create or update battery status for a node_address.
    """
    queryset = BatteryStatus.objects.all()
    serializer_class = BatteryStatusSerializer
    lookup_field = "node_address"
    
    def put(self, request, **kwargs):
        node_address = kwargs.get("node_address")
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        battery_status_obj, created = BatteryStatus.objects.update_or_create(
            node_address=node_address,
            defaults=serializer.validated_data
        )
        response_serializer = self.get_serializer(battery_status_obj)
        return Response(
            response_serializer.data,
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
        )


class BatteryStatusFiltered(APIView):
    """View to retrieve all node_addresses with a specific status."""
    def get(self, request):
        status_title = request.query_params.get("status")
        if not status_title:
            raise serializers.ValidationError({"status": "Query parameter 'status' is required"})

        addresses = BatteryStatus.objects.filter(
            status_title=status_title
        ).values_list("node_address", flat=True)

        return Response(list(addresses))