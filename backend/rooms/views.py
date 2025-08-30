# rooms/views.py
from rest_framework import viewsets, permissions
from .models import (
    Amenity, Facility, BedType, RoomType, RoomImage, Room,
    Policy, RatePlan, Inventory, Price
)
from .serializers import (
    AmenitySerializer, FacilitySerializer, BedTypeSerializer,
    RoomTypeSerializer, RoomImageSerializer, RoomSerializer,
    PolicySerializer, RatePlanSerializer, InventorySerializer, PriceSerializer
)

class TenantScopedMixin:
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        u = self.request.user
        qs = super().get_queryset()
        if hasattr(u, "is_platform_admin") and callable(u.is_platform_admin) and u.is_platform_admin():
            return qs
        return qs.filter(tenant=u.tenant)

    def perform_create(self, serializer):
        u = self.request.user
        serializer.save(tenant=u.tenant)

# Global taxonomy (platform-admin typically manages these)
class FacilityViewSet(viewsets.ModelViewSet):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer
    permission_classes = [permissions.IsAdminUser]

class BedTypeViewSet(viewsets.ModelViewSet):
    queryset = BedType.objects.all()
    serializer_class = BedTypeSerializer
    permission_classes = [permissions.IsAdminUser]

# Amenity stays tenant-scoped (or make it admin-only by policy)
class AmenityViewSet(TenantScopedMixin, viewsets.ModelViewSet):
    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializer

class RoomTypeViewSet(TenantScopedMixin, viewsets.ModelViewSet):
    queryset = RoomType.objects.all().select_related("tenant","property","bed_type")
    serializer_class = RoomTypeSerializer

class RoomImageViewSet(TenantScopedMixin, viewsets.ModelViewSet):
    queryset = RoomImage.objects.all().select_related("tenant","room_type")
    serializer_class = RoomImageSerializer

class RoomViewSet(TenantScopedMixin, viewsets.ModelViewSet):
    queryset = Room.objects.all().select_related("tenant","property","room_type")
    serializer_class = RoomSerializer

class PolicyViewSet(TenantScopedMixin, viewsets.ModelViewSet):
    queryset = Policy.objects.all()
    serializer_class = PolicySerializer

class RatePlanViewSet(TenantScopedMixin, viewsets.ModelViewSet):
    queryset = RatePlan.objects.all().select_related("tenant","room_type","policy")
    serializer_class = RatePlanSerializer

class InventoryViewSet(TenantScopedMixin, viewsets.ModelViewSet):
    queryset = Inventory.objects.all().select_related("tenant","property","room_type")
    serializer_class = InventorySerializer

class PriceViewSet(TenantScopedMixin, viewsets.ModelViewSet):
    queryset = Price.objects.all().select_related("tenant","property","rate_plan")
    serializer_class = PriceSerializer
