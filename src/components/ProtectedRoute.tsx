import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  roles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  component: Component,
  roles = []
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Si l'authentification est en cours de chargement, afficher un indicateur de chargement
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas authentifié, le rediriger vers la page de connexion
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si des rôles sont spécifiés et que l'utilisateur n'a pas le rôle requis
  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Si tout est OK, afficher le contenu protégé
  return <Component />;
};

// Wrapper pour être compatible avec react-router
const ProtectedRouteWrapper = ({ component, roles }: ProtectedRouteProps) => {
  return <ProtectedRoute component={component} roles={roles} />;
};

export default ProtectedRouteWrapper;
