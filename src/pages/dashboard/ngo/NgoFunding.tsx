import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { CalendarDays, ChevronRight, Users, DollarSign, BarChart as BarChartIcon, Search, Download, FileText, PieChart as PieChartIcon, Map, PlusCircle, Filter, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const grantsData = [
  { id: 1, name: "Programme de résilience agricole", donor: "Union Européenne", amount: 250000, received: 150000, startDate: "2023-01-10", endDate: "2025-01-09", status: "active" },
  { id: 2, name: "Sécurité alimentaire rurale", donor: "USAID", amount: 180000, received: 180000, startDate: "2022-06-15", endDate: "2023-06-14", status: "completed" },
  { id: 3, name: "Formation agricole innovante", donor: "Fondation Gates", amount: 120000, received: 80000, startDate: "2023-03-01", endDate: "2024-02-28", status: "active" },
  { id: 4, name: "Adaptation au changement climatique", donor: "PNUD", amount: 200000, received: 50000, startDate: "2023-05-20", endDate: "2025-05-19", status: "active" },
  { id: 5, name: "Autonomisation des femmes rurales", donor: "ONU Femmes", amount: 90000, received: 30000, startDate: "2023-04-01", endDate: "2024-03-31", status: "active" },
  { id: 6, name: "Eau potable en milieu rural", donor: "UNICEF", amount: 150000, received: 150000, startDate: "2022-09-10", endDate: "2023-09-09", status: "completed" },
];

const sectorData = [
  { name: 'Agriculture durable', value: 35 },
  { name: 'Sécurité alimentaire', value: 25 },
  { name: 'Eau et assainissement', value: 15 },
  { name: 'Formation agricole', value: 15 },
  { name: 'Droits des femmes', value: 10 },
];

const annualFundingData = [
  { year: '2018', amount: 450000 },
  { year: '2019', amount: 520000 },
  { year: '2020', amount: 480000 },
  { year: '2021', amount: 600000 },
  { year: '2022', amount: 750000 },
  { year: '2023', amount: 900000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const NgoFunding = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();
  
  const sidebarItems = [
    { icon: BarChartIcon, label: 'Tableau de bord', href: '/dashboard/ngo', active: false },
    { icon: PieChartIcon, label: 'Projets', href: '/dashboard/ngo/projects', active: false },
    { icon: CalendarDays, label: 'Financement', href: '/dashboard/ngo/funding', active: true },
    { icon: Map, label: 'Carte d\'impact', href: '/dashboard/ngo/map', active: false },
    { icon: FileText, label: 'Rapports', href: '/dashboard/ngo/reports', active: false },
  ];

  const filteredGrants = grantsData.filter(grant => {
    return (
      grant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || grant.status === statusFilter)
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

  const totalGrantsAmount = grantsData.reduce((sum, grant) => sum + grant.amount, 0);
  const totalReceived = grantsData.reduce((sum, grant) => sum + grant.received, 0);
  const activeGrants = grantsData.filter(grant => grant.status === 'active').length;

  const calculateCompletion = (received, total) => {
    return Math.round((received / total) * 100);
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Gestion du Financement</h1>
          <Button variant="outline" onClick={() => navigate('/dashboard/ngo')}>
            Retour au tableau de bord <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Financement total</CardTitle>
              <CardDescription>Montant total des subventions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalGrantsAmount)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Montant reçu</CardTitle>
              <CardDescription>Financement déjà reçu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalReceived)}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {calculateCompletion(totalReceived, totalGrantsAmount)}% du total
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Subventions actives</CardTitle>
              <CardDescription>Nombre de subventions en cours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeGrants}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>A recevoir</CardTitle>
              <CardDescription>Montant restant à percevoir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalGrantsAmount - totalReceived)}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="grants">
          <TabsList>
            <TabsTrigger value="grants">Subventions</TabsTrigger>
            <TabsTrigger value="analytics">Analyses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grants" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Liste des subventions et financements</CardTitle>
                  <CardDescription>Gérez vos sources de financement et leur progression</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Ajouter une subvention
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ajouter une nouvelle subvention</DialogTitle>
                      <DialogDescription>
                        Entrez les détails de la nouvelle subvention ou du nouveau financement.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button type="button" variant="outline">Annuler</Button>
                      <Button>Ajouter</Button>
                    </DialogFooter>
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
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrer par statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Terminée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom du projet</TableHead>
                      <TableHead>Donateur</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Progression</TableHead>
                      <TableHead>Période</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGrants.map((grant) => (
                      <TableRow key={grant.id}>
                        <TableCell className="font-medium">{grant.name}</TableCell>
                        <TableCell>{grant.donor}</TableCell>
                        <TableCell>{formatCurrency(grant.amount)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: `${calculateCompletion(grant.received, grant.amount)}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium">{calculateCompletion(grant.received, grant.amount)}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDate(grant.startDate)} - {formatDate(grant.endDate)}
                        </TableCell>
                        <TableCell>
                          {grant.status === 'active' ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Active</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Terminée</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
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
                  Affichage de {filteredGrants.length} sur {grantsData.length} subventions
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Répartition du financement par secteur</CardTitle>
                  <CardDescription>Distribution des fonds par secteur d'activité</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sectorData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {sectorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Évolution du financement annuel</CardTitle>
                  <CardDescription>Montant total reçu par année</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={annualFundingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                        <Bar dataKey="amount" name="Montant" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default NgoFunding;
