import React from 'react';
import { Users, Search, Filter, Plus, UserCheck, UserX } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Borrower {
  name: string;
  type: string;
  location: string;
  loans: number;
  amount: string;
  risk: 'Faible' | 'Moyen' | 'Élevé';
}

const borrowers: Borrower[] = [
  { name: 'Coopérative Rizicole Imbo', type: 'Coopérative', location: 'Bubanza', loans: 3, amount: '24,500,000 BIF', risk: 'Faible' },
  { name: 'Jean Ndayishimiye', type: 'Agriculteur', location: 'Gitega', loans: 1, amount: '2,800,000 BIF', risk: 'Moyen' },
  { name: 'Association Café Kayanza', type: 'Association', location: 'Kayanza', loans: 2, amount: '8,750,000 BIF', risk: 'Faible' },
  { name: 'Marie Niyonzima', type: 'Agricultrice', location: 'Ngozi', loans: 1, amount: '1,500,000 BIF', risk: 'Faible' },
  { name: 'Coopérative Maïs Kirundo', type: 'Coopérative', location: 'Kirundo', loans: 2, amount: '12,300,000 BIF', risk: 'Élevé' },
  { name: 'Pierre Nkurunziza', type: 'Agriculteur', location: 'Makamba', loans: 1, amount: '3,200,000 BIF', risk: 'Moyen' },
];

const FinancialBorrowers = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Emprunteurs</h1>
          <p className="text-muted-foreground">
            Gestion des emprunteurs et évaluation des risques
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvel emprunteur
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total emprunteurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground mt-1">
              Actifs ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Prêts en cours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">312</div>
            <p className="text-xs text-green-500 mt-1">
              +8% ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taux de remboursement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Sur 30 jours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Risque moyen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Faible</div>
            <p className="text-xs text-green-500 mt-1">
              Score global
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des emprunteurs</CardTitle>
          <CardDescription>
            Tous les emprunteurs actifs et leur profil de risque
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher un emprunteur..." className="pl-8" />
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
                  <th className="px-6 py-3">Nom</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Localisation</th>
                  <th className="px-6 py-3">Prêts actifs</th>
                  <th className="px-6 py-3">Montant total</th>
                  <th className="px-6 py-3">Risque</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {borrowers.map((borrower, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4 font-medium">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {borrower.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">{borrower.type}</td>
                    <td className="px-6 py-4">{borrower.location}</td>
                    <td className="px-6 py-4">{borrower.loans}</td>
                    <td className="px-6 py-4">{borrower.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        borrower.risk === 'Faible' 
                          ? 'bg-green-100 text-green-800'
                          : borrower.risk === 'Moyen'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {borrower.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <UserCheck className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <UserX className="h-4 w-4" />
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
    </div>
  );
};

export default FinancialBorrowers;
