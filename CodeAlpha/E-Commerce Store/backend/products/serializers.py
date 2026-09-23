"""Product serializers for VogueStore API."""
from rest_framework import serializers
from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.IntegerField(source="products.count", read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "description", "image", "product_count", "created_at"]


class ProductListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Product
        fields = [
            "id", "name", "slug", "price", "category_name",
            "image", "rating", "reviews_count", "in_stock", "featured", "created_at"
        ]


class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            "id", "name", "slug", "description", "price", "category",
            "image", "rating", "reviews_count", "in_stock", "featured",
            "created_at", "updated_at"
        ]
