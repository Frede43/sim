
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart as CartIcon, X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const CartButton: React.FC = () => {
  const { itemCount, toggleCart, isCartOpen } = useCart();

  return (
    <Button 
      onClick={toggleCart} 
      variant="ghost" 
      size="icon" 
      className="relative"
      aria-label="Afficher le panier"
    >
      <CartIcon size={20} />
      {itemCount > 0 && (
        <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">
          {itemCount}
        </Badge>
      )}
    </Button>
  );
};

const ShoppingCart: React.FC = () => {
  const { 
    items, 
    itemCount, 
    totalPrice, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    isCartOpen,
    toggleCart
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate('/dashboard/buyer/checkout');
  };

  const formatPrice = (price: number): string => {
    return `${price.toFixed(2)} USD`;
  };

  if (items.length === 0) {
    return (
      <Sheet open={isCartOpen} onOpenChange={toggleCart}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center text-lg">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Votre Panier
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <CartIcon className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-3">Votre panier est vide</h3>
            <p className="text-muted-foreground text-center max-w-xs mb-8">
              Parcourez notre catalogue de produits agricoles frais et ajoutez des articles à votre panier.
            </p>
            <Button onClick={() => {
              toggleCart();
              navigate('/dashboard/buyer/catalog');
            }} className="bg-berry hover:bg-berry-dark">
              Découvrir le catalogue
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader>
          <SheetTitle className="flex items-center text-lg">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Votre Panier ({itemCount} {itemCount > 1 ? 'articles' : 'article'})
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 flex-1 overflow-auto">
          <ul className="space-y-5">
            {items.map((item) => (
              <li key={item.product.id} className="relative">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center">
                    <span className="text-sm font-medium">{item.product.category}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-base font-medium">{item.product.name}</h4>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Supprimer du panier"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.product.region}</p>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border rounded-md overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-sm font-medium">
                        {formatPrice((item.product.priceValue || 0) * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
                <Separator className="mt-5" />
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-auto pt-6">
          <div className="space-y-4">
            <div className="flex justify-between text-base font-medium">
              <p>Sous-total</p>
              <p>{formatPrice(totalPrice)}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Frais de livraison calculés à l'étape suivante
            </p>
            <div className="space-y-3">
              <Button onClick={handleCheckout} className="w-full bg-berry hover:bg-berry-dark">
                Passer à la caisse <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button onClick={clearCart} variant="outline" className="w-full">
                <Trash2 className="mr-2 h-4 w-4" /> Vider le panier
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
