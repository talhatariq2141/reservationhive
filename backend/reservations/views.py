# reservations/views.py
from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from .models import Guest, Booking
from rest_framework.response import Response
from .serializers import GuestSerializer, BookingSerializer

from reservations.serializers import (
    AvailabilityQuerySerializer, AvailabilityOptionSerializer,
    BookingCreateSerializer, BookingSerializer
)
from reservations.services.availability_service import get_availability
from reservations.services.booking_service import create_booking, BookingError
from reservations.models import Booking

class TenantScopedMixin:
    def get_queryset(self):
        u = self.request.user
        qs = super().get_queryset()
        if hasattr(u, "is_platform_admin") and u.is_platform_admin():
            return qs
        return qs.filter(tenant=u.tenant)

    def perform_create(self, serializer):
        u = self.request.user
        serializer.save(tenant=u.tenant)

class GuestViewSet(TenantScopedMixin, viewsets.ModelViewSet):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer
    permission_classes = [permissions.IsAuthenticated]

class BookingViewSet(TenantScopedMixin, viewsets.ModelViewSet):
    queryset = Booking.objects.all().select_related("guest", "property")
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]


class TenantScopedMixin:
    permission_classes = [permissions.IsAuthenticated]

    def _tenant(self, request):
        return getattr(request.user, "tenant", None)


class AvailabilityView(TenantScopedMixin, APIView):
    """
    GET /api/reservations/availability?property=<id>&check_in=YYYY-MM-DD&check_out=YYYY-MM-DD&adults=2&children=0
    """
    def get(self, request):
        ser = AvailabilityQuerySerializer(data=request.query_params)
        ser.is_valid(raise_exception=True)
        data = ser.validated_data
        options = get_availability(
            tenant=self._tenant(request),
            property_id=data["property"],
            check_in=data["check_in"],
            check_out=data["check_out"],
            adults=data["adults"],
            children=data["children"],
        )
        out = AvailabilityOptionSerializer(options, many=True)
        return Response(out.data)


class BookingViewSet(TenantScopedMixin, viewsets.ViewSet):
    """
    POST /api/reservations/bookings
    """
    def create(self, request):
        ser = BookingCreateSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        data = ser.validated_data
        idem = request.headers.get("Idempotency-Key", "")

        try:
            booking = create_booking(
                tenant=self._tenant(request),
                property_id=data["property"],
                guest_email=data["guest_email"],
                guest_first_name=data["guest_first_name"],
                guest_last_name=data["guest_last_name"],
                guest_phone=data["guest_phone"],
                check_in=data["check_in"],
                check_out=data["check_out"],
                room_type_id=data["room_type_id"],
                rate_plan_id=data["rate_plan_id"],
                channel=data["channel"],
                idempotency_key=idem,
            )
        except BookingError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(BookingSerializer(booking).data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        qs = Booking.objects.filter(tenant=self._tenant(request)).select_related("property", "guest")
        try:
            booking = qs.get(pk=pk)
        except Booking.DoesNotExist:
            return Response({"detail": "Not found."}, status=404)
        return Response(BookingSerializer(booking).data)