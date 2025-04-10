
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { ChevronRight, ListFilter, Download, PlusCircle, Trash2, Edit2, Search, BarChart as BarChartIcon, Map, FileText, AlertCircle, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const subsidyData = [
  { id: 1, name: "Subvention d'engrais", beneficiaries: 2500, budget: 150000000, allocated: 120000000, remaining: 30000000, startDate: "2023-01-15", endDate: "2023-12-31", status: "active" },
  { id: 2, name: "Subvention de semences", beneficiaries: 1800, budget: 80000000, allocated: 65000000, remaining: 15000000, startDate: "2023-02-01", endDate: "2023-11-30", status: "active" },
  { id: 3, name: "Soutien à l'irrigation", beneficiaries: 950, budget: 200000000, allocated: 140000000, remaining: 60000000, startDate: "2023-03-10", endDate: "2024-03-09", status: "active" },
  { id: 4, name: "Mécanisation agricole", beneficiaries: 450, budget: 300000000, allocated: 280000000, remaining: 20000000, startDate: "2023-01-01", endDate: "2023-10-31", status: "expiring" },
  { id: 5, name: "Lutte antiparasitaire", beneficiaries: 1200, budget: 50000000, allocated: 50000000, remaining: 0, startDate: "2022-11-15", endDate: "2023-09-15", status: "depleted" },
  { id: 6, name: "Soutien agriculteurs femmes", beneficiaries: 1500, budget: 100000000, allocated: 75000000, remaining: 25000000, startDate: "2023-04-01", endDate: "2024-03-31", status: "active" },
];

const subsidyAllocationData = [
  { name: 'Bujumbura', amount: 120000000 },
  { name: 'Gitega', amount: 100000000 },
  { name: 'Ngozi', amount: 80000000 },
  { name: 'Muyinga', amount: 75000000 },
  { name: 'Cibitoke', amount: 40000000 },
  { name: 'Autres', amount: 65000000 },
];

const GovernmentSubsidies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const sidebarItems = [
    { icon: BarChartIcon, label: 'Tableau de bord', href: '/dashboard/government', active: false },
    { icon: BarChartIcon, label: 'Statistiques', href: '/dashboard/government/stats', active: false },
    { icon: Map, label: 'Carte', href: '/dashboard/government/map', active: false },
    { icon: FileText, label: 'Rapports', href: '/dashboard/government/reports', active: false },
    { icon: AlertCircle, label: 'Alertes', href: '/dashboard/government/alerts', active: false },
    { icon: DollarSign, label: 'Subventions', href: '/dashboard/government/subsidies', active: true },
  ];

  const filteredSubsidies = subsidyData.filter(subsidy => {
    return (
      subsidy.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || subsidy.status === statusFilter)
    );
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-BI', { 
      style: 'currency', 
      currency: 'BIF',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric" as const, month: "long" as const, day: "numeric" as const };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const handleAddSubsidy = (e) => {
    e.preventDefault();
    toast({
      title: "Subvention créée",
      description: "La nouvelle subvention a été ajoutée avec succès.",
    });
    setShowForm(false);
  };

  const handleDeleteSubsidy = (id) => {
    toast({
      title: "Subvention supprimée",
      description: "La subvention a été supprimée avec succès.",
    });
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Active</Badge>;
      case 'expiring':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">Expiration proche</Badge>;
      case 'depleted':
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">Épuisée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Gestion des Subventions</h1>
          <Button variant="outline" onClick={() => navigate('/dashboard/government')}>
            Retour au tableau de bord <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Budget total</CardTitle>
              <CardDescription>Montant total alloué aux subventions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(880000000)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Montant distribué</CardTitle>
              <CardDescription>Subventions déjà distribuées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(730000000)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Montant restant</CardTitle>
              <CardDescription>Fonds encore disponibles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(150000000)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Bénéficiaires</CardTitle>
              <CardDescription>Nombre total de bénéficiaires</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,400</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Répartition des subventions par province</CardTitle>
            <CardDescription>Allocation des fonds par province pour l'année en cours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subsidyAllocationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="amount" name="Montant alloué" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Liste des programmes de subventions</CardTitle>
              <CardDescription>Gérez les programmes de subventions existants</CardDescription>
            </div>
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nouvelle subvention
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Créer un nouveau programme de subvention</DialogTitle>
                  <DialogDescription>
                    Définissez les paramètres du nouveau programme de subvention.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddSubsidy}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">Nom</Label>
                      <Input id="name" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="budget" className="text-right">Budget</Label>
                      <Input id="budget" type="number" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="start-date" className="text-right">Date début</Label>
                      <Input id="start-date" type="date" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="end-date" className="text-right">Date fin</Label>
                      <Input id="end-date" type="date" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">Description</Label>
                      <Input id="description" className="col-span-3" required />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Annuler
                    </Button>
                    <Button type="submit">Créer la subvention</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une subvention..."
                  className="w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <ListFilter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expiring">Expiration proche</SelectItem>
                    <SelectItem value="depleted">Épuisée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom du programme</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Bénéficiaires</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Restant</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubsidies.map((subsidy) => (
                  <TableRow key={subsidy.id}>
                    <TableCell className="font-medium">{subsidy.name}</TableCell>
                    <TableCell>{getStatusBadge(subsidy.status)}</TableCell>
                    <TableCell>{subsidy.beneficiaries.toLocaleString()}</TableCell>
                    <TableCell>{formatCurrency(subsidy.budget)}</TableCell>
                    <TableCell>{formatCurrency(subsidy.remaining)}</TableCell>
                    <TableCell className="text-sm">
                      {formatDate(subsidy.startDate)} - {formatDate(subsidy.endDate)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteSubsidy(subsidy.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter les données
            </Button>
            <div className="text-sm text-muted-foreground">
              Affichage de {filteredSubsidies.length} sur {subsidyData.length} subventions
            </div>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default GovernmentSubsidies;
