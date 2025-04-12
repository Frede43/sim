import React from 'react';
import { Search, Filter, AlertCircle, Bell, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Alert {
  description: string;
  type: string;
  location: string;
  date: string;
  status: 'Urgent' | 'En cours' | 'Résolu';
  icon: typeof AlertCircle | typeof AlertTriangle | typeof CheckCircle2;
}

const alerts: Alert[] = [
  {
    description: 'Risque de sécheresse',
    type: 'Climatique',
    location: 'Gitega',
    date: '12/04/2024',
    status: 'Urgent',
    icon: AlertCircle,
  },
  {
    description: 'Maladie des cultures détectée',
    type: 'Sanitaire',
    location: 'Ngozi',
    date: '11/04/2024',
    status: 'En cours',
    icon: AlertTriangle,
  },
  {
    description: "Stock d'engrais faible",
    type: 'Logistique',
    location: 'Kirundo',
    date: '10/04/2024',
    status: 'Résolu',
    icon: CheckCircle2,
  },
];

const GovernmentAlerts = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Centre d'alertes</h1>
          <p className="text-muted-foreground">
            Gestion et suivi des alertes agricoles
          </p>
        </div>
        <Button>
          <Bell className="h-4 w-4 mr-2" />
          Configurer les alertes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Alertes actives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-red-500 mt-1">
              3 nécessitent une attention immédiate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Alertes résolues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-green-500 mt-1">
              Ce trimestre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Temps de résolution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48h</div>
            <p className="text-xs text-muted-foreground mt-1">
              En moyenne
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taux de résolution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-green-500 mt-1">
              Des alertes traitées
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des alertes</CardTitle>
          <CardDescription>
            Toutes les alertes actives et récentes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher une alerte..." className="pl-8" />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Localisation</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Statut</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4 font-medium">
                      <div className="flex items-center gap-2">
                        <alert.icon className={`h-4 w-4 ${
                          alert.status === 'Urgent' 
                            ? 'text-red-500'
                            : alert.status === 'En cours'
                              ? 'text-amber-500'
                              : 'text-green-500'
                        }`} />
                        {alert.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">{alert.type}</td>
                    <td className="px-6 py-4">{alert.location}</td>
                    <td className="px-6 py-4">{alert.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.status === 'Urgent' 
                          ? 'bg-red-100 text-red-800'
                          : alert.status === 'En cours'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {alert.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GovernmentAlerts;
