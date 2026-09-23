"""Product views for VogueStore API."""
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, Category
from .serializers import (
    ProductListSerializer,
    ProductDetailSerializer,
    CategorySerializer,
)


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for browsing and searching products.

    list:       GET /api/products/
    retrieve:   GET /api/products/{id}/
    featured:   GET /api/products/featured/
    search:     GET /api/products/?search=query
    filter:     GET /api/products/?category=Electronics&min_price=10&max_price=500
    sort:       GET /api/products/?ordering=price   (or -price, rating, -created_at)
    """
    queryset = Product.objects.select_related("category").all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "description"]
    filterset_fields = ["category__name", "in_stock", "featured"]
    ordering_fields = ["price", "rating", "created_at"]
    ordering = ["-created_at"]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProductDetailSerializer
        return ProductListSerializer

    @action(detail=False, methods=["get"])
    def featured(self, request):
        """Return featured products only."""
        qs = self.queryset.filter(featured=True)[:8]
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for product categories.

    list:       GET /api/products/categories/
    retrieve:   GET /api/products/categories/{id}/
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
