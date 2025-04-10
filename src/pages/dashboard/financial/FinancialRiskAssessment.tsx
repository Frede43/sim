
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
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

const borrowerData = [
  { id: 1, name: "Coopérative Imbaraga", type: "cooperative", loan: 25000000, riskScore: 85, region: "Bujumbura", lastAssessment: "2023-09-05", status: "low" },
  { id: 2, name: "Ndayizeye Jean", type: "individual", loan: 3500000, riskScore: 62, region: "Gitega", lastAssessment: "2023-08-24", status: "medium" },
  { id: 3, name: "Groupe Agricole Kirundo", type: "group", loan: 15000000, riskScore: 71, region: "Kirundo", lastAssessment: "2023-09-10", status: "medium" },
  { id: 4, name: "Association Femmes Rurales", type: "association", loan: 8500000, riskScore: 88, region: "Muyinga", lastAssessment: "2023-09-02", status: "low" },
  { id: 5, name: "Ntakarutimana Pierre", type: "individual", loan: 2800000, riskScore: 45, region: "Kayanza", lastAssessment: "2023-08-15", status: "high" },
  { id: 6, name: "Coopérative Tubungabunge", type: "cooperative", loan: 18500000, riskScore: 79, region: "Ngozi", lastAssessment: "2023-08-30", status: "low" },
  { id: 7, name: "Hakizimana Diane", type: "individual", loan: 4200000, riskScore: 38, region: "Rumonge", lastAssessment: "2023-09-08", status: "high" },
  { id: 8, name: "Agri-Business Burundi", type: "business", loan: 35000000, riskScore: 75, region: "Bujumbura", lastAssessment: "2023-09-12", status: "medium" },
];

const riskByRegionData = [
  { name: 'Bujumbura', low: 12, medium: 8, high: 3 },
  { name: 'Gitega', low: 8, medium: 10, high: 5 },
  { name: 'Ngozi', low: 10, medium: 7, high: 2 },
  { name: 'Kirundo', low: 6, medium: 9, high: 4 },
  { name: 'Muyinga', low: 9, medium: 6, high: 3 },
  { name: 'Autres', low: 15, medium: 13, high: 8 },
];

const riskTrendData = [
  { month: 'Jan', score: 68 },
  { month: 'Feb', score: 72 },
  { month: 'Mar', score: 70 },
  { month: 'Apr', score: 75 },
  { month: 'May', score: 73 },
  { month: 'Jun', score: 78 },
  { month: 'Jul', score: 76 },
  { month: 'Aug', score: 80 },
  { month: 'Sep', score: 78 },
];

