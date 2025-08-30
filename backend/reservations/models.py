# reservations/models.py
from django.db import models
from django.utils import timezone
from common.models import TenantAwareModel
from tenants.models import Property
from rooms.models import RoomType, RatePlan


class Guest(TenantAwareModel):
    """
    Guest (PII lives here). Use soft delete/anonymize for GDPR if needed.
    """

    first_name = models.CharField(max_length=120)
    last_name = models.CharField(max_length=120, blank=True, default="")
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True, default="")

    class Meta:
        indexes = [models.Index(fields=["tenant", "email"])]

    def __str__(self):
        return f"{self.first_name} {self.last_name}".strip()


class Booking(TenantAwareModel):
    """
    Unified booking header for BE, Front Desk, and OTA channels.
    """
    class Channel(models.TextChoices):
        BE = "BE", "Booking Engine"
        IN_HOUSE = "IN_HOUSE", "In-house"
        OTA_BOOKING = "OTA_BOOKING", "Booking.com"
        OTA_EXPEDIA = "OTA_EXPEDIA", "Expedia"
        OTHER = "OTHER", "Other"

    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        HELD = "held", "Held"
        CONFIRMED = "confirmed", "Confirmed"
        PAID = "paid", "Paid"
        CANCELLED = "cancelled", "Cancelled"
        CHECKED_IN = "checked_in", "Checked In"
        CHECKED_OUT = "checked_out", "Checked Out"

    property = models.ForeignKey(Property, on_delete=models.PROTECT, related_name="bookings", null=True, blank=True)
    channel = models.CharField(max_length=20, choices=Channel.choices, default=Channel.BE)
    source_ref = models.CharField(max_length=120, blank=True, default="")  # OTA reservation id etc.
    idempotency_key = models.CharField(max_length=120, blank=True, default="")

    guest = models.ForeignKey(Guest, on_delete=models.PROTECT, related_name="bookings")
    check_in = models.DateField()
    check_out = models.DateField()
    guests_adults = models.PositiveIntegerField(default=2)
    guests_children = models.PositiveIntegerField(default=0)

    currency = models.CharField(max_length=3, default="USD")
    subtotal_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    tax_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)

    class Meta:
        indexes = [
            models.Index(fields=["tenant", "property", "check_in"]),
            models.Index(fields=["tenant", "status"]),
        ]
        constraints = [
            models.UniqueConstraint(fields=["tenant", "idempotency_key"], name="uniq_booking_idempotency", condition=~models.Q(idempotency_key="")),
        ]

    def __str__(self):
        return f"Booking {self.id} ({self.channel}) {self.check_in}→{self.check_out}"


class BookingNight(TenantAwareModel):
    """
    Line items for each night in a booking.
    """
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name="nights")
    date = models.DateField()
    room_type = models.ForeignKey(RoomType, on_delete=models.PROTECT, related_name="booking_nights")
    rate_plan = models.ForeignKey(RatePlan, on_delete=models.PROTECT, related_name="booking_nights")
    price_amount = models.DecimalField(max_digits=10, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        unique_together = (("tenant", "booking", "date"),)
        indexes = [
            models.Index(fields=["tenant", "date"]),
        ]

    def __str__(self):
        return f"{self.booking_id} {self.date} {self.price_amount}"


class Hold(TenantAwareModel):
    """
    Optional: short-lived hold to prevent overbooking during checkout.
    """
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="holds")
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE, related_name="holds")
    date = models.DateField()
    quantity = models.PositiveIntegerField(default=1)
    expires_at = models.DateTimeField()
    idempotency_key = models.CharField(max_length=120)

    class Meta:
        unique_together = (("tenant", "room_type", "date", "idempotency_key"),)
        indexes = [
            models.Index(fields=["tenant", "date"]),
            models.Index(fields=["tenant", "expires_at"]),
        ]

    def is_expired(self) -> bool:
        return timezone.now() >= self.expires_at

    def __str__(self):
        return f"Hold {self.room_type_id} {self.date} x{self.quantity} until {self.expires_at}"


class ChannelMapping(TenantAwareModel):
    """
    Maps OTA codes to local RoomType/RatePlan (per tenant).
    """
    OTA_CHOICES = (
        ("BOOKING", "Booking.com"),
        ("EXPEDIA", "Expedia"),
        ("OTHER", "Other"),
    )
    ota = models.CharField(max_length=20, choices=OTA_CHOICES)
    ota_hotel_id = models.CharField(max_length=80)
    ota_room_code = models.CharField(max_length=80)
    ota_rate_code = models.CharField(max_length=80, blank=True, default="")

    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE, related_name="channel_mappings")
    rate_plan = models.ForeignKey(RatePlan, on_delete=models.CASCADE, related_name="channel_mappings")

    class Meta:
        unique_together = (("tenant", "ota", "ota_hotel_id", "ota_room_code", "ota_rate_code"),)
        indexes = [
            models.Index(fields=["tenant", "ota"]),
        ]

    def __str__(self):
        return f"{self.ota}:{self.ota_room_code}/{self.ota_rate_code} -> {self.room_type.code}"


class ChannelReservation(TenantAwareModel):
    """
    Stores raw OTA reservation payload and linkage to a Booking.
    """
    ota = models.CharField(max_length=20)
    ota_reservation_id = models.CharField(max_length=80)
    booking = models.OneToOneField(Booking, null=True, blank=True, on_delete=models.SET_NULL, related_name="channel_reservation")
    payload_json = models.JSONField()

    class Meta:
        unique_together = (("tenant", "ota", "ota_reservation_id"),)
        indexes = [models.Index(fields=["tenant", "ota"])]

    def __str__(self):
        return f"{self.ota}:{self.ota_reservation_id}"
