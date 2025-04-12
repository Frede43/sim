import React from 'react';
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

interface Grant {
  id: number;
  name: string;
  donor: string;
  amount: number;
  received: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'pending';
}

const grantsData: Grant[] = [
  { id: 1, name: "Programme de résilience agricole", donor: "Union Européenne", amount: 250000, received: 150000, startDate: "2023-01-10", endDate: "2025-01-09", status: "active" },
  { id: 2, name: "Sécurité alimentaire rurale", donor: "USAID", amount: 180000, received: 180000, startDate: "2022-06-15", endDate: "2023-06-14", status: "completed" },
  { id: 3, name: "Formation agricole innovante", donor: "Fondation Gates", amount: 120000, received: 80000, startDate: "2023-03-01", endDate: "2024-02-28", status: "active" },
  { id: 4, name: "Adaptation au changement climatique", donor: "PNUD", amount: 200000, received: 50000, startDate: "2023-05-20", endDate: "2025-05-19", status: "active" },
  { id: 5, name: "Autonomisation des femmes rurales", donor: "ONU Femmes", amount: 150000, received: 100000, startDate: "2023-02-01", endDate: "2024-01-31", status: "active" },
];

const NgoFunding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestion des financements</h1>
          <p className="text-muted-foreground">
            Suivi des subventions et des dons
          </p>
        </div>
        <Button onClick={() => navigate('/dashboard/ngo/funding/new')}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nouveau financement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total des financements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">900,000 USD</div>
            <p className="text-xs text-muted-foreground mt-1">
              Pour l'année en cours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Montants reçus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">560,000 USD</div>
            <p className="text-xs text-green-500 mt-1">
              62% des financements totaux
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Projets financés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">
              En cours d'exécution
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taux d'utilisation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-amber-500 mt-1">
              Des fonds reçus
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des financements</CardTitle>
          <CardDescription>
            Tous les financements actifs et passés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher un financement..." className="pl-8" />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>

          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom du projet</TableHead>
                  <TableHead>Donateur</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Reçu</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grantsData.map((grant) => (
                  <TableRow key={grant.id}>
                    <TableCell className="font-medium">{grant.name}</TableCell>
                    <TableCell>{grant.donor}</TableCell>
                    <TableCell>${grant.amount.toLocaleString()}</TableCell>
                    <TableCell>${grant.received.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(grant.startDate).toLocaleDateString()} - {new Date(grant.endDate).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        grant.status === 'active' ? 'default' :
                        grant.status === 'completed' ? 'secondary' :
                        'destructive'
                      }>
                        {grant.status === 'active' ? 'Actif' :
                         grant.status === 'completed' ? 'Terminé' :
                         'En attente'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Répartition des financements</CardTitle>
            <CardDescription>
              Par donateur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Union Européenne', value: 250000 },
                    { name: 'USAID', value: 180000 },
                    { name: 'Fondation Gates', value: 120000 },
                    { name: 'PNUD', value: 200000 },
                    { name: 'ONU Femmes', value: 150000 },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {grantsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={[
                      '#8884d8',
                      '#82ca9d',
                      '#ffc658',
                      '#ff7300',
                      '#0088fe',
                    ][index % 5]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Évolution des financements</CardTitle>
            <CardDescription>
              Sur les 12 derniers mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={[
                  { month: 'Jan', amount: 150000 },
                  { month: 'Fév', amount: 230000 },
                  { month: 'Mar', amount: 280000 },
                  { month: 'Avr', amount: 350000 },
                  { month: 'Mai', amount: 420000 },
                  { month: 'Juin', amount: 480000 },
                  { month: 'Juil', amount: 520000 },
                  { month: 'Août', amount: 560000 },
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" name="Montant reçu" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NgoFunding;
