import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FileText, 
  BarChart3, 
  Bell,
  TrendingUp,
  Building,
  Award,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout';

const FinancialDashboard = () => {
  const location = useLocation();

  const sidebarItems = [
    {
      icon: Home,
      label: 'Tableau de bord',
      href: '/dashboard/financial',
      active: location.pathname === '/dashboard/financial',
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
      icon: BarChart3,
      label: 'Statistiques',
      href: '/dashboard/financial/stats',
    },
    {
      icon: AlertCircle,
      label: 'Évaluation des risques',
      href: '/dashboard/financial/risk',
    },
    {
      icon: Bell,
      label: 'Notifications',
      href: '/dashboard/financial/notifications',
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      {location.pathname === '/dashboard/financial' ? (
        <div className="space-y-6 p-6">
          <h1 className="text-2xl font-bold mb-6">
            Tableau de bord - Institution financière 🏦
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total des prêts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">125.8M BIF</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
                  <span className="text-green-500 font-medium">+12%</span> par rapport au trimestre précédent
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Emprunteurs actifs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">842</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Dans 15 provinces
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
                <div className="text-2xl font-bold">97.5%</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
                  <span className="text-green-500 font-medium">+2.5%</span> d'amélioration
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Prêts à risque
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-amber-500 mt-1">
                  4 nécessitent une attention immédiate
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des prêts par secteur</CardTitle>
                <CardDescription>
                  Distribution du portefeuille de prêts
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-5">
                <div className="space-y-4">
                  {[
                    { name: 'Production agricole', percentage: 45, amount: '56.6M BIF', color: 'bg-green-500' },
                    { name: 'Transformation', percentage: 25, amount: '31.5M BIF', color: 'bg-blue-500' },
                    { name: 'Commerce', percentage: 15, amount: '18.9M BIF', color: 'bg-amber-500' },
                    { name: 'Équipement', percentage: 10, amount: '12.6M BIF', color: 'bg-purple-500' },
                    { name: 'Autres', percentage: 5, amount: '6.3M BIF', color: 'bg-gray-500' },
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
                <CardTitle>Impact des financements</CardTitle>
                <CardDescription>
                  Indicateurs de performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { 
                      title: 'Création d\'emplois', 
                      value: '+1,250',
                      icon: Users,
                      color: 'text-blue-500 bg-blue-100'
                    },
                    { 
                      title: 'Croissance des revenus', 
                      value: '+32%',
                      icon: TrendingUp,
                      color: 'text-green-500 bg-green-100'
                    },
                    { 
                      title: 'Modernisation', 
                      value: '+45%',
                      icon: Building,
                      color: 'text-purple-500 bg-purple-100'
                    },
                    { 
                      title: 'Qualité des produits', 
                      value: '+28%',
                      icon: Award,
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

export default FinancialDashboard;
