import React from 'react';
import { FileText, Download, ArrowUpDown, FileBarChart, FileClock, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CooperativeReports = () => {
  const sidebarItems = [
    {
      icon: FileText,
      label: 'Tableau de bord',
      href: '/dashboard/cooperative',
    },
    {
      icon: FileText,
      label: 'Rapports',
      href: '/dashboard/cooperative/reports',
      active: true,
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Rapports et documentation</h1>
          <Button>Générer un nouveau rapport</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Rapports mensuels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">
                Sur les 12 derniers mois
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Rapports aux autorités
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground mt-1">
                Rapports trimestriels
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Documents partagés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground mt-1">
                Avec les membres
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Rapports récents</CardTitle>
              <CardDescription>
                Liste des rapports générés par la coopérative
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <ArrowUpDown className="h-4 w-4" />
              Trier
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: 'Rapport mensuel de production - Août 2023',
                  type: 'Mensuel',
                  icon: FileBarChart,
                  date: '05/09/2023',
                  size: '2.4 MB',
                },
                {
                  title: 'Rapport trimestriel pour le Ministère de l\'Agriculture (Q3)',
                  type: 'Trimestriel',
                  icon: FileBarChart,
                  date: '10/10/2023',
                  size: '4.1 MB',
                },
                {
                  title: 'Distribution des subventions - Juillet-Septembre',
                  type: 'Financier',
                  icon: FileText,
                  date: '15/10/2023',
                  size: '1.8 MB',
                },
                {
                  title: 'Inventaire des récoltes - Septembre 2023',
                  type: 'Inventaire',
                  icon: FileText,
                  date: '02/10/2023',
                  size: '3.2 MB',
                },
                {
                  title: 'Plan agricole pour la saison des pluies',
                  type: 'Planification',
                  icon: FileClock,
                  date: '28/09/2023',
                  size: '5.7 MB',
                },
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <report.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{report.title}</p>
                      <p className="text-xs text-muted-foreground">{report.type} • {report.date} • {report.size}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="gap-1">
                    <Download className="h-4 w-4" />
                    Télécharger
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Planification des rapports</CardTitle>
            <CardDescription>Calendrier des prochains rapports à préparer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: 'Rapport mensuel de production - Octobre 2023',
                  deadline: '05/11/2023',
                  status: 'À venir',
                  daysLeft: 12,
                },
                {
                  title: 'Rapport sur l\'utilisation des subventions',
                  deadline: '15/11/2023',
                  status: 'À venir',
                  daysLeft: 22,
                },
                {
                  title: 'Planification de la récolte du manioc',
                  deadline: '10/11/2023',
                  status: 'En cours',
                  daysLeft: 17,
                },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">Échéance: {item.deadline}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                      {item.daysLeft} jours restants
                    </span>
                    <Button size="sm">Commencer</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default CooperativeReports;
