# reservations/urls.py
from django.urls import path
from rest_framework.routers import DefaultRouter
from reservations.views import GuestViewSet, BookingViewSet, AvailabilityView

router = DefaultRouter()
router.register("guests", GuestViewSet)
router.register ("bookings", BookingViewSet, basename="booking")

urlpatterns = [
    path("availability", AvailabilityView.as_view(), name="availability"),
]

urlpatterns = router.urls
