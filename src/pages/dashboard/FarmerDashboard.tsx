
import React from 'react';
import { 
  Wheat, 
  TrendingUp, 
  Loader2
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import FarmerDashboardLayout from '@/layouts/FarmerDashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileDashboard } from '@/components/ProfileDashboard';
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/services/api/dashboardApi';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DashboardData } from '@/types/dashboard';

const FarmerDashboard = (): JSX.Element => {
  const { user } = useAuth();
  const { data: dashboardData, isLoading, error } = useQuery<DashboardData>({ 
    queryKey: ['farmerDashboard'],
    queryFn: dashboardApi.getFarmerDashboard
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-agri" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Une erreur est survenue lors du chargement des données.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
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
                <div className="text-2xl font-bold">{dashboardData?.monthlyRevenue.toLocaleString()} BIF</div>
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
                <div className="text-2xl font-bold">{dashboardData?.activeOrders.total}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {dashboardData?.activeOrders.pendingDelivery} en attente de livraison
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
                <div className="text-2xl font-bold">{dashboardData?.availableSubsidies.amount.toLocaleString()} BIF</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Date d'expiration: {dashboardData?.availableSubsidies.expiryDate}
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
              {dashboardData?.recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-agri/10 flex items-center justify-center mr-3">
                      <Wheat className="h-5 w-5 text-agri" />
                    </div>
                    <div>
                      <div className="font-medium">{sale.product} ({sale.quantity}{sale.unit})</div>
                      <div className="text-xs text-muted-foreground">Vendu le {sale.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{sale.amount.toLocaleString()} BIF</div>
                    <div className="text-xs text-green-500">{sale.status}</div>
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
              {dashboardData?.marketPrices.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{product.product}</span>
                  <div className="text-right">
                    <div>{product.price.toLocaleString()} BIF/kg</div>
                    <div className={`text-xs ${product.priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {product.priceChange >= 0 ? '+' : ''}{product.priceChange}%
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
              {dashboardData?.fundingOpportunities.map((item, index) => (
                <div key={index} className="bg-agri/5 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.provider}</p>
                      <p className="text-sm mt-1">Montant: <span className="font-medium">{item.amount.toLocaleString()} BIF</span></p>
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
    </div>
  );
};

export default FarmerDashboard;
