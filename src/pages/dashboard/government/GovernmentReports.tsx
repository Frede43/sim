
import React from 'react';
import { FileText, Filter, Calendar, Download, ArrowUpDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';

const GovernmentReports = () => {
  const sidebarItems = [
    {
      icon: FileText,
      label: 'Tableau de bord',
      href: '/dashboard/government',
    },
    {
      icon: FileText,
      label: 'Rapports',
      href: '/dashboard/government/reports',
      active: true,
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Rapports et statistiques officiels</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1">
              <Filter className="h-4 w-4" />
              Filtres
            </Button>
            <Button>Générer un nouveau rapport</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Rapports publiés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78</div>
              <p className="text-xs text-muted-foreground mt-1">
                Depuis janvier 2023
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Rapports en attente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">
                À valider
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Collecte de données
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground mt-1">
                Sources actives
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Téléchargements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,450</div>
              <p className="text-xs text-muted-foreground mt-1">
                Ce trimestre
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Rapports officiels</CardTitle>
              <CardDescription>
                Rapports publiés par le Ministère de l'Agriculture
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Calendar className="h-4 w-4" />
                Période
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <ArrowUpDown className="h-4 w-4" />
                Trier
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: 'Rapport annuel sur la production agricole nationale 2022-2023',
                  category: 'Annuel',
                  date: '15/07/2023',
                  status: 'Publié',
                  size: '8.5 MB',
                },
                {
                  title: 'Rapport trimestriel sur les subventions agricoles (Q3 2023)',
                  category: 'Trimestriel',
                  date: '10/10/2023',
                  status: 'Publié',
                  size: '4.2 MB',
                },
                {
                  title: 'Étude sur l\'impact des changements climatiques sur l\'agriculture burundaise',
                  category: 'Étude',
                  date: '05/09/2023',
                  status: 'Publié',
                  size: '12.7 MB',
                },
                {
                  title: 'Rapport sur la distribution des semences améliorées',
                  category: 'Spécial',
                  date: '28/08/2023',
                  status: 'Publié',
                  size: '3.8 MB',
                },
                {
                  title: 'Statistiques des exportations agricoles 2023',
                  category: 'Statistique',
                  date: '20/10/2023',
                  status: 'En révision',
                  size: '6.1 MB',
                },
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div>
                    <p className="font-medium">{report.title}</p>
                    <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                      <span>{report.category}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                      <span>•</span>
                      <span className={report.status === 'Publié' ? 'text-green-600' : 'text-amber-600'}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    Télécharger
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Rapports par province</CardTitle>
              <CardDescription>Répartition des rapports par région</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { province: 'Bujumbura', reports: 15, percentage: 80 },
                  { province: 'Gitega', reports: 12, percentage: 65 },
                  { province: 'Ngozi', reports: 10, percentage: 55 },
                  { province: 'Cibitoke', reports: 8, percentage: 45 },
                  { province: 'Bubanza', reports: 7, percentage: 40 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.province}</span>
                      <span className="text-sm text-muted-foreground">{item.reports} rapports</span>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
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
              <CardTitle>Prochaines publications</CardTitle>
              <CardDescription>Calendrier des rapports à venir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: 'Rapport trimestriel sur la production agricole (Q4 2023)',
                    date: '15/01/2024',
                    daysLeft: 45,
                    status: 'En préparation',
                  },
                  {
                    title: 'Bilan des programmes de soutien aux agriculteurs',
                    date: '30/12/2023',
                    daysLeft: 30,
                    status: 'En préparation',
                  },
                  {
                    title: 'Étude sur la sécurité alimentaire dans les zones rurales',
                    date: '20/11/2023',
                    daysLeft: 10,
                    status: 'En finalisation',
                  },
                ].map((item, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="font-medium">{item.title}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-muted-foreground">
                        Publication prévue: {item.date}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.daysLeft <= 10 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {item.daysLeft} jours restants
                      </span>
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

export default GovernmentReports;
