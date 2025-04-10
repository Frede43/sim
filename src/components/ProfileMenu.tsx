
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Settings,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

export const ProfileMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const roleLabel = () => {
    switch (user?.role) {
      case 'farmer':
        return 'Agriculteur';
      case 'cooperative':
        return 'Coopérative';
      case 'government':
        return 'Gouvernement';
      case 'ngo':
        return 'ONG';
      case 'financial':
        return 'Institution Financière';
      case 'buyer':
        return 'Acheteur';
      case 'admin':
        return 'Administrateur';
      default:
        return 'Utilisateur';
    }
  };

  // Couleurs spécifiques au rôle pour l'avatar
  const getRoleColor = () => {
    switch (user?.role) {
      case 'farmer':
        return 'bg-agri text-white';
      case 'cooperative':
        return 'bg-earth text-white';
      case 'government':
        return 'bg-lavender text-white';
      case 'ngo':
        return 'bg-water text-white';
      case 'financial':
        return 'bg-sunset text-white';
      case 'buyer':
        return 'bg-berry text-white';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Avatar className={`h-8 w-8 ${getRoleColor()}`}>
            <AvatarImage src={user?.avatar || ""} />
            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <span className="font-medium">{user?.name}</span>
            <span className="text-xs text-muted-foreground">{roleLabel()}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Mon profil</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Paramètres</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-red-500 focus:text-red-500 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
