from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from django.forms import ModelForm
from .models import (
    User, Category, Product, ProductImage, Order, OrderItem, 
    Sale, Cooperative, CooperativeMembership, Subsidy, 
    SubsidyApplication, MarketPrice, Loan, LoanRepayment,
    NGOProject, Training, TrainingParticipant, Alert
)

class CustomUserForm(ModelForm):
    def clean(self):
        cleaned_data = super().clean()
        role = cleaned_data.get('role')
        cooperative_name = cleaned_data.get('cooperative_name')
        registration_number = cleaned_data.get('registration_number')
        farm_size = cleaned_data.get('farm_size')
        location = cleaned_data.get('location')
        institution_name = cleaned_data.get('institution_name')

        if role == 'cooperative':
            if not cooperative_name:
                self.add_error('cooperative_name', 'Ce champ est obligatoire pour les coopératives')
            if not registration_number:
                self.add_error('registration_number', 'Ce champ est obligatoire pour les coopératives')
        elif role == 'farmer':
            if not farm_size:
                self.add_error('farm_size', 'Ce champ est obligatoire pour les agriculteurs')
            if not location:
                self.add_error('location', 'Ce champ est obligatoire pour les agriculteurs')
        elif role in ['government', 'ngo', 'financial']:
            if not institution_name:
                self.add_error('institution_name', 'Ce champ est obligatoire pour les institutions')

        return cleaned_data

    class Meta:
        model = User
        fields = '__all__'

class CustomUserAdmin(UserAdmin):
    form = CustomUserForm
    list_display = ('username', 'email', 'first_name', 'last_name', 'role', 'is_staff', 'get_role_info')
    list_filter = ('role', 'is_staff', 'is_superuser', 'is_active')
    
    def get_role_info(self, obj):
        if obj.role == 'cooperative':
            return f"Coopérative: {obj.cooperative_name} ({obj.registration_number})"
        elif obj.role == 'farmer':
            return f"Agriculteur: {obj.farm_size} ha, {obj.location}"
        elif obj.role in ['government', 'ngo', 'financial']:
            return f"Institution: {obj.institution_name}"
        return "-"
    get_role_info.short_description = 'Informations spécifiques au rôle'

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('username', 'first_name', 'last_name', 'phone', 'avatar')}),
        (_('Role and permissions'), {
            'fields': ('role', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
            'classes': ('wide',)
        }),
        (_('Farmer info'), {
            'fields': ('farm_size', 'location'),
            'classes': ('collapse',),
            'description': 'Ces champs sont requis pour les agriculteurs'
        }),
        (_('Cooperative info'), {
            'fields': ('cooperative_name', 'registration_number'),
            'classes': ('collapse',),
            'description': 'Ces champs sont requis pour les coopératives'
        }),
        (_('Institution info'), {
            'fields': ('institution_name',),
            'classes': ('collapse',),
            'description': 'Ce champ est requis pour les institutions gouvernementales, ONG et financières'
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'role', 'is_staff', 'is_superuser'),
        }),
        (_('Farmer info'), {
            'fields': ('farm_size', 'location'),
            'classes': ('collapse',),
            'description': 'Ces champs sont requis pour les agriculteurs'
        }),
        (_('Cooperative info'), {
            'fields': ('cooperative_name', 'registration_number'),
            'classes': ('collapse',),
            'description': 'Ces champs sont requis pour les coopératives'
        }),
        (_('Institution info'), {
            'fields': ('institution_name',),
            'classes': ('collapse',),
            'description': 'Ce champ est requis pour les institutions gouvernementales, ONG et financières'
        }),
    )
    
    search_fields = ('username', 'first_name', 'last_name', 'email', 'cooperative_name', 'institution_name')
    ordering = ('email',)

    class Media:
        js = ('js/admin/user_form.js',)

admin.site.register(User, CustomUserAdmin)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'seller', 'seller_type', 'price', 'quantity', 'status', 'management_type')
    list_filter = ('seller_type', 'status', 'management_type', 'category')
    search_fields = ('name', 'description', 'seller__username', 'cooperative__name')
    raw_id_fields = ('seller', 'cooperative', 'category')

