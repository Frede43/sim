import React, { useState } from 'react';
import { ChevronRight, Users, TrendingUp, AlertCircle, BarChart as BarChartIcon, Filter, Download, Eye, Search, FilePlus, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';

interface Borrower {
  id: number;
  name: string;
  type: 'cooperative' | 'individual';
  loan: number;
  riskScore: number;
  region: string;
  lastAssessment: string;
  status: 'low' | 'medium' | 'high';
}

const borrowerData: Borrower[] = [
  { id: 1, name: "Coopérative Imbaraga", type: "cooperative", loan: 25000000, riskScore: 85, region: "Bujumbura", lastAssessment: "2023-09-05", status: "low" },
  { id: 2, name: "Ndayizeye Jean", type: "individual", loan: 3500000, riskScore: 62, region: "Gitega", lastAssessment: "2023-08-24", status: "medium" },
  { id: 3, name: "Association Café Kayanza", type: "cooperative", loan: 15000000, riskScore: 45, region: "Kayanza", lastAssessment: "2023-09-12", status: "high" },
  { id: 4, name: "Niyonkuru Marie", type: "individual", loan: 2800000, riskScore: 78, region: "Ngozi", lastAssessment: "2023-09-01", status: "low" },
  { id: 5, name: "Coopérative Rizicole Imbo", type: "cooperative", loan: 18000000, riskScore: 71, region: "Bubanza", lastAssessment: "2023-08-30", status: "medium" },
];

const riskFactors = [
  { name: "Historique de remboursement", weight: 30 },
  { name: "Capacité financière", weight: 25 },
  { name: "Garanties", weight: 20 },
  { name: "Expérience agricole", weight: 15 },
  { name: "Conditions du marché", weight: 10 },
];

const monthlyRiskData = [
  { month: "Jan", score: 72 },
  { month: "Fév", score: 68 },
  { month: "Mar", score: 75 },
  { month: "Avr", score: 82 },
  { month: "Mai", score: 79 },
  { month: "Jun", score: 85 },
];

const FinancialRiskAssessment = () => {
  const [showNewAssessment, setShowNewAssessment] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNewAssessment = () => {
    toast({
      title: "Évaluation enregistrée",
      description: "L'évaluation des risques a été enregistrée avec succès.",
    });
    setShowNewAssessment(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Évaluation des risques</h1>
          <p className="text-muted-foreground">
            Analyse et gestion des risques des emprunteurs
          </p>
        </div>
        <Dialog open={showNewAssessment} onOpenChange={setShowNewAssessment}>
          <DialogTrigger asChild>
            <Button>
              <FilePlus className="h-4 w-4 mr-2" />
              Nouvelle évaluation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle évaluation des risques</DialogTitle>
              <DialogDescription>
                Complétez les informations pour évaluer le risque d'un emprunteur
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Emprunteur</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un emprunteur" />
                  </SelectTrigger>
                  <SelectContent>
                    {borrowerData.map((borrower) => (
                      <SelectItem key={borrower.id} value={borrower.id.toString()}>
                        {borrower.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {riskFactors.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <Label>{factor.name} ({factor.weight}%)</Label>
                  <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                  />
                </div>
              ))}
              <div className="space-y-2">
                <Label>Notes additionnelles</Label>
                <Input placeholder="Ajoutez des notes sur l'évaluation..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewAssessment(false)}>
                Annuler
              </Button>
              <Button onClick={handleNewAssessment}>
                <Check className="h-4 w-4 mr-2" />
                Enregistrer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Score moyen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72/100</div>
            <p className="text-xs text-green-500 mt-1">
              +5 points ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Emprunteurs à risque
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15%</div>
            <p className="text-xs text-amber-500 mt-1">
              -2% ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taux de défaut
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8%</div>
            <p className="text-xs text-green-500 mt-1">
              En baisse
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Évaluations en attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              À traiter
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Évolution du score de risque</CardTitle>
            <CardDescription>
              Score moyen sur les 6 derniers mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRiskData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#8884d8" 
                    name="Score de risque"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Facteurs de risque</CardTitle>
            <CardDescription>
              Pondération des facteurs d'évaluation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskFactors}
                    dataKey="weight"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                  >
                    {riskFactors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des emprunteurs</CardTitle>
          <CardDescription>
            Évaluations des risques par emprunteur
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher un emprunteur..." className="pl-8" />
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
                  <TableHead>Emprunteur</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Montant du prêt</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Région</TableHead>
                  <TableHead>Dernière évaluation</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {borrowerData.map((borrower) => (
                  <TableRow key={borrower.id}>
                    <TableCell>{borrower.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {borrower.type === 'cooperative' ? 'Coopérative' : 'Individuel'}
                      </Badge>
                    </TableCell>
                    <TableCell>{borrower.loan.toLocaleString()} BIF</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          borrower.riskScore >= 75 ? 'bg-green-500' :
                          borrower.riskScore >= 50 ? 'bg-amber-500' :
                          'bg-red-500'
                        }`} />
                        {borrower.riskScore}/100
                      </div>
                    </TableCell>
                    <TableCell>{borrower.region}</TableCell>
                    <TableCell>{borrower.lastAssessment}</TableCell>
                    <TableCell>
                      <Badge variant={
                        borrower.status === 'low' ? 'default' :
                        borrower.status === 'medium' ? 'secondary' :
                        'destructive'
                      }>
                        {borrower.status === 'low' ? 'Faible' :
                         borrower.status === 'medium' ? 'Moyen' :
                         'Élevé'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
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
    </div>
  );
};

export default FinancialRiskAssessment;
