# LBV Mobilités - Panneau d'Administration

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC.svg)

## 📋 Description

Panneau d'administration moderne pour la gestion des transports publics LBV Mobilités. Cette application React/TypeScript offre une interface complète pour la gestion des bus, lignes, clients, utilisateurs et plannings.

## 🚀 Fonctionnalités Principales

### 🔐 Authentification
- **Connexion sécurisée** avec validation avancée
- **Mot de passe oublié** avec envoi d'email
- **Création de mot de passe** avec critères de sécurité
- **Gestion de session** avec "Se souvenir de moi"
- **Verrouillage de compte** après tentatives échouées

### 🚌 Gestion des Bus
- Visualisation des bus en temps réel
- Suivi GPS avec cartographie interactive
- Gestion des états (en service, en maintenance, arrêté)
- Historique des trajets et statistiques

### 🛣️ Gestion des Lignes
- Configuration des lignes de transport
- Gestion des arrêts et horaires
- Optimisation des parcours
- Tarification par ligne

### 👥 Gestion des Clients
- Base de données clients complète
- Scanner QR pour validation rapide
- Historique des voyages
- Gestion des abonnements

### 📊 Dashboard
- Vue d'ensemble en temps réel
- Statistiques de performance
- Indicateurs clés (KPIs)
- Graphiques et métriques

### 👤 Profil Utilisateur
- Gestion des informations personnelles
- Paramètres de compte
- Préférences d'affichage
- Historique d'activité

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** - Bibliothèque UI avec hooks modernes
- **TypeScript 5** - Typage statique pour plus de sécurité
- **React Router** - Navigation SPA
- **Tailwind CSS** - Framework CSS utilitaire
- **Lucide React** - Icônes modernes

### Build & Tools
- **Create React App (CRACO)** - Configuration personnalisée
- **PostCSS** - Traitement CSS avancé
- **ESLint** - Linting et qualité du code
- **Prettier** - Formatage automatique du code

### Architecture
- **Composants modulaires** - Design system réutilisable
- **Hooks personnalisés** - Logique métier encapsulée
- **Context API** - Gestion d'état globale
- **TypeScript strict** - Sécurité de type maximale

## 📁 Structure du Projet

```
src/
├── components/           # Composants UI réutilisables
│   ├── badge.tsx        # Badges et étiquettes
│   ├── button.tsx       # Boutons avec variantes
│   ├── card.tsx         # Cartes de contenu
│   ├── checkbox.tsx     # Cases à cocher
│   ├── icon.tsx         # Icônes avec Lucide
│   ├── input.tsx        # Champs de saisie
│   ├── modal.tsx        # Modales réutilisables
│   ├── select.tsx       # Sélecteurs dropdown
│   ├── switch.tsx       # Commutateurs
│   ├── table.tsx        # Tableaux de données
│   └── text.tsx         # Composants typographiques
│
├── contexts/            # Contextes React globaux
│   └── AuthContext.tsx  # Authentification utilisateur
│
├── navigation/          # Configuration des routes
│   ├── layouts/         # Layouts principaux
│   │   ├── AuthLayout.tsx      # Layout authentification
│   │   ├── DashboardLayout.tsx # Layout dashboard
│   │   └── RootLayout.tsx      # Layout racine
│   ├── authRoutes.tsx   # Routes d'authentification
│   ├── dashboardRoutes.tsx # Routes du dashboard
│   └── routes.tsx       # Configuration principale
│
├── pages/               # Pages de l'application
│   ├── dashboard/       # Pages du dashboard
│   │   ├── buses/       # Gestion des bus
│   │   ├── clients/     # Gestion des clients
│   │   ├── lignes/      # Gestion des lignes
│   │   ├── planning/    # Gestion des plannings
│   │   ├── profile/     # Profil utilisateur
│   │   ├── settings/    # Paramètres
│   │   └── users/       # Gestion des utilisateurs
│   │
│   └── onboarding/      # Pages d'authentification
│       ├── login/       # Connexion
│       ├── forgotPassword/ # Mot de passe oublié
│       └── createPassword/ # Création mot de passe
│
└── utils/               # Utilitaires et helpers
    └── enums/           # Énumérations TypeScript
        └── colorsEnum.ts # Palette de couleurs
```

