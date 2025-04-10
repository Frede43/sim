
import React from 'react';
import { 
  Home, 
  Wheat, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  ShoppingCart,
  Users,
  BarChart3,
  ArrowRight,
  Bell
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

const FarmerMarket = () => {
  const { user } = useAuth();

  const sidebarItems = [
    {
      icon: Home,
      label: 'Tableau de bord',
      href: '/dashboard/farmer',
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
      active: true,
    },
    {
      icon: Users,
      label: 'Coopératives',
      href: '/dashboard/farmer/cooperatives',
    },
  ];

  const marketPrices = [
    {
      product: 'Maïs',
      currentPrice: '920 BIF/kg',
      previousPrice: '850 BIF/kg',
      change: '+8.2%',
      trend: 'up',
      forecast: 'stable'
    },
    {
      product: 'Haricots',
      currentPrice: '1,150 BIF/kg',
      previousPrice: '1,200 BIF/kg',
      change: '-4.2%',
      trend: 'down',
      forecast: 'down'
    },
    {
      product: 'Tomates',
      currentPrice: '1,500 BIF/kg',
      previousPrice: '1,300 BIF/kg',
      change: '+15.4%',
      trend: 'up',
      forecast: 'up'
    },
    {
      product: 'Pommes de terre',
      currentPrice: '680 BIF/kg',
      previousPrice: '700 BIF/kg',
      change: '-2.9%',
      trend: 'down',
      forecast: 'stable'
    },
    {
      product: 'Bananes',
      currentPrice: '550 BIF/kg',
      previousPrice: '520 BIF/kg',
      change: '+5.8%',
      trend: 'up',
      forecast: 'stable'
    },
    {
      product: 'Manioc',
      currentPrice: '430 BIF/kg',
      previousPrice: '400 BIF/kg',
      change: '+7.5%',
      trend: 'up',
      forecast: 'up'
    },
    {
      product: 'Riz',
      currentPrice: '1,800 BIF/kg',
      previousPrice: '1,750 BIF/kg',
      change: '+2.9%',
      trend: 'up',
      forecast: 'up'
    },
    {
      product: 'Arachides',
      currentPrice: '2,100 BIF/kg',
      previousPrice: '2,200 BIF/kg',
      change: '-4.5%',
      trend: 'down',
      forecast: 'stable'
    }
  ];

  const marketAlerts = [
    {
      product: 'Tomates',
      message: 'Prix en forte hausse (+15.4%) en raison de pénuries saisonnières',
      type: 'opportunity'
    },
    {
      product: 'Haricots',
      message: 'Tendance baissière prévue dans les prochaines semaines',
      type: 'warning'
    },
    {
      product: 'Riz',
      message: 'Demande croissante due aux exportations régionales',
      type: 'opportunity'
    }
  ];

  const marketInsights = [
    {
      title: 'Impact des pluies tardives',
      description: 'Les pluies tardives ont affecté les rendements dans certaines régions, entraînant une hausse des prix pour les céréales',
      source: 'Ministère de l\'Agriculture',
      date: '27/07/2023'
    },
    {
      title: 'Nouvelle politique d\'exportation',
      description: 'Le gouvernement assouplit les restrictions d\'exportation pour certains produits agricoles',
      source: 'Bureau du Commerce',
      date: '25/07/2023'
    },
    {
      title: 'Tendances de consommation urbaine',
      description: 'Augmentation de la demande pour les produits agricoles biologiques dans les zones urbaines',
      source: 'Étude de marché AgriResearch',
      date: '20/07/2023'
    }
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <h1 className="text-2xl font-bold mb-6">
        Prix du Marché Agricole
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Produits en hausse</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="flex items-center text-green-500 mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-xs">Opportunités de vente</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Produits en baisse</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex items-center text-red-500 mt-1">
              <TrendingDown className="h-4 w-4 mr-1" />
              <span className="text-xs">Considérer le stockage</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Prix moyen (céréales)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,050 BIF/kg</div>
            <div className="flex items-center text-green-500 mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-xs">+5.2% ce mois</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Alertes de marché</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex items-center text-amber-500 mt-1">
              <Bell className="h-4 w-4 mr-1" />
              <span className="text-xs">Mises à jour importantes</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Tendances des prix actuels</CardTitle>
          <CardDescription>
            Comparaison des prix sur le marché agricole (dernière mise à jour: Aujourd'hui)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium">Produit</th>
                  <th className="text-left py-3 font-medium">Prix actuel</th>
                  <th className="text-left py-3 font-medium">Prix précédent</th>
                  <th className="text-left py-3 font-medium">Variation</th>
                  <th className="text-left py-3 font-medium">Tendance</th>
                  <th className="text-left py-3 font-medium">Prévision</th>
                </tr>
              </thead>
              <tbody>
                {marketPrices.map((item, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3 font-medium">{item.product}</td>
                    <td className="py-3">{item.currentPrice}</td>
                    <td className="py-3">{item.previousPrice}</td>
                    <td className="py-3">
                      <span className={`${
                        item.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {item.change}
                      </span>
                    </td>
                    <td className="py-3">
                      {item.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </td>
                    <td className="py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        item.forecast === 'up' 
                          ? 'bg-green-100 text-green-800' 
                          : item.forecast === 'down'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.forecast === 'up' 
                          ? 'Hausse' 
                          : item.forecast === 'down' 
                            ? 'Baisse' 
                            : 'Stable'
                        }
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Alertes de marché</CardTitle>
            <CardDescription>
              Informations importantes sur les tendances du marché
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketAlerts.map((alert, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg ${
                    alert.type === 'opportunity' 
                      ? 'bg-green-50 border-l-4 border-green-500' 
                      : 'bg-amber-50 border-l-4 border-amber-500'
                  }`}
                >
                  <div className="flex flex-col">
                    <h4 className={`font-medium ${
                      alert.type === 'opportunity' ? 'text-green-700' : 'text-amber-700'
                    }`}>
                      {alert.product}
                    </h4>
                    <p className="text-sm mt-1">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Régions à prix avantageux</CardTitle>
            <CardDescription>
              Où vendre vos produits au meilleur prix
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-green-50 p-4 rounded-lg">
                <div>
                  <h4 className="font-medium">Maïs</h4>
                  <p className="text-sm text-muted-foreground">Province de Bujumbura</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-700">950 BIF/kg</div>
                  <div className="text-xs text-green-600">+30 BIF vs. marché local</div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-green-50 p-4 rounded-lg">
                <div>
                  <h4 className="font-medium">Tomates</h4>
                  <p className="text-sm text-muted-foreground">Marché central de Gitega</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-700">1,600 BIF/kg</div>
                  <div className="text-xs text-green-600">+100 BIF vs. marché local</div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-green-50 p-4 rounded-lg">
                <div>
                  <h4 className="font-medium">Riz</h4>
                  <p className="text-sm text-muted-foreground">Exportateurs à Ngozi</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-700">1,900 BIF/kg</div>
                  <div className="text-xs text-green-600">+100 BIF vs. marché local</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perspectives du marché</CardTitle>
          <CardDescription>
            Analyses et tendances futures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {marketInsights.map((insight, index) => (
              <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div className="mb-2 md:mb-0">
                    <h4 className="font-medium">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {insight.description}
                    </p>
                  </div>
                  <div className="md:ml-4 text-sm text-muted-foreground md:text-right flex flex-col items-start md:items-end">
                    <span>{insight.source}</span>
                    <span>{insight.date}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <Button variant="link" className="p-0 h-auto text-agri">
                    Lire le rapport complet <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Voir toutes les analyses de marché
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default FarmerMarket;
