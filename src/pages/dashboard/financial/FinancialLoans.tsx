
import React from 'react';
import { FileText, Search, Filter, Plus, CreditCard, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout';

const FinancialLoans = () => {
  const sidebarItems = [
    {
      icon: FileText,
      label: 'Tableau de bord',
      href: '/dashboard/financial',
    },
    {
      icon: FileText,
      label: 'Prêts',
      href: '/dashboard/financial/loans',
      active: true,
    },
  ];

  const loans = [
    { id: 'L-2024-001', borrower: 'Coopérative Rizicole Imbo', purpose: 'Équipement', amount: '8,500,000 BIF', issued: '15/01/2024', due: '15/01/2026', status: 'Actif', rate: '8.5%' },
    { id: 'L-2024-012', borrower: 'Jean Ndayishimiye', purpose: 'Semences', amount: '2,800,000 BIF', issued: '22/02/2024', due: '22/08/2024', status: 'Actif', rate: '7.5%' },
    { id: 'L-2023-089', borrower: 'Association Café Kayanza', purpose: 'Expansion', amount: '5,200,000 BIF', issued: '10/11/2023', due: '10/11/2025', status: 'Actif', rate: '9.0%' },
    { id: 'L-2024-018', borrower: 'Marie Niyonzima', purpose: 'Irrigation', amount: '1,500,000 BIF', issued: '05/03/2024', due: '05/09/2024', status: 'Actif', rate: '7.0%' },
    { id: 'L-2023-072', borrower: 'Coopérative Maïs Kirundo', purpose: 'Stockage', amount: '6,800,000 BIF', issued: '18/09/2023', due: '18/09/2025', status: 'Retard', rate: '8.75%' },
    { id: 'L-2023-094', borrower: 'Pierre Nkurunziza', purpose: 'Équipement', amount: '3,200,000 BIF', issued: '07/12/2023', due: '07/12/2024', status: 'Actif', rate: '7.5%' },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestion des prêts</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau prêt
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prêts actifs</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">234</div>
              <p className="text-xs text-muted-foreground">
                +12% depuis le mois dernier
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de remboursement</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92.4%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% depuis la dernière année
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Retards de paiement</CardTitle>
              <TrendingDown className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.6%</div>
              <p className="text-xs text-muted-foreground">
                -0.8% depuis le mois dernier
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Défauts de paiement</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.0%</div>
              <p className="text-xs text-muted-foreground">
                -0.3% depuis le trimestre dernier
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un prêt par ID ou emprunteur..."
              className="pl-8"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtrer
          </Button>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Tous les prêts</TabsTrigger>
            <TabsTrigger value="active">Actifs</TabsTrigger>
            <TabsTrigger value="late">En retard</TabsTrigger>
            <TabsTrigger value="completed">Remboursés</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Liste des prêts</CardTitle>
                <CardDescription>Tous les prêts agricoles actifs et historiques</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">ID</th>
                        <th className="text-left p-2 font-medium">Emprunteur</th>
                        <th className="text-left p-2 font-medium">Objet</th>
                        <th className="text-left p-2 font-medium">Montant</th>
                        <th className="text-left p-2 font-medium">Date d'émission</th>
                        <th className="text-left p-2 font-medium">Échéance</th>
                        <th className="text-left p-2 font-medium">Taux</th>
                        <th className="text-left p-2 font-medium">Statut</th>
                        <th className="text-right p-2 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loans.map((loan, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="p-2 font-medium">{loan.id}</td>
                          <td className="p-2">{loan.borrower}</td>
                          <td className="p-2">{loan.purpose}</td>
                          <td className="p-2">{loan.amount}</td>
                          <td className="p-2">{loan.issued}</td>
                          <td className="p-2">{loan.due}</td>
                          <td className="p-2">{loan.rate}</td>
                          <td className="p-2">
                            <Badge variant={loan.status === 'Actif' ? 'outline' : 'destructive'}>
                              {loan.status}
                            </Badge>
                          </td>
                          <td className="p-2 text-right">
                            <Button variant="ghost" size="sm">Voir</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="active" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Prêts actifs</CardTitle>
                <CardDescription>Prêts en cours de remboursement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Filtrez pour afficher uniquement les prêts actifs
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="late" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Prêts en retard</CardTitle>
                <CardDescription>Prêts avec des paiements en retard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Filtrez pour afficher uniquement les prêts en retard
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Prêts remboursés</CardTitle>
                <CardDescription>Historique des prêts complètement remboursés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Filtrez pour afficher uniquement les prêts remboursés
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Calendrier des paiements à venir</CardTitle>
            <CardDescription>Paiements prévus pour les 30 prochains jours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Coopérative Rizicole Imbo</p>
                  <p className="text-sm text-muted-foreground">Paiement mensuel: 425,000 BIF</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">15 Juin 2024</p>
                  <p className="text-sm text-muted-foreground">Dans 10 jours</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Jean Ndayishimiye</p>
                  <p className="text-sm text-muted-foreground">Paiement mensuel: 280,000 BIF</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">22 Juin 2024</p>
                  <p className="text-sm text-muted-foreground">Dans 17 jours</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Association Café Kayanza</p>
                  <p className="text-sm text-muted-foreground">Paiement mensuel: 260,000 BIF</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">10 Juin 2024</p>
                  <p className="text-sm text-muted-foreground">Dans 5 jours</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FinancialLoans;
