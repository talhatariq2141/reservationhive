# rooms/models.py
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from common.models import TenantAwareModel
from tenants.models import Property


def room_image_path(instance, filename):
    return f"rooms/{instance.room_type_id}/images/{filename}"


class Amenity(TenantAwareModel):
    name = models.CharField(max_length=120)
    def __str__(self): return self.name


# Global taxonomies managed by platform-admin; keep simple models (not tenant-aware)
class Facility(models.Model):
    name = models.CharField(max_length=120, unique=True)
    def __str__(self): return self.name


class BedType(models.Model):
    name = models.CharField(max_length=80, unique=True)
    def __str__(self): return self.name


class RoomType(TenantAwareModel):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="room_types")
    code = models.CharField(max_length=32)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")

    # pricing & policy (SAFE during dev via defaults)
    base_price_amount = models.DecimalField(
        max_digits=10, decimal_places=2, default=0,
        validators=[MinValueValidator(0)]
    )
    base_price_currency = models.CharField(max_length=3, default="USD")
    discount_percent = models.DecimalField(
        max_digits=5, decimal_places=2, default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    adults = models.PositiveSmallIntegerField(default=2)
    children = models.PositiveSmallIntegerField(default=0)
    cancellation_fee_amount = models.DecimalField(
        max_digits=10, decimal_places=2, default=0,
        validators=[MinValueValidator(0)]
    )
    cancellation_fee_currency = models.CharField(max_length=3, default="USD")

    beds_total = models.PositiveSmallIntegerField(
        default=1, validators=[MinValueValidator(1)]
    )
    bed_type = models.ForeignKey(BedType, on_delete=models.SET_NULL, null=True, blank=True, related_name="room_types")

    amenities = models.ManyToManyField(Amenity, blank=True, related_name="room_types")
    facilities = models.ManyToManyField(Facility, blank=True, related_name="room_types")

    cancellation_policy = models.TextField(blank=True, default="")
    max_guests = models.PositiveSmallIntegerField(default=2)

    def __str__(self):
        return f"{self.name} ({self.property.name})"


class RoomImage(TenantAwareModel):
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to=room_image_path)


class Room(TenantAwareModel):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="rooms")
    room_type = models.ForeignKey(RoomType, on_delete=models.PROTECT, related_name="rooms")
    room_no = models.CharField(max_length=20)  # allow 01A etc.

    def __str__(self): return f"{self.room_no} - {self.room_type.name}"


class Policy(TenantAwareModel):
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True, default="")
    def __str__(self): return self.name


class RatePlan(TenantAwareModel):
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE, related_name="rate_plans")
    name = models.CharField(max_length=120)
    refundable = models.BooleanField(default=True)
    los_min = models.PositiveSmallIntegerField(default=1)
    los_max = models.PositiveSmallIntegerField(default=30)
    policy = models.ForeignKey(Policy, on_delete=models.SET_NULL, null=True, blank=True, related_name="rate_plans")
    def __str__(self): return f"{self.name} - {self.room_type.name}"


class Inventory(TenantAwareModel):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="inventory")
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE, related_name="inventory")
    date = models.DateField()
    allotment = models.PositiveIntegerField(default=0)
    closed = models.BooleanField(default=False)

    class Meta:
        unique_together = (("tenant", "room_type", "date"),)


class Price(TenantAwareModel):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="prices")
    rate_plan = models.ForeignKey(RatePlan, on_delete=models.CASCADE, related_name="prices")
    date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default="USD")

    class Meta:
        unique_together = (("tenant", "rate_plan", "date"),)
