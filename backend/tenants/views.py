from rest_framework import viewsets
from .models import Property
from .serializers import PropertySerializer
from accounts.permissions import IsAdminOrVendor
from accounts.models import Admin, Vendor

class PropertyViewSet(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    permission_classes = [IsAdminOrVendor]

    def get_queryset(self):
        user = self.request.user
        # Admin: return ALL properties
        if Admin.objects.filter(user=user).exists():
            return Property.objects.all()
        # Vendor: return ONLY their own properties
        elif Vendor.objects.filter(user=user).exists():
            vendor = Vendor.objects.get(user=user)
            return Property.objects.filter(vendor=vendor)
        # Fallback: return nothing
        return Property.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if Vendor.objects.filter(user=user).exists():
            vendor = Vendor.objects.get(user=user)
            serializer.save(vendor=vendor)
        else:
            serializer.save()  # for admin, allow assigning any vendor (optional)
