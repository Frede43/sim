
import React from 'react';
import { FileText, Download, Calendar, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/DashboardLayout';

const NgoReports = () => {
  const sidebarItems = [
    {
      icon: FileText,
      label: 'Tableau de bord',
      href: '/dashboard/ngo',
    },
    {
      icon: FileText,
      label: 'Rapports',
      href: '/dashboard/ngo/reports',
      active: true,
    },
  ];

  const reportsList = [
    { title: 'Rapport annuel d\'impact 2023', date: '15 Jan 2024', type: 'Impact', size: '4.2 MB' },
    { title: 'Résultats du projet d\'irrigation Gitega', date: '28 Fév 2024', type: 'Projet', size: '2.8 MB' },
    { title: 'Analyse des bénéficiaires Q1 2024', date: '10 Avr 2024', type: 'Bénéficiaires', size: '1.5 MB' },
    { title: 'Rapport financier trimestriel', date: '05 Avr 2024', type: 'Financier', size: '3.1 MB' },
    { title: 'Évaluation du programme de semences améliorées', date: '22 Mar 2024', type: 'Évaluation', size: '5.7 MB' },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Rapports et documents</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Période
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtrer
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
            <TabsTrigger value="projects">Projets</TabsTrigger>
            <TabsTrigger value="financial">Financiers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Documents récents</CardTitle>
                <CardDescription>Rapports et documents disponibles pour téléchargement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Titre</th>
                        <th className="text-left p-2 font-medium">Date</th>
                        <th className="text-left p-2 font-medium">Type</th>
                        <th className="text-left p-2 font-medium">Taille</th>
                        <th className="text-right p-2 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportsList.map((item, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="p-2 font-medium">{item.title}</td>
                          <td className="p-2 text-muted-foreground">{item.date}</td>
                          <td className="p-2">{item.type}</td>
                          <td className="p-2 text-muted-foreground">{item.size}</td>
                          <td className="p-2 text-right">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="impact">
            <Card>
              <CardHeader>
                <CardTitle>Rapports d'impact</CardTitle>
                <CardDescription>Analyses et rapports sur l'impact des programmes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Filtrez pour afficher uniquement les rapports d'impact
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Rapports de projets</CardTitle>
                <CardDescription>Documents liés aux projets spécifiques</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Filtrez pour afficher uniquement les rapports de projets
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <CardTitle>Rapports financiers</CardTitle>
                <CardDescription>Documents financiers et comptables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Filtrez pour afficher uniquement les rapports financiers
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Générer un rapport</CardTitle>
            <CardDescription>Créez des rapports personnalisés basés sur vos critères</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type de rapport</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option>Impact</option>
                    <option>Financier</option>
                    <option>Projet</option>
                    <option>Bénéficiaires</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Période</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option>Q1 2024</option>
                    <option>Q4 2023</option>
                    <option>Q3 2023</option>
                    <option>Année 2023</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Format</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>CSV</option>
                  </select>
                </div>
              </div>
              <Button className="w-full md:w-auto self-end">Générer le rapport</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NgoReports;
