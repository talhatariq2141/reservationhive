from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet

router = DefaultRouter()
router.register('properties', PropertyViewSet)

urlpatterns = router.urls
