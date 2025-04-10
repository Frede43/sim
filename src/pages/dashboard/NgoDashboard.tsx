
import React from 'react';
import { 
  Home, 
  HeartHandshake, 
  BarChart3, 
  Map, 
  FileText, 
  Users,
  TrendingUp,
  HandCoins,
  Sprout,
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
import { useAuth } from '@/contexts/AuthContext';

const NgoDashboard = () => {
  const { user } = useAuth();

  const sidebarItems = [
    {
      icon: Home,
      label: 'Tableau de bord',
      href: '/dashboard/ngo',
      active: true,
    },
    {
      icon: Users,
      label: 'Bénéficiaires',
      href: '/dashboard/ngo/beneficiaries',
    },
    {
      icon: HeartHandshake,
      label: 'Projets',
      href: '/dashboard/ngo/projects',
    },
    {
      icon: BarChart3,
      label: 'Impact',
      href: '/dashboard/ngo/impact',
    },
    {
      icon: Map,
      label: 'Carte d\'intervention',
      href: '/dashboard/ngo/map',
    },
    {
      icon: FileText,
      label: 'Rapports',
      href: '/dashboard/ngo/reports',
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <h1 className="text-2xl font-bold mb-6">
        Tableau de bord - ONG & Partenaires 💰
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Fonds investis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.2M BIF</div>
            <p className="text-xs text-muted-foreground mt-1">
              45% du budget annuel
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Fonds disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22.3M BIF</div>
            <p className="text-xs text-muted-foreground mt-1">
              À distribuer avant décembre 2023
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
            <div className="text-2xl font-bold">876</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
              <span className="text-green-500 font-medium">+124</span> ce trimestre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Projets actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground mt-1">
              Dans 5 provinces
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance des projets</CardTitle>
            <CardDescription>
              Indicateurs d'impact pour les projets en cours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-medium">Projet</th>
                    <th className="text-left py-3 font-medium">Région</th>
                    <th className="text-left py-3 font-medium">Budget</th>
                    <th className="text-left py-3 font-medium">Bénéficiaires</th>
                    <th className="text-left py-3 font-medium">Avancement</th>
                    <th className="text-left py-3 font-medium">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { 
                      name: 'Semences améliorées', 
                      region: 'Bujumbura Rural', 
                      budget: '3.5M BIF',
                      beneficiaries: 245,
                      progress: 85,
                      impact: 'Élevé'
                    },
                    { 
                      name: 'Formation agricole', 
                      region: 'Gitega', 
                      budget: '2.8M BIF',
                      beneficiaries: 320,
                      progress: 60,
                      impact: 'Moyen'
                    },
                    { 
                      name: 'Irrigation durable', 
                      region: 'Ngozi', 
                      budget: '4.2M BIF',
                      beneficiaries: 187,
                      progress: 40,
                      impact: 'Élevé'
                    },
                    { 
                      name: 'Microcrédit agricole', 
                      region: 'Kayanza', 
                      budget: '5.1M BIF',
                      beneficiaries: 124,
                      progress: 75,
                      impact: 'Très élevé'
                    },
                  ].map((item, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3 font-medium">{item.name}</td>
                      <td className="py-3">{item.region}</td>
                      <td className="py-3">{item.budget}</td>
                      <td className="py-3">{item.beneficiaries}</td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-agri h-2 rounded-full" 
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{item.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          item.impact === 'Très élevé' 
                            ? 'bg-green-100 text-green-800' 
                            : item.impact === 'Élevé'
                              ? 'bg-teal-100 text-teal-800'
                              : 'bg-blue-100 text-blue-800'
                        }`}>
                          {item.impact}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Évolution des revenus agricoles</CardTitle>
            <CardDescription>
              Dans les zones d'intervention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: 'Bujumbura Rural', change: '+32%', status: 'Forte hausse' },
                { name: 'Gitega', change: '+18%', status: 'Hausse modérée' },
                { name: 'Ngozi', change: '+24%', status: 'Hausse significative' },
                { name: 'Kayanza', change: '+28%', status: 'Hausse significative' },
                { name: 'Kirundo', change: '+15%', status: 'Hausse modérée' },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className={`text-sm mt-1 ${
                        parseInt(item.change) > 25 
                          ? 'text-green-600' 
                          : parseInt(item.change) > 20 
                            ? 'text-teal-600' 
                            : 'text-blue-600'
                      }`}>
                        {item.change} • {item.status}
                      </p>
                    </div>
                    <TrendingUp className={`h-6 w-6 ${
                      parseInt(item.change) > 25 
                        ? 'text-green-500' 
                        : parseInt(item.change) > 20 
                          ? 'text-teal-500' 
                          : 'text-blue-500'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Répartition des fonds</CardTitle>
            <CardDescription>
              Par type d'intervention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Formation', percentage: 30, icon: Users, color: 'bg-blue-500' },
                { name: 'Équipements', percentage: 25, icon: HandCoins, color: 'bg-purple-500' },
                { name: 'Semences', percentage: 20, icon: Sprout, color: 'bg-green-500' },
                { name: 'Microcrédits', percentage: 15, icon: DollarSign, color: 'bg-amber-500' },
                { name: 'Infrastructure', percentage: 10, icon: Map, color: 'bg-indigo-500' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center">
                      <item.icon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
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

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ajustement des aides financières</CardTitle>
            <CardDescription>
              En fonction de l'évolution des prix du marché
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-medium">Produit</th>
                    <th className="text-left py-3 font-medium">Prix précédent</th>
                    <th className="text-left py-3 font-medium">Prix actuel</th>
                    <th className="text-left py-3 font-medium">Variation</th>
                    <th className="text-left py-3 font-medium">Ajustement</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { 
                      product: 'Maïs', 
                      prevPrice: '850 BIF/kg', 
                      currentPrice: '950 BIF/kg',
                      change: '+11.8%',
                      adjustment: 'Augmenter les subventions'
                    },
                    { 
                      product: 'Haricots', 
                      prevPrice: '1,250 BIF/kg', 
                      currentPrice: '1,200 BIF/kg',
                      change: '-4.0%',
                      adjustment: 'Maintenir les subventions'
                    },
                    { 
                      product: 'Manioc', 
                      prevPrice: '600 BIF/kg', 
                      currentPrice: '700 BIF/kg',
                      change: '+16.7%',
                      adjustment: 'Augmenter les subventions'
                    },
                    { 
                      product: 'Pommes de terre', 
                      prevPrice: '750 BIF/kg', 
                      currentPrice: '700 BIF/kg',
                      change: '-6.7%',
                      adjustment: 'Réduire les subventions'
                    },
                  ].map((item, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3 font-medium">{item.product}</td>
                      <td className="py-3">{item.prevPrice}</td>
                      <td className="py-3">{item.currentPrice}</td>
                      <td className="py-3">
                        <span className={`${
                          item.change.startsWith('+') 
                            ? 'text-red-500' 
                            : 'text-green-500'
                        }`}>
                          {item.change}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          item.adjustment.includes('Augmenter') 
                            ? 'bg-amber-100 text-amber-800' 
                            : item.adjustment.includes('Réduire')
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                        }`}>
                          {item.adjustment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NgoDashboard;
