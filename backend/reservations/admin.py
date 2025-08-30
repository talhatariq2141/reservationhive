from django.contrib import admin
from .models import Guest, Booking, BookingNight, Hold, ChannelMapping, ChannelReservation

@admin.register(Guest)
class GuestAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "email", "tenant", "created_at")
    search_fields = ("first_name", "last_name", "email")
    list_filter = ("tenant",)
    autocomplete_fields = ("tenant",)

class BookingNightInline(admin.TabularInline):
    model = BookingNight
    extra = 0
    autocomplete_fields = ("tenant", "room_type", "rate_plan")

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ("id", "property", "tenant", "channel", "status", "check_in", "check_out", "guest", "total_amount", "currency", "created_at")
    list_filter = ("tenant", "property", "channel", "status", "currency", "check_in", "check_out")
    search_fields = ("id", "guest__email", "guest__first_name", "guest__last_name", "source_ref", "idempotency_key")
    autocomplete_fields = ("tenant", "property", "guest")
    inlines = [BookingNightInline]

@admin.register(Hold)
class HoldAdmin(admin.ModelAdmin):
    list_display = ("room_type", "property", "tenant", "date", "quantity", "expires_at", "idempotency_key")
    list_filter = ("tenant", "property", "room_type", "date")
    search_fields = ("idempotency_key",)
    autocomplete_fields = ("tenant", "property", "room_type")

@admin.register(ChannelMapping)
class ChannelMappingAdmin(admin.ModelAdmin):
    list_display = ("ota", "ota_hotel_id", "ota_room_code", "ota_rate_code", "room_type", "rate_plan", "tenant")
    list_filter = ("tenant", "ota")
    search_fields = ("ota_hotel_id", "ota_room_code", "ota_rate_code")
    autocomplete_fields = ("tenant", "room_type", "rate_plan")

@admin.register(ChannelReservation)
class ChannelReservationAdmin(admin.ModelAdmin):
    list_display = ("ota", "ota_reservation_id", "booking", "tenant", "created_at")
    list_filter = ("tenant", "ota")
    search_fields = ("ota_reservation_id",)
    autocomplete_fields = ("tenant", "booking")
