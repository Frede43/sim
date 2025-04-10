from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
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

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_view(request):
    print("Données reçues:", request.data)  # Debug log
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        
        print(f"Tentative de connexion pour l'email: {email}")  # Debug log
        
        # Essayons d'abord de trouver l'utilisateur
        try:
            user = User.objects.get(email=email)
            print(f"Utilisateur trouvé: {user.email}, {user.username}")  # Debug log
            
            # Tentative d'authentification
            authenticated_user = authenticate(request, username=user.username, password=password)
            print(f"Résultat de l'authentification: {authenticated_user}")  # Debug log
            
            if authenticated_user:
                refresh = RefreshToken.for_user(authenticated_user)
                user_serializer = UserSerializer(authenticated_user)
                
                return Response({
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                    'user': user_serializer.data
                })
            else:
                print("Échec de l'authentification: mot de passe incorrect")  # Debug log
                return Response(
                    {'detail': 'Mot de passe incorrect'}, 
                    status=status.HTTP_401_UNAUTHORIZED
                )
        except User.DoesNotExist:
            print(f"Aucun utilisateur trouvé avec l'email: {email}")  # Debug log
            return Response(
                {'detail': 'Aucun utilisateur trouvé avec cet email'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
    else:
        print("Erreurs de validation:", serializer.errors)  # Debug log
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
                'user': serializer.data,
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

# Permissions personnalisées
class IsFarmer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'farmer'

class IsCooperative(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'cooperative'

class IsGovernment(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'government'

class IsNGO(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'ngo'

class IsFinancial(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'financial'

class IsBuyer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'buyer'

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
    filterset_fields = ['seller_type', 'management_type', 'category', 'region']

    def get_queryset(self):
        queryset = Product.objects.all()
        seller_type = self.request.query_params.get('seller_type', None)
        management_type = self.request.query_params.get('management_type', None)
        category = self.request.query_params.get('category', None)
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        search = self.request.query_params.get('search', None)

        if seller_type:
            queryset = queryset.filter(seller_type=seller_type)
        if management_type:
            queryset = queryset.filter(management_type=management_type)
        if category:
            queryset = queryset.filter(category=category)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(description__icontains=search) |
                Q(seller__username__icontains=search) |
                Q(cooperative__name__icontains=search)
            )

        return queryset

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductSerializer

    def perform_create(self, serializer):
        # Définir automatiquement le type de vendeur en fonction du rôle de l'utilisateur
        seller_type = 'cooperative' if self.request.user.role == 'cooperative' else 'farmer'
        serializer.save(
            seller=self.request.user,
            seller_type=seller_type
        )

class CooperativeProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(seller_type='cooperative')
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated, IsCooperative]
    
    def get_queryset(self):
        return Product.objects.filter(
            cooperative_id=self.request.user.managed_cooperative.id
        )
    
    def perform_create(self, serializer):
        serializer.save(
            seller=self.request.user,
            seller_type='cooperative',
            cooperative=self.request.user.managed_cooperative,
            management_type='collective'
        )

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['id', 'buyer__username', 'status']
    ordering_fields = ['created_at', 'total_amount']

    def get_permissions(self):
        if self.action in ['create']:
            return [permissions.IsAuthenticated() & IsBuyer()]
        if self.action in ['update', 'partial_update', 'destroy']:
            # Seuls les acheteurs peuvent modifier leurs propres commandes
            return [permissions.IsAuthenticated() & IsBuyer()]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        queryset = Order.objects.all()
        
        # Si l'utilisateur est un acheteur, montrer seulement ses commandes
        if self.request.user.role == 'buyer':
            queryset = queryset.filter(buyer=self.request.user)
        
        # Si l'utilisateur est un agriculteur, montrer les commandes de ses produits
        elif self.request.user.role == 'farmer':
            # Rechercher des commandes contenant les produits de l'agriculteur
            products = Product.objects.filter(farmer=self.request.user)
            order_items = OrderItem.objects.filter(product__in=products)
            order_ids = order_items.values_list('order_id', flat=True)
            queryset = queryset.filter(id__in=order_ids)
        
        # Filtrage des commandes
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status)
        
        return queryset
    
    def perform_create(self, serializer):
        # Assigne automatiquement l'acheteur actuel
        serializer.save(buyer=self.request.user)
    
    @action(detail=False, methods=['get'])
    def my_orders(self, request):
        if request.user.role == 'buyer':
            orders = Order.objects.filter(buyer=request.user)
            serializer = self.get_serializer(orders, many=True)
            return Response(serializer.data)
        return Response({"detail": "Vous n'êtes pas autorisé à effectuer cette action."}, 
                        status=status.HTTP_403_FORBIDDEN)

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['buyer_name', 'product__name', 'status']
    ordering_fields = ['sale_date', 'amount']

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            # Seuls les agriculteurs et les coopératives peuvent gérer les ventes
            return [permissions.IsAuthenticated() & (IsFarmer() | IsCooperative())]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        queryset = Sale.objects.all()
        
        # Si l'utilisateur est un agriculteur, montrer seulement ses ventes
        if self.request.user.role == 'farmer':
            queryset = queryset.filter(farmer=self.request.user)
        
        # Filtrage des ventes
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status)
        
        return queryset
    
    def perform_create(self, serializer):
        # Assigne automatiquement l'agriculteur actuel
        serializer.save(farmer=self.request.user)
    
    @action(detail=False, methods=['get'])
    def my_sales(self, request):
        if request.user.role in ['farmer', 'cooperative']:
            sales = Sale.objects.filter(farmer=request.user)
            serializer = self.get_serializer(sales, many=True)
            return Response(serializer.data)
        return Response({"detail": "Vous n'êtes pas autorisé à effectuer cette action."}, 
                        status=status.HTTP_403_FORBIDDEN)

class CooperativeViewSet(viewsets.ModelViewSet):
    queryset = Cooperative.objects.all()
    serializer_class = CooperativeDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'region', 'description']
    ordering_fields = ['name', 'founded_date']

    def get_serializer_class(self):
        if self.action == 'list':
            return CooperativeBasicSerializer
        return CooperativeDetailSerializer

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated() & (IsCooperative() | permissions.IsAdminUser())]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        if self.request.user.role != 'cooperative':
            raise PermissionDenied("Seules les coopératives peuvent créer une coopérative")
        serializer.save(manager=self.request.user)

    @action(detail=False, methods=['get'])
    def my_cooperative(self, request):
        try:
            cooperative = self.queryset.get(manager=request.user)
            serializer = self.get_serializer(cooperative)
            return Response(serializer.data)
        except Cooperative.DoesNotExist:
            return Response(
                {"detail": "Vous ne gérez aucune coopérative"},
                status=status.HTTP_404_NOT_FOUND
            )

