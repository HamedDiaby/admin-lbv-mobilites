// Interface pour les données utilisateur
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  createdAt: string;
  avatar?: string;
}

// Interface pour les nouvelles données utilisateur
export interface NewUserData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  password: string;
  confirmPassword: string;
}

// Interface pour les filtres utilisateur
export interface UserFilters {
  status: 'tous' | 'active' | 'inactive' | 'pending';
  role: 'tous' | string;
  department: 'tous' | string;
  searchTerm: string;
}

// Interface pour les statistiques utilisateur
export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  pending: number;
}
