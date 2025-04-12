import React from 'react';
import { BarChart as BarChartIcon, LineChart as LineChartIcon, PieChart as PieChartIcon, TrendingUp, Calendar, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const loanData = [
  { month: 'Jan', disbursed: 125, repaid: 80 },
  { month: 'Fév', disbursed: 145, repaid: 95 },
  { month: 'Mar', disbursed: 160, repaid: 110 },
  { month: 'Avr', disbursed: 180, repaid: 125 },
  { month: 'Mai', disbursed: 210, repaid: 150 },
  { month: 'Jun', disbursed: 250, repaid: 180 },
];

const riskData = [
  { category: 'Faible risque', value: 65 },
  { category: 'Risque moyen', value: 25 },
  { category: 'Risque élevé', value: 10 },
];

const FinancialStats = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Statistiques financières</h1>
          <p className="text-muted-foreground">
            Analyse des performances et tendances
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exporter les données
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Prêts décaissés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250M BIF</div>
            <p className="text-xs text-green-500 mt-1">
              +15% ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taux de remboursement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-green-500 mt-1">
              +2% ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Revenu d'intérêts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45M BIF</div>
            <p className="text-xs text-amber-500 mt-1">
              -3% ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Prêts actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">312</div>
            <p className="text-xs text-muted-foreground mt-1">
              En cours
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <Tabs defaultValue="loans" className="space-y-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Analyse détaillée</CardTitle>
              <TabsList>
                <TabsTrigger value="loans">Prêts</TabsTrigger>
                <TabsTrigger value="risk">Risque</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
            </div>
            <CardDescription>
              Statistiques et tendances par catégorie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TabsContent value="loans" className="space-y-4">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={loanData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="disbursed" 
                      stroke="#8884d8" 
                      name="Prêts décaissés"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="repaid" 
                      stroke="#82ca9d" 
                      name="Remboursements"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="risk" className="space-y-4">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={riskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Pourcentage" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      Taux de croissance mensuel
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500">+12.5%</div>
                    <p className="text-sm text-muted-foreground">
                      Moyenne sur 6 mois
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      Efficacité opérationnelle
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">85%</div>
                    <p className="text-sm text-muted-foreground">
                      Ratio coûts/revenus
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      Délai moyen de traitement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.2</div>
                    <p className="text-sm text-muted-foreground">
                      Jours par demande
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      Satisfaction client
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.8/5</div>
                    <p className="text-sm text-muted-foreground">
                      Note moyenne
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default FinancialStats;
