import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler la récupération de l'utilisateur
    const mockUser: User = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "farmer"
    };
    setUser(mockUser);
    setIsLoading(false);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user
  };
}
