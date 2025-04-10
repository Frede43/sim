
import React from 'react';
import { Bell, Check, ChevronRight, AlertTriangle, BadgeCheck, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/DashboardLayout';

const FinancialNotifications = () => {
  const sidebarItems = [
    {
      icon: Bell,
      label: 'Tableau de bord',
      href: '/dashboard/financial',
    },
    {
      icon: Bell,
      label: 'Notifications',
      href: '/dashboard/financial/notifications',
      active: true,
    },
  ];

  const notifications = [
    { 
      id: 1, 
      title: 'Risque de défaut élevé', 
      message: '5 prêts dans la région de Gitega présentent un risque élevé de défaut.',
      time: 'Il y a 2 heures',
      type: 'warning',
      read: false
    },
    { 
      id: 2, 
      title: 'Paiements en retard', 
      message: '12 paiements sont en retard de plus de 30 jours. Une action est requise.',
      time: 'Il y a 1 jour',
      type: 'alert',
      read: false
    },
    { 
      id: 3, 
      title: 'Objectif de décaissement atteint', 
      message: "L'objectif trimestriel de 500M BIF de prêts a été atteint.",
      time: 'Il y a 3 jours',
      type: 'success',
      read: true
    },
    { 
      id: 4, 
      title: 'Nouvelle demande de prêt', 
      message: 'La coopérative de maïs de Kirundo a soumis une demande de prêt de 7,5M BIF.',
      time: 'Il y a 4 jours',
      type: 'info',
      read: true
    },
    { 
      id: 5, 
      title: 'Rapport trimestriel disponible', 
      message: 'Le rapport financier du Q1 2024 est prêt pour révision.',
      time: 'Il y a 1 semaine',
      type: 'info',
      read: true
    },
  ];

  const renderIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'success':
        return <BadgeCheck className="h-5 w-5 text-green-500" />;
      case 'info':
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Centre de notifications</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Check className="mr-2 h-4 w-4" />
              Tout marquer comme lu
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Filtrer par date
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="unread">Non lues</TabsTrigger>
            <TabsTrigger value="alerts">Alertes</TabsTrigger>
            <TabsTrigger value="info">Informations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Notifications récentes</CardTitle>
                <CardDescription>Toutes les notifications et alertes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`flex items-start gap-4 p-4 rounded-lg ${notification.read ? 'bg-card' : 'bg-muted/50'}`}
                    >
                      <div className="mt-0.5">
                        {renderIcon(notification.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="unread" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Notifications non lues</CardTitle>
                <CardDescription>Notifications qui n'ont pas encore été consultées</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Filtrez pour afficher uniquement les notifications non lues
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alerts" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Alertes importantes</CardTitle>
                <CardDescription>Notifications critiques nécessitant votre attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Filtrez pour afficher uniquement les alertes importantes
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="info" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
                <CardDescription>Mises à jour et informations du système</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Filtrez pour afficher uniquement les informations générales
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notification</CardTitle>
              <CardDescription>Gérez vos préférences de notification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alertes de risque</p>
                    <p className="text-sm text-muted-foreground">Notifications pour les risques élevés</p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      id="risk-alerts"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Remboursements en retard</p>
                    <p className="text-sm text-muted-foreground">Alertes pour les paiements en retard</p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      id="late-payments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Nouvelles demandes</p>
                    <p className="text-sm text-muted-foreground">Notifications pour les nouvelles demandes de prêt</p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      id="new-applications"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Rapports</p>
                    <p className="text-sm text-muted-foreground">Notifications pour les nouveaux rapports</p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      id="reports"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Seuils d'alerte</CardTitle>
              <CardDescription>Configurez les seuils pour les notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Seuil de risque pour alerte</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option>Élevé uniquement</option>
                    <option>Moyen et élevé</option>
                    <option>Tous les niveaux</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Délai pour paiements en retard</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option>7 jours</option>
                    <option>15 jours</option>
                    <option>30 jours</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Format des notifications</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option>Dans l'application uniquement</option>
                    <option>Application et email</option>
                    <option>Application, email et SMS</option>
                  </select>
                </div>
                <Button className="w-full">Sauvegarder les préférences</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinancialNotifications;
