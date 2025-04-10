
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronRight, TrendingUp, BarChart3, PieChart as PieChartIcon, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useNavigate } from 'react-router-dom';

const salesData = [
  { month: 'Jan', amount: 420 },
  { month: 'Feb', amount: 380 },
  { month: 'Mar', amount: 510 },
  { month: 'Apr', amount: 480 },
  { month: 'May', amount: 600 },
  { month: 'Jun', amount: 650 },
  { month: 'Jul', amount: 700 },
  { month: 'Aug', amount: 720 },
  { month: 'Sep', amount: 680 },
  { month: 'Oct', amount: 710 },
  { month: 'Nov', amount: 680 },
  { month: 'Dec', amount: 750 },
];

const productionData = [
  { name: 'Maïs', value: 35 },
  { name: 'Haricots', value: 25 },
  { name: 'Manioc', value: 20 },
  { name: 'Tomates', value: 15 },
  { name: 'Autres', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const priceComparisonData = [
  { month: 'Jan', marché: 500, coopérative: 550 },
  { month: 'Feb', marché: 480, coopérative: 570 },
  { month: 'Mar', marché: 520, coopérative: 590 },
  { month: 'Apr', marché: 550, coopérative: 600 },
  { month: 'May', marché: 570, coopérative: 620 },
  { month: 'Jun', marché: 590, coopérative: 650 },
];

const FarmerAnalytics = () => {
  const navigate = useNavigate();
  
  const sidebarItems = [
    { icon: TrendingUp, label: 'Tableau de bord', href: '/dashboard/farmer', active: false },
    { icon: BarChart3, label: 'Mes produits', href: '/dashboard/farmer/products', active: false },
    { icon: PieChartIcon, label: 'Mes ventes', href: '/dashboard/farmer/sales', active: false },
    { icon: Calendar, label: 'Marché', href: '/dashboard/farmer/market', active: false },
    { icon: TrendingUp, label: 'Analyses', href: '/dashboard/farmer/analytics', active: true },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Analyses et Statistiques</h1>
          <Button variant="outline" onClick={() => navigate('/dashboard/farmer')}>
            Retour au tableau de bord <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="sales">
          <TabsList className="mb-4">
            <TabsTrigger value="sales">Ventes</TabsTrigger>
            <TabsTrigger value="production">Production</TabsTrigger>
            <TabsTrigger value="prices">Prix du marché</TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Évolution des ventes mensuelles</CardTitle>
                <CardDescription>
                  Suivi de vos revenus de vente sur les 12 derniers mois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="amount" stroke="#4CAF50" strokeWidth={2} activeDot={{ r: 8 }} name="Montant (BIF)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="production" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition de la production par culture</CardTitle>
                <CardDescription>
                  Pourcentage de chaque type de culture dans votre production totale
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex justify-center">
                  <ChartContainer config={{
                    maïs: { color: '#0088FE', label: 'Maïs' },
                    haricots: { color: '#00C49F', label: 'Haricots' },
                    manioc: { color: '#FFBB28', label: 'Manioc' },
                    tomates: { color: '#FF8042', label: 'Tomates' },
                    autres: { color: '#8884D8', label: 'Autres' },
                  }}>
                    <PieChart>
                      <Pie
                        data={productionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                      >
                        {productionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Comparaison des prix</CardTitle>
                <CardDescription>
                  Prix moyens obtenus sur le marché vs. via les coopératives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={priceComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="marché" fill="#8884d8" name="Prix marché (BIF/kg)" />
                      <Bar dataKey="coopérative" fill="#82ca9d" name="Prix coopérative (BIF/kg)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FarmerAnalytics;
