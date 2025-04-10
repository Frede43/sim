
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldX, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Unauthorized = () => {
  const { user, logout, getDashboardPath } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center">
          <div className="bg-red-50 mx-auto rounded-full w-20 h-20 flex items-center justify-center mb-6">
            <ShieldX className="h-10 w-10 text-red-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Accès non autorisé</h1>
          
          <p className="text-muted-foreground mb-8">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
          
          <div className="space-y-4">
            {user ? (
              <Button 
                asChild 
                className="w-full bg-agri hover:bg-agri-dark"
              >
                <Link to={getDashboardPath()}>
                  Retourner à mon tableau de bord
                </Link>
              </Button>
            ) : (
              <Button 
                asChild 
                className="w-full bg-agri hover:bg-agri-dark"
              >
                <Link to="/login">
                  Se connecter
                </Link>
              </Button>
            )}
            
            <Button 
              variant="outline" 
              asChild 
              className="w-full"
            >
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Link>
            </Button>
            
            {user && (
              <Button 
                variant="ghost" 
                onClick={logout}
                className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                Se déconnecter
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Unauthorized;
