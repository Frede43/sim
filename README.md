# AgriMarket Connector

Une plateforme innovante connectant agriculteurs, coopératives, acheteurs et institutions pour un marché agricole plus efficace et équitable.

## Fonctionnalités

### Pour les Agriculteurs
- Gestion des produits et stocks
- Accès au marché direct
- Connexion avec les coopératives
- Suivi des ventes et analyses
- Accès aux subventions et financements

### Pour les Coopératives
- Gestion des membres
- Commercialisation collective
- Rapports et statistiques
- Formation et support

### Pour les Acheteurs
- Catalogue de produits
- Commande directe
- Suivi des fournisseurs
- Historique des transactions

### Pour les Institutions
- **Financières** : Gestion des prêts et évaluations
- **Gouvernementales** : Suivi et distribution des subventions
- **ONGs** : Gestion des projets et bénéficiaires

## Installation

### Prérequis
- Node.js (v18 ou supérieur)
- Python (v3.8 ou supérieur)
- PostgreSQL

### Frontend (React + TypeScript)
```bash
# Installation des dépendances
npm install

# Démarrage en développement
npm run dev

# Build pour la production
npm run build
```

### Backend (Django)
```bash
# Création de l'environnement virtuel
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Installation des dépendances
pip install -r requirements.txt

# Migrations
python manage.py migrate

# Démarrage du serveur
python manage.py runserver
```

## Configuration

1. Créez un fichier `.env` à la racine du projet :
```env
VITE_API_URL=http://localhost:8000
DJANGO_SECRET_KEY=your-secret-key
DATABASE_URL=postgres://user:password@localhost:5432/agrimarket
```

2. Configurez la base de données dans `settings.py`

## Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add: Amazing Feature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Équipe

- [Votre Nom] - Développeur Principal
- [Autres Contributeurs]

## Contact

Pour toute question ou suggestion, n'hésitez pas à :
- Ouvrir une issue
- Nous contacter via [email]
- Rejoindre notre [communauté Discord]
