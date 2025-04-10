
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full text-center glass-card p-8 rounded-2xl animate-fade-in">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-agri to-agri-dark bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold mb-4">Page non trouvée</h2>
          <p className="text-muted-foreground mb-8">
            La page que vous recherchez semble introuvable. Vérifiez l'URL ou retournez à l'accueil.
          </p>
          <Button asChild className="bg-agri hover:bg-agri-dark hover-lift">
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
