
import React from 'react';
import { Users, Search, Filter, UserPlus, UserCheck, UserX } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';

const NgoBeneficiaries = () => {
  const sidebarItems = [
    {
      icon: Users,
      label: 'Tableau de bord',
      href: '/dashboard/ngo',
    },
    {
      icon: Users,
      label: 'Bénéficiaires',
      href: '/dashboard/ngo/beneficiaries',
      active: true,
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Gestion des bénéficiaires</h1>
            <p className="text-muted-foreground">
              Suivi des agriculteurs et coopératives bénéficiant de nos programmes
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un bénéficiaire..."
                className="pl-8 pr-4 py-2 w-full rounded-md border border-input bg-background"
              />
            </div>
            <Button variant="outline" className="gap-1">
              <Filter className="h-4 w-4" />
              Filtrer
            </Button>
            <Button className="gap-1">
              <UserPlus className="h-4 w-4" />
              Ajouter
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total des bénéficiaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,486</div>
              <p className="text-xs text-muted-foreground mt-1">
                +156 ce trimestre
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Coopératives soutenues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground mt-1">
                Dans 12 provinces
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Agriculteurs individuels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,235</div>
              <p className="text-xs text-muted-foreground mt-1">
                Dont 45% de femmes
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Liste des bénéficiaires</CardTitle>
            <CardDescription>
              Agriculteurs et coopératives soutenus par nos programmes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">Nom</th>
                    <th className="text-left p-2 font-medium">Type</th>
                    <th className="text-left p-2 font-medium">Région</th>
                    <th className="text-left p-2 font-medium">Programme</th>
                    <th className="text-left p-2 font-medium">Statut</th>
                    <th className="text-left p-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: 'Jean Niyonzima',
                      type: 'Individuel',
                      region: 'Gitega',
                      program: 'Développement durable',
                      status: 'Actif',
                    },
                    {
                      name: 'Coopérative Abahizi',
                      type: 'Coopérative',
                      region: 'Ngozi',
                      program: 'Accès au marché',
                      status: 'Actif',
                    },
                    {
                      name: 'Marie Hakizimana',
                      type: 'Individuel',
                      region: 'Kirundo',
                      program: 'Formation agricole',
                      status: 'En attente',
                    },
                    {
                      name: 'Pierre Nduwimana',
                      type: 'Individuel',
                      region: 'Kayanza',
                      program: 'Microfinance',
                      status: 'Actif',
                    },
                    {
                      name: 'Coopérative Terimbere',
                      type: 'Coopérative',
                      region: 'Cibitoke',
                      program: 'Irrigation',
                      status: 'Actif',
                    },
                    {
                      name: 'Jeanne Uwimana',
                      type: 'Individuel',
                      region: 'Bujumbura Rural',
                      program: 'Formation agricole',
                      status: 'Inactif',
                    },
                  ].map((beneficiary, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="p-2">{beneficiary.name}</td>
                      <td className="p-2">{beneficiary.type}</td>
                      <td className="p-2">{beneficiary.region}</td>
                      <td className="p-2">{beneficiary.program}</td>
                      <td className="p-2">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          beneficiary.status === 'Actif' 
                            ? 'bg-green-100 text-green-800' 
                            : beneficiary.status === 'En attente'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {beneficiary.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <UserCheck className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <UserX className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-muted-foreground">
                Affichage de 1-6 sur 2,486 bénéficiaires
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" disabled>
                  Précédent
                </Button>
                <Button size="sm" variant="outline">
                  Suivant
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Répartition par programme</CardTitle>
              <CardDescription>Distribution des bénéficiaires par type de programme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { program: 'Formation agricole', count: 850, percentage: 35 },
                { program: 'Accès au marché', count: 620, percentage: 25 },
                { program: 'Microfinance', count: 450, percentage: 18 },
                { program: 'Irrigation', count: 320, percentage: 13 },
                { program: 'Développement durable', count: 246, percentage: 9 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{item.program}</span>
                    <span className="text-sm text-muted-foreground">{item.count} bénéficiaires ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Nouveaux bénéficiaires</CardTitle>
              <CardDescription>Derniers agriculteurs ajoutés au programme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: 'Alice Nishimwe',
                    date: '28/10/2023',
                    program: 'Formation agricole',
                    region: 'Muyinga',
                  },
                  {
                    name: 'Coopérative Twizere',
                    date: '25/10/2023',
                    program: 'Accès au marché',
                    region: 'Bubanza',
                  },
                  {
                    name: 'Emmanuel Manirambona',
                    date: '22/10/2023',
                    program: 'Microfinance',
                    region: 'Rumonge',
                  },
                  {
                    name: 'Françoise Iradukunda',
                    date: '20/10/2023',
                    program: 'Développement durable',
                    region: 'Makamba',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <UserPlus className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.program} • {item.region}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NgoBeneficiaries;
