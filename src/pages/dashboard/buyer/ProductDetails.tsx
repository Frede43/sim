
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import DashboardLayout from '@/components/DashboardLayout';
import { ShoppingBag, ArrowLeft, Package, MapPin, Info, Plus, Minus, ShoppingCart, Star, Calendar, Mountain, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShoppingCartComponent from '@/components/ShoppingCart';

// Ces données devraient venir d'une API dans une vraie application
const products = [
  {
    id: 1,
    name: 'Café Arabica Grade A',
    region: 'Ngozi',
    price: '4.50 USD/kg',
    stock: '2,300 kg',
    category: 'Café',
    description: 'Café arabica de haute qualité cultivé en altitude dans la région de Ngozi. Ce café est réputé pour ses arômes complexes, sa douceur et ses notes fruitées. Provenant de petits producteurs locaux qui pratiquent une agriculture durable et responsable.',
    details: {
      altitude: '1,500-1,800m',
      process: 'Lavé',
      certification: 'Commerce équitable',
      harvest: 'Octobre - Décembre',
      taste: 'Notes de chocolat, d\'agrumes et de fruits rouges',
      quality: '85+ points'
    },
    farmInfo: {
      name: "Coopérative de Ngozi",
      farmers: "154 petits producteurs",
      founded: "2005",
      practices: "Agriculture biologique, agroforesterie",
      impact: "Soutien à l'éducation locale, amélioration des techniques d'irrigation"
    },
    reviews: [
      { id: 1, author: "Restaurant Bujumbura", rating: 5, comment: "Excellent café avec un profil aromatique riche et complexe. Nos clients l'adorent!" },
      { id: 2, author: "Cafétéria Université", rating: 4, comment: "Très bon rapport qualité-prix, arôme consistant et saveur agréable." }
    ]
  },
  // ... autres produits
];

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

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === Number(id));
  
  if (!product) {
    return (
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
          <p className="text-muted-foreground mb-6">
            Le produit que vous recherchez n'existe pas ou a été retiré du catalogue.
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

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const extractPriceValue = (priceStr: string): number => {
    const match = priceStr.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[0]) : 0;
  };

  const totalPrice = extractPriceValue(product.price) * quantity;

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard/buyer/catalog')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au catalogue
        </Button>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative aspect-square bg-muted/50 rounded-lg flex items-center justify-center overflow-hidden">
              <Badge className="absolute top-4 left-4 bg-berry hover:bg-berry">{product.category}</Badge>
              <span className="text-5xl font-semibold text-gray-300">{product.category}</span>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{product.region}</Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">En stock</Badge>
                </div>
                <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">Région de {product.region}, Burundi</span>
                </div>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="border-t border-b py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Prix</p>
                    <p className="text-2xl font-bold text-berry">{product.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Stock disponible</p>
                    <p className="text-lg font-medium">{product.stock}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex items-center border rounded-md overflow-hidden mr-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="h-10 w-10 rounded-none"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={increaseQuantity}
                      className="h-10 w-10 rounded-none"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="font-bold">{totalPrice.toFixed(2)} USD</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-berry hover:bg-berry-dark"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Ajouter au panier
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      handleAddToCart();
                      navigate('/dashboard/buyer/checkout');
                    }}
                  >
                    Acheter maintenant
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <Tabs defaultValue="details">
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="details" className="px-8">Détails</TabsTrigger>
              <TabsTrigger value="producer" className="px-8">Producteur</TabsTrigger>
              <TabsTrigger value="reviews" className="px-8">Avis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Info className="h-5 w-5 mr-2 text-berry" />
                Caractéristiques du produit
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/25 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Mountain className="h-4 w-4 text-berry" />
                    <p className="font-medium">Altitude</p>
                  </div>
                  <p>{product.details.altitude}</p>
                </div>
                <div className="bg-muted/25 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-berry" />
                    <p className="font-medium">Période de récolte</p>
                  </div>
                  <p>{product.details.harvest}</p>
                </div>
                <div className="bg-muted/25 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-berry" />
                    <p className="font-medium">Certification</p>
                  </div>
                  <p>{product.details.certification}</p>
                </div>
                <div className="bg-muted/25 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-berry" />
                    <p className="font-medium">Qualité</p>
                  </div>
                  <p>{product.details.quality}</p>
                </div>
                <div className="md:col-span-2 bg-muted/25 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-berry" />
                    <p className="font-medium">Profil de goût</p>
                  </div>
                  <p>{product.details.taste}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="producer" className="mt-6">
              <h2 className="text-xl font-semibold mb-6">À propos du producteur</h2>
              <div className="bg-muted/25 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">{product.farmInfo.name}</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-28 text-sm text-muted-foreground">Producteurs:</div>
                    <div>{product.farmInfo.farmers}</div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-28 text-sm text-muted-foreground">Fondée en:</div>
                    <div>{product.farmInfo.founded}</div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-28 text-sm text-muted-foreground">Pratiques:</div>
                    <div>{product.farmInfo.practices}</div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-28 text-sm text-muted-foreground">Impact social:</div>
                    <div>{product.farmInfo.impact}</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <h2 className="text-xl font-semibold mb-6">Avis des acheteurs</h2>
              <div className="space-y-6">
                {product.reviews.map(review => (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{review.author}</h3>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <ShoppingCartComponent />
    </DashboardLayout>
  );
};

export default ProductDetails;
