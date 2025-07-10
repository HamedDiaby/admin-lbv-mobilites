export interface MenuItem {
  icon: string;
  text: string;
  path: string;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
  icon?: string;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    title: "Vue d'ensemble",
    icon: "LayoutDashboard",
    items: [
      {
        icon: "Layout",
        text: "Tableau de bord",
        path: "/dashboard"
      },
      {
        icon: "BarChart2",
        text: "Analytiques",
        path: "/dashboard/analytics"
      }
    ]
  },
  {
    title: "Gestion Transport",
    icon: "Truck",
    items: [
      {
        icon: "Bus",
        text: "Flotte de Bus",
        path: "/dashboard/buses"
      },
      {
        icon: "Route",
        text: "Lignes & Itinéraires",
        path: "/dashboard/lignes"
      },
      {
        icon: "MapPin",
        text: "Stations & Arrêts",
        path: "/dashboard/stations"
      },
      {
        icon: "Calendar",
        text: "Planning & Horaires",
        path: "/dashboard/planning"
      }
    ]
  },
  {
    title: "Gestion Clients",
    icon: "Users",
    items: [
      {
        icon: "Users",
        text: "Base Clients",
        path: "/dashboard/clients"
      },
      {
        icon: "CreditCard",
        text: "Abonnements & Tarifs",
        path: "/dashboard/abonnements"
      }
    ]
  },
  {
    title: "Administration",
    icon: "Settings",
    items: [
      {
        icon: "UserCheck",
        text: "Utilisateurs Admin",
        path: "/dashboard/users"
      },
      {
        icon: "Settings",
        text: "Paramètres Système",
        path: "/dashboard/settings"
      }
    ]
  }
];

// Maintenir la compatibilité avec l'ancien format pour les éventuelles dépendances
export const MENU_ITEMS: MenuItem[] = MENU_CATEGORIES.flatMap(category => category.items);
