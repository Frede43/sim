import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RegisterData } from '@/types/auth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Eye, EyeOff } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

interface RegisterFormProps {
  onSubmit: (data: RegisterData) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export default function RegisterForm({ onSubmit, onSuccess, onError }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    username: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    role: 'farmer',
    phone: '',
    farm_size: undefined,
    location: '',
    cooperative_name: '',
    registration_number: '',
    institution_name: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      role: value as RegisterData['role']
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!acceptTerms) {
      setError('Vous devez accepter les conditions d\'utilisation');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.password2) {
      setError('Les mots de passe ne correspondent pas');
      setIsLoading(false);
      return;
    }

    try {
      await onSubmit(formData);
      onSuccess?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Une erreur est survenue lors de l\'inscription');
      setError(error.message);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Inscription</CardTitle>
        <CardDescription>Créez votre compte pour commencer</CardDescription>
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
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                type="text"
                name="first_name"
                placeholder="Prénom"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="text"
                name="last_name"
                placeholder="Nom"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Input
              type="tel"
              name="phone"
              placeholder="Numéro de téléphone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                name="password2"
                placeholder="Confirmer le mot de passe"
                value={formData.password2}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <Select
              name="role"
              value={formData.role}
              onValueChange={handleRoleChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="farmer">Agriculteur</SelectItem>
                <SelectItem value="cooperative">Coopérative</SelectItem>
                <SelectItem value="buyer">Acheteur</SelectItem>
                <SelectItem value="government">Gouvernement</SelectItem>
                <SelectItem value="ngo">ONG</SelectItem>
                <SelectItem value="financial">Institution Financière</SelectItem>
              </SelectContent>
            </Select>

            {/* Champs spécifiques au rôle Agriculteur */}
            {formData.role === 'farmer' && (
              <div className="space-y-4">
                <Input
                  type="number"
                  name="farm_size"
                  placeholder="Taille de la ferme (hectares)"
                  value={formData.farm_size || ''}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="location"
                  placeholder="Localisation"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Champs spécifiques au rôle Coopérative */}
            {formData.role === 'cooperative' && (
              <div className="space-y-4">
                <Input
                  type="text"
                  name="cooperative_name"
                  placeholder="Nom de la coopérative"
                  value={formData.cooperative_name}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="registration_number"
                  placeholder="Numéro d'enregistrement"
                  value={formData.registration_number}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Champs spécifiques aux rôles Institution */}
            {['financial', 'government', 'ngo'].includes(formData.role) && (
              <Input
                type="text"
                name="institution_name"
                placeholder="Nom de l'institution"
                value={formData.institution_name}
                onChange={handleChange}
                required
              />
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              J'accepte les conditions d'utilisation
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Se connecter
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
