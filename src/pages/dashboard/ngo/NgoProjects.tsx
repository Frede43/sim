
import React from 'react';
import { FolderOpen, Calendar, DollarSign, BarChart, PlusCircle, Calendar as CalendarIcon, Clipboard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';

const NgoProjects = () => {
  const sidebarItems = [
    {
      icon: FolderOpen,
      label: 'Tableau de bord',
      href: '/dashboard/ngo',
    },
    {
      icon: FolderOpen,
      label: 'Projets',
      href: '/dashboard/ngo/projects',
      active: true,
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestion des projets</h1>
          <Button className="gap-1">
            <PlusCircle className="h-4 w-4" />
            Nouveau projet
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Projets actifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground mt-1">
                Dans 8 provinces
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Budget total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.5M $</div>
              <p className="text-xs text-muted-foreground mt-1">
                Pour l'année 2023
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Projets en préparation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground mt-1">
                À démarrer ce trimestre
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Projets complétés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground mt-1">
                Depuis 2020
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Projets en cours</CardTitle>
            <CardDescription>Liste des projets actifs de l'ONG</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  title: 'Renforcement des capacités agricoles dans le Nord',
                  location: 'Provinces de Ngozi et Kirundo',
                  budget: '450,000 $',
                  progress: 75,
                  startDate: '02/2023',
                  endDate: '12/2023',
                  partners: 'Ministère de l\'Agriculture, FAO',
                },
                {
                  title: 'Accès au marché pour les producteurs de café',
                  location: 'Province de Kayanza',
                  budget: '320,000 $',
                  progress: 60,
                  startDate: '04/2023',
                  endDate: '03/2024',
                  partners: 'Fédération des Caficulteurs, Banque Mondiale',
                },
                {
                  title: 'Irrigation des terres agricoles de l\'Est',
                  location: 'Provinces de Cankuzo et Ruyigi',
                  budget: '520,000 $',
                  progress: 40,
                  startDate: '06/2023',
                  endDate: '05/2024',
                  partners: 'USAID, Direction de l\'Hydraulique',
                },
                {
                  title: 'Formation aux techniques agricoles durables',
                  location: 'Toutes les provinces',
                  budget: '280,000 $',
                  progress: 85,
                  startDate: '01/2023',
                  endDate: '12/2023',
                  partners: 'Écoles agricoles, UNICEF',
                },
                {
                  title: 'Soutien à la filière maraîchère',
                  location: 'Provinces de Bujumbura et Bubanza',
                  budget: '180,000 $',
                  progress: 30,
                  startDate: '08/2023',
                  endDate: '07/2024',
                  partners: 'Coopératives maraîchères, GIZ',
                },
              ].map((project, index) => (
                <div key={index} className="bg-muted/20 p-4 rounded-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2">
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mt-2">
                        <div className="flex items-start gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">Période</p>
                            <p className="text-sm">{project.startDate} - {project.endDate}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">Budget</p>
                            <p className="text-sm">{project.budget}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <FolderOpen className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">Localisation</p>
                            <p className="text-sm">{project.location}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clipboard className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">Partenaires</p>
                            <p className="text-sm">{project.partners}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Progression:</span>
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-full h-2.5">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          Détails
                        </Button>
                        <Button size="sm" className="flex-1">
                          Gérer
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendrier des projets</CardTitle>
              <CardDescription>Planning des activités à venir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    event: 'Lancement du projet d\'irrigation à Ruyigi',
                    date: '15/11/2023',
                    type: 'Lancement',
                    daysLeft: 12,
                  },
                  {
                    event: 'Formation des agriculteurs à Ngozi',
                    date: '22/11/2023',
                    type: 'Formation',
                    daysLeft: 19,
                  },
                  {
                    event: 'Évaluation mi-parcours - Projet Café',
                    date: '30/11/2023',
                    type: 'Évaluation',
                    daysLeft: 27,
                  },
                  {
                    event: 'Distribution d\'équipements agricoles',
                    date: '05/12/2023',
                    type: 'Distribution',
                    daysLeft: 32,
                  },
                ].map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{event.event}</p>
                        <p className="text-xs text-muted-foreground">{event.date} • {event.type}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted">
                      Dans {event.daysLeft} jours
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Répartition budgétaire</CardTitle>
              <CardDescription>Allocation des fonds par catégorie</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-6">
                <BarChart className="h-48 w-48 text-muted-foreground" />
              </div>
              <div className="space-y-3">
                {[
                  { category: 'Formation et renforcement des capacités', amount: '850,000 $', percentage: 34 },
                  { category: 'Infrastructure et équipement', amount: '620,000 $', percentage: 25 },
                  { category: 'Soutien direct aux agriculteurs', amount: '450,000 $', percentage: 18 },
                  { category: 'Recherche et développement', amount: '320,000 $', percentage: 13 },
                  { category: 'Administration et coordination', amount: '260,000 $', percentage: 10 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.category}</span>
                      <span className="text-sm text-muted-foreground">{item.amount} ({item.percentage}%)</span>
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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NgoProjects;
