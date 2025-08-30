# tenants/models.py
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from common.models import Tenant, TenantAwareModel


def property_feature_image_path(instance, filename):
    return f"properties/{instance.id}/feature/{filename}"


def property_gallery_image_path(instance, filename):
    return f"properties/{instance.property_id}/gallery/{filename}"


class Property(TenantAwareModel):
    """
    Hotel/Property owned by a Tenant (Vendor).
    Newly added fields are nullable or have empty-string defaults
    so existing rows migrate without prompts.
    """
    name = models.CharField(max_length=255)

    # foundational
    timezone = models.CharField(max_length=64, default="UTC")
    currency = models.CharField(max_length=3, default="USD")

    # core hotel details (SAFE during dev)
    star_rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        null=True, blank=True
    )
    country = models.CharField(max_length=120, blank=True, default="")
    city = models.CharField(max_length=120, blank=True, default="")
    location = models.CharField(max_length=120, blank=True, default="")
    feature_image = models.ImageField(upload_to=property_feature_image_path, blank=True, null=True)

    # settings / address / taxes / policies (SAFE during dev)
    address = models.TextField(blank=True, default="")
    latitude = models.DecimalField(max_digits=10, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=10, decimal_places=6, null=True, blank=True)
    tax_name = models.CharField(max_length=40, blank=True, default="")
    tax_percent = models.DecimalField(
        max_digits=6, decimal_places=3, default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    checkin_time = models.TimeField(null=True, blank=True)
    checkout_time = models.TimeField(null=True, blank=True)
    upcoming_checkin_days = models.PositiveSmallIntegerField(default=3)
    upcoming_checkout_days = models.PositiveSmallIntegerField(default=3)
    description = models.TextField(blank=True, default="")
    cancellation_policy = models.TextField(blank=True, default="")

    def __str__(self) -> str:
        label = f"{self.name}"
        if self.city:
            label += f" ({self.city})"
        return label


class PropertyImage(TenantAwareModel):
    """
    Gallery images (limit count in serializer/view if desired).
    """
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to=property_gallery_image_path)

    def __str__(self):
        return f"Image for property {self.property_id}"


class PremiumService(TenantAwareModel):
    """
    Premium (add-on) services per property.
    """
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="premium_services")
    name = models.CharField(max_length=120)
    fee_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    fee_currency = models.CharField(max_length=3, default="USD")

    def __str__(self):
        return f"{self.name} @ property {self.property_id}"
