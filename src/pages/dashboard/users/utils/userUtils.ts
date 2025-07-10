import { User, UserFilters, UserStats } from '../types';

// Fonction pour filtrer les utilisateurs
export const filterUsers = (users: User[], filters: UserFilters): User[] => {
  return users.filter(user => {
    // Filtre par statut
    if (filters.status !== 'tous' && user.status !== filters.status) {
      return false;
    }

    // Filtre par rôle
    if (filters.role !== 'tous' && user.role !== filters.role) {
      return false;
    }

    // Filtre par département
    if (filters.department !== 'tous' && user.department !== filters.department) {
      return false;
    }

    // Filtre par terme de recherche
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const email = user.email.toLowerCase();
      const role = user.role.toLowerCase();
      const department = user.department.toLowerCase();

      if (!fullName.includes(searchTerm) && 
          !email.includes(searchTerm) && 
          !role.includes(searchTerm) && 
          !department.includes(searchTerm)) {
        return false;
      }
    }

    return true;
  });
};

// Fonction pour calculer les statistiques des utilisateurs
export const calculateUserStats = (users: User[]): UserStats => {
  const stats: UserStats = {
    total: users.length,
    active: 0,
    inactive: 0,
    pending: 0
  };

  users.forEach(user => {
    switch (user.status) {
      case 'active':
        stats.active++;
        break;
      case 'inactive':
        stats.inactive++;
        break;
      case 'pending':
        stats.pending++;
        break;
    }
  });

  return stats;
};

// Fonction pour formater la date de dernière connexion
export const formatLastLogin = (lastLogin: string): string => {
  if (lastLogin === 'Jamais connecté') {
    return lastLogin;
  }

  try {
    const date = new Date(lastLogin);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return lastLogin;
  }
};

// Fonction pour formater la date de création
export const formatCreatedAt = (createdAt: string): string => {
  try {
    const date = new Date(createdAt);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    return createdAt;
  }
};

// Fonction pour obtenir les initiales d'un utilisateur
export const getUserInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

// Fonction pour générer un nouvel ID utilisateur
export const generateUserId = (): string => {
  return Date.now().toString();
};

// Fonction pour valider les données d'un nouvel utilisateur
export const validateUserData = (userData: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!userData.firstName?.trim()) {
    errors.push('Le prénom est requis');
  }

  if (!userData.lastName?.trim()) {
    errors.push('Le nom est requis');
  }

  if (!userData.email?.trim()) {
    errors.push('L\'email est requis');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
    errors.push('L\'email n\'est pas valide');
  }

  if (!userData.role?.trim()) {
    errors.push('Le rôle est requis');
  }

  if (!userData.department?.trim()) {
    errors.push('Le département est requis');
  }

  if (!userData.password?.trim()) {
    errors.push('Le mot de passe est requis');
  } else if (userData.password.length < 6) {
    errors.push('Le mot de passe doit contenir au moins 6 caractères');
  }

  if (userData.password !== userData.confirmPassword) {
    errors.push('Les mots de passe ne correspondent pas');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
