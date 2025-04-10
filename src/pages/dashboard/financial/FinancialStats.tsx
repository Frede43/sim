import React from 'react';
import { BarChart, LineChart, PieChart, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const FinancialStats = () => {
  const sidebarItems = [
    {
      icon: BarChart,
      label: 'Tableau de bord',
      href: '/dashboard/financial',
    },
    {
      icon: BarChart,
      label: 'Statistiques',
      href: '/dashboard/financial/stats',
      active: true,
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Statistiques financières</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Période
          </Button>
          <Button variant="outline" size="sm">
            Télécharger
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Portfolio total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,257,600,000 BIF</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +18.5% depuis l'an dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nombre de prêts actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +12% depuis le trimestre dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taux moyen d'intérêt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.8%</div>
            <p className="text-xs text-muted-foreground">
              -0.3% depuis l'an dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taux de défaut</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.0%</div>
            <p className="text-xs text-muted-foreground">
              -0.5% depuis l'an dernier
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="risk">Analyse des risques</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Tendance des prêts</CardTitle>
                <CardDescription>Volume des prêts sur 12 mois</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  <LineChart className="h-40 w-40" />
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Types de prêts</CardTitle>
                <CardDescription>Répartition par catégorie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  <PieChart className="h-40 w-40" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance du portfolio</CardTitle>
              <CardDescription>Analyse de la performance des prêts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                <BarChart className="h-40 w-40" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="distribution" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribution des prêts</CardTitle>
              <CardDescription>Répartition géographique et par type d'emprunteur</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                <PieChart className="h-40 w-40" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="risk" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyse des risques</CardTitle>
              <CardDescription>Évaluation des risques du portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                <BarChart className="h-40 w-40" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Statistiques des remboursements</CardTitle>
            <CardDescription>Performance des remboursements par période</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 py-2 border-b">
                <div className="font-medium">Période</div>
                <div className="font-medium">Montant attendu</div>
                <div className="font-medium">Taux de recouvrement</div>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2 border-b">
                <div>Q1 2024</div>
                <div>87,500,000 BIF</div>
                <div className="text-green-600">98.2%</div>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2 border-b">
                <div>Q4 2023</div>
                <div>92,300,000 BIF</div>
                <div className="text-green-600">97.5%</div>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2 border-b">
                <div>Q3 2023</div>
                <div>78,200,000 BIF</div>
                <div className="text-amber-600">94.8%</div>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2">
                <div>Q2 2023</div>
                <div>65,700,000 BIF</div>
                <div className="text-green-600">96.7%</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance par type de prêt</CardTitle>
            <CardDescription>Analyse par catégorie de produit financier</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 py-2 border-b">
                <div className="font-medium">Type</div>
                <div className="font-medium">Taux moyen</div>
                <div className="font-medium">Performance</div>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2 border-b">
                <div>Prêts saisonniers</div>
                <div>7.5%</div>
                <div className="text-green-600">Élevée</div>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2 border-b">
                <div>Équipement</div>
                <div>9.2%</div>
                <div className="text-green-600">Élevée</div>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2 border-b">
                <div>Microcrédits</div>
                <div>4.8%</div>
                <div className="text-amber-600">Moyenne</div>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2">
                <div>Stockage</div>
                <div>6.5%</div>
                <div className="text-green-600">Élevée</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialStats;
