
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

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
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-agri-light to-transparent"></div>
        <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="border border-agri/10 flex items-center justify-center"
            ></div>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 py-24">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <h5 className="inline-block text-sm font-semibold py-1 px-3 rounded-full bg-agri-light text-agri mb-6 reveal">
              Marché Agricole au Burundi
            </h5>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight reveal text-balance">
              <span className="bg-gradient-to-r from-agri to-agri-dark bg-clip-text text-transparent">Connectez</span> la chaîne de valeur agricole
            </h1>
            <p className="text-lg sm:text-xl mb-8 max-w-2xl text-muted-foreground reveal">
              Une plateforme complète qui relie les agriculteurs, les coopératives et les acheteurs pour un marché agricole plus transparent et efficace.
            </p>
            <div className="flex flex-wrap gap-4 reveal">
              <Button asChild size="lg" className="bg-agri hover:bg-agri-dark hover-lift">
                <Link to="/register">Commencer gratuitement</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group hover-lift">
                <Link to="/features" className="flex items-center">
                  Découvrir les fonctionnalités
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 reveal">
            <div className="relative">
              {/* Image principale avec effet de carte en verre */}
              <div className="rounded-2xl overflow-hidden shadow-2xl glass-card p-1 mx-auto max-w-md">
                <img
                  src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=1200&auto=format&fit=crop"
                  alt="Agriculture Burundaise"
                  className="rounded-xl object-cover w-full h-[500px] transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay avec gradient subtil */}
                <div className="absolute inset-0 bg-gradient-to-t from-agri-dark/40 to-transparent rounded-xl pointer-events-none"></div>
              </div>
              
              {/* Éléments flottants */}
              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg glass-card animate-slide-down">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 10L12 14L16 10" stroke="#3C8A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Prix du marché</div>
                    <div className="font-semibold">+12.5%</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg glass-card animate-slide-up">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8V16M8 12H16" stroke="#5BA6C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Nouvelles coopératives</div>
                    <div className="font-semibold">+24 ce mois</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
