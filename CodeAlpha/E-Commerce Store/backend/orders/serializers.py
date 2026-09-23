"""Order serializers and views for VogueStore API."""
from rest_framework import serializers, viewsets, status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem


# ─── Serializers ───

class OrderItemSerializer(serializers.ModelSerializer):
    subtotal = serializers.ReadOnlyField()

    class Meta:
        model = OrderItem
        fields = ["id", "product_name", "product_image", "unit_price", "quantity", "subtotal"]


class OrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["id", "status", "total_amount", "created_at"]


class OrderDetailSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id", "status", "total_amount", "shipping_address",
            "phone", "notes", "items", "created_at", "updated_at"
        ]


class CreateOrderSerializer(serializers.Serializer):
    """Serializer for creating a new order from cart items."""
    shipping_address = serializers.CharField()
    phone = serializers.CharField()
    notes = serializers.CharField(required=False, allow_blank=True)
    items = serializers.ListField(
        child=serializers.DictField(),
        help_text="List of {product_name, product_image, unit_price, quantity}"
    )


# ─── Views ───

class OrderListView(generics.ListCreateAPIView):
    """GET /api/orders/  — List user's orders"""
    """POST /api/orders/ — Place a new order"""
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CreateOrderSerializer
        return OrderListSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related("items")

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        items_data = serializer.validated_data.pop("items")
        total = sum(item["unit_price"] * item["quantity"] for item in items_data)

        order = Order.objects.create(
            user=request.user,
            total_amount=total,
            **serializer.validated_data,
        )

        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)

        return Response(
            OrderDetailSerializer(order).data,
            status=status.HTTP_201_CREATED,
        )


class OrderDetailView(generics.RetrieveAPIView):
    """GET /api/orders/{id}/ — View a specific order"""
    serializer_class = OrderDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related("items")
