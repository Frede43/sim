
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { ChevronRight, ShoppingBag, Users, LineChart as LineChartIcon, BarChart as BarChartIcon, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const purchaseHistoryData = [
  { month: 'Jan', amount: 1250000 },
  { month: 'Feb', amount: 980000 },
  { month: 'Mar', amount: 1450000 },
  { month: 'Apr', amount: 1320000 },
  { month: 'May', amount: 1680000 },
  { month: 'Jun', amount: 1580000 },
  { month: 'Jul', amount: 1850000 },
  { month: 'Aug', amount: 2100000 },
  { month: 'Sep', amount: 1950000 },
];

const productCategoryData = [
  { name: 'Céréales', value: 45 },
  { name: 'Légumes', value: 20 },
  { name: 'Fruits', value: 15 },
  { name: 'Produits laitiers', value: 10 },
  { name: 'Autres', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const supplierPerformanceData = [
  { name: 'Coopérative Imbaraga', quality: 4.8, delivery: 4.5, price: 4.2 },
  { name: 'Agriculteurs Associés', quality: 4.5, delivery: 4.7, price: 4.0 },
  { name: 'Ferme Moderne', quality: 4.2, delivery: 4.3, price: 4.6 },
  { name: 'Groupe Agricole Kirundo', quality: 4.0, delivery: 3.8, price: 4.8 },
  { name: 'Coopérative Tubungabunge', quality: 4.7, delivery: 4.1, price: 4.3 },
];

const priceFluctuationData = [
  { month: 'Jan', maïs: 1200, riz: 2800, haricots: 3500 },
  { month: 'Feb', maïs: 1300, riz: 2750, haricots: 3400 },
  { month: 'Mar', maïs: 1250, riz: 2900, haricots: 3600 },
  { month: 'Apr', maïs: 1400, riz: 3000, haricots: 3650 },
  { month: 'May', maïs: 1450, riz: 3100, haricots: 3700 },
  { month: 'Jun', maïs: 1500, riz: 3050, haricots: 3800 },
  { month: 'Jul', maïs: 1450, riz: 3000, haricots: 3750 },
  { month: 'Aug', maïs: 1350, riz: 2950, haricots: 3650 },
  { month: 'Sep', maïs: 1300, riz: 2900, haricots: 3600 },
];

const BuyerAnalytics = () => {
  const navigate = useNavigate();
  
  const sidebarItems = [
    { icon: ShoppingBag, label: 'Tableau de bord', href: '/dashboard/buyer', active: false },
    { icon: ShoppingBag, label: 'Catalogue', href: '/dashboard/buyer/catalog', active: false },
    { icon: ShoppingBag, label: 'Commandes', href: '/dashboard/buyer/orders', active: false },
    { icon: Users, label: 'Fournisseurs', href: '/dashboard/buyer/suppliers', active: false },
    { icon: LineChartIcon, label: 'Analyses', href: '/dashboard/buyer/analytics', active: true },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-BI', { 
      style: 'currency', 
      currency: 'BIF',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const totalPurchases = purchaseHistoryData.reduce((acc, item) => acc + item.amount, 0);
  const averageMonthlyPurchase = totalPurchases / purchaseHistoryData.length;

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Analyses et Statistiques</h1>
          <Button variant="outline" onClick={() => navigate('/dashboard/buyer')}>
            Retour au tableau de bord <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total des achats</CardTitle>
              <CardDescription>Total des 9 derniers mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalPurchases)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Moyenne mensuelle</CardTitle>
              <CardDescription>Achats moyens par mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(averageMonthlyPurchase)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Croissance</CardTitle>
              <CardDescription>Évolution sur 9 mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+56%</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Fournisseurs</CardTitle>
              <CardDescription>Nombre de fournisseurs actifs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="purchases">
          <TabsList>
            <TabsTrigger value="purchases">Historique d'achats</TabsTrigger>
            <TabsTrigger value="categories">Catégories</TabsTrigger>
            <TabsTrigger value="suppliers">Performance fournisseurs</TabsTrigger>
            <TabsTrigger value="prices">Évolution des prix</TabsTrigger>
          </TabsList>
          
          <TabsContent value="purchases" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Évolution des achats</CardTitle>
                <CardDescription>Montant total des achats par mois</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={purchaseHistoryData}>
                      <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#8884d8" 
                        fillOpacity={1} 
                        fill="url(#colorAmount)" 
                        name="Montant des achats"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter les données
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des achats par catégorie</CardTitle>
                <CardDescription>Pourcentage du total des achats par type de produit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={productCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {productCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter les données
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="suppliers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance des fournisseurs</CardTitle>
                <CardDescription>Évaluation de la qualité, livraison et prix</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={supplierPerformanceData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 5]} />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="quality" name="Qualité" fill="#8884d8" />
                      <Bar dataKey="delivery" name="Livraison" fill="#82ca9d" />
                      <Bar dataKey="price" name="Prix" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter les données
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="prices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Évolution des prix</CardTitle>
                <CardDescription>Prix moyens des produits clés (BIF/kg)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceFluctuationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="maïs" stroke="#8884d8" name="Maïs" />
                      <Line type="monotone" dataKey="riz" stroke="#82ca9d" name="Riz" />
                      <Line type="monotone" dataKey="haricots" stroke="#ffc658" name="Haricots" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter les données
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BuyerAnalytics;
