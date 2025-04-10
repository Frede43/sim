
import React from 'react';
import { Map, Layers, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';

const GovernmentMap = () => {
  const sidebarItems = [
    {
      icon: Map,
      label: 'Tableau de bord',
      href: '/dashboard/government',
    },
    {
      icon: Map,
      label: 'Carte agricole',
      href: '/dashboard/government/map',
      active: true,
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Carte agricole nationale</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1">
              <Layers className="h-4 w-4" />
              Couches
            </Button>
            <Button variant="outline" className="gap-1">
              <Search className="h-4 w-4" />
              Rechercher
            </Button>
            <Button>Exporter la carte</Button>
          </div>
        </div>
        
        <Card className="border-2 border-dashed">
          <CardContent className="p-0">
            <div className="flex items-center justify-center bg-muted/20 h-[500px]">
              <div className="text-center">
                <Map className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">Carte interactive du Burundi</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Visualisation des zones agricoles et données de production
                </p>
                <Button>Charger la carte</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Légende</CardTitle>
              <CardDescription>Comprendre les données de la carte</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { color: 'bg-green-500', label: 'Terres fertiles' },
                  { color: 'bg-yellow-500', label: 'Zones de culture mixte' },
                  { color: 'bg-amber-700', label: 'Zones de pâturage' },
                  { color: 'bg-blue-500', label: 'Zones irrigables' },
                  { color: 'bg-red-500', label: 'Zones à risque (érosion)' },
                  { color: 'bg-purple-500', label: 'Projets agricoles en cours' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${item.color}`}></div>
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Filtres</CardTitle>
              <CardDescription>Personnaliser la visualisation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  'Zones de production',
                  'Coopératives agricoles',
                  'Types de cultures',
                  'Infrastructures agricoles',
                  'Limites administratives',
                  'Données pluviométriques',
                ].map((filter, index) => (
                  <div key={index} className="flex items-center">
                    <input type="checkbox" id={`filter-${index}`} className="mr-2" />
                    <label htmlFor={`filter-${index}`} className="text-sm">
                      {filter}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Statistiques de la carte</CardTitle>
              <CardDescription>Récapitulatif des données</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { label: 'Superficie totale', value: '27,834 km²' },
                  { label: 'Terres arables', value: '12,450 km²' },
                  { label: 'Zones cultivées', value: '9,320 km²' },
                  { label: 'Zones de pâturage', value: '3,540 km²' },
                  { label: 'Forêts', value: '1,720 km²' },
                  { label: 'Zones protégées', value: '870 km²' },
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm">{stat.label}:</span>
                    <span className="text-sm font-medium">{stat.value}</span>
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

export default GovernmentMap;
