
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wheat, TrendingUp, CreditCard, Users, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AgriculteurServices = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Services pour les Agriculteurs</h1>
            <p className="text-lg text-muted-foreground">
              Des outils adaptés pour augmenter vos revenus et optimiser votre production agricole
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-agri">
              <CardHeader>
                <div className="w-12 h-12 bg-agri-light rounded-lg flex items-center justify-center mb-4">
                  <Wheat className="text-agri h-6 w-6" />
                </div>
                <CardTitle>Gestion de Production</CardTitle>
                <CardDescription>
                  Suivez vos cultures et optimisez vos rendements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-agri mr-2">•</span>
                    <span>Suivi des parcelles et cultures</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-agri mr-2">•</span>
                    <span>Conseils personnalisés pour améliorer les rendements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-agri mr-2">•</span>
                    <span>Historique et planification des récoltes</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full text-agri hover:bg-agri-light">
                  En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-sunset">
              <CardHeader>
                <div className="w-12 h-12 bg-sunset-light rounded-lg flex items-center justify-center mb-4">
                  <ShoppingBag className="text-sunset h-6 w-6" />
                </div>
                <CardTitle>Vente Directe</CardTitle>
                <CardDescription>
                  Vendez directement aux acheteurs sans intermédiaires
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-sunset mr-2">•</span>
                    <span>Mise en relation avec des acheteurs locaux et internationaux</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sunset mr-2">•</span>
                    <span>Meilleurs prix grâce à la suppression des intermédiaires</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sunset mr-2">•</span>
                    <span>Système de notation pour valoriser votre qualité</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full text-sunset hover:bg-sunset-light">
                  En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-lavender">
              <CardHeader>
                <div className="w-12 h-12 bg-lavender-light rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="text-lavender h-6 w-6" />
                </div>
                <CardTitle>Financement et Subventions</CardTitle>
                <CardDescription>
                  Accédez à des aides et microcrédits adaptés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-lavender mr-2">•</span>
                    <span>Catalogue de subventions disponibles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lavender mr-2">•</span>
                    <span>Microcrédits à taux avantageux pour l'équipement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lavender mr-2">•</span>
                    <span>Assistance pour la constitution des dossiers</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full text-lavender hover:bg-lavender-light">
                  En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-subtle">
              <CardHeader>
                <CardTitle>Rejoignez des milliers d'agriculteurs</CardTitle>
                <CardDescription>
                  AgriMarket accompagne déjà plus de 5,000 agriculteurs au Burundi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0 mb-6">
                  <div className="text-center md:text-left flex-1">
                    <p className="text-3xl font-bold text-agri">+30%</p>
                    <p className="text-sm text-muted-foreground">De revenus en moyenne</p>
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <p className="text-3xl font-bold text-earth">+45%</p>
                    <p className="text-sm text-muted-foreground">De rendement des cultures</p>
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <p className="text-3xl font-bold text-lavender">-20%</p>
                    <p className="text-sm text-muted-foreground">De pertes post-récoltes</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
                  <Button className="bg-agri hover:bg-agri-dark">
                    <Link to="/register">S'inscrire gratuitement</Link>
                  </Button>
                  <Button variant="outline">
                    <Link to="/about">En savoir plus</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AgriculteurServices;