class CooperativeMembershipViewSet(viewsets.ModelViewSet):
    queryset = CooperativeMembership.objects.all()
    serializer_class = CooperativeMembershipSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['create']:
            # Les agriculteurs peuvent demander à rejoindre
            return [permissions.IsAuthenticated() & IsFarmer()]
        if self.action in ['update', 'partial_update', 'destroy']:
            # Seuls les coopératives ou les agriculteurs concernés peuvent modifier
            return [permissions.IsAuthenticated() & (IsCooperative() | IsFarmer())]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        queryset = CooperativeMembership.objects.all()
        
        # Si l'utilisateur est un agriculteur, montrer seulement ses adhésions
        if self.request.user.role == 'farmer':
            queryset = queryset.filter(farmer=self.request.user)
        
        # Si l'utilisateur est une coopérative, montrer seulement ses membres
        elif self.request.user.role == 'cooperative':
            # Trouver la coopérative gérée par cet utilisateur
            cooperative = Cooperative.objects.filter(manager=self.request.user).first()
            if cooperative:
                queryset = queryset.filter(cooperative=cooperative)
        
        return queryset

    @action(detail=False, methods=['get'])
    def me(self, request):
        """Récupérer les adhésions de l'utilisateur connecté"""
        memberships = self.get_queryset().filter(farmer=request.user)
        serializer = self.get_serializer(memberships, many=True)
        return Response(serializer.data)

class SubsidyViewSet(viewsets.ModelViewSet):
    queryset = Subsidy.objects.all()
    serializer_class = SubsidySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'subsidy_type']
    ordering_fields = ['start_date', 'end_date', 'amount']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            # Seuls le gouvernement et les ONGs peuvent gérer les subventions
            return [permissions.IsAuthenticated() & (IsGovernment() | IsNGO())]
        return [permissions.IsAdminUser()]
    
    def get_queryset(self):
        queryset = Subsidy.objects.all()
        
        # Filtrage des subventions
        subsidy_type = self.request.query_params.get('subsidy_type', None)
        if subsidy_type:
            queryset = queryset.filter(subsidy_type=subsidy_type)
        
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status)
        
        return queryset
    
    def perform_create(self, serializer):
        # Assigne automatiquement le fournisseur actuel
        serializer.save(provider=self.request.user)

