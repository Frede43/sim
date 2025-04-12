import React from 'react';
import { Search, Filter, Plus, DollarSign, Users, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Subsidy {
  beneficiary: string;
  type: string;
  amount: string;
  date: string;
  status: 'Approuvé' | 'En attente' | 'Refusé';
}

interface StatItem {
  title: string;
  value: string;
  description: string;
  trend: 'positive' | 'negative' | 'neutral';
}

const subsidies: Subsidy[] = [
  {
    beneficiary: 'Coopérative Abahizi',
    type: 'Équipement',
    amount: '2.5M BIF',
    date: '12/04/2024',
    status: 'Approuvé',
  },
  {
    beneficiary: 'Jean Niyonzima',
    type: 'Intrants',
    amount: '850K BIF',
    date: '11/04/2024',
    status: 'En attente',
  },
  {
    beneficiary: 'Marie Hakizimana',
    type: 'Formation',
    amount: '1.2M BIF',
    date: '10/04/2024',
    status: 'Approuvé',
  },
];

const stats: StatItem[] = [
  { 
    title: 'Productivité',
    value: '+28%',
    description: 'Augmentation moyenne',
    trend: 'positive'
  },
  { 
    title: 'Revenus',
    value: '+35%',
    description: 'Pour les bénéficiaires',
    trend: 'positive'
  },
  { 
    title: 'Adoption',
    value: '92%',
    description: "Taux d'utilisation",
    trend: 'neutral'
  },
  { 
    title: 'Satisfaction',
    value: '4.5/5',
    description: 'Note moyenne',
    trend: 'positive'
  },
];

const GovernmentSubsidies = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestion des subventions</h1>
          <p className="text-muted-foreground">
            Suivi et attribution des subventions agricoles
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle subvention
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Budget total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25.5M BIF</div>
            <p className="text-xs text-muted-foreground mt-1">
              Pour l'année en cours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Subventions attribuées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.2M BIF</div>
            <p className="text-xs text-green-500 mt-1">
              71% du budget utilisé
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bénéficiaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground mt-1">
              Agriculteurs et coopératives
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Demandes en attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-amber-500 mt-1">
              À examiner
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des subventions</CardTitle>
          <CardDescription>
            Toutes les subventions attribuées et en attente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher une subvention..." className="pl-8" />
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
                  <th className="px-6 py-3">Bénéficiaire</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Montant</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Statut</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subsidies.map((subsidy, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4 font-medium">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {subsidy.beneficiary}
                      </div>
                    </td>
                    <td className="px-6 py-4">{subsidy.type}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        {subsidy.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4">{subsidy.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        subsidy.status === 'Approuvé' 
                          ? 'bg-green-100 text-green-800'
                          : subsidy.status === 'En attente'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {subsidy.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <XCircle className="h-4 w-4" />
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
            <CardTitle>Répartition des subventions</CardTitle>
            <CardDescription>
              Par type de soutien
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Équipement agricole', amount: '8.5M BIF', percentage: 35, color: 'bg-blue-500' },
                { name: 'Intrants', amount: '6.2M BIF', percentage: 25, color: 'bg-green-500' },
                { name: 'Formation', amount: '4.8M BIF', percentage: 20, color: 'bg-amber-500' },
                { name: 'Infrastructure', amount: '3.6M BIF', percentage: 15, color: 'bg-purple-500' },
                { name: 'Autres', amount: '1.2M BIF', percentage: 5, color: 'bg-gray-500' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm font-medium">{item.amount} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${item.color}`} 
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
            <CardTitle>Impact des subventions</CardTitle>
            <CardDescription>
              Indicateurs de performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="font-medium text-sm">{stat.title}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GovernmentSubsidies;
