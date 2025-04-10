
import React, { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Features from '@/components/Features';
import CallToAction from '@/components/CallToAction';
import { 
  Users, ShoppingCart, BarChart3, 
  CreditCard, UserCircle, Database, Smartphone,
  Shield, BarChart4, Clock, Fingerprint, Bell
} from 'lucide-react';

const FeaturesPage = () => {
  useEffect(() => {
    // Add scroll reveal functionality
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      revealElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  const detailedFeatures = [
    {
      icon: <Users className="h-12 w-12 text-agri" />,
      title: "Gestion des Coopératives",
      description: "Enregistrement des coopératives, gestion de leurs membres et de leurs produits disponibles. Suivi des activités et des performances."
    },
    {
      icon: <UserCircle className="h-12 w-12 text-agri" />,
      title: "Gestion des Agriculteurs",
      description: "Enregistrement des informations personnelles et géographiques des agriculteurs. Suivi de la production agricole et gestion des rendements par produit."
    },
    {
      icon: <Database className="h-12 w-12 text-agri-dark" />,
      title: "Suivi des Produits",
      description: "Visualisation en temps réel des stocks disponibles dans chaque coopérative et chez chaque agriculteur. Mise à jour automatique après chaque transaction."
    },
    {
      icon: <ShoppingCart className="h-12 w-12 text-earth" />,
      title: "Gestion des Ventes",
      description: "Enregistrement des ventes de produits agricoles entre les différents acteurs. Historique complet des transactions avec détails sur les produits, quantités et prix."
    },
    {
      icon: <CreditCard className="h-12 w-12 text-earth" />,
      title: "Gestion des Subventions",
      description: "Suivi de l'attribution des aides financières et des subventions agricoles. Gestion transparente des fonds alloués aux agriculteurs et coopératives."
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-earth-dark" />,
      title: "Statistiques et Rapports",
      description: "Génération de rapports détaillés sur les ventes, les stocks et les tendances du marché. Analyse des données pour une prise de décision éclairée."
    },
    {
      icon: <BarChart4 className="h-12 w-12 text-water" />,
      title: "Analyse des Prix",
      description: "Comparaison des prix des produits agricoles dans différentes régions. Suivi historique des variations de prix pour identifier les tendances du marché."
    },
    {
      icon: <Bell className="h-12 w-12 text-water" />,
      title: "Notifications",
      description: "Alertes en temps réel sur les changements de prix, les stocks faibles ou les opportunités de marché. Personnalisation des notifications selon les préférences."
    },
    {
      icon: <Smartphone className="h-12 w-12 text-water-dark" />,
      title: "Application Mobile",
      description: "Accès à toutes les fonctionnalités via une application mobile responsive, permettant aux utilisateurs de gérer leurs activités où qu'ils soient."
    },
    {
      icon: <Shield className="h-12 w-12 text-agri" />,
      title: "Sécurité Renforcée",
      description: "Protection des données avec des mesures de sécurité avancées. Authentification à deux facteurs pour protéger les comptes des utilisateurs."
    },
    {
      icon: <Fingerprint className="h-12 w-12 text-earth" />,
      title: "Authentification Multi-niveaux",
      description: "Différents niveaux d'accès selon le rôle (administrateur, agriculteur, coopérative, acheteur). Gestion sécurisée des identifiants et permissions."
    },
    {
      icon: <Clock className="h-12 w-12 text-water" />,
      title: "Historique et Traçabilité",
      description: "Suivi complet de l'historique des produits agricoles, de la production à la vente, assurant une traçabilité totale dans la chaîne de valeur."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-agri-light to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 reveal">
                Fonctionnalités <span className="bg-gradient-to-r from-agri to-agri-dark bg-clip-text text-transparent">Complètes</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 reveal">
                Découvrez toutes les fonctionnalités qui font d'AgriMarket la plateforme idéale pour gérer votre activité agricole.
              </p>
            </div>
          </div>
        </section>

        {/* Main Features Section */}
        <Features />

        {/* Detailed Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6 reveal">
                Fonctionnalités Détaillées
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto reveal">
                Explorez en détail toutes les capacités d'AgriMarket pour optimiser votre expérience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {detailedFeatures.map((feature, index) => (
                <div key={index} className="glass-card p-6 rounded-xl hover-lift group reveal" style={{ transitionDelay: `${index * 50}ms` }}>
                  <div className="mb-4 text-agri transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-agri transition-colors duration-300">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Screenshot */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h5 className="inline-block text-sm font-semibold py-1 px-3 rounded-full bg-agri-light text-agri mb-4 reveal">
                  Interface Intuitive
                </h5>
                <h2 className="text-3xl font-bold mb-6 reveal">
                  Une expérience utilisateur exceptionnelle
                </h2>
                <div className="space-y-4 reveal">
                  <p className="text-muted-foreground">
                    Notre plateforme est conçue pour être facile à utiliser, même pour les utilisateurs sans expertise technique. L'interface intuitive permet une navigation fluide et un accès rapide à toutes les fonctionnalités.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Tableau de bord personnalisé",
                      "Navigation simplifiée",
                      "Design responsive pour tous les appareils",
                      "Accès rapide aux informations importantes"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-agri-light flex items-center justify-center text-agri mr-2 flex-shrink-0">✓</div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="reveal">
                <div className="glass-card p-1 rounded-2xl shadow-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop"
                    alt="Interface AgriMarket"
                    className="rounded-xl w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6 reveal">
                Ce que disent nos utilisateurs
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto reveal">
                Découvrez l'impact d'AgriMarket sur les activités de nos utilisateurs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "AgriMarket a transformé notre coopérative en nous permettant de suivre nos stocks et ventes en temps réel.",
                  name: "Claude Nzeyimana",
                  role: "Directeur de Coopérative",
                  image: "https://randomuser.me/api/portraits/men/41.jpg"
                },
                {
                  quote: "Grâce à cette plateforme, j'ai pu augmenter mes revenus en accédant à de meilleurs prix pour mes produits.",
                  name: "Françoise Igiraneza",
                  role: "Agricultrice",
                  image: "https://randomuser.me/api/portraits/women/36.jpg"
                },
                {
                  quote: "L'interface est intuitive et les rapports détaillés nous aident à prendre de meilleures décisions pour notre activité.",
                  name: "Eric Nduwimana",
                  role: "Acheteur",
                  image: "https://randomuser.me/api/portraits/men/26.jpg"
                }
              ].map((testimonial, index) => (
                <div key={index} className="glass-card p-6 rounded-xl reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                  <div className="flex items-start mb-4">
                    <div className="text-4xl text-agri-light">"</div>
                  </div>
                  <p className="mb-6 text-muted-foreground">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
