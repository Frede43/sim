
import React from 'react';
import { BellRing, AlertTriangle, Info, MessageSquare, Check, X, Bell, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/DashboardLayout';

const GovernmentAlerts = () => {
  const sidebarItems = [
    {
      icon: BellRing,
      label: 'Tableau de bord',
      href: '/dashboard/government',
    },
    {
      icon: BellRing,
      label: 'Alertes',
      href: '/dashboard/government/alerts',
      active: true,
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Système d'alertes agricoles</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1">
              <Filter className="h-4 w-4" />
              Filtrer
            </Button>
            <Button className="gap-1">
              <Bell className="h-4 w-4" />
              Nouvelle alerte
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Alertes actives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">
                Dont 3 critiques
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
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground mt-1">
                Ce mois-ci
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Temps de réponse moyen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2 jours</div>
              <p className="text-xs text-muted-foreground mt-1">
                -15% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Régions affectées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1">
                Sur 18 provinces
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">Toutes les alertes</TabsTrigger>
              <TabsTrigger value="critical">Alertes critiques</TabsTrigger>
              <TabsTrigger value="weather">Alertes météo</TabsTrigger>
              <TabsTrigger value="disease">Alertes sanitaires</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Alertes actuelles</CardTitle>
                <CardDescription>Vue d'ensemble de toutes les alertes en cours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Risque d\'inondation dans la région de Cibitoke',
                      type: 'Météo',
                      severity: 'Critique',
                      date: '28/10/2023',
                      icon: AlertTriangle,
                      iconColor: 'text-red-500',
                      action: 'Évacuation préventive recommandée',
                    },
                    {
                      title: 'Signes d\'infection fongique dans les cultures de maïs (Gitega)',
                      type: 'Sanitaire',
                      severity: 'Modérée',
                      date: '25/10/2023',
                      icon: AlertTriangle,
                      iconColor: 'text-amber-500',
                      action: 'Inspection et traitement préventif',
                    },
                    {
                      title: 'Prévision de sécheresse - Kirundo et Muyinga',
                      type: 'Météo',
                      severity: 'Élevée',
                      date: '22/10/2023',
                      icon: AlertTriangle,
                      iconColor: 'text-amber-500',
                      action: 'Planification de la gestion d\'eau',
                    },
                    {
                      title: 'Distribution de semences résistantes à la sécheresse',
                      type: 'Information',
                      severity: 'Normale',
                      date: '20/10/2023',
                      icon: Info,
                      iconColor: 'text-blue-500',
                      action: 'Contact des services agricoles locaux',
                    },
                    {
                      title: 'Rapport d\'invasion de criquets - Frontière Est',
                      type: 'Sanitaire',
                      severity: 'Critique',
                      date: '18/10/2023',
                      icon: AlertTriangle,
                      iconColor: 'text-red-500',
                      action: 'Mobilisation des équipes d\'intervention',
                    },
                  ].map((alert, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-muted/20 rounded-lg">
                      <div className={`${alert.iconColor} bg-opacity-10 p-2 rounded-full h-fit`}>
                        <alert.icon className={`h-5 w-5 ${alert.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{alert.title}</h4>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center text-xs text-muted-foreground mt-1">
                          <span>{alert.type}</span>
                          <span>•</span>
                          <span className={`${
                            alert.severity === 'Critique' 
                              ? 'text-red-500' 
                              : alert.severity === 'Élevée' 
                                ? 'text-amber-500' 
                                : 'text-green-500'
                          }`}>
                            {alert.severity}
                          </span>
                          <span>•</span>
                          <span>{alert.date}</span>
                        </div>
                        <p className="text-sm mt-2">
                          {alert.action}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="critical" className="mt-0">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {[
                    {
                      title: 'Risque d\'inondation dans la région de Cibitoke',
                      type: 'Météo',
                      severity: 'Critique',
                      date: '28/10/2023',
                      icon: AlertTriangle,
                      iconColor: 'text-red-500',
                      action: 'Évacuation préventive recommandée',
                    },
                    {
                      title: 'Rapport d\'invasion de criquets - Frontière Est',
                      type: 'Sanitaire',
                      severity: 'Critique',
                      date: '18/10/2023',
                      icon: AlertTriangle,
                      iconColor: 'text-red-500',
                      action: 'Mobilisation des équipes d\'intervention',
                    },
                  ].map((alert, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className={`${alert.iconColor} bg-red-100 p-2 rounded-full h-fit`}>
                        <alert.icon className={`h-5 w-5 ${alert.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{alert.title}</h4>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-8 border-red-300 text-red-600">
                              Intervenir immédiatement
                            </Button>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center text-xs text-muted-foreground mt-1">
                          <span>{alert.type}</span>
                          <span>•</span>
                          <span className="text-red-500">
                            {alert.severity}
                          </span>
                          <span>•</span>
                          <span>{alert.date}</span>
                        </div>
                        <p className="text-sm mt-2">
                          {alert.action}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="weather" className="space-y-4">
            {/* Weather alerts content would go here */}
            <p className="text-center text-muted-foreground py-8">
              Contenu des alertes météorologiques
            </p>
          </TabsContent>
          
          <TabsContent value="disease" className="space-y-4">
            {/* Disease alerts content would go here */}
            <p className="text-center text-muted-foreground py-8">
              Contenu des alertes sanitaires
            </p>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Alertes résolues récemment</CardTitle>
            <CardDescription>Historique des dernières alertes traitées</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: 'Pénurie de semences dans la province de Ruyigi',
                  type: 'Approvisionnement',
                  resolution: 'Distribution d\'urgence effectuée',
                  resolvedDate: '15/10/2023',
                  resolvedBy: 'Département des semences',
                },
                {
                  title: 'Maladies sur les plants de haricots à Kayanza',
                  type: 'Sanitaire',
                  resolution: 'Traitement appliqué, suivi en cours',
                  resolvedDate: '12/10/2023',
                  resolvedBy: 'Équipe phytosanitaire',
                },
                {
                  title: 'Perturbation du marché agricole de Bujumbura',
                  type: 'Économique',
                  resolution: 'Mesures de régulation des prix mises en place',
                  resolvedDate: '08/10/2023',
                  resolvedBy: 'Direction des marchés agricoles',
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full h-fit">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <div className="flex flex-wrap gap-x-2 items-center text-xs text-muted-foreground mt-1">
                      <span>{item.type}</span>
                      <span>•</span>
                      <span>Résolu le {item.resolvedDate}</span>
                      <span>•</span>
                      <span>Par: {item.resolvedBy}</span>
                    </div>
                    <p className="text-sm mt-2">
                      {item.resolution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default GovernmentAlerts;
