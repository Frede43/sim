from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    """Modèle utilisateur personnalisé avec des champs supplémentaires"""
    USER_ROLE_CHOICES = (
        ('farmer', 'Agriculteur'),
        ('cooperative', 'Coopérative'),
        ('government', 'Gouvernement'),
        ('ngo', 'ONG'),
        ('financial', 'Institution Financière'),
        ('admin', 'Administrateur'),
        ('buyer', 'Acheteur'),
    )
    
    email = models.EmailField(_('email address'), unique=True)
    phone = models.CharField(max_length=20, blank=True)
    role = models.CharField(max_length=20, choices=USER_ROLE_CHOICES, default='farmer')
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    
    # Champs spécifiques pour agriculteur
    farm_size = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    location = models.CharField(max_length=255, blank=True)
    
    # Champs spécifiques pour coopérative
    cooperative_name = models.CharField(max_length=255, blank=True)
    registration_number = models.CharField(max_length=50, blank=True)
    
    # Champs pour institutions financières
    institution_name = models.CharField(max_length=255, blank=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'
    
    def save(self, *args, **kwargs):
        if not self.username:
            # Générer un username unique basé sur l'email
            base_username = self.email.split('@')[0]
            username = base_username
            counter = 1
            while User.objects.filter(username=username).exists():
                username = f"{base_username}{counter}"
                counter += 1
            self.username = username
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.email

class Category(models.Model):
    """Catégories de produits agricoles"""
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Categories"

class Product(models.Model):
    """Produits agricoles"""
    QUALITY_CHOICES = (
        ('Premium', 'Premium'),
        ('Standard', 'Standard'),
        ('Économique', 'Économique'),
    )
    
    STATUS_CHOICES = (
        ('available', 'Disponible'),
        ('low_stock', 'Stock Faible'),
        ('out_of_stock', 'Rupture de Stock'),
    )

    MANAGEMENT_TYPE_CHOICES = (
        ('individual', 'Individuel'),
        ('collective', 'Collectif'),
    )

    SELLER_TYPE_CHOICES = (
        ('farmer', 'Agriculteur'),
        ('cooperative', 'Coopérative'),
    )
    
    name = models.CharField(max_length=100)
    seller_type = models.CharField(max_length=20, choices=SELLER_TYPE_CHOICES, default='farmer')
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
    cooperative = models.ForeignKey('Cooperative', on_delete=models.SET_NULL, null=True, blank=True, related_name='managed_products')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    price = models.DecimalField(max_digits=12, decimal_places=2)
    unit = models.CharField(max_length=20, default='kg')
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    quality = models.CharField(max_length=20, choices=QUALITY_CHOICES, default='Standard')
    description = models.TextField(blank=True)
    region = models.CharField(max_length=100)
    harvest_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    management_type = models.CharField(max_length=20, choices=MANAGEMENT_TYPE_CHOICES, default='individual')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    minimum_order = models.DecimalField(max_digits=10, decimal_places=2, default=1)
    certification = models.CharField(max_length=100, blank=True)
    expiry_date = models.DateField(null=True, blank=True)
    
    def __str__(self):
        seller_name = self.seller.username
        if self.seller_type == 'cooperative' and self.cooperative:
            seller_name = self.cooperative.name
        return f"{self.name} ({self.quantity} {self.unit}) - {seller_name}"

class ProductImage(models.Model):
    """Images des produits"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/')
    is_primary = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Image pour {self.product.name}"

class Order(models.Model):
    """Commandes des acheteurs"""
    STATUS_CHOICES = (
        ('En attente', 'En attente'),
        ('Confirmé', 'Confirmé'),
        ('Expédié', 'Expédié'),
        ('Livré', 'Livré'),
        ('Annulé', 'Annulé'),
    )
    
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='En attente')
    delivery_address = models.TextField()
    contact_phone = models.CharField(max_length=20)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Commande #{self.id} - {self.buyer.username}"

class OrderItem(models.Model):
    """Éléments des commandes"""
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    unit_price = models.DecimalField(max_digits=12, decimal_places=2)
    
    # Nous gardons les détails du produit au moment de la commande au cas où le produit serait supprimé
    product_name = models.CharField(max_length=100)
    product_description = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.product_name} ({self.quantity}) - Commande #{self.order.id}"
    
    @property
    def total_price(self):
        return self.quantity * self.unit_price

class Sale(models.Model):
    """Ventes des agriculteurs (peut être liée ou non à une commande)"""
    STATUS_CHOICES = (
        ('En attente', 'En attente'),
        ('Payé', 'Payé'),
        ('Annulé', 'Annulé'),
    )
    
    farmer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sales')
    buyer_name = models.CharField(max_length=100)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='En attente')
    sale_date = models.DateField()
    notes = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.product.name if self.product else 'Produit inconnu'} - {self.buyer_name}"

class Cooperative(models.Model):
    """Coopératives agricoles"""
    name = models.CharField(max_length=255)
    description = models.TextField()
    manager = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='managed_cooperative')
    registration_number = models.CharField(max_length=50, unique=True)
    region = models.CharField(max_length=100)
    address = models.TextField()
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    website = models.URLField(blank=True)
    founded_date = models.DateField()
    logo = models.ImageField(upload_to='cooperative_logos/', null=True, blank=True)
    
    def __str__(self):
        return self.name

class CooperativeMembership(models.Model):
    """Adhésions aux coopératives"""
    farmer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cooperative_memberships')
    cooperative = models.ForeignKey(Cooperative, on_delete=models.CASCADE, related_name='memberships')
    joined_date = models.DateField()
    status = models.CharField(max_length=20, default='Actif')
    notes = models.TextField(blank=True)
    
    class Meta:
        unique_together = ('farmer', 'cooperative')
    
    def __str__(self):
        return f"{self.farmer.username} - {self.cooperative.name}"

class Subsidy(models.Model):
    """Subventions gouvernementales"""
    SUBSIDY_TYPE_CHOICES = (
        ('Semences', 'Semences'),
        ('Engrais', 'Engrais'),
        ('Matériel', 'Matériel agricole'),
        ('Formation', 'Formation'),
        ('Financement', 'Financement direct'),
        ('Autre', 'Autre'),
    )
    
    STATUS_CHOICES = (
        ('Disponible', 'Disponible'),
        ('Attribué', 'Attribué'),
        ('Épuisé', 'Épuisé'),
    )
    
    name = models.CharField(max_length=255)
    description = models.TextField()
    subsidy_type = models.CharField(max_length=20, choices=SUBSIDY_TYPE_CHOICES)
    provider = models.ForeignKey(User, on_delete=models.CASCADE, related_name='provided_subsidies')
    amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    quantity = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    eligibility_criteria = models.TextField()
    application_process = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Disponible')
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Subsidies"

class SubsidyApplication(models.Model):
    """Demandes de subventions par les agriculteurs"""
    STATUS_CHOICES = (
        ('Soumise', 'Soumise'),
        ('En cours d\'examen', 'En cours d\'examen'),
        ('Approuvée', 'Approuvée'),
        ('Rejetée', 'Rejetée'),
    )
    
    subsidy = models.ForeignKey(Subsidy, on_delete=models.CASCADE, related_name='applications')
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subsidy_applications')
    application_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Soumise')
    notes = models.TextField(blank=True)
    supporting_documents = models.FileField(upload_to='subsidy_documents/', null=True, blank=True)
    reviewed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_subsidy_applications')
    review_date = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.applicant.username} - {self.subsidy.name}"

class MarketPrice(models.Model):
    """Prix du marché pour les produits agricoles"""
    product_name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    region = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    unit = models.CharField(max_length=20, default='kg')
    date = models.DateField()
    source = models.CharField(max_length=255, blank=True)
    
    def __str__(self):
        return f"{self.product_name} - {self.region} - {self.date}"

class Loan(models.Model):
    """Prêts financiers pour les agriculteurs"""
    STATUS_CHOICES = (
        ('Demandé', 'Demandé'),
        ('Approuvé', 'Approuvé'),
        ('Refusé', 'Refusé'),
        ('Décaissé', 'Décaissé'),
        ('Remboursé', 'Remboursé'),
        ('En défaut', 'En défaut'),
    )
    
    borrower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='loans')
    lender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='provided_loans')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)  # Taux annuel en pourcentage
    application_date = models.DateField()
    approval_date = models.DateField(null=True, blank=True)
    disbursement_date = models.DateField(null=True, blank=True)
    term_months = models.PositiveIntegerField()  # Durée du prêt en mois
    purpose = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Demandé')
    collateral = models.TextField(blank=True)
    
    def __str__(self):
        return f"Prêt de {self.amount} BIF - {self.borrower.username}"

class LoanRepayment(models.Model):
    """Remboursements de prêts"""
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE, related_name='repayments')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_date = models.DateField()
    notes = models.TextField(blank=True)
    
    def __str__(self):
        return f"Remboursement de {self.amount} BIF pour prêt #{self.loan.id}"

class NGOProject(models.Model):
    """Projets menés par les ONG"""
    STATUS_CHOICES = (
        ('Planifié', 'Planifié'),
        ('En cours', 'En cours'),
        ('Terminé', 'Terminé'),
        ('Annulé', 'Annulé'),
    )
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    ngo = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    location = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    budget = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Planifié')
    beneficiaries_count = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.title

class Training(models.Model):
    """Formations pour les agriculteurs"""
    STATUS_CHOICES = (
        ('Planifié', 'Planifié'),
        ('En cours', 'En cours'),
        ('Terminé', 'Terminé'),
        ('Annulé', 'Annulé'),
    )
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    organizer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='organized_trainings')
    location = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    capacity = models.PositiveIntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Planifié')
    
    def __str__(self):
        return self.title

class TrainingParticipant(models.Model):
    """Participants aux formations"""
    training = models.ForeignKey(Training, on_delete=models.CASCADE, related_name='participants')
    participant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='training_participations')
    registration_date = models.DateField(auto_now_add=True)
    attendance_confirmed = models.BooleanField(default=False)
    
    class Meta:
        unique_together = ('training', 'participant')
    
    def __str__(self):
        return f"{self.participant.username} - {self.training.title}"

class Alert(models.Model):
    """Alertes pour les utilisateurs (météo, marché, etc.)"""
    ALERT_TYPE_CHOICES = (
        ('Météo', 'Météo'),
        ('Marché', 'Marché'),
        ('Maladie', 'Maladie des cultures'),
        ('Opportunité', 'Opportunité'),
        ('Autre', 'Autre'),
    )
    
    SEVERITY_CHOICES = (
        ('Faible', 'Faible'),
        ('Moyenne', 'Moyenne'),
        ('Élevée', 'Élevée'),
        ('Urgente', 'Urgente'),
    )
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    alert_type = models.CharField(max_length=20, choices=ALERT_TYPE_CHOICES)
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES, default='Moyenne')
    region = models.CharField(max_length=100)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_alerts')
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return self.title
