from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.battery_status import BatteryStatusViewSet

router = DefaultRouter()
router.register(r"battery-status", BatteryStatusViewSet, basename="battery-status")

urlpatterns = [
    path("", include(router.urls)),
]
