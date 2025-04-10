
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-agri-light/50 via-transparent to-water-light/50 opacity-70"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto glass-card p-8 sm:p-12 rounded-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-agri to-agri-dark bg-clip-text text-transparent">
            Prêt à transformer votre expérience agricole?
          </h2>
          <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
            Rejoignez notre plateforme et connectez-vous au réseau agricole du Burundi. 
            Accédez aux marchés, obtenez de meilleurs prix et développez votre activité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-agri hover:bg-agri-dark hover-lift">
              <Link to="/register">Créer un compte</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group hover-lift">
              <Link to="/contact" className="flex items-center">
                Nous contacter
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
