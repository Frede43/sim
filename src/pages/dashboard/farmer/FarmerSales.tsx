
import React from 'react';
import { 
  Home, 
  Wheat, 
  CreditCard, 
  TrendingUp, 
  ShoppingCart,
  Users,
  Calendar,
  FileText,
  Search
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { farmerApi } from '@/services/api/farmerApi';

interface Sale {
  id: string;
  date: string;
  product: string;
  quantity: string;
  buyer: string;
  amount: string;
  status: string;
}

interface Order {
  id: string;
  date: string;
  product: string;
  quantity: string;
  buyer: string;
  amount: string;
  status: string;
}

const FarmerSales = (): JSX.Element => {
  const { user } = useAuth();

  const { data: sales, isLoading } = useQuery({
    queryKey: ['sales', user?.id],
    queryFn: () => farmerApi.getSales(user?.id as string),
    enabled: !!user?.id
  });

  const recentSales = sales || [
    {
      id: "S-001",
      date: "15/07/2023",
      product: "Maïs",
      quantity: "100 kg",
      buyer: "Coopérative Abahinzi",
      amount: "90,000 BIF",
      status: "Payé"
    },
    {
      id: "S-002",
      date: "18/07/2023",
      product: "Haricots",
      quantity: "50 kg",
      buyer: "Marché local",
      amount: "60,000 BIF",
      status: "Payé"
    },
    {
      id: "S-003",
      date: "22/07/2023",
      product: "Maïs",
      quantity: "150 kg",
      buyer: "Exportateur RegioTrade",
      amount: "135,000 BIF",
      status: "En attente"
    },
    {
      id: "S-004",
      date: "25/07/2023",
      product: "Tomates",
      quantity: "80 kg",
      buyer: "Restaurant Saveurs",
      amount: "120,000 BIF",
      status: "Payé"
    },
    {
      id: "S-005",
      date: "28/07/2023",
      product: "Pommes de terre",
      quantity: "200 kg",
      buyer: "Marché Central",
      amount: "140,000 BIF",
      status: "En attente"
    }
  ];

  const pendingOrders: Order[] = [
    {
      id: "O-001",
      date: "01/08/2023",
      product: "Maïs",
      quantity: "200 kg",
      buyer: "Moulin Gitega",
      amount: "180,000 BIF",
      status: "À livrer"
    },
    {
      id: "O-002",
      date: "05/08/2023",
      product: "Haricots",
      quantity: "100 kg",
      buyer: "Exportateur RegioTrade",
      amount: "120,000 BIF",
      status: "À livrer"
    }
  ];

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Mes Ventes</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher une vente..."
              className="pl-8 w-full"
            />
          </div>
          <Button className="bg-agri hover:bg-agri/90">
            <FileText className="mr-2 h-4 w-4" /> Exporter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ventes du mois</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">545,000 BIF</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
              <span className="text-green-500 font-medium">+12%</span> vs. mois dernier
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Commandes actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">
              Valeur totale: 300,000 BIF
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">
              2 nouveaux ce mois-ci
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paiements en attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">275,000 BIF</div>
            <p className="text-xs text-amber-500 mt-1">
              2 paiements à recevoir
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Historique des ventes récentes</CardTitle>
          <CardDescription>
            Transactions des 30 derniers jours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium">Référence</th>
                  <th className="text-left py-3 font-medium">Date</th>
                  <th className="text-left py-3 font-medium">Produit</th>
                  <th className="text-left py-3 font-medium">Quantité</th>
                  <th className="text-left py-3 font-medium">Acheteur</th>
                  <th className="text-left py-3 font-medium">Montant</th>
                  <th className="text-left py-3 font-medium">Statut</th>
                  <th className="text-left py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((sale) => (
                  <tr key={sale.id} className="border-b last:border-0">
                    <td className="py-3 font-medium">{sale.id}</td>
                    <td className="py-3">{sale.date}</td>
                    <td className="py-3">{sale.product}</td>
                    <td className="py-3">{sale.quantity}</td>
                    <td className="py-3">{sale.buyer}</td>
                    <td className="py-3">{sale.amount}</td>
                    <td className="py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        sale.status === 'Payé' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {sale.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <Button variant="ghost" size="sm">
                        Détails
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Commandes à livrer</CardTitle>
          <CardDescription>
            Commandes en attente de livraison
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingOrders.length > 0 ? (
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <div key={order.id} className="bg-amber-50 p-4 rounded-lg">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="mb-3 md:mb-0">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-amber-500 mr-2" />
                        <span className="text-sm text-muted-foreground">Livraison prévue: {order.date}</span>
                      </div>
                      <h4 className="font-medium mt-1">
                        {order.product} - {order.quantity}
                      </h4>
                      <p className="text-sm mt-1">
                        <span className="font-medium">Client:</span> {order.buyer}
                      </p>
                      <p className="text-sm font-medium text-green-700 mt-1">
                        Montant: {order.amount}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Contacter l'acheteur
                      </Button>
                      <Button size="sm" className="bg-agri hover:bg-agri/90">
                        Marquer comme livré
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-8 text-muted-foreground">
              Aucune commande en attente de livraison
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerSales;
