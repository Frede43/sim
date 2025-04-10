
import React from 'react';
import { ShoppingCart, ShoppingBag, Package, Users, Clock, CheckCircle2, RefreshCcw, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/DashboardLayout';

const BuyerOrders = () => {
  const sidebarItems = [
    {
      icon: ShoppingCart,
      label: 'Tableau de bord',
      href: '/dashboard/buyer',
    },
    {
      icon: ShoppingBag,
      label: 'Catalogue',
      href: '/dashboard/buyer/catalog',
    },
    {
      icon: Package,
      label: 'Commandes',
      href: '/dashboard/buyer/orders',
      active: true,
    },
    {
      icon: Users,
      label: 'Fournisseurs',
      href: '/dashboard/buyer/suppliers',
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Mes Commandes</h1>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Nouvelle commande
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-amber-500 mr-2" />
                <div className="text-2xl font-bold">3</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">En cours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <RefreshCcw className="h-4 w-4 text-blue-500 mr-2" />
                <div className="text-2xl font-bold">5</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Livrées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                <div className="text-2xl font-bold">16</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="pending">En attente</TabsTrigger>
            <TabsTrigger value="inProgress">En cours</TabsTrigger>
            <TabsTrigger value="delivered">Livrées</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium">N° Commande</th>
                      <th className="px-4 py-3 text-left font-medium">Produit</th>
                      <th className="px-4 py-3 text-left font-medium">Quantité</th>
                      <th className="px-4 py-3 text-left font-medium">Fournisseur</th>
                      <th className="px-4 py-3 text-left font-medium">Date</th>
                      <th className="px-4 py-3 text-left font-medium">Statut</th>
                      <th className="px-4 py-3 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'CMD-1025', product: 'Café Arabica', quantity: '500 kg', supplier: 'Coopérative Ngozi', date: '18/05/2023', status: 'En attente' },
                      { id: 'CMD-1024', product: 'Bananes', quantity: '300 kg', supplier: 'Ferme Cibitoke', date: '17/05/2023', status: 'En attente' },
                      { id: 'CMD-1023', product: 'Maïs', quantity: '1,000 kg', supplier: 'Coopérative Gitega', date: '15/05/2023', status: 'En cours' },
                      { id: 'CMD-1022', product: 'Riz', quantity: '800 kg', supplier: 'Agriculteurs Kirundo', date: '12/05/2023', status: 'En cours' },
                      { id: 'CMD-1021', product: 'Haricots', quantity: '400 kg', supplier: 'Coopérative Bubanza', date: '10/05/2023', status: 'Livré' },
                      { id: 'CMD-1020', product: 'Café Robusta', quantity: '200 kg', supplier: 'Producteurs Muyinga', date: '05/05/2023', status: 'Livré' },
                    ].map((order, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="px-4 py-3">{order.id}</td>
                        <td className="px-4 py-3">{order.product}</td>
                        <td className="px-4 py-3">{order.quantity}</td>
                        <td className="px-4 py-3">{order.supplier}</td>
                        <td className="px-4 py-3">{order.date}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${order.status === 'Livré' ? 'bg-green-100 text-green-800' : 
                            order.status === 'En cours' ? 'bg-blue-100 text-blue-800' : 
                            'bg-amber-100 text-amber-800'}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm">Détails</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Affichage des commandes en attente uniquement</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inProgress" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Affichage des commandes en cours uniquement</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="delivered" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Affichage des commandes livrées uniquement</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BuyerOrders;
