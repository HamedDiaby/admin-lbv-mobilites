# Refactoring du Dossier Analytics - Structure Organisée

## Structure Créée

```
src/pages/dashboard/analytics/
├── components/              # Composants UI spécialisés
│   ├── ChartsModal.tsx
│   ├── ChartsModalAdvanced.tsx
│   ├── MiniChart.tsx
│   └── index.ts
├── hooks/                   # Hooks personnalisés
│   ├── useAnalyticsData.ts
│   └── index.ts
├── utils/                   # Fonctions utilitaires
│   ├── analyticsUtils.ts
│   └── index.ts
├── constants/               # Configuration et constantes
│   ├── chartConfig.ts
│   └── index.ts
├── types.ts                 # Types TypeScript
├── analytics.tsx            # Composant principal refactorisé
└── index.ts                 # Exports centralisés
```

## Améliorations Apportées

### 1. Organisation des Composants
- **ChartsModal.tsx** → `/components/` : Modal simple pour graphiques
- **ChartsModalAdvanced.tsx** → `/components/` : Modal avancée avec Chart.js
- **MiniChart.tsx** → `/components/` : Graphiques miniatures pour KPIs
- **index.ts** : Exports centralisés

### 2. Hook Personnalisé
- **useAnalyticsData** : Gestion complète des données analytics
  - Auto-refresh configurable
  - Gestion d'état (loading, error)
  - Génération de données mockées
  - Métriques de performance

### 3. Utilitaires Métier
- **Formatage** : `formatCurrency()`, `formatNumber()`
- **Calculs** : `calculateGrowthRate()`, `calculateAverage()`
- **Performance** : `calculateRevenueGrowth()`, `findPeakHours()`
- **Graphiques** : `generateChartColors()`, configuration Chart.js
- **Filtrage** : `filterDataByPeriod()` avec types génériques

### 4. Constantes et Configuration
- **CHART_COLORS** : Palette de couleurs cohérente
- **CHART_CONFIG** : Configuration Chart.js réutilisable
- **DEFAULT_KPIS** : Configuration des KPIs avec icônes
- **TIME_PERIODS** : Périodes de temps disponibles
- **REFRESH_INTERVALS** : Intervalles de rafraîchissement

### 5. Composant Principal Refactorisé
- Utilisation du hook `useAnalyticsData`
- Interface simplifiée et moderne
- Gestion d'états (loading, error)
- KPIs avec métriques de croissance
- Intégration des utilitaires de formatage

## Avantages de la Refactorisation

### 🔧 Maintenabilité
- Code modulaire et bien séparé
- Responsabilités claires par dossier
- Types TypeScript stricts

### 🎣 Réutilisabilité
- Hook `useAnalyticsData` réutilisable
- Fonctions utilitaires génériques
- Composants indépendants

### 📊 Performance
- Auto-refresh intelligent
- Gestion d'erreurs robuste
- Calculs optimisés

### 🎨 UI/UX
- Interface cohérente
- États de chargement
- Feedback utilisateur

### 🚀 Évolutivité
- Structure extensible
- Configuration centralisée
- Types stricts pour la sécurité

## Prochaines Étapes

1. ✅ Analytics organisé
2. 🔄 Settings folder
3. 🔄 Buses folder
4. 🔄 Clients folder
5. 🔄 Lignes folder
6. 🔄 Planning folder
7. 🔄 Stations folder
8. 🔄 Users folder

## Utilisation

```tsx
// Utilisation du hook
const { data, isLoading, error, refreshData } = useAnalyticsData({
  refreshInterval: 300000,
  enabled: true
});

// Utilisation des utilitaires
const growth = calculateRevenueGrowth(data.revenueEvolution);
const formatted = formatCurrency(data.totalRevenue);

// Utilisation des constantes
import { CHART_COLORS, DEFAULT_KPIS } from './constants';
```

## Types Principaux

- **AnalyticsData** : Structure complète des données
- **RevenueData**, **TripData** : Évolution temporelle
- **PerformanceMetrics** : Métriques calculées
- **ChartConfig** : Configuration graphiques
