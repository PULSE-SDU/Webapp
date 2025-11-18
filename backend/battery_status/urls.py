from django.urls import path
from .views.battery_status import BatteryStatusDetail, BatteryStatusFiltered


urlpatterns = [
    path("battery-status/<str:node_address>", BatteryStatusDetail.as_view()),
    path("battery-status", BatteryStatusFiltered.as_view()),
]
