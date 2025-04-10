
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  ShoppingBag, 
  CreditCard, 
  ArrowLeft, 
  Package,
  Truck,
  MapPin,
  Clock,
  CheckCircle,
  CalendarDays,
  BadgePercent
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  Card,
  CardContent, 
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const sidebarItems = [
  {
    icon: ShoppingBag,
    label: 'Catalogue',
    href: '/dashboard/buyer/catalog',
  },
  {
    icon: Package,
    label: 'Commandes',
    href: '/dashboard/buyer/orders',
  },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const deliveryFee = deliveryMethod === 'express' ? 15 : 8;
  const finalTotal = totalPrice + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simuler un traitement de paiement
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast.success('Commande passée avec succès!', {
        description: 'Vous recevrez un email de confirmation.',
        action: {
          label: 'Voir commandes',
          onClick: () => navigate('/dashboard/buyer/orders')
        }
      });
      navigate('/dashboard/buyer/orders');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
          <p className="text-gray-600 mb-6">
            Ajoutez des produits à votre panier avant de procéder au paiement.
          </p>
          <Button 
            onClick={() => navigate('/dashboard/buyer/catalog')}
            className="bg-berry hover:bg-berry-dark"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au catalogue
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="max-w-6xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard/buyer/catalog')}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au catalogue
        </Button>

        <div className="grid md:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-berry" />
                  Informations de livraison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Prénom" />
                    <Input placeholder="Nom" />
                  </div>
                  <Input placeholder="Adresse email" type="email" />
                  <Input placeholder="Numéro de téléphone" type="tel" />
                  <Input placeholder="Adresse de livraison" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Ville" />
                    <Input placeholder="Code postal" />
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="mr-2 h-5 w-5 text-berry" />
                  Méthode de livraison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  defaultValue="standard" 
                  value={deliveryMethod}
                  onValueChange={setDeliveryMethod}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Livraison standard</p>
                          <p className="text-sm text-muted-foreground">3-5 jours ouvrables</p>
                        </div>
                        <p className="font-medium">8.00 USD</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Livraison express</p>
                          <p className="text-sm text-muted-foreground">1-2 jours ouvrables</p>
                        </div>
                        <p className="font-medium">15.00 USD</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-berry" />
                  Méthode de paiement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  defaultValue="card" 
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4 mb-6"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <p className="font-medium">Carte de crédit / débit</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="mobile" id="mobile" />
                    <Label htmlFor="mobile" className="flex-1 cursor-pointer">
                      <p className="font-medium">Paiement mobile</p>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input placeholder="Numéro de carte" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="MM/YY" />
                      <Input placeholder="CVC" />
                    </div>
                    <Input placeholder="Nom sur la carte" />
                  </form>
                )}

                {paymentMethod === 'mobile' && (
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <p className="text-sm">
                      Un code de paiement sera envoyé à votre numéro de téléphone pour finaliser la transaction.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
                <CardDescription>
                  {items.length} {items.length > 1 ? 'articles' : 'article'} dans votre panier
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-h-[250px] overflow-y-auto mb-6">
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li key={item.product.id} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-500">
                            {item.product.category}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.product.region}</p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs">{item.quantity} × {item.product.price}</p>
                            <p className="text-sm font-medium">{(item.product.priceValue || 0) * item.quantity} USD</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <p>Sous-total</p>
                    <p>{totalPrice.toFixed(2)} USD</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p>Frais de livraison</p>
                    <p>{deliveryFee.toFixed(2)} USD</p>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 text-sm">
                    <div className="flex items-center gap-1">
                      <BadgePercent className="h-4 w-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Code promo</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 text-berry">
                      Ajouter
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-medium text-base pt-2">
                    <p>Total</p>
                    <p className="text-berry">{finalTotal.toFixed(2)} USD</p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleSubmit} 
                  className="w-full mt-6 bg-berry hover:bg-berry-dark"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>Traitement en cours...</>
                  ) : (
                    <>
                      Confirmer la commande
                    </>
                  )}
                </Button>
                
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Livraison estimée: {deliveryMethod === 'express' ? '1-2' : '3-5'} jours ouvrables</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4" />
                    <span>Paiement sécurisé</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Checkout;
