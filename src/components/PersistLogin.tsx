
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // This function simulates a token refresh
    const verifyRefreshToken = async () => {
      try {
        // Since refreshToken is not implemented in AuthContext,
        // we'll just simulate the process by setting isLoading to false
        // In a real app, you would call refreshToken here
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    // Only try refreshing if we don't have a user
    !user ? verifyRefreshToken() : setIsLoading(false);
  }, [user]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
