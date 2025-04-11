
import React from 'react';
import { BarChart, PieChart, LineChart, AreaChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout';

const GovernmentStats = () => {
  const sidebarItems = [
    {
      icon: BarChart,
      label: 'Tableau de bord',
      href: '/dashboard/government',
    },
    {
      icon: BarChart,
      label: 'Statistiques',
      href: '/dashboard/government/stats',
      active: true,
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Statistiques Nationales Agricoles</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Production totale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">456,780 tonnes</div>
              <p className="text-xs text-muted-foreground mt-1">
                +8.2% par rapport à l'année précédente
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Superficie cultivée
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124,500 hectares</div>
              <p className="text-xs text-muted-foreground mt-1">
                +3.5% par rapport à l'année précédente
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Agriculteurs enregistrés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78,245</div>
              <p className="text-xs text-muted-foreground mt-1">
                +12.3% par rapport à l'année précédente
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Coopératives actives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground mt-1">
                +5.4% par rapport à l'année précédente
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Production par région</CardTitle>
              <CardDescription>Répartition de la production agricole par province</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <PieChart className="h-64 w-64 text-muted-foreground my-6" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {[
                  { region: 'Bujumbura', percentage: '24%', color: 'bg-blue-500' },
                  { region: 'Gitega', percentage: '18%', color: 'bg-green-500' },
                  { region: 'Ngozi', percentage: '15%', color: 'bg-yellow-500' },
                  { region: 'Autres', percentage: '43%', color: 'bg-gray-500' },
                ].map((region, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${region.color}`}></div>
                    <div>
                      <p className="text-sm font-medium">{region.region}</p>
                      <p className="text-xs text-muted-foreground">{region.percentage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Évolution de la production</CardTitle>
              <CardDescription>Production agricole sur les 5 dernières années</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <LineChart className="h-64 w-full text-muted-foreground my-6" />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 w-full">
                {[2019, 2020, 2021, 2022, 2023].map((year, index) => (
                  <div key={index} className="text-center">
                    <p className="text-sm font-medium">{year}</p>
                    <p className="text-xs text-muted-foreground">{340 + index * 30} kt</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Production par type de culture</CardTitle>
            <CardDescription>Répartition des principales cultures au niveau national</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { crop: 'Maïs', production: '120,450 tonnes', percentage: 26, region: 'Principalement Gitega, Ngozi' },
                { crop: 'Haricots', production: '85,320 tonnes', percentage: 19, region: 'Toutes les provinces' },
                { crop: 'Bananes', production: '78,940 tonnes', percentage: 17, region: 'Principalement Cibitoke, Bubanza' },
                { crop: 'Manioc', production: '68,250 tonnes', percentage: 15, region: 'Principalement Kirundo, Muyinga' },
                { crop: 'Riz', production: '45,780 tonnes', percentage: 10, region: 'Principalement Bubanza, Cibitoke' },
                { crop: 'Autres', production: '58,040 tonnes', percentage: 13, region: 'Toutes les provinces' },
              ].map((crop, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <span className="font-medium">{crop.crop}</span>
                      <span className="text-sm text-muted-foreground ml-2">({crop.production})</span>
                    </div>
                    <span className="text-sm">{crop.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-2.5 mb-1">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${crop.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">{crop.region}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default GovernmentStats;
