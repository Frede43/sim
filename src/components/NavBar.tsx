
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Sun, Moon, Users, Wheat, ShoppingCart, CreditCard, Building, HeartHandshake } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check for user's preferred color scheme
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-display font-semibold bg-gradient-to-r from-agri to-agri-dark bg-clip-text text-transparent">AgriMarket</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to="/" className="font-medium hover:text-agri transition-colors">
                Accueil
              </Link>
              <Link to="/features" className="font-medium hover:text-agri transition-colors">
                Fonctionnalités
              </Link>
              <Link to="/about" className="font-medium hover:text-agri transition-colors">
                À propos
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center font-medium hover:text-agri transition-colors">
                    Services <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 glass-card animate-fade-in">
                  <DropdownMenuLabel className="text-sm font-semibold">Nos services par utilisateur</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="grid grid-cols-2 gap-1 p-2">
                    <Link to="/services/agriculteurs">
                      <DropdownMenuItem className="flex flex-col items-start p-3 space-y-1 rounded-md hover:bg-agri-light hover:text-agri transition-colors cursor-pointer">
                        <div className="flex items-center">
                          <Wheat className="h-5 w-5 mr-2 text-agri" />
                          <span className="font-medium">Agriculteurs</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Vente directe et subventions</span>
                      </DropdownMenuItem>
                    </Link>
                    
                    <Link to="/services/cooperatives">
                      <DropdownMenuItem className="flex flex-col items-start p-3 space-y-1 rounded-md hover:bg-earth-light hover:text-earth transition-colors cursor-pointer">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 mr-2 text-earth" />
                          <span className="font-medium">Coopératives</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Gestion des membres et produits</span>
                      </DropdownMenuItem>
                    </Link>
                    
                    <Link to="/services/acheteurs">
                      <DropdownMenuItem className="flex flex-col items-start p-3 space-y-1 rounded-md hover:bg-berry-light hover:text-berry transition-colors cursor-pointer">
                        <div className="flex items-center">
                          <ShoppingCart className="h-5 w-5 mr-2 text-berry" />
                          <span className="font-medium">Acheteurs</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Achat en gros et traçabilité</span>
                      </DropdownMenuItem>
                    </Link>
                    
                    <Link to="/services/financiers">
                      <DropdownMenuItem className="flex flex-col items-start p-3 space-y-1 rounded-md hover:bg-sunset-light hover:text-sunset transition-colors cursor-pointer">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-sunset" />
                          <span className="font-medium">Institutions financières</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Microcrédits et financement</span>
                      </DropdownMenuItem>
                    </Link>
                    
                    <Link to="/services/autorites">
                      <DropdownMenuItem className="flex flex-col items-start p-3 space-y-1 rounded-md hover:bg-lavender-light hover:text-lavender transition-colors cursor-pointer">
                        <div className="flex items-center">
                          <Building className="h-5 w-5 mr-2 text-lavender" />
                          <span className="font-medium">Autorités</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Suivi des subventions</span>
                      </DropdownMenuItem>
                    </Link>
                    
                    <Link to="/services/ongs">
                      <DropdownMenuItem className="flex flex-col items-start p-3 space-y-1 rounded-md hover:bg-water-light hover:text-water transition-colors cursor-pointer">
                        <div className="flex items-center">
                          <HeartHandshake className="h-5 w-5 mr-2 text-water" />
                          <span className="font-medium">ONGs</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Projets et impact</span>
                      </DropdownMenuItem>
                    </Link>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={toggleDarkMode} variant="ghost" size="icon" className="rounded-full">
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          <div className="hidden md:block">
            <Button asChild variant="default" className="bg-agri hover:bg-agri-dark transition-colors">
              <Link to="/login">Se connecter</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Button onClick={toggleDarkMode} variant="ghost" size="icon" className="mr-2 rounded-full">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-md">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md font-medium hover:bg-agri-light hover:text-agri transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Accueil
          </Link>
          <Link
            to="/features"
            className="block px-3 py-2 rounded-md font-medium hover:bg-agri-light hover:text-agri transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Fonctionnalités
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md font-medium hover:bg-agri-light hover:text-agri transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            À propos
          </Link>
          <div className="block px-3 py-2 rounded-md font-medium">
            Services
            <div className="pl-4 mt-2 space-y-1 border-l-2 border-agri-light">
              <div className="flex items-center py-2">
                <Wheat className="h-4 w-4 text-agri mr-2" />
                <Link
                  to="/services/agriculteurs"
                  className="block text-sm hover:text-agri transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Agriculteurs
                </Link>
              </div>

              <div className="flex items-center py-2">
                <Users className="h-4 w-4 text-earth mr-2" />
                <Link
                  to="/services/cooperatives"
                  className="block text-sm hover:text-earth transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Coopératives
                </Link>
              </div>

              <div className="flex items-center py-2">
                <ShoppingCart className="h-4 w-4 text-berry mr-2" />
                <Link
                  to="/services/acheteurs"
                  className="block text-sm hover:text-berry transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Acheteurs
                </Link>
              </div>

              <div className="flex items-center py-2">
                <CreditCard className="h-4 w-4 text-sunset mr-2" />
                <Link
                  to="/services/financiers"
                  className="block text-sm hover:text-sunset transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Institutions financières
                </Link>
              </div>

              <div className="flex items-center py-2">
                <Building className="h-4 w-4 text-lavender mr-2" />
                <Link
                  to="/services/autorites"
                  className="block text-sm hover:text-lavender transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Autorités
                </Link>
              </div>

              <div className="flex items-center py-2">
                <HeartHandshake className="h-4 w-4 text-water mr-2" />
                <Link
                  to="/services/ongs"
                  className="block text-sm hover:text-water transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ONGs
                </Link>
              </div>
            </div>
          </div>
          <Button asChild variant="default" className="w-full bg-agri hover:bg-agri-dark transition-colors">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              Se connecter
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
