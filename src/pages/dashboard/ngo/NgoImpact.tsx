
import React from 'react';
import { BarChart, AreaChart, PieChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout';

const NgoImpact = () => {
  const sidebarItems = [
    {
      icon: BarChart,
      label: 'Tableau de bord',
      href: '/dashboard/ngo',
    },
    {
      icon: BarChart,
      label: 'Impact',
      href: '/dashboard/ngo/impact',
      active: true,
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Analyse d'impact</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Bénéficiaires atteints</CardTitle>
              <CardDescription>Nombre total de personnes aidées</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-4xl font-bold">24,567</div>
              <p className="mt-4 text-sm text-muted-foreground">+12% par rapport à l'année précédente</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Rendement agricole</CardTitle>
              <CardDescription>Amélioration des rendements</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-4xl font-bold">+32%</div>
              <p className="mt-4 text-sm text-muted-foreground">Dans les zones d'intervention</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Réduction de la pauvreté</CardTitle>
              <CardDescription>Estimation de l'impact économique</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-4xl font-bold">18%</div>
              <p className="mt-4 text-sm text-muted-foreground">Réduction du taux de pauvreté</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Résultats par projet</CardTitle>
            <CardDescription>Indicateurs d'impact des projets principaux</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">Projet</th>
                    <th className="text-left p-2 font-medium">Région</th>
                    <th className="text-left p-2 font-medium">Bénéficiaires</th>
                    <th className="text-left p-2 font-medium">Impact économique</th>
                    <th className="text-left p-2 font-medium">Durabilité</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { project: 'Irrigation Gitega', region: 'Gitega', beneficiaries: '5,420', economic: '+28% revenus', sustainability: 'Élevée' },
                    { project: 'Semences Kirundo', region: 'Kirundo', beneficiaries: '3,800', economic: '+15% revenus', sustainability: 'Moyenne' },
                    { project: 'Formation Ngozi', region: 'Ngozi', beneficiaries: '2,150', economic: '+22% revenus', sustainability: 'Élevée' },
                    { project: 'Coopératives Bubanza', region: 'Bubanza', beneficiaries: '4,300', economic: '+19% revenus', sustainability: 'Élevée' },
                  ].map((item, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="p-2">{item.project}</td>
                      <td className="p-2">{item.region}</td>
                      <td className="p-2">{item.beneficiaries}</td>
                      <td className="p-2 text-green-600 font-medium">{item.economic}</td>
                      <td className="p-2">{item.sustainability}</td>
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

export default NgoImpact;
