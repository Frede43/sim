import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  Map, 
  FileText, 
  AlertCircle,
  Building,
  Award,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout';

const GovernmentDashboard = () => {
  const location = useLocation();

  const sidebarItems = [
    {
      icon: Home,
      label: 'Tableau de bord',
      href: '/dashboard/government',
      active: location.pathname === '/dashboard/government',
    },
    {
      icon: BarChart3,
      label: 'Statistiques',
      href: '/dashboard/government/stats',
    },
    {
      icon: Map,
      label: 'Carte de distribution',
      href: '/dashboard/government/map',
    },
    {
      icon: FileText,
      label: 'Rapports',
      href: '/dashboard/government/reports',
    },
    {
      icon: AlertCircle,
      label: 'Alertes',
      href: '/dashboard/government/alerts',
    },
    {
      icon: DollarSign,
      label: 'Subventions',
      href: '/dashboard/government/subsidies',
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      {location.pathname === '/dashboard/government' ? (
        <div className="space-y-6 p-6">
          <h1 className="text-2xl font-bold mb-6">
            Tableau de bord - Autorité gouvernementale 🏛️
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Subventions allouées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25.5M BIF</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
                  <span className="text-green-500 font-medium">+8%</span> par rapport à l'année précédente
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Agriculteurs bénéficiaires
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Répartis dans 18 provinces
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Coopératives enregistrées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
                  <span className="text-green-500 font-medium">+12</span> ce trimestre
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Anomalies détectées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-red-500 mt-1">
                  3 nécessitent une attention immédiate
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des subventions par secteur</CardTitle>
                <CardDescription>
                  Allocation des fonds par type de culture
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-5">
                <div className="space-y-4">
                  {[
                    { name: 'Céréales', percentage: 35, amount: '8.9M BIF', color: 'bg-amber-500' },
                    { name: 'Tubercules', percentage: 25, amount: '6.4M BIF', color: 'bg-indigo-500' },
                    { name: 'Légumineuses', percentage: 20, amount: '5.1M BIF', color: 'bg-green-500' },
                    { name: 'Fruits', percentage: 12, amount: '3.1M BIF', color: 'bg-red-500' },
                    { name: 'Autres', percentage: 8, amount: '2.0M BIF', color: 'bg-gray-500' },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-sm font-medium">{item.percentage}% ({item.amount})</span>
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
                <CardTitle>Impact des subventions</CardTitle>
                <CardDescription>
                  Indicateurs de performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { 
                      title: 'Augmentation de la productivité', 
                      value: '+23%',
                      icon: TrendingUp,
                      color: 'text-green-500 bg-green-100'
                    },
                    { 
                      title: 'Revenus des agriculteurs', 
                      value: '+18%',
                      icon: Users,
                      color: 'text-blue-500 bg-blue-100'
                    },
                    { 
                      title: 'Qualité des produits', 
                      value: '+15%',
                      icon: Award,
                      color: 'text-purple-500 bg-purple-100'
                    },
                    { 
                      title: 'Accès aux marchés', 
                      value: '+28%',
                      icon: Building,
                      color: 'text-amber-500 bg-amber-100'
                    },
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className={`rounded-full p-2 ${item.color} mr-3`}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium mb-1">{item.title}</div>
                          <div className="text-2xl font-bold">{item.value}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </DashboardLayout>
  );
};

export default GovernmentDashboard;
