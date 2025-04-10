
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  ChevronDown, 
  Menu, 
  X, 
  LogOut, 
  Settings,
  Bell,
  User,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { CartButton } from '@/components/ShoppingCart';
import { ProfileMenu } from '@/components/ProfileMenu';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarItems: {
    icon: React.ElementType;
    label: string;
    href: string;
    active?: boolean;
  }[];
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children,
  sidebarItems
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    // Cette fonction est simplifiée - dans une implémentation complète,
    // nous utiliserions un contexte ou un hook pour gérer le thème correctement
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

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

  // Couleurs spécifiques au rôle pour l'avatar et les accents
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
    <div className="min-h-screen bg-gradient-subtle dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 dashboard-header border-b border-border/40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden focus:outline-none"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-agri to-lavender bg-clip-text text-transparent">AgriMarket</span>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="text-gray-700 dark:text-gray-300"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            
            {user?.role === 'buyer' && (
              <CartButton />
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-gray-700 dark:text-gray-300"
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <ProfileMenu />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={cn(
            "bg-sidebar dark:bg-sidebar shadow-md w-64 fixed inset-y-0 mt-14 z-10 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:mt-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="px-4 py-6 border-b border-sidebar-border lg:hidden">
              <div className="flex items-center">
                <Avatar className={`h-10 w-10 mr-3 ${getRoleColor()}`}>
                  <AvatarImage src="" />
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sidebar-foreground">{user?.name}</div>
                  <div className="text-xs text-sidebar-foreground/70">{roleLabel()}</div>
                </div>
              </div>
            </div>
            
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {sidebarItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    to={item.href}
                    className={cn(
                      "flex items-center py-2 px-4 rounded-md text-sm font-medium transition-colors",
                      item.active
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-sidebar-border">
              <Link to="/profile">
                <Button 
                  variant="ghost" 
                  className="w-full flex items-center justify-start text-sidebar-foreground"
                >
                  <User className="mr-2 h-4 w-4" />
                  Mon profil
                </Button>
              </Link>
              <Button 
                onClick={logout} 
                variant="ghost" 
                className="w-full flex items-center text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Se déconnecter
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6 bg-background dark:bg-gray-900">
          <div 
            className={cn(
              "fixed inset-0 bg-black bg-opacity-50 z-0 transition-opacity duration-300 lg:hidden",
              sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={() => setSidebarOpen(false)}
          />
          
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
