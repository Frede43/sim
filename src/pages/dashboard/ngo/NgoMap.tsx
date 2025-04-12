import React from 'react';
import { MapPin, Search, Users, Building, Tractor, Home } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Location {
  id: string;
  name: string;
  type: 'cooperative' | 'village' | 'farm' | 'center';
  beneficiaries: number;
  status: 'active' | 'planned' | 'completed';
  coordinates: {
    lat: number;
    lng: number;
  };
}

const locations: Location[] = [
  {
    id: 'l1',
    name: 'Coopérative Rizicole Imbo',
    type: 'cooperative',
    beneficiaries: 250,
    status: 'active',
    coordinates: {
      lat: -3.3822,
      lng: 29.3644,
    },
  },
  {
    id: 'l2',
    name: 'Village Gitega',
    type: 'village',
    beneficiaries: 180,
    status: 'active',
    coordinates: {
      lat: -3.4270,
      lng: 29.9250,
    },
  },
  {
    id: 'l3',
    name: 'Ferme Modèle Kayanza',
    type: 'farm',
    beneficiaries: 45,
    status: 'planned',
    coordinates: {
      lat: -2.9224,
      lng: 29.6279,
    },
  },
];

const NgoMap = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Carte d'intervention</h1>
          <p className="text-muted-foreground">
            Localisation des projets et bénéficiaires
          </p>
        </div>
        <Button>
          <MapPin className="h-4 w-4 mr-2" />
          Ajouter un lieu
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sites actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-green-500 mt-1">
              +2 ce mois
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
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-green-500 mt-1">
              +120 ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Couverture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-amber-500 mt-1">
              Des zones cibles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sites planifiés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              Pour 2024
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Carte des interventions</CardTitle>
          <CardDescription>
            Vue d'ensemble des projets et bénéficiaires
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher un lieu..." className="pl-8" />
              </div>
            </div>
            <Button variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>

          <div className="h-[400px] bg-gray-100 rounded-lg mb-4">
            {/* Map component would go here */}
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Carte interactive
            </div>
          </div>

          <div className="space-y-4">
            {locations.map((location) => (
              <Card key={location.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${
                      location.type === 'cooperative'
                        ? 'bg-blue-100'
                        : location.type === 'village'
                          ? 'bg-green-100'
                          : 'bg-amber-100'
                    }`}>
                      {location.type === 'cooperative' && (
                        <Building className="h-4 w-4 text-blue-600" />
                      )}
                      {location.type === 'village' && (
                        <Home className="h-4 w-4 text-green-600" />
                      )}
                      {location.type === 'farm' && (
                        <Tractor className="h-4 w-4 text-amber-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{location.name}</h3>
                        <Badge variant={
                          location.status === 'active'
                            ? 'default'
                            : location.status === 'planned'
                              ? 'secondary'
                              : 'outline'
                        }>
                          {location.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Users className="h-4 w-4" />
                        {location.beneficiaries} bénéficiaires
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NgoMap;
