import React from 'react';
import { Filter, Layers, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const GovernmentMap = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Carte de distribution</h1>
          <p className="text-muted-foreground">
            Répartition géographique des activités agricoles
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Layers className="h-4 w-4 mr-2" />
            Couches
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Provinces couvertes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18/18</div>
            <p className="text-xs text-muted-foreground mt-1">
              Couverture nationale complète
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Points de distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground mt-1">
              Centres de collecte et marchés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Zones agricoles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,280 ha</div>
            <p className="text-xs text-muted-foreground mt-1">
              Surfaces cultivées tracées
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Carte interactive</CardTitle>
          <CardDescription>
            Visualisation des activités agricoles au Burundi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 rounded-lg h-[600px] flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Carte interactive en cours de chargement...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Légende</CardTitle>
            <CardDescription>
              Types d'activités et installations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { color: 'bg-green-500', label: 'Zones de culture' },
                { color: 'bg-blue-500', label: 'Points de distribution' },
                { color: 'bg-amber-500', label: 'Marchés' },
                { color: 'bg-purple-500', label: 'Centres de formation' },
                { color: 'bg-red-500', label: 'Zones à risque' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${item.color}`} />
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistiques par région</CardTitle>
            <CardDescription>
              Données clés par province
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Gitega', farmers: '4,521', area: '8,450 ha' },
                { name: 'Ngozi', farmers: '3,845', area: '7,250 ha' },
                { name: 'Kirundo', farmers: '3,254', area: '6,120 ha' },
                { name: 'Muyinga', farmers: '2,965', area: '5,840 ha' },
                { name: 'Kayanza', farmers: '2,745', area: '5,420 ha' },
              ].map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b last:border-0">
                  <span className="font-medium">{item.name}</span>
                  <div className="text-right">
                    <div className="text-sm">{item.farmers} agriculteurs</div>
                    <div className="text-xs text-muted-foreground">{item.area}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GovernmentMap;
