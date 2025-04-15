from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Sum
from django.utils import timezone
from datetime import timedelta
from .permissions import IsFarmer
from .models import Sale, Order, SubsidyApplication, MarketPrice, Subsidy
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import ValidationError, PermissionDenied
from django.db.models import Q

from .models import (
    Category, Product, ProductImage, Order, OrderItem, 
    Sale, Cooperative, CooperativeMembership, Subsidy, 
    SubsidyApplication, MarketPrice, Loan, LoanRepayment,
    NGOProject, Training, TrainingParticipant, Alert
)
from .serializers import (
    UserSerializer, UserBasicSerializer, UserDetailSerializer,
    LoginSerializer, CategorySerializer, ProductSerializer, 
    ProductImageSerializer, OrderSerializer, OrderItemSerializer,
    SaleSerializer, CooperativeBasicSerializer, CooperativeDetailSerializer,
    CooperativeMembershipSerializer, SubsidySerializer, SubsidyApplicationSerializer,
    MarketPriceSerializer, LoanSerializer, LoanRepaymentSerializer,
    NGOProjectSerializer, TrainingSerializer, TrainingParticipantSerializer,
    AlertSerializer, ProductDetailSerializer
)

User = get_user_model()

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated, IsFarmer])
def farmer_dashboard(request):
    try:
        user = request.user
        today = timezone.now()
        start_of_month = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        
        # Revenus du mois
        monthly_sales = Sale.objects.filter(
            seller=user,
            created_at__gte=start_of_month,
            created_at__lte=today
        ).aggregate(total=Sum('amount'))
        
        # Commandes actives
        active_orders = Order.objects.filter(
            orderitem__product__seller=user,
            status__in=['pending', 'processing']
        )
        
        # Subventions disponibles
        available_subsidies = SubsidyApplication.objects.filter(
            farmer=user,
            status='approved',
            expiry_date__gte=today
        ).aggregate(total=Sum('amount'))
        
        # Ventes récentes
        recent_sales = Sale.objects.filter(
            seller=user
        ).order_by('-created_at')[:5]
        
        # Prix du marché
        market_prices = MarketPrice.objects.all().order_by('-updated_at')[:4]
        
        # Opportunités de financement
        funding_opportunities = Subsidy.objects.filter(
            application_deadline__gte=today
        ).order_by('application_deadline')[:2]
        
        # Préparation de la réponse
        response_data = {
            'monthlyRevenue': monthly_sales['total'] or 0,
            'activeOrders': {
                'total': active_orders.count(),
                'pendingDelivery': active_orders.filter(status='processing').count()
            },
            'availableSubsidies': {
                'amount': available_subsidies['total'] or 0,
                'expiryDate': next(
                    (s.expiry_date.strftime('%d/%m/%Y') 
                     for s in SubsidyApplication.objects.filter(
                         farmer=user, 
                         status='approved', 
                         expiry_date__gte=today
                     ).order_by('expiry_date')
                    ), 
                    None
                )
            },
            'recentSales': [
                {
                    'id': sale.id,
                    'product': sale.product.name,
                    'quantity': sale.quantity,
                    'unit': sale.product.unit,
                    'date': sale.created_at.strftime('%d/%m/%Y'),
                    'amount': sale.amount,
                    'status': sale.get_status_display()
                } for sale in recent_sales
            ],
            'marketPrices': [
                {
                    'product': price.product.name,
                    'price': price.price,
                    'priceChange': price.price_change
                } for price in market_prices
            ],
            'fundingOpportunities': [
                {
                    'title': subsidy.name,
                    'provider': subsidy.provider,
                    'amount': subsidy.amount,
                    'deadline': subsidy.application_deadline.strftime('%d/%m/%Y')
                } for subsidy in funding_opportunities
            ]
        }
        
        return Response(response_data)
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_view(request):
    print('\nDonnées de connexion reçues:', request.data)
    serializer = LoginSerializer(data=request.data)
    
    if not serializer.is_valid():
        print('Erreurs de validation:', serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    username = serializer.validated_data['username']
    password = serializer.validated_data['password']
    print(f'Tentative de connexion avec username: {username}')
    
    # Vérifier si l'utilisateur existe
    UserModel = get_user_model()
    try:
        user_db = UserModel.objects.get(email=username)
        print(f'Utilisateur trouvé avec email: {user_db.email}')
    except UserModel.DoesNotExist:
        try:
            user_db = UserModel.objects.get(username=username)
            print(f'Utilisateur trouvé avec username: {user_db.username}')
        except UserModel.DoesNotExist:
            print('Aucun utilisateur trouvé')
            return Response(
                {'error': 'Utilisateur non trouvé'},
                status=status.HTTP_401_UNAUTHORIZED
            )
    
    # Tenter l'authentification
    user = authenticate(request, username=username, password=password)
    print(f'Résultat de l\'authentification: {user}')
    
    if user is not None:
        refresh = RefreshToken.for_user(user)
        response_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        }
        print('Connexion réussie, données renvoyées:', response_data)
        return Response(response_data)
    else:
        print('Échec de l\'authentification')
        return Response(
            {'error': 'Mot de passe incorrect'},
            status=status.HTTP_401_UNAUTHORIZED
        )

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': serializer.data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'])
    def me(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

# Permissions personnalisées
class IsFarmer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'farmer'

class IsCooperative(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'cooperative'

class IsGovernment(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'government'

class IsNGO(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'ngo'

class IsFinancial(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'financial'

class IsBuyer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'buyer'

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['seller_type', 'management_type', 'category', 'region']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'price', 'created_at']

    def get_queryset(self):
        queryset = Product.objects.all()
        
        # Filtrage par prix
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        
        if min_price is not None:
            queryset = queryset.filter(price__gte=min_price)
        
        if max_price is not None:
            queryset = queryset.filter(price__lte=max_price)
        
        # Filtrage par disponibilité
        available = self.request.query_params.get('available', None)
        if available is not None:
            queryset = queryset.filter(quantity__gt=0)
        
        return queryset

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductSerializer

    def perform_create(self, serializer):
        if self.request.user.role == 'farmer':
            serializer.save(seller=self.request.user, seller_type='farmer')
        elif self.request.user.role == 'cooperative':
            serializer.save(seller=self.request.user, seller_type='cooperative')
        else:
            raise PermissionDenied('Only farmers and cooperatives can create products')

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['id', 'buyer__username', 'status']
    ordering_fields = ['created_at', 'total_amount']

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.IsAuthenticated() & IsBuyer()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'buyer':
            return Order.objects.filter(buyer=user)
        elif user.role == 'farmer':
            return Order.objects.filter(orderitem__product__seller=user)
        elif user.role == 'cooperative':
            return Order.objects.filter(orderitem__product__seller=user)
        return Order.objects.none()

    def perform_create(self, serializer):
        serializer.save(buyer=self.request.user)

    @action(detail=False, methods=['GET'])
    def my_orders(self, request):
        orders = self.get_queryset()
        serializer = self.get_serializer(orders, many=True)
        return Response(serializer.data)

class CooperativeProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(seller_type='cooperative')
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated, IsCooperative]

    def get_queryset(self):
        return Product.objects.filter(seller=self.request.user)

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user, seller_type='cooperative')

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['product__name', 'seller__username', 'buyer__username']
    ordering_fields = ['created_at', 'amount']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'buyer':
            return Sale.objects.filter(buyer=user)
        elif user.role in ['farmer', 'cooperative']:
            return Sale.objects.filter(seller=user)
        return Sale.objects.none()

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

class CooperativeViewSet(viewsets.ModelViewSet):
    queryset = Cooperative.objects.all()
    serializer_class = CooperativeDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'region']
    ordering_fields = ['name', 'created_at']

    def get_serializer_class(self):
        if self.action == 'list':
            return CooperativeBasicSerializer
        return CooperativeDetailSerializer

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated() & IsCooperative()]
        return [permissions.IsAuthenticated()]

