
import React from 'react';
import { BarChart, PieChart, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout';

const CooperativeStats = () => {
  const sidebarItems = [
    {
      icon: BarChart,
      label: 'Tableau de bord',
      href: '/dashboard/cooperative',
    },
    {
      icon: BarChart,
      label: 'Statistiques',
      href: '/dashboard/cooperative/stats',
      active: true,
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Statistiques de la coopérative</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Production Mensuelle</CardTitle>
              <CardDescription>Tendances de production par mois</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <BarChart className="h-40 w-40 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">Augmentation de 12% par rapport au mois précédent</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Répartition des cultures</CardTitle>
              <CardDescription>Types de cultures cultivées</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <PieChart className="h-40 w-40 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">5 cultures principales</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Calendrier agricole</CardTitle>
              <CardDescription>Planification des récoltes</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Calendar className="h-40 w-40 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">Prochaine récolte: dans 14 jours</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Rapport détaillé de production</CardTitle>
            <CardDescription>Données de production par membre</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">Membre</th>
                    <th className="text-left p-2 font-medium">Culture</th>
                    <th className="text-left p-2 font-medium">Production (kg)</th>
                    <th className="text-left p-2 font-medium">Période</th>
                    <th className="text-left p-2 font-medium">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { member: 'Jean Ndayishimiye', crop: 'Maïs', production: '2,500', period: 'Juin - Août', performance: '+15%' },
                    { member: 'Marie Niyonzima', crop: 'Haricots', production: '1,800', period: 'Mai - Juillet', performance: '+8%' },
                    { member: 'Pierre Mutabazi', crop: 'Pommes de terre', production: '3,200', period: 'Avril - Juin', performance: '+20%' },
                    { member: 'Jacqueline Iradukunda', crop: 'Manioc', production: '2,100', period: 'Mars - Juillet', performance: '+5%' },
                  ].map((item, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="p-2">{item.member}</td>
                      <td className="p-2">{item.crop}</td>
                      <td className="p-2">{item.production}</td>
                      <td className="p-2">{item.period}</td>
                      <td className="p-2 text-green-600 font-medium">{item.performance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CooperativeStats;
