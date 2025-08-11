from rest_framework import viewsets
from .models import Room, Amenity
from .serializers import RoomSerializer, AmenitySerializer
from accounts.permissions import IsAdminOrVendor
from accounts.models import Admin, Vendor
from tenants.models import Property

class AmenityViewSet(viewsets.ModelViewSet):
    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializer
    permission_classes = [IsAdminOrVendor]

class RoomViewSet(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    permission_classes = [IsAdminOrVendor]

    def get_queryset(self):
        user = self.request.user

        if Admin.objects.filter(user=user).exists():
            return Room.objects.all()

        elif Vendor.objects.filter(user=user).exists():
            vendor = Vendor.objects.get(user=user)
            # Get all properties owned by this vendor
            vendor_properties = Property.objects.filter(vendor=vendor)
            # Filter rooms that belong to those properties
            return Room.objects.filter(property__in=vendor_properties)

        return Room.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if Vendor.objects.filter(user=user).exists():
            vendor = Vendor.objects.get(user=user)
            # Get the submitted property
            submitted_property = serializer.validated_data['property']
            if submitted_property.vendor != vendor:
                raise PermissionError("You are not allowed to add rooms to this property.")
            serializer.save()
        else:
            serializer.save()  # Admin can assign to any property
