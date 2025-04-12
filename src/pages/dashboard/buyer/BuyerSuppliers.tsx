
import React from 'react';
import { ShoppingCart, ShoppingBag, Package, Users, MapPin, Phone, Mail, Star, StarHalf } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const BuyerSuppliers = () => {
  const suppliers = [
    {
      id: 1,
      name: 'Coopérative Ngozi',
      type: 'Coopérative',
      products: ['Café Arabica', 'Café Robusta'],
      location: 'Province de Ngozi',
      contact: '+257 12 345 678',
      email: 'contact@coopngozi.bi',
      rating: 4.5,
      verified: true,
    },
    {
      id: 2,
      name: 'Agriculteurs Gitega',
      type: 'Coopérative',
      products: ['Maïs', 'Haricots', 'Sorgho'],
      location: 'Province de Gitega',
      contact: '+257 23 456 789',
      email: 'info@aggitega.bi',
      rating: 4.0,
      verified: true,
    },
    {
      id: 3,
      name: 'Ferme Cibitoke',
      type: 'Entreprise',
      products: ['Bananes', 'Ananas', 'Avocats'],
      location: 'Province de Cibitoke',
      contact: '+257 34 567 890',
      email: 'contact@fermecibitoke.bi',
      rating: 4.8,
      verified: true,
    },
    {
      id: 4,
      name: 'Coopérative Bubanza',
      type: 'Coopérative',
      products: ['Haricots', 'Manioc', 'Patates douces'],
      location: 'Province de Bubanza',
      contact: '+257 45 678 901',
      email: 'info@coopbubanza.bi',
      rating: 3.9,
      verified: false,
    },
    {
      id: 5,
      name: 'Producteurs Muyinga',
      type: 'Association',
      products: ['Café', 'Thé', 'Vanille'],
      location: 'Province de Muyinga',
      contact: '+257 56 789 012',
      email: 'contact@promuyinga.bi',
      rating: 4.2,
      verified: true,
    },
    {
      id: 6,
      name: 'Agriculteurs Kirundo',
      type: 'Coopérative',
      products: ['Riz', 'Sorgho', 'Mil'],
      location: 'Province de Kirundo',
      contact: '+257 67 890 123',
      email: 'info@agkirundo.bi',
      rating: 4.1,
      verified: true,
    },
  ];

  return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Mes Fournisseurs</h1>
          
          <div className="flex items-center gap-3">
            <Input
              type="search"
              placeholder="Rechercher un fournisseur..."
              className="w-[250px]"
            />
            <Button>Ajouter un fournisseur</Button>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="cooperative">Coopératives</TabsTrigger>
            <TabsTrigger value="farmer">Agriculteurs</TabsTrigger>
            <TabsTrigger value="company">Entreprises</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suppliers.map(supplier => (
                <Card key={supplier.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{supplier.name}</CardTitle>
                        <CardDescription>{supplier.type}</CardDescription>
                      </div>
                      <div className="flex items-center">
                        {supplier.verified && (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 mr-2">
                            Vérifié
                          </span>
                        )}
                        <div className="flex items-center">
                          {Array(Math.floor(supplier.rating)).fill(0).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-amber-500 fill-current" />
                          ))}
                          {supplier.rating % 1 !== 0 && (
                            <StarHalf className="h-4 w-4 text-amber-500 fill-current" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                        <span>{supplier.location}</span>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                        <span>{supplier.contact}</span>
                      </div>
                      <div className="flex items-start">
                        <Mail className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                        <span>{supplier.email}</span>
                      </div>
                      <div className="pt-2">
                        <p className="text-sm font-medium mb-1">Produits principaux:</p>
                        <div className="flex flex-wrap gap-1">
                          {supplier.products.map((product, idx) => (
                            <span 
                              key={idx} 
                              className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                            >
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <div className="px-6 pb-6 pt-0 flex space-x-2">
                    <Button className="flex-1" variant="outline">Contact</Button>
                    <Button className="flex-1">Commander</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="cooperative" className="mt-4">
            <p className="text-center text-muted-foreground p-8">Affichage des coopératives uniquement</p>
          </TabsContent>
          
          <TabsContent value="farmer" className="mt-4">
            <p className="text-center text-muted-foreground p-8">Affichage des agriculteurs uniquement</p>
          </TabsContent>
          
          <TabsContent value="company" className="mt-4">
            <p className="text-center text-muted-foreground p-8">Affichage des entreprises uniquement</p>
          </TabsContent>
        </Tabs>
      </div>
  );
};

export default BuyerSuppliers;
