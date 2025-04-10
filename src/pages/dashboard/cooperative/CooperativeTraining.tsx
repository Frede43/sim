
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { CalendarDays, ChevronRight, Users, Layers, ArrowUpDown, PenTool, Video } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const trainings = [
  {
    id: 1,
    title: "Techniques agricoles durables",
    description: "Formation sur les méthodes agricoles durables et écologiques.",
    date: "2023-10-15",
    status: "upcoming",
    participants: 25,
    trainer: "Jean Niyonzima",
    location: "Centre communautaire de Bujumbura"
  },
  {
    id: 2,
    title: "Gestion financière pour coopératives",
    description: "Formation sur la comptabilité et la gestion financière des coopératives.",
    date: "2023-09-28",
    status: "completed",
    participants: 18,
    trainer: "Marie Kwizera",
    location: "Bureau provincial DPAE Gitega"
  },
  {
    id: 3,
    title: "Marketing et vente de produits agricoles",
    description: "Stratégies pour améliorer la commercialisation des produits agricoles.",
    date: "2023-11-05",
    status: "upcoming",
    participants: 22,
    trainer: "Claude Ntahorwamiye",
    location: "Salle de conférence Hôtel Source du Nil"
  },
  {
    id: 4,
    title: "Utilisation des technologies dans l'agriculture",
    description: "Introduction aux applications mobiles et outils numériques pour l'agriculture.",
    date: "2023-08-20",
    status: "completed",
    participants: 15,
    trainer: "Pierre Nkurunziza",
    location: "Centre d'innovation agricole Ngozi"
  },
  {
    id: 5,
    title: "Certification biologique",
    description: "Processus et exigences pour obtenir une certification de produits biologiques.",
    date: "2023-11-25",
    status: "upcoming",
    participants: 12,
    trainer: "Espérance Ndayishimiye",
    location: "Centre ISABU Bujumbura"
  }
];

const CooperativeTraining = () => {
  const [selectedTraining, setSelectedTraining] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const sidebarItems = [
    { icon: Users, label: 'Tableau de bord', href: '/dashboard/cooperative', active: false },
    { icon: Users, label: 'Membres', href: '/dashboard/cooperative/members', active: false },
    { icon: Layers, label: 'Produits', href: '/dashboard/cooperative/products', active: false },
    { icon: ArrowUpDown, label: 'Statistiques', href: '/dashboard/cooperative/stats', active: false },
    { icon: PenTool, label: 'Formations', href: '/dashboard/cooperative/training', active: true },
  ];

  const formatDate = (dateString) => {
    const options = { year: "numeric" as const, month: "long" as const, day: "numeric" as const };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const registerForTraining = (trainingId) => {
    toast({
      title: "Inscription réussie",
      description: "Votre coopérative a été inscrite pour cette formation.",
    });
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Gestion des Formations</h1>
          <Button variant="outline" onClick={() => navigate('/dashboard/cooperative')}>
            Retour au tableau de bord <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Formations à venir</CardTitle>
              <CardDescription>Formations planifiées pour votre coopérative</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Formations complétées</CardTitle>
              <CardDescription>Sessions terminées ce trimestre</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Participants formés</CardTitle>
              <CardDescription>Membres ayant suivi une formation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">33</div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Calendrier des formations</CardTitle>
            <CardDescription>Formations disponibles pour les coopératives agricoles</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Formation</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainings.map((training) => (
                  <TableRow key={training.id}>
                    <TableCell className="font-medium">{training.title}</TableCell>
                    <TableCell>{formatDate(training.date)}</TableCell>
                    <TableCell>
                      {training.status === 'upcoming' ? (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">À venir</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Terminée</Badge>
                      )}
                    </TableCell>
                    <TableCell>{training.participants}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setSelectedTraining(training)}
                          >
                            Détails
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>{selectedTraining?.title}</DialogTitle>
                            <DialogDescription>
                              {selectedTraining?.description}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <CalendarDays className="h-4 w-4 opacity-70" />
                              <div className="col-span-3">
                                <p className="text-sm font-medium">Date</p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedTraining && formatDate(selectedTraining.date)}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Users className="h-4 w-4 opacity-70" />
                              <div className="col-span-3">
                                <p className="text-sm font-medium">Formateur</p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedTraining?.trainer}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Video className="h-4 w-4 opacity-70" />
                              <div className="col-span-3">
                                <p className="text-sm font-medium">Lieu</p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedTraining?.location}
                                </p>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Fermer</Button>
                            </DialogClose>
                            {selectedTraining && selectedTraining.status === 'upcoming' && (
                              <Button 
                                onClick={() => {
                                  registerForTraining(selectedTraining.id);
                                }}
                              >
                                S'inscrire
                              </Button>
                            )}
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Video className="mr-2 h-4 w-4" />
              Accéder aux formations en ligne
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CooperativeTraining;
