from django.contrib import admin
from .models import Amenity, RoomType, Policy, RatePlan, Inventory, Price

@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
    list_display = ("name", "tenant", "created_at")
    search_fields = ("name",)
    autocomplete_fields = ("tenant",)

@admin.register(RoomType)
class RoomTypeAdmin(admin.ModelAdmin):
    list_display = ("code", "name", "tenant", "property", "max_guests", "created_at")
    search_fields = ("code", "name", "property__name", "tenant__name")
    list_filter = ("tenant", "property")
    autocomplete_fields = ("tenant", "property", "amenities")

@admin.register(Policy)
class PolicyAdmin(admin.ModelAdmin):
    list_display = ("name", "tenant")
    search_fields = ("name",)
    autocomplete_fields = ("tenant",)

@admin.register(RatePlan)
class RatePlanAdmin(admin.ModelAdmin):
    list_display = ("name", "room_type", "tenant", "refundable", "los_min", "los_max")
    list_filter = ("tenant", "room_type", "refundable")
    search_fields = ("name", "room_type__name")
    autocomplete_fields = ("tenant", "room_type", "policy")

@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ("date", "room_type", "property", "tenant", "allotment", "closed")
    list_filter = ("tenant", "property", "room_type", "closed", "date")
    search_fields = ("room_type__name", "property__name")
    autocomplete_fields = ("tenant", "property", "room_type")

@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    list_display = ("date", "rate_plan", "property", "tenant", "amount", "currency")
    list_filter = ("tenant", "property", "rate_plan", "currency", "date")
    search_fields = ("rate_plan__name", "property__name")
    autocomplete_fields = ("tenant", "property", "rate_plan")
