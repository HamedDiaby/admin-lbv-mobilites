# Refactoring du Dossier Lignes - Structure Organisée

## Structure Créée

```
src/pages/dashboard/lignes/
├── components/              # Composants UI spécialisés
│   ├── AddLigneModal.tsx
│   ├── AddLigneModalNew.tsx
│   ├── LignesMap.tsx
│   ├── LignesMap.css
│   ├── LignesTest.tsx
│   └── index.ts
├── hooks/                   # Hooks personnalisés
│   ├── useLigneData.ts
│   └── index.ts
├── utils/                   # Fonctions utilitaires
│   ├── ligneUtils.ts
│   └── index.ts
├── constants/               # Configuration et constantes
│   ├── mockData.ts
│   └── index.ts
├── types.ts                 # Types TypeScript
├── lignes.tsx              # Composant principal refactorisé
├── lignes-old.tsx          # Sauvegarde ancienne version
└── index.ts                # Exports centralisés
```

## Améliorations Apportées

### 1. Organisation des Composants
- **AddLigneModal.tsx** → `/components/` : Modal d'ajout/édition de lignes
- **AddLigneModalNew.tsx** → `/components/` : Version améliorée du modal
- **LignesMap.tsx** + **LignesMap.css** → `/components/` : Carte interactive des itinéraires
- **LignesTest.tsx** → `/components/` : Composant de test
- **index.ts** : Exports centralisés

### 2. Hook Personnalisé
- **useLigneData** : Gestion complète des données des lignes
  - Auto-refresh configuré (30 secondes)
  - Gestion d'état (loading, error)
  - Filtrage temps réel (statut, ville, recherche)
  - Génération de données mockées réalistes
  - Sélection de ligne active

### 3. Utilitaires Métier
- **Formatage** : `formatDistance()`, `formatDuree()` avec unités intelligentes
- **Calculs** : `calculateAverageSpeed()`, `calculateLignesPerformance()`
- **Navigation** : `getTrajetInfo()`, `getTotalStations()`, `generateItineraire()`
- **Validation** : `validateLigne()` avec vérifications complètes
- **Tri/Recherche** : `sortLignes()`, `searchLignes()` avec filtres avancés
- **Analyse** : `calculateLigneStats()` avec métriques détaillées

### 4. Constantes et Configuration
- **generateMockLignes()** : 7 lignes réalistes avec itinéraires détaillés
- **mockVilles** / **mockStations** : Données géographiques du Gabon
- **FILTER_OPTIONS** : Options de filtrage (statut, villes)
- **LIGNE_TABLE_COLUMNS** : Configuration colonnes tableau
- **STATUS_COLORS** : Codes couleurs cohérents

### 5. Composant Principal Refactorisé
- Utilisation du hook `useLigneData`
- Interface moderne avec onglets (Liste/Carte)
- Métriques de performance temps réel
- Filtres avancés et recherche intelligente
- Tableau interactif avec actions contextuelles
- Intégration carte des itinéraires
- Gestion des états (loading, error)

## Fonctionnalités Ajoutées

### 🚏 Gestion des Lignes
- Vue d'ensemble du réseau de transport
- Suivi des lignes actives/inactives
- Gestion des itinéraires et stations
- Configuration des temps de trajet

### 🗺️ Cartographie Intelligente
- Carte interactive des itinéraires
- Visualisation des stations intermédiaires
- Géolocalisation des villes du Gabon
- Affichage temps réel des trajets

### 🔍 Filtrage Avancé
- Par statut (Active, Inactive, Maintenance)
- Par ville (Libreville, Port-Gentil, etc.)
- Recherche textuelle (nom, numéro, stations)
- Filtres combinables

### 📊 Métriques de Performance
- Nombre total de lignes
- Pourcentage de lignes actives
- Distance totale du réseau
- Nombre de villes desservies
- Moyenne de stations par ligne

### 🚌 Données Géographiques Réalistes
- **Libreville** : 5 lignes locales (A, B, C, Express)
- **Port-Gentil** : 1 ligne urbaine
- **Lignes Intercités** : Liaisons entre villes
- **Stations** : 14 stations réparties dans le pays

## Types Principaux

- **Ligne** : Structure complète d'un itinéraire
- **StationIntermediaire** : Points d'arrêt avec distances/temps
- **LigneFilters** : Filtres de recherche
- **Ville** : Données géographiques des villes
- **Station** : Points d'arrêt avec localisation

## Avantages de la Refactorisation

### 🔧 Maintenabilité
- Code modulaire et bien séparé
- Responsabilités claires par dossier
- Types TypeScript stricts
- Validation robuste des données

### 🎣 Réutilisabilité
- Hook `useLigneData` réutilisable
- Fonctions utilitaires génériques
- Composants indépendants
- Configuration externalisée

### 📊 Performance
- Auto-refresh intelligent
- Filtrage côté client optimisé
- Calculs de performance cachés
- Recherche temps réel

### 🎨 UI/UX
- Interface cohérente avec @components
- États de chargement fluides
- Feedback utilisateur immédiat
- Design responsive

### 🚀 Évolutivité
- Structure extensible pour nouvelles fonctionnalités
- Types stricts pour la sécurité
- API prête pour intégration backend
- Tests unitaires facilités

## Utilisation

```tsx
// Utilisation du hook
const { lignes, filteredLignes, isLoading, error } = useLigneData({
  refreshInterval: 30000,
  enabled: true
});

// Utilisation des utilitaires
const performance = calculateLignesPerformance(lignes);
const trajet = getTrajetInfo(ligne);
const itineraire = generateItineraire(ligne);

// Utilisation des constantes
import { FILTER_OPTIONS, STATUS_COLORS } from './constants';
```

## Fonctionnalités Spécifiques

### 🇬🇦 Données Gabon
- Villes principales : Libreville, Port-Gentil, Franceville, Oyem, Moanda
- Coordonnées GPS réelles
- Stations emblématiques (Gare Routière, Aéroport, Université, etc.)
- Distances et temps de trajet réalistes

### 📈 Métriques Avancées
- Vitesse moyenne par ligne
- Distance moyenne entre stations
- Taux d'utilisation du réseau
- Analyse des performances par ville

### 🎯 Filtrage Intelligent
- Recherche dans noms, numéros, stations
- Filtres combinables (statut + ville)
- Réinitialisation rapide
- Résultats temps réel

### 🗺️ Cartographie
- Intégration carte interactive
- Visualisation des itinéraires
- Sélection de ligne sur carte
- Navigation fluide entre liste et carte

## Prochaines Étapes

1. ✅ Analytics organisé avec structure complète
2. ✅ Buses organisé avec gestion de flotte
3. ✅ Lignes organisé avec cartographie
4. 🔄 Clients folder (avec QR Scanner)
5. 🔄 Planning folder
6. 🔄 Stations folder
7. 🔄 Users folder
8. 🔄 Profile folder

## Points d'Attention

- Les données sont mockées pour la démo
- L'intégration carte nécessite une clé API cartographique
- Les coordonnées GPS sont réelles pour le Gabon
- Les temps de trajet sont estimés selon les distances
- La validation suit les standards de transport urbain
