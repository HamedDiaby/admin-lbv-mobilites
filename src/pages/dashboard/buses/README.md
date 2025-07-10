# Refactoring du Dossier Buses - Structure Organisée

## Structure Créée

```
src/pages/dashboard/buses/
├── components/              # Composants UI spécialisés
│   ├── AddBusModal.tsx
│   ├── BusDetailsModal.tsx
│   ├── BusMap.tsx
│   ├── BusMap.css
│   ├── BusesMinimal.tsx
│   ├── BusesSimple.tsx
│   ├── BusesTest.tsx
│   └── index.ts
├── hooks/                   # Hooks personnalisés
│   ├── useBusData.ts
│   └── index.ts
├── utils/                   # Fonctions utilitaires
│   ├── busUtils.ts
│   └── index.ts
├── constants/               # Configuration et constantes
│   ├── mockData.ts
│   └── index.ts
├── types.ts                 # Types TypeScript
├── buses.tsx               # Composant principal refactorisé
└── index.ts                # Exports centralisés
```

## Améliorations Apportées

### 1. Organisation des Composants
- **AddBusModal.tsx** → `/components/` : Modal d'ajout de nouveaux bus
- **BusDetailsModal.tsx** → `/components/` : Modal détaillée avec données OBD2
- **BusMap.tsx** + **BusMap.css** → `/components/` : Carte temps réel des bus
- **BusesMinimal.tsx** → `/components/` : Vue simplifiée des bus
- **BusesSimple.tsx** → `/components/` : Vue basique des bus
- **BusesTest.tsx** → `/components/` : Composant de test
- **index.ts** : Exports centralisés

### 2. Hook Personnalisé
- **useBusData** : Gestion complète des données de la flotte
  - Auto-refresh configuré (30 secondes)
  - Gestion d'état (loading, error)
  - Filtrage temps réel
  - Génération de données mockées avec OBD2
  - Sélection de bus

### 3. Utilitaires Métier
- **Formatage** : `formatKilometrage()`, `formatConsommation()`, `formatPression()`, `formatTemperature()`
- **Calculs** : `calculateBusPerformance()`, `calculateFuelEfficiency()`
- **Validation** : `validateOBD2Data()` avec vérification des seuils critiques
- **Tri/Recherche** : `sortBuses()`, `searchBuses()` avec filtres avancés
- **Géolocalisation** : `calculateDistance()` entre deux points
- **Rapports** : `generateBusReport()` avec recommandations

### 4. Constantes et Configuration
- **generateMockBuses()** : Génération de données réalistes
- **FILTER_OPTIONS** : Options de filtrage (statut, carburant, état santé)
- **BUS_TABLE_COLUMNS** : Configuration colonnes tableau
- **STATUS_COLORS** / **HEALTH_COLORS** : Codes couleurs cohérents
- **Mock OBD2 Data** : Données télématiques complètes

### 5. Composant Principal Refactorisé
- Utilisation du hook `useBusData`
- Interface moderne avec onglets (Liste/Carte)
- Métriques de performance temps réel
- Filtres avancés et recherche
- Tableau interactif avec actions
- Intégration carte géographique
- Gestion des états (loading, error)

## Fonctionnalités Ajoutées

### 🚌 Gestion de Flotte
- Vue d'ensemble des performances
- Suivi du taux d'utilisation
- Alertes de maintenance
- État de santé des véhicules

### 📊 Données OBD2 Temps Réel
- Vitesse, RPM, température moteur
- Niveau carburant, pression d'huile
- Pression des pneus
- Consommation et émissions CO2
- Alertes critiques/avertissements

### 🗺️ Géolocalisation
- Carte temps réel des bus
- Positions GPS
- Calcul de distances
- Affectation aux stations

### 🔍 Filtrage Avancé
- Par statut (actif, maintenance, hors service)
- Par type de carburant
- Par station d'affectation
- Par état de santé (excellent à critique)
- Recherche textuelle

### 📈 Métriques de Performance
- Nombre total de bus
- Taux d'utilisation de la flotte
- Bus en maintenance
- Score moyen de l'état
- Alertes critiques actives

## Types Principaux

- **Bus** : Structure complète d'un véhicule
- **OBD2Data** : Données télématiques temps réel
- **BusAlert** : Système d'alertes hiérarchisées
- **BusFilters** : Filtres de recherche
- **NewBusData** : Formulaire d'ajout

## Avantages de la Refactorisation

### 🔧 Maintenabilité
- Code modulaire et bien séparé
- Responsabilités claires par dossier
- Types TypeScript stricts
- Gestion d'erreurs robuste

### 🎣 Réutilisabilité
- Hook `useBusData` réutilisable
- Fonctions utilitaires génériques
- Composants indépendants
- Configuration externalisée

### 📊 Performance
- Auto-refresh intelligent
- Filtrage côté client optimisé
- Calculs de performance
- Validation temps réel

### 🎨 UI/UX
- Interface cohérente avec @components
- États de chargement
- Feedback utilisateur
- Responsive design

### 🚀 Évolutivité
- Structure extensible
- Types stricts pour la sécurité
- API prête pour intégration backend
- Tests unitaires facilités

## Utilisation

```tsx
// Utilisation du hook
const { buses, filteredBuses, isLoading, error, refreshData } = useBusData({
  refreshInterval: 30000,
  enabled: true
});

// Utilisation des utilitaires
const performance = calculateBusPerformance(buses);
const efficiency = calculateFuelEfficiency(bus.obd2Data);
const validation = validateOBD2Data(bus.obd2Data);

// Utilisation des constantes
import { FILTER_OPTIONS, STATUS_COLORS } from './constants';
```

## Prochaines Étapes

1. ✅ Buses organisé avec structure complète
2. 🔄 Clients folder
3. 🔄 Lignes folder
4. 🔄 Planning folder
5. 🔄 Stations folder
6. 🔄 Users folder
7. 🔄 Profile folder

## Points d'Attention

- Les données OBD2 sont mockées pour la démo
- L'intégration carte nécessite une API de géolocalisation
- La validation des données critiques suit les standards automobiles
- Les alertes suivent une hiérarchie critique/avertissement/info
