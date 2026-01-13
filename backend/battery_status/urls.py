from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views.battery_status import BatteryStatusViewSet
from .views.status_summary import SummaryViewSet


router = DefaultRouter()
router.register(r"battery-status", BatteryStatusViewSet, basename="battery-status")
router.register(r"summary", SummaryViewSet, basename="summary")


urlpatterns = [
    path("", include(router.urls)),
]
