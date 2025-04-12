import React from 'react';
import { BarChart, AreaChart, PieChart, Users, TrendingUp, Target, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';

const impactData = [
  { month: 'Jan', beneficiaries: 450, yield: 65, income: 85 },
  { month: 'Fév', beneficiaries: 520, yield: 72, income: 88 },
  { month: 'Mar', beneficiaries: 580, yield: 78, income: 92 },
  { month: 'Avr', beneficiaries: 650, yield: 85, income: 95 },
  { month: 'Mai', beneficiaries: 720, yield: 88, income: 98 },
  { month: 'Juin', beneficiaries: 800, yield: 92, income: 102 },
];

const NgoImpact = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Impact et résultats</h1>
        <p className="text-muted-foreground">
          Suivi de l'impact des programmes sur les bénéficiaires
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bénéficiaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">800</div>
                <p className="text-xs text-green-500">+12% ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rendement agricole
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">+92%</div>
                <p className="text-xs text-green-500">vs. baseline</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Objectifs atteints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Target className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-amber-500">Sur 95% visés</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Impact global
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Award className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">A+</div>
                <p className="text-xs text-green-500">Note d'évaluation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Évolution des bénéficiaires</CardTitle>
            <CardDescription>
              Nombre de bénéficiaires par mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="beneficiaries" 
                    stroke="#8884d8" 
                    name="Bénéficiaires"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amélioration des indicateurs</CardTitle>
            <CardDescription>
              Rendement et revenus (base 100)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="yield" 
                    stroke="#82ca9d" 
                    name="Rendement"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="income" 
                    stroke="#ffc658" 
                    name="Revenus"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Répartition des bénéfices</CardTitle>
            <CardDescription>
              Impact par domaine d'intervention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Productivité agricole', percentage: 40, color: 'bg-blue-500' },
                { name: 'Revenus des ménages', percentage: 25, color: 'bg-green-500' },
                { name: 'Sécurité alimentaire', percentage: 20, color: 'bg-amber-500' },
                { name: 'Accès au marché', percentage: 15, color: 'bg-purple-500' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm font-medium">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${item.color}`} 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Objectifs du programme</CardTitle>
            <CardDescription>
              Progression vers les objectifs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                { name: 'Augmentation des revenus', target: '100%', current: '85%' },
                { name: 'Formation des agriculteurs', target: '1000', current: '824' },
                { name: 'Adoption des techniques', target: '90%', current: '78%' },
                { name: 'Diversification des cultures', target: '8', current: '6' },
              ].map((goal, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{goal.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {goal.current} / {goal.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-primary"
                      style={{ 
                        width: `${(parseInt(goal.current) / parseInt(goal.target)) * 100}%` 
                      }}
                    ></div>
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

export default NgoImpact;
