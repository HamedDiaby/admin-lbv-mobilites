import { ProfileData, ProfileFormErrors, User } from '../types';
import { VALIDATION_PATTERNS, VALIDATION_MESSAGES, PROFILE_CONSTANTS } from '../constants';

// Utilitaires de validation
export const validateProfileForm = (data: ProfileData): ProfileFormErrors => {
  const errors: ProfileFormErrors = {};

  // Validation du prénom
  if (!data.firstName.trim()) {
    errors.firstName = VALIDATION_MESSAGES.REQUIRED_FIELD;
  } else if (data.firstName.length < PROFILE_CONSTANTS.MIN_NAME_LENGTH) {
    errors.firstName = VALIDATION_MESSAGES.NAME_TOO_SHORT;
  } else if (data.firstName.length > PROFILE_CONSTANTS.MAX_NAME_LENGTH) {
    errors.firstName = VALIDATION_MESSAGES.NAME_TOO_LONG;
  } else if (!VALIDATION_PATTERNS.NAME.test(data.firstName)) {
    errors.firstName = VALIDATION_MESSAGES.INVALID_NAME_FORMAT;
  }

  // Validation du nom
  if (!data.lastName.trim()) {
    errors.lastName = VALIDATION_MESSAGES.REQUIRED_FIELD;
  } else if (data.lastName.length < PROFILE_CONSTANTS.MIN_NAME_LENGTH) {
    errors.lastName = VALIDATION_MESSAGES.NAME_TOO_SHORT;
  } else if (data.lastName.length > PROFILE_CONSTANTS.MAX_NAME_LENGTH) {
    errors.lastName = VALIDATION_MESSAGES.NAME_TOO_LONG;
  } else if (!VALIDATION_PATTERNS.NAME.test(data.lastName)) {
    errors.lastName = VALIDATION_MESSAGES.INVALID_NAME_FORMAT;
  }

  // Validation de l'email
  if (!data.email.trim()) {
    errors.email = VALIDATION_MESSAGES.REQUIRED_FIELD;
  } else if (!VALIDATION_PATTERNS.EMAIL.test(data.email)) {
    errors.email = VALIDATION_MESSAGES.INVALID_EMAIL;
  }

  // Validation du département
  if (!data.department.trim()) {
    errors.department = VALIDATION_MESSAGES.REQUIRED_FIELD;
  } else if (data.department.length > PROFILE_CONSTANTS.MAX_DEPARTMENT_LENGTH) {
    errors.department = VALIDATION_MESSAGES.DEPARTMENT_TOO_LONG;
  }

  return errors;
};

// Validation d'un champ individuel
export const validateField = (field: keyof ProfileData, value: string): string | undefined => {
  const data = {} as ProfileData;
  data[field] = value;
  const errors = validateProfileForm(data);
  return errors[field];
};

// Utilitaires de formatage
export const formatUserName = (user: User | null): string => {
  if (!user) return 'Utilisateur';
  const firstName = user.firstName || '';
  const lastName = user.lastName || '';
  return `${firstName} ${lastName}`.trim() || 'Utilisateur';
};

export const formatUserInitials = (user: User | null): string => {
  if (!user) return 'U';
  const firstName = user.firstName || '';
  const lastName = user.lastName || '';
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}` || 'U';
};

export const formatLastLogin = (lastLogin: string | undefined): string => {
  if (!lastLogin) return 'Jamais connecté';
  
  try {
    const loginDate = new Date(lastLogin);
    const now = new Date();
    const diffMs = now.getTime() - loginDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return 'À l\'instant';
    if (diffMinutes < 60) return `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    if (diffHours < 24) return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    
    return loginDate.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return lastLogin;
  }
};

// Utilitaires pour les permissions
export const formatPermissions = (permissions: string[]): string => {
  if (!permissions.length) return 'Aucune permission';
  if (permissions.length === 1) return permissions[0];
  if (permissions.length <= 3) return permissions.join(', ');
  return `${permissions.slice(0, 2).join(', ')} et ${permissions.length - 2} autre${permissions.length - 2 > 1 ? 's' : ''}`;
};

export const getUserStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'actif':
      return 'text-green-600 bg-green-100';
    case 'inactive':
    case 'inactif':
      return 'text-red-600 bg-red-100';
    case 'pending':
    case 'en_attente':
      return 'text-yellow-600 bg-yellow-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const getUserStatusLabel = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'Actif';
    case 'inactive':
      return 'Inactif';
    case 'pending':
      return 'En attente';
    default:
      return status;
  }
};

// Utilitaires de nettoyage des données
export const sanitizeProfileData = (data: ProfileData): ProfileData => ({
  firstName: data.firstName.trim(),
  lastName: data.lastName.trim(),
  email: data.email.trim().toLowerCase(),
  department: data.department.trim()
});

// Comparaison de données
export const hasProfileChanged = (original: ProfileData, current: ProfileData): boolean => {
  const sanitizedOriginal = sanitizeProfileData(original);
  const sanitizedCurrent = sanitizeProfileData(current);
  
  return Object.keys(sanitizedOriginal).some(
    key => sanitizedOriginal[key as keyof ProfileData] !== sanitizedCurrent[key as keyof ProfileData]
  );
};

// Export de données de profil
export const exportProfileData = (user: User): string => {
  const exportData = {
    userInfo: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      department: user.department,
      role: user.role,
      joinDate: user.joinDate
    },
    accountInfo: {
      lastLogin: user.lastLogin,
      status: user.status,
      permissions: user.permissions
    },
    exportDate: new Date().toISOString(),
    exportVersion: '1.0'
  };

  return JSON.stringify(exportData, null, 2);
};

// Génération d'avatar par défaut
export const generateAvatarUrl = (user: User): string => {
  const initials = formatUserInitials(user);
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-indigo-500'
  ];
  
  // Utiliser l'email pour déterminer une couleur cohérente
  const colorIndex = user.email ? user.email.charCodeAt(0) % colors.length : 0;
  
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#${colors[colorIndex].replace('bg-', '').replace('-500', '')}" />
      <text x="50" y="50" font-family="Arial" font-size="40" fill="white" text-anchor="middle" dy="0.3em">${initials}</text>
    </svg>
  `)}`;
};