const portfolioRiskData = [
  { name: 'Faible risque', value: 45 },
  { name: 'Risque moyen', value: 35 },
  { name: 'Risque élevé', value: 20 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const FinancialRiskAssessment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBorrower, setSelectedBorrower] = useState(null);
  const [isAssessmentDialogOpen, setIsAssessmentDialogOpen] = useState(false);
  const [riskScore, setRiskScore] = useState([70]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const sidebarItems = [
    { icon: TrendingUp, label: 'Tableau de bord', href: '/dashboard/financial', active: false },
    { icon: Users, label: 'Emprunteurs', href: '/dashboard/financial/borrowers', active: false },
    { icon: BarChartIcon, label: 'Prêts', href: '/dashboard/financial/loans', active: false },
    { icon: AlertCircle, label: 'Analyse des risques', href: '/dashboard/financial/risk-assessment', active: true },
    { icon: BarChartIcon, label: 'Statistiques', href: '/dashboard/financial/stats', active: false },
  ];

  const filteredBorrowers = borrowerData.filter(borrower => {
    return (
      borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || borrower.status === statusFilter)
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

  const handleAssessment = (e) => {
    e.preventDefault();
    toast({
      title: "Évaluation mise à jour",
      description: `Le score de risque de ${selectedBorrower.name} a été mis à jour à ${riskScore[0]}.`,
    });
    setIsAssessmentDialogOpen(false);
  };

  const openAssessmentDialog = (borrower) => {
    setSelectedBorrower(borrower);
    setRiskScore([borrower.riskScore]);
    setIsAssessmentDialogOpen(true);
  };

  const getRiskBadge = (status) => {
    switch(status) {
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Faible</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">Moyen</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">Élevé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalPortfolio = borrowerData.reduce((acc, borrower) => acc + borrower.loan, 0);
  const lowRiskTotal = borrowerData
    .filter(borrower => borrower.status === 'low')
    .reduce((acc, borrower) => acc + borrower.loan, 0);
  const mediumRiskTotal = borrowerData
    .filter(borrower => borrower.status === 'medium')
    .reduce((acc, borrower) => acc + borrower.loan, 0);
  const highRiskTotal = borrowerData
    .filter(borrower => borrower.status === 'high')
    .reduce((acc, borrower) => acc + borrower.loan, 0);

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Analyse des Risques</h1>
          <Button variant="outline" onClick={() => navigate('/dashboard/financial')}>
            Retour au tableau de bord <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Portfolio total</CardTitle>
              <CardDescription>Montant total des prêts actifs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalPortfolio)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Risque faible</CardTitle>
              <CardDescription>Prêts à faible risque</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(lowRiskTotal)}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {Math.round((lowRiskTotal / totalPortfolio) * 100)}% du portfolio
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Risque moyen</CardTitle>
              <CardDescription>Prêts à risque moyen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{formatCurrency(mediumRiskTotal)}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {Math.round((mediumRiskTotal / totalPortfolio) * 100)}% du portfolio
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Risque élevé</CardTitle>
              <CardDescription>Prêts à risque élevé</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{formatCurrency(highRiskTotal)}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {Math.round((highRiskTotal / totalPortfolio) * 100)}% du portfolio
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="portfolio">
          <TabsList>
            <TabsTrigger value="portfolio">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="borrowers">Emprunteurs</TabsTrigger>
            <TabsTrigger value="trends">Tendances</TabsTrigger>
          </TabsList>
          
          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Répartition du portfolio par niveau de risque</CardTitle>
                  <CardDescription>Distribution des prêts selon leur niveau de risque</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={portfolioRiskData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {portfolioRiskData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Risque par région</CardTitle>
                  <CardDescription>Distribution des niveaux de risque par région</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={riskByRegionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="low" name="Risque faible" stackId="a" fill="#00C49F" />
                        <Bar dataKey="medium" name="Risque moyen" stackId="a" fill="#FFBB28" />
                        <Bar dataKey="high" name="Risque élevé" stackId="a" fill="#FF8042" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="borrowers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Liste des emprunteurs</CardTitle>
                <CardDescription>Évaluation des risques pour chaque emprunteur</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un emprunteur..."
                      className="w-full md:w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filtrer par risque" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les niveaux</SelectItem>
                        <SelectItem value="low">Risque faible</SelectItem>
                        <SelectItem value="medium">Risque moyen</SelectItem>
                        <SelectItem value="high">Risque élevé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Emprunteur</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Montant du prêt</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Dernière évaluation</TableHead>
                      <TableHead>Niveau de risque</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBorrowers.map((borrower) => (
                      <TableRow key={borrower.id}>
                        <TableCell className="font-medium">{borrower.name}</TableCell>
                        <TableCell>
                          {borrower.type === 'individual' ? 'Individuel' : 
                           borrower.type === 'cooperative' ? 'Coopérative' : 
                           borrower.type === 'group' ? 'Groupe' : 
                           borrower.type === 'association' ? 'Association' : 
                           borrower.type === 'business' ? 'Entreprise' : borrower.type}
                        </TableCell>
                        <TableCell>{formatCurrency(borrower.loan)}</TableCell>
                        <TableCell>{borrower.riskScore}/100</TableCell>
                        <TableCell>{formatDate(borrower.lastAssessment)}</TableCell>
                        <TableCell>{getRiskBadge(borrower.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => openAssessmentDialog(borrower)}
                            >
                              <FilePlus className="h-4 w-4 mr-1" />
                              Évaluer
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
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
                  Affichage de {filteredBorrowers.length} sur {borrowerData.length} emprunteurs
                </div>
              </CardFooter>
            </Card>

            <Dialog open={isAssessmentDialogOpen} onOpenChange={setIsAssessmentDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Évaluation du risque</DialogTitle>
                  <DialogDescription>
                    {selectedBorrower ? `Mettez à jour l'évaluation de risque pour ${selectedBorrower.name}` : ''}
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleAssessment}>
                  <div className="grid gap-6 py-4">
                    {selectedBorrower && (
                      <>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="risk-score">Score de risque</Label>
                            <span className="text-sm font-medium">{riskScore[0]}/100</span>
                          </div>
                          <Slider
                            id="risk-score"
                            max={100}
                            step={1}
                            value={riskScore}
                            onValueChange={setRiskScore}
                            className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Risque élevé</span>
                            <span>Risque faible</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="risk-notes">Notes d'évaluation</Label>
                          <textarea
                            id="risk-notes"
                            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Ajoutez vos notes concernant l'évaluation de risque..."
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="risk-factors">Facteurs de risque principaux</Label>
                          <Select defaultValue="production">
                            <SelectTrigger id="risk-factors">
                              <SelectValue placeholder="Sélectionner le facteur principal" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="production">Risques de production</SelectItem>
                              <SelectItem value="market">Risques de marché</SelectItem>
                              <SelectItem value="financial">Risques financiers</SelectItem>
                              <SelectItem value="management">Risques de gestion</SelectItem>
                              <SelectItem value="climate">Risques climatiques</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="recommendations">Recommandations</Label>
                          <Select defaultValue="monitor">
                            <SelectTrigger id="recommendations">
                              <SelectValue placeholder="Sélectionner une recommandation" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="approve">Approuver le financement</SelectItem>
                              <SelectItem value="monitor">Surveiller régulièrement</SelectItem>
                              <SelectItem value="reduce">Réduire l'exposition</SelectItem>
                              <SelectItem value="training">Recommander une formation</SelectItem>
                              <SelectItem value="reject">Rejeter la demande</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAssessmentDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button type="submit">
                      <Check className="mr-2 h-4 w-4" />
                      Enregistrer l'évaluation
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Évolution du score de risque moyen</CardTitle>
                <CardDescription>Tendance du score de risque du portfolio sur les 9 derniers mois</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={riskTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                        name="Score de risque moyen" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Un score de risque plus élevé indique un risque plus faible.
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FinancialRiskAssessment;
