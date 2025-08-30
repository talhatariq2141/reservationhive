from django.shortcuts import render

# Create your views here.
# accounts/views.py
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import UserProfile
from .serializers import UserSerializer, UserProfileSerializer

User = get_user_model()

class IsPlatformAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        u = request.user
        return bool(u and u.is_authenticated and getattr(u, "is_platform_admin", lambda: False)())

class UserViewSet(viewsets.ModelViewSet):
    """
    Platform admins can manage users. Vendors cannot.
    """
    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [IsPlatformAdmin]

class UserProfileViewSet(viewsets.ModelViewSet):
    """
    Users can view/update their own profile; admins can see all.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        u = self.request.user
        if hasattr(u, "is_platform_admin") and u.is_platform_admin():
            return self.queryset
        return self.queryset.filter(user=u)


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        if hasattr(user, "is_platform_admin") and user.is_platform_admin():
            role = "admin"
        elif hasattr(user, "is_vendor") and user.is_vendor():
            role = "vendor"
        else:
            role = "user"

        tenant = getattr(user, "tenant", None)
        return Response({
            "id": getattr(user, "id", None),
            "username": getattr(user, "username", ""),
            "email": getattr(user, "email", ""),
            "role": role,
            "tenant": {
                "id": getattr(tenant, "id", None) if tenant else None,
                "name": getattr(tenant, "name", None) if tenant else None,
                "slug": getattr(tenant, "slug", None) if tenant else None,
            },
        })
