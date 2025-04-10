import React from 'react';
import { CreditCard, FileText, AlertTriangle, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CooperativeSubsidies = () => {
  const sidebarItems = [
    {
      icon: CreditCard,
      label: 'Tableau de bord',
      href: '/dashboard/cooperative',
    },
    {
      icon: CreditCard,
      label: 'Subventions',
      href: '/dashboard/cooperative/subsidies',
      active: true,
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestion des subventions</h1>
          <Button>Demander une nouvelle subvention</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Subventions actives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">
                1,500,000 BIF au total
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                En attente d'approbation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground mt-1">
                500,000 BIF demandés
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Subventions utilisées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Du montant total alloué
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Subventions disponibles</CardTitle>
            <CardDescription>Liste des subventions actuelles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { 
                  title: 'Subvention pour équipements agricoles',
                  provider: 'Ministère de l\'Agriculture',
                  amount: '750,000 BIF',
                  remaining: '427,500 BIF',
                  progress: 43,
                  status: 'active',
                  deadline: '31/12/2023',
                },
                { 
                  title: 'Prêt pour semences améliorées',
                  provider: 'Banque Agricole du Burundi',
                  amount: '500,000 BIF',
                  remaining: '125,000 BIF',
                  progress: 75,
                  status: 'active',
                  deadline: '15/10/2023',
                },
                { 
                  title: 'Soutien au stockage des récoltes',
                  provider: 'ONG Agri-Monde',
                  amount: '250,000 BIF',
                  remaining: '250,000 BIF',
                  progress: 0,
                  status: 'active',
                  deadline: '01/03/2024',
                },
                { 
                  title: 'Formation des agriculteurs',
                  provider: 'Institut Agricole de Gitega',
                  amount: '500,000 BIF',
                  remaining: '0',
                  progress: 100,
                  status: 'pending',
                  deadline: 'En attente',
                },
              ].map((item, index) => (
                <div key={index} className="bg-muted/20 p-4 rounded-lg">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <h4 className="font-semibold flex items-center">
                        {item.title}
                        {item.status === 'pending' ? (
                          <AlertTriangle className="h-4 w-4 ml-2 text-amber-500" />
                        ) : (
                          <ThumbsUp className="h-4 w-4 ml-2 text-green-500" />
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">{item.provider}</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <span>Montant:</span>
                        <span className="font-medium">{item.amount}</span>
                        <span>Restant:</span>
                        <span className="font-medium">{item.remaining}</span>
                        <span>Échéance:</span>
                        <span className="font-medium">{item.deadline}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 min-w-[140px]">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.status === 'pending' ? 'bg-amber-500' : 'bg-green-500'
                          }`} 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Utilisé: {item.progress}%</span>
                        <span>
                          {item.status === 'pending' ? 'En attente' : 'Actif'}
                        </span>
                      </div>
                      <Button 
                        size="sm" 
                        variant={item.status === 'pending' ? "outline" : "default"}
                        className="mt-2"
                      >
                        {item.status === 'pending' ? 'Voir le statut' : 'Gérer les fonds'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default CooperativeSubsidies;
