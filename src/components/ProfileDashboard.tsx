
import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Camera, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ProfileDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // Get role label in French
  const getRoleLabel = () => {
    switch(user.role) {
      case "farmer": return "Agriculteur";
      case "cooperative": return "Coopérative";
      case "buyer": return "Acheteur";
      case "government": return "Gouvernement";
      case "ngo": return "ONG";
      case "financial": return "Institution Financière";
      case "admin": return "Administrateur";
      default: return "Utilisateur";
    }
  };

  // Get role-specific color
  const getRoleColor = () => {
    switch (user.role) {
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

  const renderUserStats = () => {
    if (!user.statistics) return null;
    
    return (
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(user.statistics).map(([key, value], index) => (
          <div key={index} className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="text-sm text-muted-foreground capitalize">{key}</div>
            <div className="text-lg font-semibold">{value}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="border-none shadow-sm bg-gradient-to-br from-white/80 to-white/95 dark:from-gray-800/80 dark:to-gray-800/95">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Mon Profil</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative">
            <Avatar className={`h-16 w-16 ${getRoleColor()}`}>
              <AvatarImage src={user.avatar || ""} />
              <AvatarFallback className="text-xl">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <Button 
              variant="secondary" 
              size="icon" 
              className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full shadow"
            >
              <Camera className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="text-center sm:text-left flex-1">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <Badge variant="outline" className={`${getRoleColor()} my-1`}>
              {getRoleLabel()}
            </Badge>
            <div className="text-sm text-muted-foreground">{user.email}</div>
            
            {user.location && (
              <div className="flex items-center justify-center sm:justify-start text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {user.location}
              </div>
            )}
            
            {user.joinDate && (
              <div className="flex items-center justify-center sm:justify-start text-xs text-muted-foreground mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                Membre depuis {new Date(user.joinDate).toLocaleDateString()}
              </div>
            )}
          </div>
          
          <Link to="/profile" className="sm:self-start">
            <Button variant="outline" size="sm" className="gap-1">
              <Edit className="h-3 w-3" />
              <span className="hidden sm:inline">Modifier</span>
              <span className="sm:hidden">Profil</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </div>
        
        {user.bio && (
          <div className="mt-3 text-sm text-muted-foreground">
            <p className="line-clamp-2">{user.bio}</p>
          </div>
        )}
        
        <div className="mt-3">
          {renderUserStats()}
        </div>
      </CardContent>
    </Card>
  );
};
