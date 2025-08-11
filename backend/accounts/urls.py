from rest_framework.routers import DefaultRouter
from .views import AdminViewSet, VendorViewSet, UserProfileViewSet

router = DefaultRouter()
router.register('admins', AdminViewSet)
router.register('vendors', VendorViewSet)
router.register('profiles', UserProfileViewSet)

urlpatterns = router.urls
