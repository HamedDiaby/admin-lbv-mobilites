# Layout Components

Ce dossier contient les composants de layout pour l'application LBV Mobilités.

## Structure

```
layouts/
├── DashboardLayout.tsx     # Composant principal du layout
├── components/             # Composants réutilisables
│   ├── Header.tsx         # En-tête avec navigation et profil
│   ├── Sidebar.tsx        # Barre latérale avec menu
│   └── index.ts           # Exports des composants
├── constants/             # Constantes et configuration
│   ├── menuItems.ts       # Configuration des éléments du menu
│   └── index.ts           # Exports des constantes
├── hooks/                 # Hooks personnalisés
│   ├── usePageInfo.ts     # Hook pour les informations de page
│   └── index.ts           # Exports des hooks
```

## Composants

### DashboardLayout
Composant principal qui orchestrer le layout de l'application avec :
- Gestion de l'état de la sidebar (ouverte/fermée/réduite)
- Overlay pour mobile
- Layout responsive

### Header
Composant d'en-tête avec :
- Bouton toggle pour mobile
- Titre et sous-titre dynamiques
- Bouton de réduction de la sidebar
- Notifications
- Profil utilisateur

### Sidebar
Barre latérale avec :
- Logo LBV Mobilités
- Menu de navigation
- État réduit (icônes seulement)
- Indicateur de statut système

## Hooks

### usePageInfo
Hook personnalisé qui retourne les informations de la page actuelle :
- `title`: Titre de la page
- `subtitle`: Sous-titre descriptif

## Constantes

### MENU_ITEMS
Configuration des éléments du menu de navigation avec :
- `icon`: Nom de l'icône Lucide
- `text`: Texte affiché
- `path`: Route de navigation

## Utilisation

```tsx
import { DashboardLayout } from './layouts/DashboardLayout';

// Le composant est utilisé comme layout principal
function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
```

## Avantages de cette structure

1. **Maintenir** : Code séparé en composants logiques
2. **Réutilisable** : Composants peuvent être utilisés ailleurs
3. **Testable** : Chaque composant peut être testé indépendamment
4. **Lisible** : Structure claire et bien organisée
5. **Évolutive** : Facile d'ajouter de nouvelles fonctionnalités
