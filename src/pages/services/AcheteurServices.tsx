
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, FileSearch, Truck, CreditCard, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AcheteurServices = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Services pour les Acheteurs</h1>
            <p className="text-lg text-muted-foreground">
              Approvisionnez-vous directement auprès des producteurs pour une meilleure qualité et traçabilité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-berry">
              <CardHeader>
                <div className="w-12 h-12 bg-berry-light rounded-lg flex items-center justify-center mb-4">
                  <ShoppingCart className="text-berry h-6 w-6" />
                </div>
                <CardTitle>Approvisionnement Direct</CardTitle>
                <CardDescription>
                  Achetez directement auprès des producteurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-berry mr-2">•</span>
                    <span>Catalogue de produits frais et de qualité</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-berry mr-2">•</span>
                    <span>Commandes en gros à prix avantageux</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-berry mr-2">•</span>
                    <span>Contact direct avec les agriculteurs et coopératives</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full text-berry hover:bg-berry-light">
                  En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-water">
              <CardHeader>
                <div className="w-12 h-12 bg-water-light rounded-lg flex items-center justify-center mb-4">
                  <FileSearch className="text-water h-6 w-6" />
                </div>
                <CardTitle>Traçabilité Complète</CardTitle>
                <CardDescription>
                  Connaissez l'origine exacte de vos produits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-water mr-2">•</span>
                    <span>Suivi de la chaîne d'approvisionnement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-water mr-2">•</span>
                    <span>Certification de qualité et origine</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-water mr-2">•</span>
                    <span>Historique complet des produits achetés</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full text-water hover:bg-water-light">
                  En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-sunset">
              <CardHeader>
                <div className="w-12 h-12 bg-sunset-light rounded-lg flex items-center justify-center mb-4">
                  <Truck className="text-sunset h-6 w-6" />
                </div>
                <CardTitle>Logistique Optimisée</CardTitle>
                <CardDescription>
                  Simplifiez le transport et la réception
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-sunset mr-2">•</span>
                    <span>Organisation de la livraison jusqu'à votre entreprise</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sunset mr-2">•</span>
                    <span>Suivi en temps réel des livraisons</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sunset mr-2">•</span>
                    <span>Contrôle qualité à la réception</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full text-sunset hover:bg-sunset-light">
                  En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-subtle">
              <CardHeader>
                <CardTitle>Optimisez votre chaîne d'approvisionnement</CardTitle>
                <CardDescription>
                  Rejoignez plus de 200 acheteurs professionnels qui ont transformé leur approvisionnement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0 mb-6">
                  <div className="text-center md:text-left flex-1">
                    <p className="text-3xl font-bold text-berry">-15%</p>
                    <p className="text-sm text-muted-foreground">Sur les coûts d'achat</p>
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <p className="text-3xl font-bold text-water">+35%</p>
                    <p className="text-sm text-muted-foreground">De fraîcheur des produits</p>
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <p className="text-3xl font-bold text-sunset">100%</p>
                    <p className="text-sm text-muted-foreground">De traçabilité</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
                  <Button className="bg-berry hover:bg-berry-dark">
                    <Link to="/register">Créer un compte acheteur</Link>
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

export default AcheteurServices;
