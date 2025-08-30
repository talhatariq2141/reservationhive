from django.contrib import admin
from .models import Property

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ("name", "tenant", "city", "country", "timezone", "currency", "created_at")
    search_fields = ("name", "city", "country", "tenant__name")
    list_filter = ("tenant", "city", "country")
    autocomplete_fields = ("tenant",)