## 🎨 Architecture Modulaire

### Pattern de Refactorisation

Chaque section majeure suit une architecture modulaire consistent :

```
section/
├── components/          # Composants spécifiques
├── hooks/              # Hooks personnalisés
├── types/              # Interfaces TypeScript
├── constants/          # Constantes et configuration
├── utils/              # Utilitaires spécifiques
└── index.ts           # Point d'entrée principal
```

### Exemple : Structure Login

```
pages/onboarding/login/
├── components/
│   ├── LoginHeader.tsx      # En-tête de connexion
│   ├── LoginForm.tsx        # Formulaire principal
│   ├── ErrorMessage.tsx     # Messages d'erreur
│   ├── TestCredentialsInfo.tsx # Infos de test
│   └── LoginLinks.tsx       # Liens de navigation
├── hooks/
│   └── useLoginForm.ts      # Logique du formulaire
├── types/
│   └── index.ts            # Interfaces TypeScript
├── constants/
│   └── loginConstants.ts    # Constantes et config
└── login.tsx               # Page principale
```

## 🔧 Installation et Configuration

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Git

### Installation

```bash
# Cloner le repository
git clone [URL_DU_REPO]
cd admin-lbv-mobilites

# Installer les dépendances
npm install
# ou
yarn install

# Lancer en développement
npm start
# ou
yarn start
```

### Scripts Disponibles

```bash
# Développement
npm start                # Lance le serveur de développement
yarn start

# Build de production
npm run build           # Compile pour la production
yarn build

# Tests
npm test               # Lance les tests
yarn test

# Linting
npm run lint           # Vérifie la qualité du code
yarn lint
```

## 🌐 Configuration des Routes

### Routes d'Authentification (`/auth/*`)
- `/auth/login` - Page de connexion
- `/auth/forgot-password` - Mot de passe oublié
- `/auth/create-password` - Création de mot de passe

### Routes du Dashboard (`/dashboard/*`)
- `/dashboard` - Vue d'ensemble
- `/dashboard/buses` - Gestion des bus
- `/dashboard/lignes` - Gestion des lignes
- `/dashboard/clients` - Gestion des clients
- `/dashboard/users` - Gestion des utilisateurs
- `/dashboard/planning` - Gestion des plannings
- `/dashboard/profile` - Profil utilisateur
- `/dashboard/settings` - Paramètres

## 🎨 Design System

### Palette de Couleurs

```typescript
// Couleurs principales
PRIMARY: '#10B981'     // Vert principal
SECONDARY: '#6B7280'   // Gris secondaire
SUCCESS: '#059669'     // Vert succès
ERROR: '#DC2626'       // Rouge erreur
WARNING: '#D97706'     // Orange avertissement
INFO: '#2563EB'        // Bleu information

// Couleurs de texte
TEXT_PRIMARY: '#111827'    // Texte principal
TEXT_SECONDARY: '#6B7280'  // Texte secondaire
TEXT_MUTED: '#9CA3AF'      // Texte discret
```

### Composants UI

Tous les composants suivent une API cohérente :

```typescript
// Exemple : Composant Button
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```

## 🔐 Authentification

### Fonctionnalités de Sécurité

- **Validation stricte** des mots de passe
- **Chiffrement** des données sensibles
- **Sessions temporisées** avec auto-déconnexion
- **Tentatives limitées** avec verrouillage
- **Tokens JWT** pour l'authentification API

### Comptes de Test

```typescript
// Administrateur
Email: admin@lbv-mobilites.ga
Password: admin123

// Gestionnaire
Email: manager@lbv-mobilites.ga
Password: manager123

// Opérateur
Email: operator@lbv-mobilites.ga
Password: operator123
```

