
import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import authService from '@/service/authService';
import { AuthResponse } from '@/types/auth';

const REFRESH_TIMEOUT = 10000; // 10 secondes pour le timeout
const TOKEN_REFRESH_INTERVAL = 1000 * 60 * 14; // Rafraîchir toutes les 14 minutes

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const refreshToken = useCallback(async () => {
    try {
      const storedRefreshToken = localStorage.getItem('refresh_token');
      const storedToken = localStorage.getItem('token');

      // Si aucun token n'est stocké, pas besoin de rafraîchir
      if (!storedRefreshToken || !storedToken) {
        return false;
      }

      // Appeler l'API pour rafraîchir le token
      const response = await authService.refreshToken();
      
      // Si nous recevons un nouveau token
      if (response) {
        localStorage.setItem('token', response);
        // Mettre à jour l'utilisateur avec les nouvelles données
        const userData = await authService.getCurrentUser();
        if (userData) {
          setUser(userData);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Ne pas supprimer les tokens ici, laissez authService gérer cela
      return false;
    }
  }, [setUser]);

  const verifyAuth = useCallback(async () => {
    let timeoutId: NodeJS.Timeout;
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(
        () => reject(new Error('Authentication verification timeout')),
        REFRESH_TIMEOUT
      );
    });

    try {
      await Promise.race([
        refreshToken(),
        timeoutPromise
      ]);
    } catch (error) {
      let errorMessage = 'Une erreur est survenue lors de la vérification de l\'authentification';
      
      if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          errorMessage = 'Le serveur met trop de temps à répondre. Veuillez réessayer.';
        } else if (error.message.includes('No refresh token available')) {
          errorMessage = 'Votre session a expiré. Veuillez vous reconnecter.';
        } else {
          errorMessage = `Erreur d'authentification: ${error.message}`;
        }
      }

      setError(errorMessage);
      toast.error(errorMessage, {
        duration: 5000,
        description: 'Vous allez être redirigé vers la page de connexion...'
      });

      // Attendre un peu avant de rediriger pour que l'utilisateur puisse lire le message
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  }, [refreshToken, navigate]);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user && token) {
      verifyAuth();
    } else {
      setIsLoading(false);
    }

    // Nettoyage en cas de démontage du composant
    return () => {
      setIsLoading(false);
      setError(null);
    };
  }, [user, verifyAuth]);

  // Configurer le rafraîchissement périodique du token
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (user) {
      // Rafraîchir le token périodiquement
      intervalId = setInterval(async () => {
        try {
          await refreshToken();
        } catch (error) {
          console.error('Periodic token refresh failed:', error);
          // Ne pas rediriger immédiatement, laisser le prochain appel API gérer l'erreur
        }
      }, TOKEN_REFRESH_INTERVAL);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [user, refreshToken]);

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-red-600 mb-4">Une erreur est survenue lors de l'authentification</div>
        <div className="text-gray-600 mb-4 text-sm">{error}</div>
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Retourner à la page de connexion
        </button>
      </div>
    );
  }

  const [progress, setProgress] = useState(0);

  // Effet pour simuler une barre de progression pendant le chargement
  useEffect(() => {
    let progressInterval: NodeJS.Timeout;

    if (isLoading) {
      setProgress(0);
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) { // Ne pas aller jusqu'à 100% pour éviter une fausse impression de complétion
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, REFRESH_TIMEOUT / 10);
    } else {
      setProgress(100); // Compléter la barre quand le chargement est terminé
    }

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="w-64 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <div className="text-gray-600 font-medium">Vérification de l'authentification...</div>
          <div className="text-gray-400 text-sm mt-2">{progress}%</div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
