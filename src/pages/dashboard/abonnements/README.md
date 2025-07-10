# Section Abonnements - LBV Mobilités

## Vue d'ensemble
La section abonnements permet aux administrateurs de créer et gérer les différents plans d'abonnement pour le service de transport public LBV Mobilités.

## Fonctionnalités

### 1. Tableau de bord des abonnements
- **Statistiques en temps réel** : Affichage du nombre total d'abonnements, des abonnements actifs/inactifs, et des revenus
- **Gestion des abonnements** : Visualisation de tous les abonnements avec leurs détails
- **Filtres avancés** : Filtrage par statut, type d'abonnement, et gamme de prix
- **Recherche** : Recherche par nom ou description

### 2. Création d'abonnements
- **Formulaire intuitif** : Interface simple pour créer de nouveaux abonnements
- **Types d'abonnement** : Support pour différents types (journalier, hebdomadaire, mensuel, annuel, personnalisé)
- **Personnalisation** : Couleurs, icônes, et conditions d'utilisation
- **Validation** : Validation des champs requis et des données

### 3. Gestion des abonnements
- **Détails complets** : Affichage de toutes les informations d'un abonnement
- **Actions** : Activation/désactivation, modification, suppression
- **Historique** : Dates de création et dernière modification
- **Statuts** : Gestion des statuts (actif, inactif, brouillon)

## Structure des données

### Abonnement
```typescript
interface Abonnement {
  id: string;
  nom: string;
  description: string;
  prix: number;
  duree: number; // en jours
  typeAbonnement: 'mensuel' | 'hebdomadaire' | 'journalier' | 'annuel' | 'personnalise';
  avantages: string[];
  nombreTrajet: number; // -1 pour illimité
  lignesIncluses: string[]; // vide = toutes les lignes
  heuresValidite: { debut: string; fin: string };
  joursValidite: string[]; // vide = tous les jours
  statut: 'actif' | 'inactif' | 'brouillon';
  couleur: string;
  icone: string;
  conditions: string;
  reduction: {
    type: 'pourcentage' | 'montant' | 'aucune';
    valeur: number;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}
```

## Navigation

La section abonnements est accessible via :
- **Menu principal** : Icône "CreditCard" avec le libellé "Abonnements"
- **Route** : `/dashboard/abonnements`
- **Position** : Entre "Planning" et "Clients" dans le menu

## Composants

### 1. Abonnements (`abonnements.tsx`)
Composant principal qui gère l'affichage et la logique métier des abonnements.

### 2. AddAbonnementModal (`AddAbonnementModal.tsx`)
Modal pour la création de nouveaux abonnements avec formulaire de validation.

### 3. AbonnementDetailsModal (`AbonnementDetailsModal.tsx`)
Modal d'affichage des détails d'un abonnement avec options d'édition et suppression.

### 4. Types (`types.ts`)
Définitions TypeScript pour tous les types liés aux abonnements.

## Prochaines étapes

1. **Intégration API** : Connecter avec le backend pour la persistance des données
2. **Édition d'abonnements** : Implémenter la modification des abonnements existants
3. **Gestion des souscriptions** : Affichage des utilisateurs abonnés
4. **Rapports et analytics** : Statistiques détaillées sur les abonnements
5. **Notifications** : Système de notifications pour les expirations
6. **Import/Export** : Fonctionnalités d'import et export des abonnements

## Technologies utilisées

- **React** : Framework frontend
- **TypeScript** : Typage statique
- **Tailwind CSS** : Styling
- **Lucide React** : Icônes
- **React Router** : Navigation

## Données de test

Le composant inclut des données fictives pour la démonstration :
- Abonnement Mensuel Standard (25 000 FCFA)
- Abonnement Hebdomadaire (8 000 FCFA)  
- Abonnement Étudiant (15 000 FCFA avec réduction 40%)

Ces données permettent de tester toutes les fonctionnalités sans backend.
