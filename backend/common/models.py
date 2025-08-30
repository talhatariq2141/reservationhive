# common/models.py
from django.db import models
from django.utils import timezone


class BaseModel(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Tenant(BaseModel):
    """
    Tenant == Vendor account (owner of one or more properties).
    New owner_* fields are nullable/blank to avoid migration prompts on existing data.
    Tighten later once populated.
    """
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=80, unique=True)
    is_active = models.BooleanField(default=True)

    # Vendor (owner) contact details (SAFE during dev; make required later if you want)
    owner_first_name = models.CharField(max_length=120, blank=True, null=True)
    owner_last_name  = models.CharField(max_length=120, blank=True, null=True)
    owner_email      = models.EmailField(blank=True, null=True)
    owner_mobile     = models.CharField(max_length=30, blank=True, null=True)
    owner_whatsapp   = models.CharField(max_length=30, blank=True, null=True)

    def __str__(self) -> str:
        return self.name


class TenantAwareModel(BaseModel):
    tenant = models.ForeignKey(
        Tenant, on_delete=models.PROTECT, related_name="%(class)ss"
    )

    class Meta:
        abstract = True
