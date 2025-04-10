
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { CreditCard, ChevronRight, BarChart4, PiggyBank, FileText, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FinanciersServices = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-sunset-light to-sunset/10 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Solutions pour Institutions Financières</h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Gestion simplifiée des microcrédits et financement pour le secteur agricole burundais.
                </p>
                <div className="space-x-4">
                  <Button asChild size="lg" className="bg-sunset hover:bg-sunset-dark">
                    <Link to="/login">Commencer maintenant</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/contact">Nous contacter</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <CreditCard className="h-64 w-64 text-sunset" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Nos services pour institutions financières</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-sunset/10 flex items-center justify-center mb-4">
                  <PiggyBank className="h-6 w-6 text-sunset" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Gestion des microcrédits</h3>
                <p className="text-muted-foreground mb-4">
                  Plateforme complète pour suivre et gérer les microcrédits accordés aux agriculteurs et coopératives.
                </p>
                <Link to="/login" className="text-sunset font-medium flex items-center">
                  En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-sunset/10 flex items-center justify-center mb-4">
                  <BarChart4 className="h-6 w-6 text-sunset" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Analyse de risque</h3>
                <p className="text-muted-foreground mb-4">
                  Outils d'analyse avancés pour évaluer les risques et la solvabilité des emprunteurs du secteur agricole.
                </p>
                <Link to="/login" className="text-sunset font-medium flex items-center">
                  En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-sunset/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-sunset" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Rapports financiers</h3>
                <p className="text-muted-foreground mb-4">
                  Génération automatique de rapports pour suivre les performances de votre portefeuille de prêts agricoles.
                </p>
                <Link to="/login" className="text-sunset font-medium flex items-center">
                  En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-sunset/10 flex items-center justify-center mb-4">
                  <BadgeCheck className="h-6 w-6 text-sunset" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Vérification de conformité</h3>
                <p className="text-muted-foreground mb-4">
                  Outils de vérification pour s'assurer que les prêts respectent les réglementations financières.
                </p>
                <Link to="/login" className="text-sunset font-medium flex items-center">
                  En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FinanciersServices;
