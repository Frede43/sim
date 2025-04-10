
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Building, ChevronRight, LineChart, ClipboardList, Bell, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AutoritesServices = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-lavender-light to-lavender/10 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Solutions pour Autorités Gouvernementales</h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Outils de suivi des subventions et analyses du secteur agricole pour une meilleure gouvernance.
                </p>
                <div className="space-x-4">
                  <Button asChild size="lg" className="bg-lavender hover:bg-lavender-dark">
                    <Link to="/login">Commencer maintenant</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/contact">Nous contacter</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <Building className="h-64 w-64 text-lavender" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Nos services pour autorités</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-lavender/10 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-lavender" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Tableaux de bord statistiques</h3>
                <p className="text-muted-foreground mb-4">
                  Suivez en temps réel les indicateurs clés du secteur agricole dans toutes les régions du Burundi.
                </p>
                <Link to="/login" className="text-lavender font-medium flex items-center">
                  En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-lavender/10 flex items-center justify-center mb-4">
                  <ClipboardList className="h-6 w-6 text-lavender" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Gestion des subventions</h3>
                <p className="text-muted-foreground mb-4">
                  Plateforme complète pour le suivi, l'attribution et la vérification des subventions agricoles.
                </p>
                <Link to="/login" className="text-lavender font-medium flex items-center">
                  En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-lavender/10 flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-lavender" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Alertes et notifications</h3>
                <p className="text-muted-foreground mb-4">
                  Système d'alerte pour surveiller les tendances et événements significatifs dans le secteur agricole.
                </p>
                <Link to="/login" className="text-lavender font-medium flex items-center">
                  En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-lavender/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-lavender" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Rapports analytiques</h3>
                <p className="text-muted-foreground mb-4">
                  Génération automatique de rapports détaillés sur la production, les prix et les tendances agricoles.
                </p>
                <Link to="/login" className="text-lavender font-medium flex items-center">
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

export default AutoritesServices;
