import React, { useState } from 'react';
import { ShoppingCart, ShoppingBag, Package, Users, Search, Filter, Eye, SlidersHorizontal, Check, X } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import ShoppingCartComponent from '@/components/ShoppingCart';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BuyerCatalog = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');

  const products = [
    {
      id: 1,
      name: 'Café Arabica Grade A',
      region: 'Ngozi',
      price: '4.50 USD/kg',
      stock: '2,300 kg',
      category: 'Café',
      description: 'Café arabica de haute qualité cultivé en altitude dans la région de Ngozi.',
    },
    {
      id: 2,
      name: 'Bananes Vertes',
      region: 'Cibitoke',
      price: '0.80 USD/kg',
      stock: '5,700 kg',
      category: 'Fruits',
      description: 'Bananes vertes fraîches idéales pour la cuisine traditionnelle.',
    },
    {
      id: 3,
      name: 'Maïs Blanc',
      region: 'Gitega',
      price: '0.65 USD/kg',
      stock: '12,400 kg',
      category: 'Céréales',
      description: 'Maïs blanc de qualité alimentaire cultivé avec des méthodes durables.',
    },
    {
      id: 4,
      name: 'Haricots Rouges',
      region: 'Bubanza',
      price: '1.20 USD/kg',
      stock: '3,800 kg',
      category: 'Légumineuses',
      description: 'Haricots rouges riches en protéines, récoltés la saison dernière.',
    },
    {
      id: 5,
      name: 'Riz Local',
      region: 'Kirundo',
      price: '1.05 USD/kg',
      stock: '7,200 kg',
      category: 'Céréales',
      description: 'Riz local cultivé dans les plaines de la région de Kirundo.',
    },
    {
      id: 6,
      name: 'Café Robusta',
      region: 'Muyinga',
      price: '3.80 USD/kg',
      stock: '1,850 kg',
      category: 'Café',
      description: 'Café robusta avec une saveur corsée, idéal pour les mélanges.',
    },
  ];

  // Extraire les catégories et régions uniques pour les filtres
  const categories = Array.from(new Set(products.map(p => p.category)));
  const regions = Array.from(new Set(products.map(p => p.region)));

  // Filtrer et trier les produits
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    const matchesRegion = selectedRegion === '' || product.region === selectedRegion;
    
    return matchesSearch && matchesCategory && matchesRegion;
  });

  // Trier les produits
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = parseFloat(a.price.match(/\d+\.\d+/)?.[0] || "0");
    const priceB = parseFloat(b.price.match(/\d+\.\d+/)?.[0] || "0");
    
    switch (sortBy) {
      case 'price-low':
        return priceA - priceB;
      case 'price-high':
        return priceB - priceA;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedRegion('');
    setSearchQuery('');
    setSortBy('default');
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Catalogue de Produits</h1>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher un produit..."
                className="pl-9 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filtres</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs font-normal text-muted-foreground px-2 py-1.5">
                    Catégorie
                  </DropdownMenuLabel>
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                    >
                      <span className="flex-1">{category}</span>
                      {selectedCategory === category && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="text-xs font-normal text-muted-foreground px-2 py-1.5">
                    Région
                  </DropdownMenuLabel>
                  {regions.map((region) => (
                    <DropdownMenuItem
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                    >
                      <span className="flex-1">{region}</span>
                      {selectedRegion === region && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Trier par défaut</SelectItem>
                <SelectItem value="price-low">Prix croissant</SelectItem>
                <SelectItem value="price-high">Prix décroissant</SelectItem>
                <SelectItem value="name-asc">Nom (A-Z)</SelectItem>
                <SelectItem value="name-desc">Nom (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {(selectedCategory || selectedRegion) && (
          <div className="flex items-center gap-2 flex-wrap">
            {selectedCategory && (
              <Badge variant="outline" className="flex items-center gap-1">
                Catégorie: {selectedCategory}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => setSelectedCategory('')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedRegion && (
              <Badge variant="outline" className="flex items-center gap-1">
                Région: {selectedRegion}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => setSelectedRegion('')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7"
              onClick={resetFilters}
            >
              Effacer tout
            </Button>
          </div>
        )}

        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Aucun produit trouvé</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Aucun produit ne correspond à vos critères de recherche. Essayez d'ajuster vos filtres.
            </p>
            <Button onClick={resetFilters}>Réinitialiser les filtres</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div 
                  className="aspect-[4/3] bg-muted flex items-center justify-center cursor-pointer"
                  onClick={() => navigate(`/dashboard/buyer/product/${product.id}`)}
                >
                  <div className="text-2xl font-semibold text-muted-foreground">{product.category}</div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle 
                      className="hover:text-berry cursor-pointer"
                      onClick={() => navigate(`/dashboard/buyer/product/${product.id}`)}
                    >
                      {product.name}
                    </CardTitle>
                    <Badge className="bg-berry hover:bg-berry-dark">{product.price}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Région:</span>
                      <span className="font-medium">{product.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Disponible:</span>
                      <span className="font-medium">{product.stock}</span>
                    </div>
                    <p className="text-muted-foreground mt-2 line-clamp-2">{product.description}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    className="w-full bg-berry hover:bg-berry-dark"
                    onClick={() => addToCart(product, 1)}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Commander
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(`/dashboard/buyer/product/${product.id}`)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Détails
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      <ShoppingCartComponent />
    </>
  );
};

export default BuyerCatalog;
