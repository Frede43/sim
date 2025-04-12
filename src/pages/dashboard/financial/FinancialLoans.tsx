import React from 'react';
import { FileText, Search, Filter, Plus, CreditCard, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface Loan {
  id: string;
  borrower: string;
  type: string;
  amount: string;
  interest: string;
  duration: string;
  status: 'En cours' | 'En retard' | 'Remboursé';
}

const loans: Loan[] = [
  {
    id: 'L001',
    borrower: 'Coopérative Rizicole Imbo',
    type: 'Équipement',
    amount: '15,000,000 BIF',
    interest: '8%',
    duration: '24 mois',
    status: 'En cours',
  },
  {
    id: 'L002',
    borrower: 'Jean Ndayishimiye',
    type: 'Intrants',
    amount: '2,800,000 BIF',
    interest: '10%',
    duration: '12 mois',
    status: 'En retard',
  },
  {
    id: 'L003',
    borrower: 'Association Café Kayanza',
    type: 'Fonds de roulement',
    amount: '8,750,000 BIF',
    interest: '9%',
    duration: '18 mois',
    status: 'Remboursé',
  },
];

const FinancialLoans = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestion des prêts</h1>
          <p className="text-muted-foreground">
            Suivi et administration des prêts agricoles
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau prêt
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Prêts actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">312</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total en cours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Montant total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">850M BIF</div>
            <p className="text-xs text-green-500 mt-1">
              +12% ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taux de défaut
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2%</div>
            <p className="text-xs text-red-500 mt-1">
              +0.8% ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taux moyen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9.5%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Annuel
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des prêts</CardTitle>
          <CardDescription>
            Tous les prêts actifs et leur statut
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher un prêt..." className="pl-8" />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Emprunteur</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Montant</th>
                  <th className="px-6 py-3">Intérêt</th>
                  <th className="px-6 py-3">Durée</th>
                  <th className="px-6 py-3">Statut</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr key={loan.id} className="border-b">
                    <td className="px-6 py-4 font-medium">{loan.id}</td>
                    <td className="px-6 py-4">{loan.borrower}</td>
                    <td className="px-6 py-4">{loan.type}</td>
                    <td className="px-6 py-4">{loan.amount}</td>
                    <td className="px-6 py-4">{loan.interest}</td>
                    <td className="px-6 py-4">{loan.duration}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        loan.status === 'En cours' 
                          ? 'bg-green-100 text-green-800'
                          : loan.status === 'En retard'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {loan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <AlertCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Répartition des prêts</CardTitle>
            <CardDescription>
              Par type de financement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Équipement agricole', amount: '320M BIF', percentage: 40 },
                { name: 'Fonds de roulement', amount: '240M BIF', percentage: 30 },
                { name: 'Intrants', amount: '160M BIF', percentage: 20 },
                { name: 'Formation', amount: '80M BIF', percentage: 10 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm font-medium">{item.amount} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-primary" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance des remboursements</CardTitle>
            <CardDescription>
              Statistiques mensuelles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">Remboursements à temps</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">92%</div>
                  <div className="text-xs text-muted-foreground">+2.5% vs mois dernier</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-red-600">
                    <TrendingDown className="h-4 w-4" />
                    <span className="text-sm font-medium">Retards de paiement</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">8%</div>
                  <div className="text-xs text-muted-foreground">-1.2% vs mois dernier</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialLoans;
