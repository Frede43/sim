
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-display font-semibold bg-gradient-to-r from-agri to-agri-dark bg-clip-text text-transparent">
                AgriMarket
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Plateforme de gestion du marché agricole au Burundi, connectant agriculteurs, 
              coopératives et acheteurs pour un écosystème plus efficace.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h5 className="font-semibold mb-4">Liens rapides</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-agri transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-muted-foreground hover:text-agri transition-colors">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-agri transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-agri transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="font-semibold mb-4">Services</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/services/agriculteurs" className="text-muted-foreground hover:text-agri transition-colors">
                  Agriculteurs
                </Link>
              </li>
              <li>
                <Link to="/services/cooperatives" className="text-muted-foreground hover:text-agri transition-colors">
                  Coopératives
                </Link>
              </li>
              <li>
                <Link to="/services/acheteurs" className="text-muted-foreground hover:text-agri transition-colors">
                  Acheteurs
                </Link>
              </li>
              <li>
                <Link to="/services/financiers" className="text-muted-foreground hover:text-agri transition-colors">
                  Institutions financières
                </Link>
              </li>
              <li>
                <Link to="/services/autorites" className="text-muted-foreground hover:text-agri transition-colors">
                  Autorités
                </Link>
              </li>
              <li>
                <Link to="/services/ongs" className="text-muted-foreground hover:text-agri transition-colors">
                  ONGs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="font-semibold mb-4">Contact</h5>
            <ul className="space-y-2 text-muted-foreground">
              <li>123 Avenue Centrale, Bujumbura</li>
              <li>Email: contact@agrimarket.bi</li>
              <li>Téléphone: +257 12 345 678</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section with Copyright and Social Links */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
            © {new Date().getFullYear()} AgriMarket. Tous droits réservés.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-agri transition-colors">
              Conditions d'utilisation
            </a>
            <a href="#" className="text-muted-foreground hover:text-agri transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
