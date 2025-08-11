from rest_framework import viewsets
from .models import Booking, Guest
from .serializers import BookingSerializer, GuestSerializer
from accounts.permissions import IsAdminOrVendor
from accounts.models import Admin, Vendor
from rooms.models import Room
from tenants.models import Property

class GuestViewSet(viewsets.ModelViewSet):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer
    permission_classes = [IsAdminOrVendor]

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAdminOrVendor]

    def get_queryset(self):
        user = self.request.user

        if Admin.objects.filter(user=user).exists():
            return Booking.objects.all()

        elif Vendor.objects.filter(user=user).exists():
            vendor = Vendor.objects.get(user=user)
            # Get vendor's properties and rooms
            vendor_properties = Property.objects.filter(vendor=vendor)
            vendor_rooms = Room.objects.filter(property__in=vendor_properties)
            return Booking.objects.filter(room__in=vendor_rooms)

        return Booking.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if Vendor.objects.filter(user=user).exists():
            vendor = Vendor.objects.get(user=user)
            submitted_room = serializer.validated_data['room']
            if submitted_room.property.vendor != vendor:
                raise PermissionError("You are not allowed to create a booking for this room.")
            serializer.save()
        else:
            serializer.save()  # Admin can book for any room
