import React from 'react';
import { Search, Filter, Plus, Edit2, Trash2, TrendingUp, Calendar, Users, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'planned';
  progress: number;
  beneficiaries: number;
  budget: number;
  startDate: string;
  endDate: string;
}

const projects: Project[] = [
  {
    id: 'p1',
    name: 'Programme de résilience agricole',
    description: 'Formation et accompagnement des agriculteurs pour améliorer leur résilience face aux changements climatiques',
    status: 'active',
    progress: 75,
    beneficiaries: 250,
    budget: 150000000,
    startDate: '2023-01-15',
    endDate: '2024-01-14',
  },
  {
    id: 'p2',
    name: 'Projet d\'irrigation Gitega',
    description: 'Installation de systèmes d\'irrigation modernes pour les petits exploitants',
    status: 'planned',
    progress: 0,
    beneficiaries: 180,
    budget: 85000000,
    startDate: '2024-03-01',
    endDate: '2025-02-28',
  },
  {
    id: 'p3',
    name: 'Formation en agroécologie',
    description: 'Programme de formation aux pratiques agricoles durables',
    status: 'completed',
    progress: 100,
    beneficiaries: 120,
    budget: 45000000,
    startDate: '2023-06-01',
    endDate: '2023-12-31',
  },
];

const NgoProjects = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestion des projets</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble et suivi des projets en cours
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau projet
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Projets actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-green-500 mt-1">
              +2 ce mois
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
            <div className="text-2xl font-bold">850M BIF</div>
            <p className="text-xs text-green-500 mt-1">
              +15% vs année précédente
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
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-amber-500 mt-1">
              Objectif: 1,500
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taux de réussite
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Projets complétés
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des projets</CardTitle>
          <CardDescription>
            Tous les projets actifs et planifiés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher un projet..." className="pl-8" />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>

          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {project.description}
                        </p>
                      </div>
                      <Badge variant={
                        project.status === 'active' ? 'default' :
                        project.status === 'completed' ? 'secondary' :
                        'outline'
                      }>
                        {project.status === 'active' ? 'En cours' :
                         project.status === 'completed' ? 'Terminé' :
                         'Planifié'}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">
                          <p className="text-muted-foreground">Période</p>
                          <p>{project.startDate} - {project.endDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">
                          <p className="text-muted-foreground">Bénéficiaires</p>
                          <p>{project.beneficiaries}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">
                          <p className="text-muted-foreground">Budget</p>
                          <p>{project.budget.toLocaleString()} BIF</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progression</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
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

export default NgoProjects;