@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product', 'is_primary')
    list_filter = ('is_primary',)

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'buyer', 'total_amount', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('buyer__username', 'delivery_address', 'notes')
    date_hierarchy = 'created_at'
    inlines = [OrderItemInline]

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('farmer', 'buyer_name', 'product', 'quantity', 'amount', 'status', 'sale_date')
    list_filter = ('status', 'sale_date')
    search_fields = ('farmer__username', 'buyer_name', 'product__name')
    date_hierarchy = 'sale_date'

@admin.register(Cooperative)
class CooperativeAdmin(admin.ModelAdmin):
    list_display = ('name', 'manager', 'region', 'registration_number', 'founded_date')
    list_filter = ('region',)
    search_fields = ('name', 'description', 'manager__username')
    date_hierarchy = 'founded_date'

@admin.register(CooperativeMembership)
class CooperativeMembershipAdmin(admin.ModelAdmin):
    list_display = ('farmer', 'cooperative', 'joined_date', 'status')
    list_filter = ('status', 'joined_date')
    search_fields = ('farmer__username', 'cooperative__name')
    date_hierarchy = 'joined_date'

@admin.register(Subsidy)
class SubsidyAdmin(admin.ModelAdmin):
    list_display = ('name', 'subsidy_type', 'provider', 'amount', 'status', 'start_date', 'end_date')
    list_filter = ('status', 'subsidy_type', 'start_date')
    search_fields = ('name', 'description', 'provider__username')
    date_hierarchy = 'start_date'

@admin.register(SubsidyApplication)
class SubsidyApplicationAdmin(admin.ModelAdmin):
    list_display = ('subsidy', 'applicant', 'application_date', 'status', 'reviewed_by')
    list_filter = ('status', 'application_date')
    search_fields = ('subsidy__name', 'applicant__username', 'notes')
    date_hierarchy = 'application_date'

@admin.register(MarketPrice)
class MarketPriceAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'category', 'region', 'price', 'unit', 'date')
    list_filter = ('region', 'date', 'category')
    search_fields = ('product_name', 'region')
    date_hierarchy = 'date'

@admin.register(Loan)
class LoanAdmin(admin.ModelAdmin):
    list_display = ('borrower', 'lender', 'amount', 'interest_rate', 'term_months', 'status', 'application_date')
    list_filter = ('status', 'application_date')
    search_fields = ('borrower__username', 'lender__username', 'purpose')
    date_hierarchy = 'application_date'

@admin.register(LoanRepayment)
class LoanRepaymentAdmin(admin.ModelAdmin):
    list_display = ('loan', 'amount', 'payment_date')
    search_fields = ('loan__borrower__username', 'notes')
    date_hierarchy = 'payment_date'

@admin.register(NGOProject)
class NGOProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'ngo', 'location', 'budget', 'status', 'start_date', 'end_date')
    list_filter = ('status', 'start_date')
    search_fields = ('title', 'description', 'ngo__username', 'location')
    date_hierarchy = 'start_date'

@admin.register(Training)
class TrainingAdmin(admin.ModelAdmin):
    list_display = ('title', 'organizer', 'location', 'capacity', 'status', 'start_date', 'end_date')
    list_filter = ('status', 'start_date')
    search_fields = ('title', 'description', 'organizer__username', 'location')
    date_hierarchy = 'start_date'

@admin.register(TrainingParticipant)
class TrainingParticipantAdmin(admin.ModelAdmin):
    list_display = ('training', 'participant', 'registration_date', 'attendance_confirmed')
    list_filter = ('attendance_confirmed', 'registration_date')
    search_fields = ('training__title', 'participant__username')
    date_hierarchy = 'registration_date'

@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):
    list_display = ('title', 'alert_type', 'severity', 'region', 'created_by', 'created_at', 'expires_at')
    list_filter = ('alert_type', 'severity', 'region', 'created_at')
    search_fields = ('title', 'description', 'created_by__username', 'region')
    date_hierarchy = 'created_at'
