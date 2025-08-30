# accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from common.models import Tenant, BaseModel

class User(AbstractUser):
    """
    Custom user with a role and optional tenant.
    - Admin users typically have tenant = NULL (platform-level)
    - Vendor users MUST have a tenant set (row-level scoping)
    """
    class Role(models.TextChoices):
        ADMIN_SUPER = "admin_super", "Admin Super"
        ADMIN_SUPPORT = "admin_support", "Admin Support"
        VENDOR_OWNER = "vendor_owner", "Vendor Owner"
        VENDOR_STAFF = "vendor_staff", "Vendor Staff"

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.VENDOR_STAFF)
    tenant = models.ForeignKey(Tenant, null=True, blank=True, on_delete=models.PROTECT, related_name="users")
    phone = models.CharField(max_length=30, blank=True, default="")

    def is_platform_admin(self) -> bool:
        return self.role in {self.Role.ADMIN_SUPER, self.Role.ADMIN_SUPPORT}

    def is_vendor(self) -> bool:
        return self.role in {self.Role.VENDOR_OWNER, self.Role.VENDOR_STAFF}

    def __str__(self):
        return f"{self.username} ({self.role})"


class UserProfile(BaseModel):
    """
    Optional profile extras (kept separate from auth fields).
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    address = models.TextField(blank=True, default="")
    avatar_url = models.URLField(blank=True, default="")

    def __str__(self):
        return f"Profile of {self.user.username}"
