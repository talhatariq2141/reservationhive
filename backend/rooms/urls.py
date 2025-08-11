from rest_framework.routers import DefaultRouter
from .views import RoomViewSet, AmenityViewSet

router = DefaultRouter()
router.register('rooms', RoomViewSet)
router.register('amenities', AmenityViewSet)

urlpatterns = router.urls
