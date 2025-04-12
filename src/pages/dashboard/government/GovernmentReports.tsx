import React from 'react';
import { Search, Filter, Download, FileText, Plus, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const GovernmentReports = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Rapports et analyses</h1>
          <p className="text-muted-foreground">
            Gestion et suivi des rapports agricoles
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau rapport
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total des rapports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground mt-1">
              Pour l'année en cours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rapports mensuels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12/12</div>
            <p className="text-xs text-green-500 mt-1">
              Tous les rapports soumis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rapports en attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-amber-500 mt-1">
              Nécessitent une révision
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Analyses complétées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Des rapports analysés
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des rapports</CardTitle>
          <CardDescription>
            Tous les rapports et analyses disponibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher un rapport..." className="pl-8" />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Titre du rapport</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Auteur</th>
                  <th className="px-6 py-3">Statut</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    title: 'Rapport mensuel - Mars 2024',
                    type: 'Mensuel',
                    date: '01/04/2024',
                    author: 'Jean Hakizimana',
                    status: 'Publié',
                  },
                  {
                    title: 'Analyse des rendements Q1 2024',
                    type: 'Trimestriel',
                    date: '31/03/2024',
                    author: 'Marie Niyonzima',
                    status: 'En révision',
                  },
                  {
                    title: 'Impact des subventions 2023',
                    type: 'Annuel',
                    date: '15/03/2024',
                    author: 'Pierre Ndayishimiye',
                    status: 'Publié',
                  },
                ].map((report, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4 font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {report.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">{report.type}</td>
                    <td className="px-6 py-4">{report.date}</td>
                    <td className="px-6 py-4">{report.author}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.status === 'Publié' 
                          ? 'bg-green-100 text-green-800'
                          : report.status === 'En révision'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GovernmentReports;
