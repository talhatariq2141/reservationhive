from rest_framework import permissions
from .models import Admin, Vendor

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return Admin.objects.filter(user=request.user).exists()

class IsVendorUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return Vendor.objects.filter(user=request.user).exists()

class IsAdminOrVendor(permissions.BasePermission):
    def has_permission(self, request, view):
        return Admin.objects.filter(user=request.user).exists() or Vendor.objects.filter(user=request.user).exists()
