
import React, { useEffect } from 'react';
import { 
  Users, ShoppingCart, BarChart3, 
  CreditCard, UserCircle, Database, 
  LineChart, Bell
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <Users className="h-12 w-12 text-agri" />,
    title: "Gestion des Coopératives",
    description: "Enregistrez et gérez les coopératives agricoles, leurs membres et leurs produits facilement."
  },
  {
    icon: <UserCircle className="h-12 w-12 text-agri" />,
    title: "Gestion des Agriculteurs",
    description: "Suivez les agriculteurs, leur production et leurs ventes en temps réel."
  },
  {
    icon: <Database className="h-12 w-12 text-earth" />,
    title: "Suivi des Produits",
    description: "Visualisation en temps réel des stocks disponibles et suivi des prix du marché."
  },
  {
    icon: <ShoppingCart className="h-12 w-12 text-earth" />,
    title: "Gestion des Ventes",
    description: "Enregistrez les transactions entre agriculteurs, coopératives et acheteurs."
  },
  {
    icon: <CreditCard className="h-12 w-12 text-water" />,
    title: "Gestion des Subventions",
    description: "Suivez l'attribution des aides financières et des subventions agricoles."
  },
  {
    icon: <BarChart3 className="h-12 w-12 text-water" />,
    title: "Statistiques et Rapports",
    description: "Générez des rapports détaillés sur les ventes, les stocks et les tendances du marché."
  },
  {
    icon: <LineChart className="h-12 w-12 text-agri-dark" />,
    title: "Analyse des Prix",
    description: "Comparez les prix des produits agricoles dans différentes régions et périodes."
  },
  {
    icon: <Bell className="h-12 w-12 text-earth-dark" />,
    title: "Notifications",
    description: "Recevez des alertes en temps réel sur les changements de prix ou les stocks faibles."
  }
];

const Features = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 reveal">
            Fonctionnalités Principales
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto reveal">
            Notre plateforme offre tout ce dont vous avez besoin pour gérer efficacement 
            votre activité agricole et vous connecter au marché.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card hover-lift group h-full reveal border-none" style={{ transitionDelay: `${index * 100}ms` }}>
              <CardHeader className="pb-2">
                <div className="mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl transition-colors duration-300 group-hover:text-agri">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
