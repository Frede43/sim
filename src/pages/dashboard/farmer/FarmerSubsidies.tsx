
import React from 'react';
import { 
  Home, 
  Wheat, 
  CreditCard, 
  TrendingUp, 
  ShoppingCart,
  Users,
  FileText,
  Calendar,
  Download,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

const FarmerSubsidies = () => {
  const { user } = useAuth();

  const sidebarItems = [
    {
      icon: Home,
      label: 'Tableau de bord',
      href: '/dashboard/farmer',
    },
    {
      icon: Wheat,
      label: 'Mes Produits',
      href: '/dashboard/farmer/products',
    },
    {
      icon: ShoppingCart,
      label: 'Mes Ventes',
      href: '/dashboard/farmer/sales',
    },
    {
      icon: CreditCard,
      label: 'Subventions',
      href: '/dashboard/farmer/subsidies',
      active: true,
    },
    {
      icon: TrendingUp,
      label: 'Prix du Marché',
      href: '/dashboard/farmer/market',
    },
    {
      icon: Users,
      label: 'Coopératives',
      href: '/dashboard/farmer/cooperatives',
    },
  ];

  const activeSubsidies = [
    {
      id: "SUB-001",
      name: "Subvention pour l'achat de semences améliorées",
      provider: "Ministère de l'Agriculture",
      amount: "150,000 BIF",
      used: 85000,
      total: 150000,
      expiryDate: "30/09/2023",
      status: "Actif"
    },
    {
      id: "SUB-002",
      name: "Aide à l'irrigation",
      provider: "ONG AgriAssist",
      amount: "200,000 BIF",
      used: 120000,
      total: 200000,
      expiryDate: "15/10/2023",
      status: "Actif"
    }
  ];

  const availableSubsidies = [
    {
      id: "SUB-003",
      name: "Programme d'équipement agricole",
      provider: "Banque Agricole du Burundi",
      type: "Prêt subventionné",
      amount: "500,000 BIF",
      deadline: "30/08/2023",
      eligibility: "Producteurs avec au moins 1 hectare"
    },
    {
      id: "SUB-004",
      name: "Formation en techniques agricoles modernes",
      provider: "Institut National Agronomique",
      type: "Formation gratuite",
      amount: "Valeur: 100,000 BIF",
      deadline: "15/09/2023",
      eligibility: "Tous les agriculteurs"
    }
  ];

  const pastSubsidies = [
    {
      id: "SUB-005",
      name: "Subvention pour fertilisants",
      provider: "Ministère de l'Agriculture",
      amount: "100,000 BIF",
      dateReceived: "15/04/2023",
      dateUsed: "30/05/2023",
      impact: "Augmentation du rendement de 20%"
    },
    {
      id: "SUB-006",
      name: "Aide à l'achat de semences",
      provider: "ONG AgriDev",
      amount: "75,000 BIF",
      dateReceived: "10/03/2023",
      dateUsed: "25/03/2023",
      impact: "Diversification des cultures"
    }
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <h1 className="text-2xl font-bold mb-6">
        Subventions Agricoles
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Subventions actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">
              Valeur totale: 350,000 BIF
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Subventions disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145,000 BIF</div>
            <p className="text-xs text-muted-foreground mt-1">
              41% du montant total encore disponible
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nouvelles opportunités</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-green-500 mt-1">
              Candidatures ouvertes
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Subventions actives</CardTitle>
          <CardDescription>
            Subventions en cours et montants disponibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activeSubsidies.map((subsidy) => (
              <div key={subsidy.id} className="bg-green-50 p-4 rounded-lg">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                  <div>
                    <h4 className="font-medium">{subsidy.name}</h4>
                    <p className="text-sm text-muted-foreground">{subsidy.provider}</p>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm">Expire le: {subsidy.expiryDate}</span>
                    </div>
                  </div>
                  <div className="mt-3 md:mt-0 text-right">
                    <span className="text-sm font-medium">Disponible: </span>
                    <span className="text-xl font-bold text-green-700">
                      {(subsidy.total - subsidy.used).toLocaleString()} BIF
                    </span>
                    <p className="text-sm text-muted-foreground">
                      sur {subsidy.amount}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Utilisation</span>
                    <span>{Math.round((subsidy.used / subsidy.total) * 100)}%</span>
                  </div>
                  <Progress value={(subsidy.used / subsidy.total) * 100} className="h-2" />
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Voir les détails
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Subventions disponibles</CardTitle>
          <CardDescription>
            Opportunités de financement ouvertes aux candidatures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {availableSubsidies.map((subsidy) => (
              <div key={subsidy.id} className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div className="mb-3 md:mb-0">
                    <div className="flex items-center">
                      <span className="inline-block px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 mr-2">
                        {subsidy.type}
                      </span>
                      <span className="text-sm text-muted-foreground">Date limite: {subsidy.deadline}</span>
                    </div>
                    <h4 className="font-medium mt-2">{subsidy.name}</h4>
                    <p className="text-sm text-muted-foreground">{subsidy.provider}</p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Montant:</span> {subsidy.amount}
                    </p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Éligibilité:</span> {subsidy.eligibility}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Plus d'infos
                    </Button>
                    <Button size="sm" className="bg-agri hover:bg-agri/90">
                      Postuler
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historique des subventions</CardTitle>
          <CardDescription>
            Subventions reçues et utilisées précédemment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium">Nom</th>
                  <th className="text-left py-3 font-medium">Fournisseur</th>
                  <th className="text-left py-3 font-medium">Montant</th>
                  <th className="text-left py-3 font-medium">Date de réception</th>
                  <th className="text-left py-3 font-medium">Date d'utilisation</th>
                  <th className="text-left py-3 font-medium">Impact</th>
                  <th className="text-left py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {pastSubsidies.map((subsidy) => (
                  <tr key={subsidy.id} className="border-b last:border-0">
                    <td className="py-3 font-medium">{subsidy.name}</td>
                    <td className="py-3">{subsidy.provider}</td>
                    <td className="py-3">{subsidy.amount}</td>
                    <td className="py-3">{subsidy.dateReceived}</td>
                    <td className="py-3">{subsidy.dateUsed}</td>
                    <td className="py-3">{subsidy.impact}</td>
                    <td className="py-3">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Reçu
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default FarmerSubsidies;
