
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ShoppingCart, ShoppingBag, Package, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout';
import { ProfileDashboard } from '@/components/ProfileDashboard';

const BuyerDashboard = () => {
  const location = useLocation();
  const sidebarItems = [
    {
      icon: ShoppingCart,
      label: 'Tableau de bord',
      href: '/dashboard/buyer',
      active: location.pathname === '/dashboard/buyer',
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
    },
    {
      icon: Users,
      label: 'Fournisseurs',
      href: '/dashboard/buyer/suppliers',
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      {location.pathname === '/dashboard/buyer' ? (
        <div className="flex flex-col gap-6 p-6">
        <h1 className="text-2xl font-bold">Tableau de bord Acheteur</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProfileDashboard />
          </div>
          
          <div className="lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total des commandes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground mt-1">+8% par rapport au mois dernier</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Volume d'achat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">15,200 Kg</div>
                  <p className="text-xs text-muted-foreground mt-1">+12% par rapport au mois dernier</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Fournisseurs actifs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground mt-1">2 nouveaux ce mois-ci</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mt-4">Commandes récentes</h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-medium">ID</th>
                    <th className="px-4 py-3 text-left font-medium">Produit</th>
                    <th className="px-4 py-3 text-left font-medium">Fournisseur</th>
                    <th className="px-4 py-3 text-left font-medium">Quantité</th>
                    <th className="px-4 py-3 text-left font-medium">Statut</th>
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'ORD-1023', product: 'Café Arabica', supplier: 'Coopérative Ngozi', quantity: '500 kg', status: 'Livré', date: '15/05/2023' },
                    { id: 'ORD-1022', product: 'Maïs', supplier: 'Agriculteurs Gitega', quantity: '1,200 kg', status: 'En transit', date: '12/05/2023' },
                    { id: 'ORD-1021', product: 'Haricots', supplier: 'Coopérative Bubanza', quantity: '800 kg', status: 'En préparation', date: '10/05/2023' },
                    { id: 'ORD-1020', product: 'Bananes', supplier: 'Ferme Cibitoke', quantity: '350 kg', status: 'Livré', date: '05/05/2023' },
                  ].map((order, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="px-4 py-3">{order.id}</td>
                      <td className="px-4 py-3">{order.product}</td>
                      <td className="px-4 py-3">{order.supplier}</td>
                      <td className="px-4 py-3">{order.quantity}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${order.status === 'Livré' ? 'bg-green-100 text-green-800' : 
                          order.status === 'En transit' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Produits les plus achetés</CardTitle>
              <CardDescription>Basé sur le volume d'achat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="space-y-0.5 flex-1">
                    <p className="text-sm font-medium">Café Arabica</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                  <span className="text-sm font-medium ml-4">5,200 kg</span>
                </div>
                <div className="flex items-center">
                  <div className="space-y-0.5 flex-1">
                    <p className="text-sm font-medium">Maïs</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }} />
                    </div>
                  </div>
                  <span className="text-sm font-medium ml-4">3,800 kg</span>
                </div>
                <div className="flex items-center">
                  <div className="space-y-0.5 flex-1">
                    <p className="text-sm font-medium">Haricots</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }} />
                    </div>
                  </div>
                  <span className="text-sm font-medium ml-4">2,900 kg</span>
                </div>
                <div className="flex items-center">
                  <div className="space-y-0.5 flex-1">
                    <p className="text-sm font-medium">Bananes</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>
                  <span className="text-sm font-medium ml-4">1,800 kg</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Calendrier des récoltes</CardTitle>
              <CardDescription>Planification des achats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Café</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Mai - Juillet</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm">Maïs</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Août - Octobre</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">Haricots</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Juin - Août</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm">Bananes</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Toute l'année</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">Thé</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Mars - Mai</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      ) : (
        <Outlet />
      )}
    </DashboardLayout>
  );
};

export default BuyerDashboard;
