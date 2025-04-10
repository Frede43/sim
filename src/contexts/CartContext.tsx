
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Définition des types
export type Product = {
  id: number;
  name: string;
  region: string;
  price: string;
  stock: string;
  category: string;
  description: string;
  priceValue?: number; // Prix numérique pour les calculs
};

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Extraire la valeur numérique du prix affiché
const extractPriceValue = (priceStr: string): number => {
  const match = priceStr.match(/(\d+(\.\d+)?)/);
  return match ? parseFloat(match[0]) : 0;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Charger le panier depuis le localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
      }
    }
  }, []);

  // Sauvegarder le panier dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number) => {
    // Vérifier que la quantité est positive
    if (quantity <= 0) {
      toast.error('La quantité doit être supérieure à zéro');
      return;
    }

    // Ajouter priceValue pour les calculs
    const productWithPriceValue = {
      ...product,
      priceValue: extractPriceValue(product.price)
    };

    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Mettre à jour la quantité si le produit existe déjà
        const updatedItems = prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
        
        toast.success(`Quantité mise à jour (${existingItem.quantity + quantity}x)`, {
          description: `${product.name}`,
          action: {
            label: 'Voir panier',
            onClick: () => setIsCartOpen(true)
          }
        });
        
        return updatedItems;
      } else {
        // Ajouter un nouveau produit si non existant
        toast.success(`Ajouté au panier (${quantity}x)`, {
          description: `${product.name}`,
          action: {
            label: 'Voir panier',
            onClick: () => setIsCartOpen(true)
          }
        });
        
        return [...prevItems, { product: productWithPriceValue, quantity }];
      }
    });
    
    // Ouvrir automatiquement le panier après un court délai
    setTimeout(() => {
      setIsCartOpen(true);
    }, 300);
  };

  const removeFromCart = (productId: number) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.product.id === productId);
      const updatedItems = prevItems.filter(item => item.product.id !== productId);
      
      if (itemToRemove) {
        toast.info(`Produit retiré du panier`, {
          description: itemToRemove.product.name
        });
      }
      
      return updatedItems;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.info('Panier vidé');
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  // Calculer le nombre total d'articles et le prix total
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => {
    return total + (item.product.priceValue || 0) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      itemCount,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      toggleCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
