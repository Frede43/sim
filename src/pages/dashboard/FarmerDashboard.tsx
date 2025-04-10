
import React from 'react';
import { 
  Home, 
  Wheat, 
  CreditCard, 
  TrendingUp, 
  ShoppingCart,
  Users
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileDashboard } from '@/components/ProfileDashboard';

const FarmerDashboard = () => {
  const { user } = useAuth();

  const sidebarItems = [
    {
      icon: Home,
      label: 'Tableau de bord',
      href: '/dashboard/farmer',
      active: true,
    },
    {
      icon: Wheat,
      label: 'Mes Produits',
      href: '/dashboard/farmer/products',
    },
    {
      icon: ShoppingCart,
      label: 'Mes Ventes',
      href: '/dashboard/farmer/sales',
    },
    {
      icon: CreditCard,
      label: 'Subventions',
      href: '/dashboard/farmer/subsidies',
    },
    {
      icon: TrendingUp,
      label: 'Prix du Marché',
      href: '/dashboard/farmer/market',
    },
    {
      icon: Users,
      label: 'Coopératives',
      href: '/dashboard/farmer/cooperatives',
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <h1 className="text-2xl font-bold mb-6">
        Bonjour, {user?.name} 👋
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <ProfileDashboard />
        </div>
        
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Revenus du mois
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">450,000 BIF</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
                  <span className="text-green-500 font-medium">+12%</span> par rapport au mois dernier
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Commandes actives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground mt-1">
                  2 en attente de livraison
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Subventions disponibles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">250,000 BIF</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Date d'expiration: 30/12/2023
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Mes ventes récentes</CardTitle>
            <CardDescription>
              Historique des 30 derniers jours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-agri/10 flex items-center justify-center mr-3">
                      <Wheat className="h-5 w-5 text-agri" />
                    </div>
                    <div>
                      <div className="font-medium">Maïs (50kg)</div>
                      <div className="text-xs text-muted-foreground">Vendu le {['10/07', '15/07', '22/07'][item - 1]}/2023</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{[45000, 90000, 45000][item - 1]} BIF</div>
                    <div className="text-xs text-green-500">Payé</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prix du marché</CardTitle>
            <CardDescription>
              Produits populaires
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Maïs', price: '900 BIF/kg', change: '+5%' },
                { name: 'Haricots', price: '1,200 BIF/kg', change: '-2%' },
                { name: 'Pommes de terre', price: '700 BIF/kg', change: '+8%' },
                { name: 'Tomates', price: '1,500 BIF/kg', change: '+12%' }
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{product.name}</span>
                  <div className="text-right">
                    <div>{product.price}</div>
                    <div className={`text-xs ${product.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {product.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Opportunités de financement</CardTitle>
            <CardDescription>
              Subventions disponibles pour vous
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  title: 'Subvention pour l\'achat de semences', 
                  provider: 'Ministère de l\'Agriculture', 
                  amount: '100,000 BIF',
                  deadline: '15/08/2023'
                },
                { 
                  title: 'Prêt pour l\'équipement agricole', 
                  provider: 'Banque Agricole du Burundi', 
                  amount: '500,000 BIF',
                  deadline: '30/08/2023'
                }
              ].map((item, index) => (
                <div key={index} className="bg-agri/5 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.provider}</p>
                      <p className="text-sm mt-1">Montant: <span className="font-medium">{item.amount}</span></p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Date limite: {item.deadline}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FarmerDashboard;
