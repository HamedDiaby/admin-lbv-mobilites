export interface MenuItem {
  icon: string;
  text: string;
  path: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    icon: "Layout",
    text: "Tableau de bord",
    path: "/dashboard"
  },
  {
    icon: "BarChart2",
    text: "Analytiques",
    path: "/dashboard/analytics"
  },
  {
    icon: "Users",
    text: "Utilisateurs",
    path: "/dashboard/users"
  },
  {
    icon: "MapPin",
    text: "Stations",
    path: "/dashboard/stations"
  },
  {
    icon: "Bus",
    text: "Bus",
    path: "/dashboard/buses"
  },
  {
    icon: "Settings",
    text: "Paramètres",
    path: "/dashboard/settings"
  }
];