class CooperativeMembershipViewSet(viewsets.ModelViewSet):
    queryset = CooperativeMembership.objects.all()
    serializer_class = CooperativeMembershipSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'farmer':
            return CooperativeMembership.objects.filter(farmer=user)
        elif user.role == 'cooperative':
            return CooperativeMembership.objects.filter(cooperative=user)
        return CooperativeMembership.objects.none()

    def perform_create(self, serializer):
        if self.request.user.role == 'farmer':
            serializer.save(farmer=self.request.user)
        else:
            raise PermissionDenied('Only farmers can request membership')

class SubsidyViewSet(viewsets.ModelViewSet):
    queryset = Subsidy.objects.all()
    serializer_class = SubsidySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'provider', 'description']
    ordering_fields = ['application_deadline', 'amount']

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated() & (IsGovernment() | IsNGO())]
        return [permissions.IsAuthenticated()]

class SubsidyApplicationViewSet(viewsets.ModelViewSet):
    queryset = SubsidyApplication.objects.all()
    serializer_class = SubsidyApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['subsidy__name', 'farmer__username', 'status']
    ordering_fields = ['created_at', 'expiry_date']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'farmer':
            return SubsidyApplication.objects.filter(farmer=user)
        elif user.role in ['government', 'ngo']:
            return SubsidyApplication.objects.filter(subsidy__provider=user)
        return SubsidyApplication.objects.none()

    def perform_create(self, serializer):
        if self.request.user.role == 'farmer':
            serializer.save(farmer=self.request.user)
        else:
            raise PermissionDenied('Only farmers can apply for subsidies')

