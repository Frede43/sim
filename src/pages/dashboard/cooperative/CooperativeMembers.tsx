
import React from 'react';
import { 
  Home, 
  Users, 
  Package, 
  BarChart, 
  CreditCard, 
  FileText, 
  Search, 
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Filter,
  Download,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

const CooperativeMembers = () => {
  const { user } = useAuth();

  const sidebarItems = [
    {
      icon: Home,
      label: 'Tableau de bord',
      href: '/dashboard/cooperative',
    },
    {
      icon: Users,
      label: 'Membres',
      href: '/dashboard/cooperative/members',
      active: true,
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

  const members = [
    {
      id: 1,
      name: "Jean Ndayishimiye",
      location: "Bujumbura Rural",
      joinDate: "12/03/2019",
      status: "Actif",
      contribution: "245,000 BIF",
      products: ["Maïs", "Haricots"],
      landSize: "1.5 hectares",
      contact: "+257 79 123 456"
    },
    {
      id: 2,
      name: "Marie Niyonzima",
      location: "Bujumbura Rural",
      joinDate: "05/06/2020",
      status: "Actif",
      contribution: "178,000 BIF",
      products: ["Tomates", "Oignons"],
      landSize: "0.8 hectares",
      contact: "+257 76 234 567"
    },
    {
      id: 3,
      name: "Pierre Hakizimana",
      location: "Bujumbura Rural",
      joinDate: "23/01/2018",
      status: "Actif",
      contribution: "320,000 BIF",
      products: ["Maïs", "Manioc", "Bananes"],
      landSize: "2.2 hectares",
      contact: "+257 71 345 678"
    },
    {
      id: 4,
      name: "Jeanne Uwimana",
      location: "Bujumbura Rural",
      joinDate: "10/09/2021",
      status: "Inactif",
      contribution: "45,000 BIF",
      products: ["Haricots"],
      landSize: "0.5 hectares",
      contact: "+257 72 456 789"
    },
    {
      id: 5,
      name: "Paul Nduwimana",
      location: "Bujumbura Rural",
      joinDate: "14/04/2019",
      status: "Actif",
      contribution: "210,000 BIF",
      products: ["Maïs", "Arachides"],
      landSize: "1.3 hectares",
      contact: "+257 79 567 890"
    }
  ];

  const memberRequests = [
    {
      id: 101,
      name: "François Bizimana",
      location: "Bujumbura Rural",
      requestDate: "28/07/2023",
      products: ["Maïs", "Pommes de terre"],
      landSize: "1.2 hectares",
      contact: "+257 78 123 987"
    },
    {
      id: 102,
      name: "Claire Iradukunda",
      location: "Muramvya",
      requestDate: "30/07/2023",
      products: ["Haricots", "Aubergines"],
      landSize: "0.7 hectares",
      contact: "+257 75 234 876"
    }
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Gestion des Membres</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un membre..."
              className="pl-8 w-full"
            />
          </div>
          <Button className="bg-agri hover:bg-agri/90">
            <UserPlus className="mr-2 h-4 w-4" /> Ajouter un membre
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total des membres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground mt-1">
              5 nouveaux ce trimestre
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Membres actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1">
              93% du total des membres
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contributions totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2M BIF</div>
            <p className="text-xs text-muted-foreground mt-1">
              +450K BIF ce trimestre
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Terres cultivées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58 ha</div>
            <p className="text-xs text-muted-foreground mt-1">
              Réparties sur 3 communes
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-col md:flex-row justify-between items-start gap-3">
          <div>
            <CardTitle>Liste des membres</CardTitle>
            <CardDescription>
              Informations détaillées sur les membres de la coopérative
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" /> Filtrer
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" /> Exporter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium">Nom</th>
                  <th className="text-left py-3 font-medium">Localisation</th>
                  <th className="text-left py-3 font-medium">Date d'adhésion</th>
                  <th className="text-left py-3 font-medium">Contribution</th>
                  <th className="text-left py-3 font-medium">Produits</th>
                  <th className="text-left py-3 font-medium">Superficie</th>
                  <th className="text-left py-3 font-medium">Statut</th>
                  <th className="text-left py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b last:border-0">
                    <td className="py-3 font-medium">{member.name}</td>
                    <td className="py-3">{member.location}</td>
                    <td className="py-3">{member.joinDate}</td>
                    <td className="py-3">{member.contribution}</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-1">
                        {member.products.map((product, index) => (
                          <Badge key={index} variant="outline" className="bg-agri/10 text-agri">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-3">{member.landSize}</td>
                    <td className="py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        member.status === 'Actif' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Phone className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          Détails
                        </Button>
                      </div>
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
          <CardTitle>Demandes d'adhésion</CardTitle>
          <CardDescription>
            Agriculteurs souhaitant rejoindre la coopérative
          </CardDescription>
        </CardHeader>
        <CardContent>
          {memberRequests.length > 0 ? (
            <div className="space-y-4">
              {memberRequests.map((request) => (
                <div key={request.id} className="border border-amber-200 bg-amber-50 p-4 rounded-lg">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h4 className="font-medium">{request.name}</h4>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">{request.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">{request.contact}</span>
                        </div>
                        <p className="text-sm">
                          <span className="font-medium">Date de demande:</span> {request.requestDate}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Produits:</span> {request.products.join(', ')}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Superficie:</span> {request.landSize}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" /> Approuver
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500 border-red-300 hover:bg-red-50">
                        <XCircle className="h-4 w-4 mr-2" /> Rejeter
                      </Button>
                      <Button size="sm" variant="ghost">
                        Demander plus d'infos
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-8 text-muted-foreground">
              Aucune demande d'adhésion en attente
            </p>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default CooperativeMembers;
