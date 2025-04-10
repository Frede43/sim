
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { HeartHandshake, ChevronRight, Users, Globe, PieChart, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const OngsServices = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-water-light to-water/10 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Solutions pour ONGs</h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Outils de gestion de projets et d'évaluation d'impact pour les organisations non gouvernementales.
                </p>
                <div className="space-x-4">
                  <Button asChild size="lg" className="bg-water hover:bg-water-dark">
                    <Link to="/login">Commencer maintenant</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/contact">Nous contacter</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <HeartHandshake className="h-64 w-64 text-water" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Nos services pour ONGs</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-water/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-water" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Gestion des bénéficiaires</h3>
                <p className="text-muted-foreground mb-4">
                  Suivi des agriculteurs et communautés bénéficiaires de vos projets agricoles.
                </p>
                <Link to="/login" className="text-water font-medium flex items-center">
                  En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-water/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-water" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Projets agricoles</h3>
                <p className="text-muted-foreground mb-4">
                  Plateforme complète pour planifier, exécuter et suivre vos projets de développement agricole.
                </p>
                <Link to="/login" className="text-water font-medium flex items-center">
                  En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-water/10 flex items-center justify-center mb-4">
                  <PieChart className="h-6 w-6 text-water" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Mesure d'impact</h3>
                <p className="text-muted-foreground mb-4">
                  Outils d'analyse pour mesurer et communiquer l'impact de vos interventions agricoles.
                </p>
                <Link to="/login" className="text-water font-medium flex items-center">
                  En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-water/10 flex items-center justify-center mb-4">
                  <Map className="h-6 w-6 text-water" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Cartographie d'impact</h3>
                <p className="text-muted-foreground mb-4">
                  Visualisation géographique de vos projets et leur impact sur les différentes régions.
                </p>
                <Link to="/login" className="text-water font-medium flex items-center">
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

export default OngsServices;