class MarketPriceViewSet(viewsets.ModelViewSet):
    queryset = MarketPrice.objects.all()
    serializer_class = MarketPriceSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['product__name']
    ordering_fields = ['updated_at', 'price']

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated() & IsGovernment()]
        return [permissions.IsAuthenticated()]

class LoanViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['borrower__username', 'status']
    ordering_fields = ['created_at', 'amount']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'farmer':
            return Loan.objects.filter(borrower=user)
        elif user.role == 'financial':
            return Loan.objects.filter(lender=user)
        return Loan.objects.none()

    def perform_create(self, serializer):
        if self.request.user.role == 'financial':
            serializer.save(lender=self.request.user)
        else:
            raise PermissionDenied('Only financial institutions can create loans')

class LoanRepaymentViewSet(viewsets.ModelViewSet):
    queryset = LoanRepayment.objects.all()
    serializer_class = LoanRepaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['loan__borrower__username']
    ordering_fields = ['payment_date', 'amount']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'farmer':
            return LoanRepayment.objects.filter(loan__borrower=user)
        elif user.role == 'financial':
            return LoanRepayment.objects.filter(loan__lender=user)
        return LoanRepayment.objects.none()

    def perform_create(self, serializer):
        if self.request.user.role == 'farmer':
            serializer.save()
        else:
            raise PermissionDenied('Only farmers can make loan repayments')

class NGOProjectViewSet(viewsets.ModelViewSet):
    queryset = NGOProject.objects.all()
    serializer_class = NGOProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'region']
    ordering_fields = ['start_date', 'end_date', 'budget']

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated() & IsNGO()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        if self.request.user.role == 'ngo':
            return NGOProject.objects.filter(ngo=self.request.user)
        return NGOProject.objects.all()

    def perform_create(self, serializer):
        serializer.save(ngo=self.request.user)

class TrainingViewSet(viewsets.ModelViewSet):
    queryset = Training.objects.all()
    serializer_class = TrainingSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['start_date', 'end_date']

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated() & (IsCooperative() | IsNGO() | IsGovernment())]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        queryset = Training.objects.all()
        
        # Si l'utilisateur est un organisateur potentiel, montrer seulement ses formations
        if self.request.user.role in ['cooperative', 'ngo', 'government']:
            queryset = queryset.filter(organizer=self.request.user)
        
        # Filtrage des formations
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status)
        
        location = self.request.query_params.get('location', None)
        if location:
            queryset = queryset.filter(location__icontains=location)
        
        return queryset

    def perform_create(self, serializer):
        # Assigne automatiquement l'organisateur actuel
        serializer.save(organizer=self.request.user)

class TrainingParticipantViewSet(viewsets.ModelViewSet):
    queryset = TrainingParticipant.objects.all()
    serializer_class = TrainingParticipantSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['create']:
            # Les agriculteurs peuvent s'inscrire aux formations
            return [permissions.IsAuthenticated() & IsFarmer()]
        if self.action in ['update', 'partial_update', 'destroy']:
            # Les organisateurs et les participants peuvent modifier les inscriptions
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        queryset = TrainingParticipant.objects.all()
        
        # Si l'utilisateur est un agriculteur, montrer seulement ses inscriptions
        if self.request.user.role == 'farmer':
            queryset = queryset.filter(participant=self.request.user)
        
        # Si l'utilisateur est un organisateur, montrer les inscriptions à ses formations
        elif self.request.user.role in ['cooperative', 'ngo', 'government']:
            trainings = Training.objects.filter(organizer=self.request.user)
            queryset = queryset.filter(training__in=trainings)
        
        return queryset
    
    def perform_create(self, serializer):
        # Assigne automatiquement le participant actuel
        serializer.save(participant=self.request.user)

class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'region', 'alert_type']
    ordering_fields = ['created_at', 'severity']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            # Seuls le gouvernement, les ONGs et les administrateurs peuvent gérer les alertes
            return [permissions.IsAuthenticated() & (IsGovernment() | IsNGO() | permissions.IsAdminUser())]
        return [permissions.IsAdminUser()]
    
    def get_queryset(self):
        queryset = Alert.objects.all()
        
        # Filtrage des alertes
        alert_type = self.request.query_params.get('alert_type', None)
        if alert_type:
            queryset = queryset.filter(alert_type=alert_type)
        
        region = self.request.query_params.get('region', None)
        if region:
            queryset = queryset.filter(region=region)
        
        severity = self.request.query_params.get('severity', None)
        if severity:
            queryset = queryset.filter(severity=severity)
        
        return queryset
    
    def perform_create(self, serializer):
        # Assigne automatiquement le créateur actuel
        serializer.save(created_by=self.request.user)
