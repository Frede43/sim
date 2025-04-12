import React from 'react';
import { Users, Search, Filter, UserPlus, UserCheck, UserX, MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Beneficiary {
  id: string;
  name: string;
  type: 'individual' | 'cooperative';
  location: string;
  contact: string;
  members?: number;
  projects: number;
  status: 'active' | 'inactive' | 'pending';
}

const beneficiaries: Beneficiary[] = [
  {
    id: 'b1',
    name: 'Coopérative Rizicole Imbo',
    type: 'cooperative',
    location: 'Bubanza',
    contact: '+257 22 123 456',
    members: 45,
    projects: 3,
    status: 'active',
  },
  {
    id: 'b2',
    name: 'Jean Ndayishimiye',
    type: 'individual',
    location: 'Gitega',
    contact: '+257 79 234 567',
    projects: 1,
    status: 'active',
  },
  {
    id: 'b3',
    name: 'Association Café Kayanza',
    type: 'cooperative',
    location: 'Kayanza',
    contact: '+257 22 345 678',
    members: 32,
    projects: 2,
    status: 'inactive',
  },
];

const NgoBeneficiaries = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestion des bénéficiaires</h1>
          <p className="text-muted-foreground">
            Suivi des agriculteurs et coopératives bénéficiant de nos programmes
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Ajouter un bénéficiaire
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total bénéficiaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-green-500 mt-1">
              +120 ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Coopératives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-green-500 mt-1">
              +2 ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taux de participation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-amber-500 mt-1">
              +5% ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Projets par bénéficiaire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4</div>
            <p className="text-xs text-muted-foreground mt-1">
              En moyenne
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des bénéficiaires</CardTitle>
          <CardDescription>
            Tous les bénéficiaires enregistrés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher un bénéficiaire..." className="pl-8" />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>

          <div className="space-y-4">
            {beneficiaries.map((beneficiary) => (
              <Card key={beneficiary.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${
                      beneficiary.type === 'cooperative' 
                        ? 'bg-blue-100'
                        : 'bg-green-100'
                    }`}>
                      <Users className={`h-4 w-4 ${
                        beneficiary.type === 'cooperative'
                          ? 'text-blue-600'
                          : 'text-green-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{beneficiary.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {beneficiary.type === 'cooperative' ? 'Coopérative' : 'Individuel'}
                          </p>
                        </div>
                        <Badge variant={
                          beneficiary.status === 'active' ? 'default' :
                          beneficiary.status === 'inactive' ? 'secondary' :
                          'outline'
                        }>
                          {beneficiary.status === 'active' ? 'Actif' :
                           beneficiary.status === 'inactive' ? 'Inactif' :
                           'En attente'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{beneficiary.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{beneficiary.contact}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        {beneficiary.members && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{beneficiary.members} membres</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{beneficiary.projects} projets</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <UserCheck className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <UserX className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NgoBeneficiaries;