class SubsidyApplicationViewSet(viewsets.ModelViewSet):
    queryset = SubsidyApplication.objects.all()
    serializer_class = SubsidyApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['create']:
            # Les agriculteurs et coopératives peuvent demander des subventions
            return [permissions.IsAuthenticated() & (IsFarmer() | IsCooperative())]
        if self.action in ['update', 'partial_update']:
            # Les fournisseurs de subventions peuvent mettre à jour les demandes
            return [permissions.IsAuthenticated() & (IsGovernment() | IsNGO())]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        queryset = SubsidyApplication.objects.all()
        
        # Si l'utilisateur est un agriculteur, montrer seulement ses demandes
        if self.request.user.role in ['farmer', 'cooperative']:
            queryset = queryset.filter(applicant=self.request.user)
        
        # Si l'utilisateur est un fournisseur de subventions, montrer les demandes pour ses subventions
        elif self.request.user.role in ['government', 'ngo']:
            subsidies = Subsidy.objects.filter(provider=self.request.user)
            queryset = queryset.filter(subsidy__in=subsidies)
        
        # Filtrage des demandes
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status)
        
        return queryset
    
    def perform_create(self, serializer):
        # Assigne automatiquement le demandeur actuel
        serializer.save(applicant=self.request.user)

class MarketPriceViewSet(viewsets.ModelViewSet):
    queryset = MarketPrice.objects.all()
    serializer_class = MarketPriceSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['product_name', 'region']
    ordering_fields = ['date', 'price']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            # Seuls le gouvernement et les administrateurs peuvent gérer les prix du marché
            return [permissions.IsAuthenticated() & (IsGovernment() | permissions.IsAdminUser())]
        return [permissions.IsAdminUser()]
    
    def get_queryset(self):
        queryset = MarketPrice.objects.all()
        
        # Filtrage des prix
        product = self.request.query_params.get('product', None)
        if product:
            queryset = queryset.filter(product_name__icontains=product)
        
        region = self.request.query_params.get('region', None)
        if region:
            queryset = queryset.filter(region=region)
        
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category__id=category)
        
        return queryset

class LoanViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['borrower__username', 'status']
    ordering_fields = ['application_date', 'amount']

    def get_permissions(self):
        if self.action in ['create']:
            # Les agriculteurs et coopératives peuvent demander des prêts
            return [permissions.IsAuthenticated() & (IsFarmer() | IsCooperative())]
        if self.action in ['update', 'partial_update']:
            # Les institutions financières peuvent mettre à jour les prêts
            return [permissions.IsAuthenticated() & (IsFinancial() | permissions.IsAdminUser())]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        queryset = Loan.objects.all()
        
        # Si l'utilisateur est un emprunteur, montrer seulement ses prêts
        if self.request.user.role in ['farmer', 'cooperative']:
            queryset = queryset.filter(borrower=self.request.user)
        
        # Si l'utilisateur est un prêteur, montrer seulement les prêts qu'il a accordés
        elif self.request.user.role == 'financial':
            queryset = queryset.filter(lender=self.request.user)
        
        # Filtrage des prêts
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status)
        
        return queryset
    
    def perform_create(self, serializer):
        # Assigne automatiquement l'emprunteur actuel
        serializer.save(borrower=self.request.user)

class NGOProjectViewSet(viewsets.ModelViewSet):
    queryset = NGOProject.objects.all()
    serializer_class = NGOProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['start_date', 'budget']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            # Seuls les ONGs peuvent gérer leurs projets
            return [permissions.IsAuthenticated() & IsNGO()]
        return [permissions.IsAdminUser()]
    
    def get_queryset(self):
        queryset = NGOProject.objects.all()
        
        # Si l'utilisateur est une ONG, montrer seulement ses projets
        if self.request.user.role == 'ngo':
            queryset = queryset.filter(ngo=self.request.user)
        
        # Filtrage des projets
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status)
        
        location = self.request.query_params.get('location', None)
        if location:
            queryset = queryset.filter(location__icontains=location)
        
        return queryset
    
    def perform_create(self, serializer):
        # Assigne automatiquement l'ONG actuelle
        serializer.save(ngo=self.request.user)

class TrainingViewSet(viewsets.ModelViewSet):
    queryset = Training.objects.all()
    serializer_class = TrainingSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['start_date']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            # Les coopératives, ONGs et gouvernement peuvent créer des formations
            return [permissions.IsAuthenticated() & (IsCooperative() | IsNGO() | IsGovernment())]
        return [permissions.IsAdminUser()]
    
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
