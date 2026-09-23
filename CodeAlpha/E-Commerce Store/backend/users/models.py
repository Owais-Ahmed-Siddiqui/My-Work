"""Custom User model for VogueStore."""
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Extended user model with additional profile fields."""
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    avatar = models.URLField(blank=True)
    date_of_birth = models.DateField(null=True, blank=True)

    # MongoDB-compatible metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email or self.username

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()
