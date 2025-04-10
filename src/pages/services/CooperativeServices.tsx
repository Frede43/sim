
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Package, BarChart, ShoppingBag, Building, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CooperativeServices = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Services pour les Coopératives</h1>
            <p className="text-lg text-muted-foreground">
              Des solutions pour gérer efficacement vos membres et optimiser vos ventes collectives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-earth">
              <CardHeader>
                <div className="w-12 h-12 bg-earth-light rounded-lg flex items-center justify-center mb-4">
                  <Users className="text-earth h-6 w-6" />
                </div>
                <CardTitle>Gestion des Membres</CardTitle>
                <CardDescription>
                  Coordonnez efficacement vos agriculteurs membres
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-earth mr-2">•</span>
                    <span>Suivi des contributions des membres</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-earth mr-2">•</span>
                    <span>Gestion des paiements et répartition des bénéfices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-earth mr-2">•</span>
                    <span>Communication facilitée entre membres</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full text-earth hover:bg-earth-light">
                  En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-water">
              <CardHeader>
                <div className="w-12 h-12 bg-water-light rounded-lg flex items-center justify-center mb-4">
                  <Package className="text-water h-6 w-6" />
                </div>
                <CardTitle>Gestion de Stock Collectif</CardTitle>
                <CardDescription>
                  Centralisez et valorisez votre production
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-water mr-2">•</span>
                    <span>Traçabilité des apports de chaque membre</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-water mr-2">•</span>
                    <span>Suivi de qualité et certification des produits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-water mr-2">•</span>
                    <span>Gestion des entrepôts et logistique</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full text-water hover:bg-water-light">
                  En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-berry">
              <CardHeader>
                <div className="w-12 h-12 bg-berry-light rounded-lg flex items-center justify-center mb-4">
                  <ShoppingBag className="text-berry h-6 w-6" />
                </div>
                <CardTitle>Vente Collective</CardTitle>
                <CardDescription>
                  Profitez de la force du nombre pour de meilleurs prix
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-berry mr-2">•</span>
                    <span>Négociation de contrats plus avantageux</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-berry mr-2">•</span>
                    <span>Accès aux marchés d'exportation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-berry mr-2">•</span>
                    <span>Système de vente aux enchères pour les acheteurs</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full text-berry hover:bg-berry-light">
                  En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-subtle">
              <CardHeader>
                <CardTitle>Renforcez votre coopérative</CardTitle>
                <CardDescription>
                  Rejoignez plus de 120 coopératives qui ont amélioré leur efficacité collective
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0 mb-6">
                  <div className="text-center md:text-left flex-1">
                    <p className="text-3xl font-bold text-earth">+40%</p>
                    <p className="text-sm text-muted-foreground">De volume de ventes</p>
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <p className="text-3xl font-bold text-water">+25%</p>
                    <p className="text-sm text-muted-foreground">De prix obtenus</p>
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <p className="text-3xl font-bold text-berry">-15%</p>
                    <p className="text-sm text-muted-foreground">De coûts logistiques</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
                  <Button className="bg-earth hover:bg-earth-dark">
                    <Link to="/register">Inscrire ma coopérative</Link>
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

export default CooperativeServices;
