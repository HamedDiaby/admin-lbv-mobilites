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
    icon: "UserCheck",
    text: "Administrateurs",
    path: "/dashboard/users"
  },
  {
    icon: "MapPin",
    text: "Stations",
    path: "/dashboard/stations"
  },
  {
    icon: "Route",
    text: "Lignes",
    path: "/dashboard/lignes"
  },
  {
    icon: "Bus",
    text: "Bus",
    path: "/dashboard/buses"
  },
  {
    icon: "Calendar",
    text: "Planning",
    path: "/dashboard/planning"
  },
  {
    icon: "CreditCard",
    text: "Abonnements",
    path: "/dashboard/abonnements"
  },
  {
    icon: "Users",
    text: "Clients",
    path: "/dashboard/clients"
  },
  {
    icon: "Settings",
    text: "Paramètres",
    path: "/dashboard/settings"
  }
];
