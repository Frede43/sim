
import React from 'react';
import { MapPin, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/DashboardLayout';

const NgoMap = () => {
  const sidebarItems = [
    {
      icon: MapPin,
      label: 'Tableau de bord',
      href: '/dashboard/ngo',
    },
    {
      icon: MapPin,
      label: 'Carte d\'intervention',
      href: '/dashboard/ngo/map',
      active: true,
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Carte des interventions</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher une région..."
                className="w-[250px] pl-8"
              />
            </div>
            <Button variant="outline">Filtrer</Button>
          </div>
        </div>
        
        <Card className="border">
          <CardHeader>
            <CardTitle>Carte du Burundi</CardTitle>
            <CardDescription>Localisations des projets et interventions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground border border-dashed rounded-md">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p>Carte interactive du Burundi montrant les zones d'intervention</p>
                <p className="text-sm text-muted-foreground mt-1">
                  (Affichage de la carte non disponible en prévisualisation)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Régions actives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Gitega</span>
                  <span className="font-medium">6 projets</span>
                </div>
                <div className="flex justify-between">
                  <span>Ngozi</span>
                  <span className="font-medium">4 projets</span>
                </div>
                <div className="flex justify-between">
                  <span>Kirundo</span>
                  <span className="font-medium">3 projets</span>
                </div>
                <div className="flex justify-between">
                  <span>Bubanza</span>
                  <span className="font-medium">5 projets</span>
                </div>
                <div className="flex justify-between">
                  <span>Kayanza</span>
                  <span className="font-medium">2 projets</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Partenaires locaux</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Coopérative Imbo</span>
                  <span className="font-medium">Bubanza</span>
                </div>
                <div className="flex justify-between">
                  <span>Association de femmes Kirundo</span>
                  <span className="font-medium">Kirundo</span>
                </div>
                <div className="flex justify-between">
                  <span>Union des riziculteurs</span>
                  <span className="font-medium">Gitega</span>
                </div>
                <div className="flex justify-between">
                  <span>Association des caféiculteurs</span>
                  <span className="font-medium">Ngozi</span>
                </div>
                <div className="flex justify-between">
                  <span>Coopérative de thé</span>
                  <span className="font-medium">Kayanza</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Couverture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-sm">
                    <span>Provinces couvertes</span>
                    <span className="font-medium">8/18</span>
                  </div>
                  <div className="bg-muted rounded-full h-2">
                    <div className="bg-primary rounded-full h-2" style={{ width: '44%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-sm">
                    <span>Population atteinte</span>
                    <span className="font-medium">31%</span>
                  </div>
                  <div className="bg-muted rounded-full h-2">
                    <div className="bg-primary rounded-full h-2" style={{ width: '31%' }}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-sm">
                    <span>Zones rurales</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="bg-muted rounded-full h-2">
                    <div className="bg-primary rounded-full h-2" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NgoMap;