## 📱 Responsive Design

L'application est entièrement responsive avec :

- **Mobile First** - Optimisé pour mobile d'abord
- **Breakpoints Tailwind** - sm, md, lg, xl, 2xl
- **Navigation adaptative** - Menu burger sur mobile
- **Tableaux responsifs** - Scrolling horizontal sur mobile
- **Modales mobiles** - Plein écran sur petits écrans

## 🧪 Tests et Qualité

### Scripts de Test

```bash
# Tests des bus
./test-buses.sh         # Teste la gestion des bus

# Tests sans affectation
./test-no-affectation.sh # Teste les cas d'erreur

# Test de l'application
./test-app.js           # Tests généraux de l'app
```

### Qualité du Code

- **TypeScript strict** - Mode strict activé
- **ESLint** - Règles de qualité du code
- **Prettier** - Formatage automatique
- **Hooks rules** - Validation des hooks React

## 🚀 Déploiement

### Build de Production

```bash
# Générer le build optimisé
npm run build

# Le dossier build/ contient :
# - Assets optimisés et minifiés
# - Code splitté par route
# - Images optimisées
# - CSS purifié
```

### Variables d'Environnement

```env
# Configuration de base
REACT_APP_API_URL=https://api.lbv-mobilites.ga
REACT_APP_VERSION=1.0.0

# Configuration de développement
REACT_APP_ENV=development
REACT_APP_DEBUG=true
```

## 📊 Performance

### Optimisations Implémentées

- **Lazy Loading** - Chargement différé des routes
- **Code Splitting** - Division du code par fonctionnalité
- **Memoization** - Optimisation des re-rendus
- **Bundle Splitting** - Séparation vendor/app
- **Tree Shaking** - Élimination du code mort

### Métriques Cibles

- **First Contentful Paint** < 1.5s
- **Largest Contentful Paint** < 2.5s
- **Cumulative Layout Shift** < 0.1
- **Time to Interactive** < 3s

## 🤝 Contribution

### Standards de Code

1. **TypeScript** - Toujours typer explicitement
2. **Naming** - camelCase pour variables, PascalCase pour composants
3. **Structure** - Suivre l'architecture modulaire
4. **Comments** - Documenter les fonctions complexes
5. **Tests** - Ajouter des tests pour les nouvelles fonctionnalités

### Workflow Git

```bash
# Créer une branche feature
git checkout -b feature/nouvelle-fonctionnalite

# Commiter avec messages clairs
git commit -m "feat: ajouter gestion des notifications"

# Push et créer une PR
git push origin feature/nouvelle-fonctionnalite
```

## 📞 Support et Contact

### Équipe de Développement
- **Lead Developer** - [nom@lbv-mobilites.ga]
- **UI/UX Designer** - [design@lbv-mobilites.ga]
- **DevOps** - [devops@lbv-mobilites.ga]

### Documentation
- **API Documentation** - [docs.lbv-mobilites.ga]
- **Design System** - [design.lbv-mobilites.ga]
- **User Guide** - [help.lbv-mobilites.ga]

## 📝 Changelog

### Version 1.0.0 (Current)
- ✅ Système d'authentification complet
- ✅ Gestion des bus avec cartographie
- ✅ Interface clients avec QR Scanner
- ✅ Dashboard avec métriques temps réel
- ✅ Gestion des lignes et plannings
- ✅ Profil utilisateur et paramètres
- ✅ Architecture modulaire refactorisée
- ✅ Design system cohérent
- ✅ Tests automatisés

### Roadmap v1.1.0
- 🔄 Notifications en temps réel
- 🔄 Export de données avancé
- 🔄 Mode sombre
- 🔄 PWA (Progressive Web App)
- 🔄 API intégration complète

## 📄 Licence

Copyright © 2025 LBV Mobilités. Tous droits réservés.

---

**LBV Mobilités** - Révolutionner le transport public 🚌
