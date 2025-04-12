import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const GovernmentStats = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Statistiques agricoles</h1>
        <p className="text-muted-foreground">
          Vue d'ensemble des indicateurs clés du secteur agricole
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Production totale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125.8K tonnes</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
              <span className="text-green-500 font-medium">+12%</span> par rapport à l'année précédente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Valeur marchande
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">458.2M BIF</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
              <span className="text-green-500 font-medium">+8%</span> de croissance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Agriculteurs actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,521</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
              <span className="text-green-500 font-medium">+5%</span> ce trimestre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Surface cultivée
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,280 ha</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingDown className="text-red-500 h-4 w-4 mr-1" />
              <span className="text-red-500 font-medium">-2%</span> dû aux conditions climatiques
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Répartition par culture</CardTitle>
            <CardDescription>
              Production agricole par type de culture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Maïs', amount: '45.2K tonnes', percentage: 35, color: 'bg-yellow-500' },
                { name: 'Riz', amount: '32.8K tonnes', percentage: 25, color: 'bg-green-500' },
                { name: 'Haricots', amount: '25.6K tonnes', percentage: 20, color: 'bg-red-500' },
                { name: 'Manioc', amount: '15.2K tonnes', percentage: 12, color: 'bg-blue-500' },
                { name: 'Autres', amount: '7K tonnes', percentage: 8, color: 'bg-gray-500' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm font-medium">{item.amount} ({item.percentage}%)</span>
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
            <CardTitle>Indicateurs économiques</CardTitle>
            <CardDescription>
              Impact sur l'économie locale
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { 
                  title: 'Revenus moyens', 
                  value: '+28%',
                  description: 'Par agriculteur',
                  icon: DollarSign,
                  color: 'text-green-500 bg-green-100'
                },
                { 
                  title: 'Emplois créés', 
                  value: '1,845',
                  description: 'Ce trimestre',
                  icon: Users,
                  color: 'text-blue-500 bg-blue-100'
                },
                { 
                  title: 'Exportations', 
                  value: '+15%',
                  description: 'Croissance annuelle',
                  icon: TrendingUp,
                  color: 'text-amber-500 bg-amber-100'
                },
                { 
                  title: 'Coopératives', 
                  value: '124',
                  description: 'Actives',
                  icon: Building,
                  color: 'text-purple-500 bg-purple-100'
                },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className={`rounded-full p-2 ${item.color} mr-3`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{item.value}</div>
                      <div className="font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
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

export default GovernmentStats;
