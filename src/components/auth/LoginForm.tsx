import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoginCredentials } from '@/types/auth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Eye, EyeOff } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export default function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(credentials);
      onSuccess?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Une erreur est survenue');
      setError(error.message);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[400px] mx-auto mt-8 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Connexion</CardTitle>
        <CardDescription className="text-center">
          Connectez-vous à votre compte AgriMarket
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={credentials.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked: boolean) => setRememberMe(checked)}
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Se souvenir de moi
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          Pas encore de compte ?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            S'inscrire
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
