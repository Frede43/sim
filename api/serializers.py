from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import (
    Category, Product, ProductImage, Order, OrderItem, 
    Sale, Cooperative, CooperativeMembership, Subsidy, 
    SubsidyApplication, MarketPrice, Loan, LoanRepayment,
    NGOProject, Training, TrainingParticipant, Alert, User
)

User = get_user_model()

class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'location')

class UserDetailSerializer(UserBasicSerializer):
    class Meta(UserBasicSerializer.Meta):
        fields = UserBasicSerializer.Meta.fields + ('first_name', 'last_name', 'phone', 'role', 'avatar', 'farm_size', 'cooperative_name', 'registration_number', 'institution_name')

class CooperativeBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cooperative
        fields = ('id', 'name', 'description', 'region')

class CooperativeDetailSerializer(CooperativeBasicSerializer):
    class Meta(CooperativeBasicSerializer.Meta):
        fields = CooperativeBasicSerializer.Meta.fields + ('manager', 'members')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'description')

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'is_primary']

class ProductSerializer(serializers.ModelSerializer):
    seller = UserBasicSerializer(read_only=True)
    cooperative = CooperativeBasicSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True,
        required=False
    )
    images = ProductImageSerializer(many=True, read_only=True)
    seller_type = serializers.ChoiceField(choices=Product.SELLER_TYPE_CHOICES, required=False)
    management_type = serializers.ChoiceField(choices=Product.MANAGEMENT_TYPE_CHOICES, required=False)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'quantity', 'unit',
            'seller', 'seller_type', 'cooperative', 'category', 'category_id',
            'quality', 'status', 'region', 'management_type', 'minimum_order',
            'certification', 'harvest_date', 'expiry_date', 'created_at',
            'updated_at', 'images'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'seller', 'cooperative']

    def validate(self, attrs):
        if attrs.get('management_type') == 'collective' and not self.context['request'].user.role == 'cooperative':
            raise serializers.ValidationError("Seules les coopératives peuvent créer des produits en gestion collective")
        return attrs

class ProductDetailSerializer(ProductSerializer):
    farmer_name = serializers.SerializerMethodField()
    category_name = serializers.SerializerMethodField()

    class Meta(ProductSerializer.Meta):
        fields = ProductSerializer.Meta.fields + ['farmer_name', 'category_name']

    def get_farmer_name(self, obj):
        return f"{obj.seller.first_name} {obj.seller.last_name}" if obj.seller else None

    def get_category_name(self, obj):
        return obj.category.name if obj.category else None

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'

class SubsidySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subsidy
        fields = '__all__'

class SubsidyApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubsidyApplication
        fields = '__all__'

class MarketPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketPrice
        fields = '__all__'

class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = '__all__'

class LoanRepaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanRepayment
        fields = '__all__'

class NGOProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = NGOProject
        fields = '__all__'

class TrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Training
        fields = '__all__'

class TrainingParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingParticipant
        fields = '__all__'

class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = '__all__'

class CooperativeMembershipSerializer(serializers.ModelSerializer):
    farmer = UserBasicSerializer(read_only=True)
    cooperative = CooperativeBasicSerializer(read_only=True)

    class Meta:
        model = CooperativeMembership
        fields = ('id', 'farmer', 'cooperative', 'joined_date', 'status', 'notes')

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password', 'password2', 'first_name', 'last_name', 
                 'phone', 'role', 'avatar', 'farm_size', 'location', 'cooperative_name', 
                 'registration_number', 'institution_name']
        read_only_fields = ['id']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'role': {'required': True},
            'email': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Les mots de passe ne correspondent pas"})
        attrs.pop('password2')
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data.get('username', validated_data['email']),
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            role=validated_data['role'],
            phone=validated_data.get('phone', ''),
        )

        # Champs spécifiques au rôle
        if validated_data['role'] == 'farmer':
            user.farm_size = validated_data.get('farm_size')
            user.location = validated_data.get('location')
        elif validated_data['role'] == 'cooperative':
            user.cooperative_name = validated_data.get('cooperative_name')
            user.registration_number = validated_data.get('registration_number')
        elif validated_data['role'] in ['financial', 'government', 'ngo']:
            user.institution_name = validated_data.get('institution_name')

        if 'avatar' in validated_data:
            user.avatar = validated_data['avatar']

        user.save()
        return user
