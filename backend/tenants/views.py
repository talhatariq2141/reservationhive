# tenants/views.py
from rest_framework import viewsets, permissions
from .models import Property, PropertyImage, PremiumService
from .serializers import PropertySerializer, PropertyImageSerializer, PremiumServiceSerializer

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

class PropertyViewSet(TenantScopedMixin, viewsets.ModelViewSet):
    queryset = Property.objects.all().select_related("tenant")
    serializer_class = PropertySerializer

class PropertyImageViewSet(TenantScopedMixin, viewsets.ModelViewSet):
    queryset = PropertyImage.objects.all().select_related("tenant","property")
    serializer_class = PropertyImageSerializer

class PremiumServiceViewSet(TenantScopedMixin, viewsets.ModelViewSet):
    queryset = PremiumService.objects.all().select_related("tenant","property")
    serializer_class = PremiumServiceSerializer
