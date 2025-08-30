# tenants/urls.py
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, PropertyImageViewSet, PremiumServiceViewSet

router = DefaultRouter()
router.register("properties", PropertyViewSet, basename="property")
router.register("property-images", PropertyImageViewSet, basename="propertyimage")
router.register("premium-services", PremiumServiceViewSet, basename="premiumservice")

urlpatterns = router.urls
