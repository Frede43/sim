import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import authService from '@/service/authService';
import { User, LoginCredentials, RegisterData, UserRole } from '@/types/auth';

export type { UserRole };

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  setUser: (user: User) => void;
  getDashboardPath: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
          
          // Rediriger vers le tableau de bord approprié si on est sur la page d'accueil
          if (window.location.pathname === '/' && userData?.role) {
            navigate(`/dashboard/${userData.role}`);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la verification de l\'authentification:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem('token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
      setUser(response.user);
      setIsAuthenticated(true);
      navigate(`/dashboard/${response.user.role}`);
      toast.success('Connexion réussie! Redirection vers votre tableau de bord...');
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast.error('Échec de la connexion. Vérifiez vos identifiants.');
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await authService.register(data);
      localStorage.setItem('token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
      setUser(response.user);
      setIsAuthenticated(true);
      navigate(`/dashboard/${response.user.role}`);
      toast.success('Inscription réussie !');
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      toast.error('Erreur d\'inscription. Veuillez réessayer.');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      setIsAuthenticated(false);
      navigate('/');
      toast.success('Déconnexion réussie !');
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      toast.error('Erreur lors de la déconnexion.');
    }
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    return `/dashboard/${user.role}`;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error: null,
        login,
        logout,
        register,
        setUser,
        getDashboardPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
