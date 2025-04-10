
import React, { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About = () => {
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
                À propos d'<span className="bg-gradient-to-r from-agri to-agri-dark bg-clip-text text-transparent">AgriMarket</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 reveal">
                Un système d'information automatisé pour une gestion transparente et efficace du marché agricole au Burundi.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden glass-card p-1 reveal">
                    <img
                      src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1171&auto=format&fit=crop"
                      alt="Marché agricole au Burundi"
                      className="rounded-xl w-full object-cover h-[400px]"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 glass-card p-4 rounded-xl shadow-lg reveal" style={{ transitionDelay: '200ms' }}>
                    <p className="font-medium text-sm">
                      "Transformer l'agriculture par la technologie"
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="inline-block text-sm font-semibold py-1 px-3 rounded-full bg-agri-light text-agri mb-4 reveal">
                  Notre Mission
                </h5>
                <h2 className="text-3xl font-bold mb-6 reveal">
                  Révolutionner le marché agricole burundais
                </h2>
                <div className="space-y-4 reveal" style={{ transitionDelay: '100ms' }}>
                  <p className="text-muted-foreground">
                    AgriMarket a été créé avec un objectif clair : faciliter la gestion des produits agricoles, améliorer la transparence des prix, et favoriser l'intégration des agriculteurs au marché.
                  </p>
                  <p className="text-muted-foreground">
                    Notre plateforme connecte les coopératives agricoles, les producteurs, les acheteurs, les ONG et les institutions financières pour créer un écosystème agricole plus efficace et transparent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h5 className="inline-block text-sm font-semibold py-1 px-3 rounded-full bg-agri-light text-agri mb-4 reveal">
                Nos Valeurs
              </h5>
              <h2 className="text-3xl font-bold mb-6 reveal">
                Principes qui nous guident
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto reveal">
                Ces valeurs fondamentales définissent notre approche et nous aident à atteindre notre mission.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Transparence",
                  description: "Nous promouvons la clarté et l'ouverture dans toutes les transactions du marché agricole.",
                  delay: 0
                },
                {
                  title: "Innovation",
                  description: "Nous utilisons la technologie pour résoudre les défis traditionnels de l'agriculture.",
                  delay: 100
                },
                {
                  title: "Inclusion",
                  description: "Nous rendons le marché accessible à tous les agriculteurs, quelle que soit leur taille.",
                  delay: 200
                }
              ].map((value, index) => (
                <div key={index} className="glass-card p-8 rounded-xl reveal" style={{ transitionDelay: `${value.delay}ms` }}>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h5 className="inline-block text-sm font-semibold py-1 px-3 rounded-full bg-agri-light text-agri mb-4 reveal">
                Notre Équipe
              </h5>
              <h2 className="text-3xl font-bold mb-6 reveal">
                Les experts derrière AgriMarket
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto reveal">
                Une équipe passionnée qui s'engage à améliorer le secteur agricole au Burundi.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Jean Ndayishimiye",
                  role: "Fondateur & Directeur",
                  image: "https://randomuser.me/api/portraits/men/32.jpg",
                  delay: 0
                },
                {
                  name: "Marie Niyonzima",
                  role: "Responsable Agricole",
                  image: "https://randomuser.me/api/portraits/women/44.jpg",
                  delay: 100
                },
                {
                  name: "Pierre Hakizimana",
                  role: "Développeur Tech",
                  image: "https://randomuser.me/api/portraits/men/22.jpg",
                  delay: 200
                },
                {
                  name: "Claire Uwimana",
                  role: "Relations Coopératives",
                  image: "https://randomuser.me/api/portraits/women/68.jpg",
                  delay: 300
                }
              ].map((member, index) => (
                <div key={index} className="text-center reveal" style={{ transitionDelay: `${member.delay}ms` }}>
                  <div className="relative mb-4 mx-auto w-48 h-48">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-agri to-water opacity-30 blur-lg transform -rotate-6"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="rounded-full w-full h-full object-cover relative z-10 p-1 glass-card"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card p-8 sm:p-12 rounded-2xl text-center max-w-4xl mx-auto reveal">
              <h2 className="text-3xl font-bold mb-6">
                Rejoignez-nous dans cette aventure
              </h2>
              <p className="text-lg mb-8 text-muted-foreground">
                Ensemble, nous pouvons transformer le secteur agricole du Burundi pour un avenir plus prospère.
              </p>
              <Button asChild size="lg" className="bg-agri hover:bg-agri-dark hover-lift">
                <Link to="/contact" className="flex items-center">
                  Contactez-nous
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
