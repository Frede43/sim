
import React from 'react';
import { 
  Home, 
  Wheat, 
  CreditCard, 
  TrendingUp, 
  ShoppingCart,
  Users,
  Building,
  UserPlus,
  ArrowRight,
  CheckCircle,
  Mail,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

const FarmerCooperatives = () => {
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
      active: true,
    },
  ];

  const myCooperatives = [
    {
      id: 1,
      name: "Coopérative Abahinzi",
      members: 43,
      location: "Bujumbura Rural",
      role: "Membre",
      benefits: ["Accès au marché", "Intrants subventionnés", "Stockage commun"],
      joinDate: "15/03/2022"
    }
  ];

  const recommendedCooperatives = [
    {
      id: 2,
      name: "Association Rizicole Imbo",
      members: 72,
      location: "Bubanza",
      focus: "Riz",
      benefits: ["Exportation", "Mécanisation", "Formation"],
      requirements: "Producteurs de riz avec min. 0.5 hectare"
    },
    {
      id: 3,
      name: "Coopérative Maïs Plus",
      members: 38,
      location: "Gitega",
      focus: "Maïs",
      benefits: ["Stockage", "Transport", "Vente groupée"],
      requirements: "Production min. 500kg/an"
    },
    {
      id: 4,
      name: "Union des Maraîchers",
      members: 56,
      location: "Ngozi",
      focus: "Légumes",
      benefits: ["Chambre froide", "Emballage", "Certification bio"],
      requirements: "Producteurs de légumes"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Formation sur les semences améliorées",
      organizer: "Coopérative Abahinzi",
      date: "15/08/2023",
      time: "09:00 - 12:00",
      location: "Centre communautaire, Bujumbura Rural"
    },
    {
      id: 2,
      title: "Assemblée générale annuelle",
      organizer: "Coopérative Abahinzi",
      date: "30/08/2023",
      time: "14:00 - 16:00",
      location: "Siège de la coopérative, Bujumbura Rural"
    },
    {
      id: 3,
      title: "Journée portes ouvertes - Union des Maraîchers",
      organizer: "Union des Maraîchers",
      date: "05/09/2023",
      time: "10:00 - 15:00",
      location: "Ngozi, près du marché central"
    }
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <h1 className="text-2xl font-bold mb-6">
        Coopératives Agricoles
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Mes adhésions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground mt-1">
              Coopérative active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Événements à venir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">
              Dans le mois prochain
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recommandations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">
              Basées sur vos cultures
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Mes coopératives</CardTitle>
          <CardDescription>
            Coopératives auxquelles vous êtes inscrit
          </CardDescription>
        </CardHeader>
        <CardContent>
          {myCooperatives.length > 0 ? (
            <div className="space-y-6">
              {myCooperatives.map((coop) => (
                <div key={coop.id} className="bg-agri/5 p-4 rounded-lg">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <div className="flex items-center">
                        <Building className="h-5 w-5 text-agri mr-2" />
                        <h4 className="font-medium text-lg">{coop.name}</h4>
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">Localisation:</span> {coop.location}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Membres:</span> {coop.members}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Votre rôle:</span> {coop.role}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Date d'adhésion:</span> {coop.joinDate}
                        </p>
                      </div>
                      <div className="mt-3">
                        <h5 className="text-sm font-medium mb-1">Avantages:</h5>
                        <div className="flex flex-wrap gap-2">
                          {coop.benefits.map((benefit, index) => (
                            <Badge key={index} variant="outline" className="bg-white text-agri">
                              <CheckCircle className="h-3 w-3 mr-1" /> {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 space-y-2">
                      <Button size="sm" className="w-full md:w-auto">
                        <Mail className="h-4 w-4 mr-2" /> Contacter
                      </Button>
                      <Button size="sm" variant="outline" className="w-full md:w-auto">
                        Voir les détails
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Building className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium mb-1">Aucune adhésion</h3>
              <p className="text-muted-foreground mb-4">
                Vous n'êtes pas encore membre d'une coopérative
              </p>
              <Button className="bg-agri hover:bg-agri/90">
                <UserPlus className="h-4 w-4 mr-2" /> Explorer les coopératives
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Événements à venir</CardTitle>
          <CardDescription>
            Activités organisées par les coopératives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border border-blue-100 bg-blue-50 p-4 rounded-lg">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm text-blue-700">
                        {event.date} • {event.time}
                      </span>
                    </div>
                    <h4 className="font-medium mt-1">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">Organisé par: {event.organizer}</p>
                    <p className="text-sm mt-1">Lieu: {event.location}</p>
                  </div>
                  <div className="mt-3 md:mt-0 flex items-start md:items-center">
                    <Button size="sm" variant="outline" className="bg-white">
                      Je participe
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
          <CardTitle>Coopératives recommandées</CardTitle>
          <CardDescription>
            Coopératives qui pourraient vous intéresser
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recommendedCooperatives.map((coop) => (
              <div key={coop.id} className="border p-4 rounded-lg">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-muted-foreground mr-2" />
                      <h4 className="font-medium">{coop.name}</h4>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Localisation:</span> {coop.location}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Membres:</span> {coop.members}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Spécialisation:</span> {coop.focus}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Critères:</span> {coop.requirements}
                      </p>
                    </div>
                    <div className="mt-3">
                      <h5 className="text-sm font-medium mb-1">Avantages:</h5>
                      <div className="flex flex-wrap gap-2">
                        {coop.benefits.map((benefit, index) => (
                          <Badge key={index} variant="outline">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-4 flex flex-col gap-2">
                    <Button size="sm" className="bg-agri hover:bg-agri/90 w-full md:w-auto">
                      <UserPlus className="h-4 w-4 mr-2" /> Demander l'adhésion
                    </Button>
                    <Button size="sm" variant="outline" className="w-full md:w-auto">
                      Plus de détails <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default FarmerCooperatives;
