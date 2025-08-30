# accounts/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, UserProfileViewSet, MeView

router = DefaultRouter()
router.register("users", UserViewSet, basename="user")
router.register("profiles", UserProfileViewSet, basename="profile")

urlpatterns = [
    path("", include(router.urls)),
    path("me/", MeView.as_view(), name="me"),
]
