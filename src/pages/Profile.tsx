import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Upload, MapPin, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileForm } from '@/components/ProfileForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Profile = () => {
  const { user, getDashboardPath } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
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

  // Get user stats as cards
  const renderUserStats = () => {
    if (!user.statistics) return null;
    
    const stats = user.statistics;
    const statCards = Object.entries(stats).map(([key, value], index) => (
      <Card key={index} className="bg-white dark:bg-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground capitalize">
            {key}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
        </CardContent>
      </Card>
    ));
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {statCards}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-12 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6 flex flex-col md:flex-row items-start justify-between">
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => navigate(getDashboardPath())}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au tableau de bord
            </Button>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="text-sm"
                onClick={() => navigate('/')}
              >
                Accueil
              </Button>
              <Button 
                variant="default" 
                className="text-sm"
                onClick={() => navigate(getDashboardPath())}
              >
                Mon Tableau de Bord
              </Button>
            </div>
          </div>
            
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="relative">
              <Avatar className={`h-24 w-24 ${getRoleColor()}`}>
                <AvatarImage src={user.avatar || ""} />
                <AvatarFallback className="text-3xl">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="secondary" 
                size="icon" 
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full shadow"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
              <div className={`inline-block px-3 py-1 text-sm rounded-full ${getRoleColor()} bg-opacity-90 mb-2`}>
                {getRoleLabel()}
              </div>
              <div className="text-muted-foreground mb-1">{user.email}</div>
              
              {user.location && (
                <div className="flex items-center justify-center md:justify-start text-sm text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {user.location}
                </div>
              )}
              
              {user.joinDate && (
                <div className="flex items-center justify-center md:justify-start text-sm text-muted-foreground mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  Membre depuis {new Date(user.joinDate).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          {user.bio && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
              <h2 className="font-medium mb-2">À propos</h2>
              <p className="text-muted-foreground">{user.bio}</p>
            </div>
          )}
          
          {renderUserStats()}

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
              <TabsTrigger value="preferences">Préférences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
              <ProfileForm userRole={user.role} />
            </TabsContent>
            
            <TabsContent value="security">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Sécurité</h2>
                <p className="text-muted-foreground mb-4">
                  Fonctionnalité à venir - Vous pourrez modifier votre mot de passe et configurer 
                  l'authentification à deux facteurs.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="preferences">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Préférences</h2>
                <p className="text-muted-foreground mb-4">
                  Fonctionnalité à venir - Vous pourrez configurer vos préférences de notification et 
                  autres paramètres d'affichage.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
