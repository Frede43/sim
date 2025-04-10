
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Bell, CreditCard, DollarSign, FileText, Users, AlertTriangle, BadgeCheck, TrendingUp, TrendingDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';

const FinancialDashboard = () => {
  const { user } = useAuth();

  const sidebarItems = [
    {
      icon: CreditCard,
      label: 'Tableau de bord',
      href: '/dashboard/financial',
      active: true,
    },
    {
      icon: Users,
      label: 'Emprunteurs',
      href: '/dashboard/financial/borrowers',
    },
    {
      icon: FileText,
      label: 'Prêts',
      href: '/dashboard/financial/loans',
    },
    {
      icon: TrendingUp,
      label: 'Statistiques',
      href: '/dashboard/financial/stats',
    },
    {
      icon: Bell,
      label: 'Notifications',
      href: '/dashboard/financial/notifications',
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord financier</h1>
          <p className="text-muted-foreground">
            Gérez les prêts agricoles, suivez les remboursements et analysez les risques financiers.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prêts actifs</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">234</div>
              <p className="text-xs text-muted-foreground">
                +12% depuis le mois dernier
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Montant total des prêts</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,257,600 BIF</div>
              <p className="text-xs text-muted-foreground">
                +18.5% depuis le trimestre dernier
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de remboursement</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92.4%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% depuis la dernière année
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prêts à risque</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">
                -4% depuis le mois dernier
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="borrowers">Emprunteurs</TabsTrigger>
            <TabsTrigger value="loans">Gestion des prêts</TabsTrigger>
            <TabsTrigger value="reports">Rapports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Activité de prêt par région</CardTitle>
                  <CardDescription>
                    Distribution des prêts agricoles par régions au Burundi
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    [Graphique: Carte du Burundi avec distribution des prêts]
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Statut des remboursements</CardTitle>
                  <CardDescription>
                    Vue d'ensemble des remboursements des prêts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="font-medium">Remboursés</div>
                        <div>68%</div>
                      </div>
                      <Progress value={68} className="h-2 bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="font-medium">En cours</div>
                        <div>24%</div>
                      </div>
                      <Progress value={24} className="h-2 bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="font-medium">Retards</div>
                        <div>6%</div>
                      </div>
                      <Progress value={6} className="h-2 bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="font-medium">Défauts</div>
                        <div>2%</div>
                      </div>
                      <Progress value={2} className="h-2 bg-muted" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Prêts en attente d'approbation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">Coopérative Rizicole Imbo</p>
                        <p className="text-muted-foreground">12,500,000 BIF - Matériel agricole</p>
                      </div>
                      <Button variant="outline" size="sm">Analyser</Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">Jean Ndayishimiye</p>
                        <p className="text-muted-foreground">2,800,000 BIF - Semences améliorées</p>
                      </div>
                      <Button variant="outline" size="sm">Analyser</Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">Association Café Kayanza</p>
                        <p className="text-muted-foreground">8,750,000 BIF - Expansion</p>
                      </div>
                      <Button variant="outline" size="sm">Analyser</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Alertes financières</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Bell className="mt-0.5 h-4 w-4 text-amber-500" />
                      <div className="space-y-1">
                        <p className="font-medium">Risque de défaut élevé</p>
                        <p className="text-muted-foreground">5 prêts dans la région de Gitega présentent un risque élevé</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Bell className="mt-0.5 h-4 w-4 text-red-500" />
                      <div className="space-y-1">
                        <p className="font-medium">Paiements en retard</p>
                        <p className="text-muted-foreground">12 paiements sont en retard de plus de 30 jours</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <BadgeCheck className="mt-0.5 h-4 w-4 text-green-500" />
                      <div className="space-y-1">
                        <p className="font-medium">Objectif de décaissement atteint</p>
                        <p className="text-muted-foreground">L'objectif trimestriel de 500M BIF a été atteint</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Tendances des taux</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-green-500" />
                        <div className="font-medium">Prêts agricoles saisonniers</div>
                      </div>
                      <div>7.5%</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-amber-500" />
                        <div className="font-medium">Prêts d'équipement</div>
                      </div>
                      <div>9.2%</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-green-500" />
                        <div className="font-medium">Microcrédits ruraux</div>
                      </div>
                      <div>4.8%</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-green-500" />
                        <div className="font-medium">Prêts de stockage</div>
                      </div>
                      <div>6.5%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FinancialDashboard;
