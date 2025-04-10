
import React from 'react';
import { Users, Search, Filter, Plus, UserCheck, UserX } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/DashboardLayout';

const FinancialBorrowers = () => {
  const sidebarItems = [
    {
      icon: Users,
      label: 'Tableau de bord',
      href: '/dashboard/financial',
    },
    {
      icon: Users,
      label: 'Emprunteurs',
      href: '/dashboard/financial/borrowers',
      active: true,
    },
  ];

  const borrowers = [
    { name: 'Coopérative Rizicole Imbo', type: 'Coopérative', location: 'Bubanza', loans: 3, amount: '24,500,000 BIF', risk: 'Faible' },
    { name: 'Jean Ndayishimiye', type: 'Agriculteur', location: 'Gitega', loans: 1, amount: '2,800,000 BIF', risk: 'Moyen' },
    { name: 'Association Café Kayanza', type: 'Association', location: 'Kayanza', loans: 2, amount: '8,750,000 BIF', risk: 'Faible' },
    { name: 'Marie Niyonzima', type: 'Agricultrice', location: 'Ngozi', loans: 1, amount: '1,500,000 BIF', risk: 'Faible' },
    { name: 'Coopérative Maïs Kirundo', type: 'Coopérative', location: 'Kirundo', loans: 2, amount: '12,300,000 BIF', risk: 'Élevé' },
    { name: 'Pierre Nkurunziza', type: 'Agriculteur', location: 'Makamba', loans: 1, amount: '3,200,000 BIF', risk: 'Moyen' },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestion des emprunteurs</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel emprunteur
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un emprunteur..."
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
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="active">Actifs</TabsTrigger>
            <TabsTrigger value="risk">À risque</TabsTrigger>
            <TabsTrigger value="pending">En attente</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Liste des emprunteurs</CardTitle>
                <CardDescription>Gestion des clients et des emprunteurs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Nom</th>
                        <th className="text-left p-2 font-medium">Type</th>
                        <th className="text-left p-2 font-medium">Localisation</th>
                        <th className="text-left p-2 font-medium">Prêts actifs</th>
                        <th className="text-left p-2 font-medium">Montant total</th>
                        <th className="text-left p-2 font-medium">Niveau de risque</th>
                        <th className="text-right p-2 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {borrowers.map((borrower, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="p-2 font-medium">{borrower.name}</td>
                          <td className="p-2">{borrower.type}</td>
                          <td className="p-2">{borrower.location}</td>
                          <td className="p-2">{borrower.loans}</td>
                          <td className="p-2">{borrower.amount}</td>
                          <td className="p-2">
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              borrower.risk === 'Faible' ? 'bg-green-100 text-green-700' :
                              borrower.risk === 'Moyen' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {borrower.risk}
                            </span>
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
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>Emprunteurs actifs</CardTitle>
                  <CardDescription>Clients avec des prêts en cours</CardDescription>
                </div>
                <UserCheck className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Filtrez pour afficher uniquement les emprunteurs actifs
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="risk" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>Emprunteurs à risque</CardTitle>
                  <CardDescription>Clients présentant un risque élevé de défaut</CardDescription>
                </div>
                <UserX className="h-5 w-5 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Filtrez pour afficher uniquement les emprunteurs à risque
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Demandes en attente</CardTitle>
                <CardDescription>Nouvelles demandes à évaluer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Filtrez pour afficher uniquement les demandes en attente d'approbation
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Répartition par type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Agriculteurs individuels</span>
                  <span className="font-medium">42%</span>
                </div>
                <div className="flex justify-between">
                  <span>Coopératives</span>
                  <span className="font-medium">38%</span>
                </div>
                <div className="flex justify-between">
                  <span>Associations</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="flex justify-between">
                  <span>Entreprises agricoles</span>
                  <span className="font-medium">5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Répartition par région</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Bubanza</span>
                  <span className="font-medium">22%</span>
                </div>
                <div className="flex justify-between">
                  <span>Gitega</span>
                  <span className="font-medium">18%</span>
                </div>
                <div className="flex justify-between">
                  <span>Kayanza</span>
                  <span className="font-medium">16%</span>
                </div>
                <div className="flex justify-between">
                  <span>Autres provinces</span>
                  <span className="font-medium">44%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Analyse des risques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Risque faible</span>
                  <span className="font-medium">65%</span>
                </div>
                <div className="flex justify-between">
                  <span>Risque moyen</span>
                  <span className="font-medium">27%</span>
                </div>
                <div className="flex justify-between">
                  <span>Risque élevé</span>
                  <span className="font-medium">8%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinancialBorrowers;
