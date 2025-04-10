import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, getDashboardPath } = useAuth();

  // Si l'utilisateur est déjà connecté, le rediriger vers son tableau de bord
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || getDashboardPath();
      navigate(from, { replace: true });
      toast.success("Connexion réussie! Redirection vers votre tableau de bord...");
    }
  }, [isAuthenticated, navigate, getDashboardPath, location.state]);

  const onLoginError = (error: Error) => {
    console.error("Erreur lors de la connexion:", error);
    toast.error("Échec de la connexion. Vérifiez vos identifiants.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <LoginForm 
            onError={onLoginError}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
