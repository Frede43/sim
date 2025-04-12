import React from 'react';
import { Bell, Check, ChevronRight, AlertTriangle, BadgeCheck, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'alert' | 'success' | 'info';
  date: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: 'n1',
    title: 'Retard de paiement',
    description: 'La Coopérative Rizicole Imbo a un retard de paiement de 5 jours',
    type: 'alert',
    date: '12/04/2024',
    read: false,
  },
  {
    id: 'n2',
    title: 'Prêt approuvé',
    description: 'Le prêt de Jean Ndayishimiye a été approuvé',
    type: 'success',
    date: '11/04/2024',
    read: false,
  },
  {
    id: 'n3',
    title: 'Nouvelle demande',
    description: "L'Association Café Kayanza a soumis une nouvelle demande de prêt",
    type: 'info',
    date: '10/04/2024',
    read: true,
  },
];

const FinancialNotifications = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Centre de notifications</h1>
          <p className="text-muted-foreground">
            Alertes et mises à jour importantes
          </p>
        </div>
        <Button variant="outline">
          <Check className="h-4 w-4 mr-2" />
          Tout marquer comme lu
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Notifications non lues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-amber-500 mt-1">
              Nécessitent votre attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Alertes critiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-red-500 mt-1">
              À traiter en priorité
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
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-green-500 mt-1">
              Dans les 24h
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Temps de réponse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4h</div>
            <p className="text-xs text-muted-foreground mt-1">
              En moyenne
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notifications récentes</CardTitle>
          <CardDescription>
            Toutes les alertes et mises à jour des 7 derniers jours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="alerts">Alertes</TabsTrigger>
              <TabsTrigger value="updates">Mises à jour</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {notifications.map((notification) => (
                <Card key={notification.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full ${
                        notification.type === 'alert' 
                          ? 'bg-red-100'
                          : notification.type === 'success'
                            ? 'bg-green-100'
                            : 'bg-blue-100'
                      }`}>
                        {notification.type === 'alert' && (
                          <AlertTriangle className={`h-4 w-4 ${
                            notification.type === 'alert'
                              ? 'text-red-600'
                              : ''
                          }`} />
                        )}
                        {notification.type === 'success' && (
                          <BadgeCheck className="h-4 w-4 text-green-600" />
                        )}
                        {notification.type === 'info' && (
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {notification.date}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.description}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="alerts" className="space-y-4">
              {notifications
                .filter(n => n.type === 'alert')
                .map((notification) => (
                  <Card key={notification.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-full bg-red-100">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{notification.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {notification.date}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
            <TabsContent value="updates" className="space-y-4">
              {notifications
                .filter(n => n.type !== 'alert')
                .map((notification) => (
                  <Card key={notification.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${
                          notification.type === 'success'
                            ? 'bg-green-100'
                            : 'bg-blue-100'
                        }`}>
                          {notification.type === 'success' ? (
                            <BadgeCheck className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{notification.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {notification.date}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialNotifications;
