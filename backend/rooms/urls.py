# rooms/urls.py
from rest_framework.routers import DefaultRouter
from .views import (
  AmenityViewSet, RoomTypeViewSet, PolicyViewSet, RatePlanViewSet,
  InventoryViewSet, PriceViewSet
)

router = DefaultRouter()
router.register("amenities", AmenityViewSet)
router.register("room-types", RoomTypeViewSet)
router.register("policies", PolicyViewSet)
router.register("rate-plans", RatePlanViewSet)
router.register("inventory", InventoryViewSet)
router.register("prices", PriceViewSet)

urlpatterns = router.urls
