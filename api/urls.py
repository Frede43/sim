from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'cooperative-products', views.CooperativeProductViewSet, basename='cooperative-products')
router.register(r'orders', views.OrderViewSet)
router.register(r'sales', views.SaleViewSet)
router.register(r'cooperatives', views.CooperativeViewSet)
router.register(r'cooperative-memberships', views.CooperativeMembershipViewSet)
router.register(r'subsidies', views.SubsidyViewSet)
router.register(r'subsidy-applications', views.SubsidyApplicationViewSet)
router.register(r'market-prices', views.MarketPriceViewSet)
router.register(r'loans', views.LoanViewSet)
router.register(r'ngo-projects', views.NGOProjectViewSet)
router.register(r'trainings', views.TrainingViewSet)
router.register(r'training-participants', views.TrainingParticipantViewSet)
router.register(r'alerts', views.AlertViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', views.login_view, name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
]
