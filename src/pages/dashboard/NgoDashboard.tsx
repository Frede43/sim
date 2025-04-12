import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FileText, 
  Map, 
  BarChart3,
  TrendingUp,
  Building,
  Award,
  DollarSign,
  Heart
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout';

const NgoDashboard = () => {
  const location = useLocation();

  const sidebarItems = [
    {
      icon: Home,
      label: 'Tableau de bord',
      href: '/dashboard/ngo',
      active: location.pathname === '/dashboard/ngo',
    },
    {
      icon: Users,
      label: 'Bénéficiaires',
      href: '/dashboard/ngo/beneficiaries',
    },
    {
      icon: FileText,
      label: 'Projets',
      href: '/dashboard/ngo/projects',
    },
    {
      icon: Map,
      label: 'Carte',
      href: '/dashboard/ngo/map',
    },
    {
      icon: DollarSign,
      label: 'Financement',
      href: '/dashboard/ngo/funding',
    },
    {
      icon: BarChart3,
      label: 'Impact',
      href: '/dashboard/ngo/impact',
    },
    {
      icon: DollarSign,
      label: 'Financement',
      href: '/dashboard/ngo/funding',
    },
    {
      icon: FileText,
      label: 'Rapports',
      href: '/dashboard/ngo/reports',
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      {location.pathname === '/dashboard/ngo' ? (
        <div className="space-y-6 p-6">
          <h1 className="text-2xl font-bold mb-6">
            Tableau de bord - Organisation Non Gouvernementale 🤝
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Projets actifs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
                  <span className="text-green-500 font-medium">+3</span> ce trimestre
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Bénéficiaires
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,845</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Dans 12 provinces
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Budget total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.5M USD</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
                  <span className="text-green-500 font-medium">+15%</span> de financement
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Objectifs atteints
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-green-500 mt-1">
                  En avance sur les prévisions
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des projets</CardTitle>
                <CardDescription>
                  Distribution par domaine d'intervention
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-5">
                <div className="space-y-4">
                  {[
                    { name: 'Formation agricole', percentage: 35, count: '6 projets', color: 'bg-green-500' },
                    { name: 'Accès au marché', percentage: 25, count: '4 projets', color: 'bg-blue-500' },
                    { name: 'Infrastructure', percentage: 20, count: '3 projets', color: 'bg-amber-500' },
                    { name: 'Microfinance', percentage: 15, count: '2 projets', color: 'bg-purple-500' },
                    { name: 'Autres', percentage: 5, count: '1 projet', color: 'bg-gray-500' },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-sm font-medium">{item.percentage}% ({item.count})</span>
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
                <CardTitle>Impact des projets</CardTitle>
                <CardDescription>
                  Indicateurs clés de performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { 
                      title: 'Revenus des bénéficiaires', 
                      value: '+45%',
                      icon: TrendingUp,
                      color: 'text-green-500 bg-green-100'
                    },
                    { 
                      title: 'Familles soutenues', 
                      value: '1,200+',
                      icon: Heart,
                      color: 'text-red-500 bg-red-100'
                    },
                    { 
                      title: 'Formations dispensées', 
                      value: '85',
                      icon: Award,
                      color: 'text-amber-500 bg-amber-100'
                    },
                    { 
                      title: 'Partenariats', 
                      value: '24',
                      icon: Building,
                      color: 'text-blue-500 bg-blue-100'
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

export default NgoDashboard;
