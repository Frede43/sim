import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Package, 
  CreditCard, 
  TrendingUp, 
  BarChart,
  FileText,
  UserPlus
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

const CooperativeDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();

  const sidebarItems = [
    {
      icon: Home,
      label: 'Tableau de bord',
      href: '/dashboard/cooperative',
      active: location.pathname === '/dashboard/cooperative',
    },
    {
      icon: Users,
      label: 'Membres',
      href: '/dashboard/cooperative/members',
    },
    {
      icon: Package,
      label: 'Produits',
      href: '/dashboard/cooperative/products',
    },
    {
      icon: BarChart,
      label: 'Statistiques',
      href: '/dashboard/cooperative/stats',
    },
    {
      icon: CreditCard,
      label: 'Subventions',
      href: '/dashboard/cooperative/subsidies',
    },
    {
      icon: FileText,
      label: 'Rapports',
      href: '/dashboard/cooperative/reports',
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      {location.pathname === '/dashboard/cooperative' ? (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">
            Tableau de bord - Coopérative {user?.name} 🤝
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Membres actifs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">43</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
                  <span className="text-green-500 font-medium">+5</span> ce mois-ci
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Stock total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,750 kg</div>
                <p className="text-xs text-muted-foreground mt-1">
                  7 types de produits
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Ventes du mois
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,450,000 BIF</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
                  <span className="text-green-500 font-medium">+15%</span> vs. mois dernier
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Subventions actives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground mt-1">
                  1,500,000 BIF disponibles
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Membres récemment actifs</CardTitle>
                <CardDescription>
                  Dernières contributions des membres
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          <Users className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium">Agriculteur {item}</div>
                          <div className="text-xs text-muted-foreground">A livré 50kg de maïs</div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Il y a {item * 2} heures
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-sm text-agri hover:underline flex items-center justify-center">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Ajouter un nouveau membre
                </button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribution des subventions</CardTitle>
                <CardDescription>
                  Répartition des fonds entre les membres
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-agri/5 p-4 rounded-lg">
                    <h4 className="font-semibold">Subvention pour équipements agricoles</h4>
                    <p className="text-sm text-muted-foreground mb-3">Ministère de l'Agriculture</p>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Montant total:</span>
                          <span className="font-medium">750,000 BIF</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Distribué:</span>
                          <span className="font-medium">325,000 BIF (43%)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Bénéficiaires:</span>
                          <span className="font-medium">13 membres</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-agri h-2 rounded-full" style={{ width: '43%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-agri/5 p-4 rounded-lg">
                    <h4 className="font-semibold">Prêt pour semences améliorées</h4>
                    <p className="text-sm text-muted-foreground mb-3">Banque Agricole du Burundi</p>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Montant total:</span>
                          <span className="font-medium">500,000 BIF</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Distribué:</span>
                          <span className="font-medium">375,000 BIF (75%)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Bénéficiaires:</span>
                          <span className="font-medium">25 membres</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-agri h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Gestion des intrants agricoles</CardTitle>
              <CardDescription>
                Suivi des approvisionnements en intrants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 font-medium">Produit</th>
                      <th className="text-left py-3 font-medium">Fournisseur</th>
                      <th className="text-left py-3 font-medium">Quantité</th>
                      <th className="text-left py-3 font-medium">Date livraison</th>
                      <th className="text-left py-3 font-medium">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { 
                        product: 'Engrais NPK', 
                        supplier: 'AgroFert Burundi', 
                        quantity: '1,000 kg',
                        date: '15/07/2023',
                        status: 'Livré'
                      },
                      { 
                        product: 'Semences de maïs', 
                        supplier: 'SemBur', 
                        quantity: '500 kg',
                        date: '20/07/2023',
                        status: 'Livré'
                      },
                      { 
                        product: 'Pesticides biologiques', 
                        supplier: 'BioProtect', 
                        quantity: '100 litres',
                        date: '05/08/2023',
                        status: 'En attente'
                      },
                    ].map((item, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3">{item.product}</td>
                        <td className="py-3">{item.supplier}</td>
                        <td className="py-3">{item.quantity}</td>
                        <td className="py-3">{item.date}</td>
                        <td className="py-3">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                            item.status === 'Livré' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {item.status}
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
      ) : (
        <Outlet />
      )}
    </DashboardLayout>
  );
};

export default CooperativeDashboard;
