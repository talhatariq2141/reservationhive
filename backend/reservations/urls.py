from rest_framework.routers import DefaultRouter
from .views import GuestViewSet, BookingViewSet

router = DefaultRouter()
router.register('guests', GuestViewSet)
router.register('bookings', BookingViewSet)

urlpatterns = router.urls
