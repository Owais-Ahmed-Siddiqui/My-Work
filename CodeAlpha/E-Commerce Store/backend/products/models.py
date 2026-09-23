"""Product models for VogueStore."""
from django.db import models


class Category(models.Model):
    """Product category."""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    description = models.TextField(blank=True)
    image = models.URLField(blank=True, help_text="Category image URL")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Product(models.Model):
    """Individual product listing."""
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="products"
    )
    image = models.URLField(help_text="Product image URL")
    rating = models.FloatField(default=0.0)
    reviews_count = models.PositiveIntegerField(default=0)
    in_stock = models.BooleanField(default=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


# ─── Admin Registration ───
from django.contrib import admin

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "created_at"]
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ["name"]


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "price", "rating", "in_stock", "featured"]
    list_filter = ["category", "in_stock", "featured"]
    search_fields = ["name", "description"]
    prepopulated_fields = {"slug": ("name",)}
    list_editable = ["price", "in_stock", "featured"]
