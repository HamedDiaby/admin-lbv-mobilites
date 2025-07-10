import { SystemSettings } from '../types';

// Fonction pour formater la monnaie
export const formatCurrency = (amount: number, currency: string = 'XAF'): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  }).format(amount);
};

// Fonction pour formater l'heure
export const formatTime = (time: string): string => {
  try {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return time;
  }
};

// Fonction pour valider une adresse email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Fonction pour valider un numéro de téléphone
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Fonction pour valider une URL
export const validateURL = (url: string): boolean => {
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
};

// Fonction pour valider les paramètres de politique de mot de passe
export const validatePasswordPolicy = (policy: SystemSettings['security']['passwordPolicy']): string[] => {
  const errors: string[] = [];

  if (policy.minLength < 6) {
    errors.push('La longueur minimale doit être d\'au moins 6 caractères');
  }

  if (policy.passwordExpiry < 1) {
    errors.push('L\'expiration du mot de passe doit être d\'au moins 1 jour');
  }

  return errors;
};

// Fonction pour valider les heures d'ouverture
export const validateBusinessHours = (openTime: string, closeTime: string): boolean => {
  try {
    const open = new Date(`2000-01-01T${openTime}`);
    const close = new Date(`2000-01-01T${closeTime}`);
    return open < close;
  } catch {
    return false;
  }
};

// Fonction pour convertir les heures en minutes
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Fonction pour convertir les minutes en heures
export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

// Fonction pour calculer la durée entre deux heures
export const calculateDuration = (startTime: string, endTime: string): string => {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const duration = endMinutes - startMinutes;
  
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  
  if (hours === 0) {
    return `${minutes}min`;
  } else if (minutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${minutes}min`;
  }
};

// Fonction pour générer un ID unique
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Fonction pour valider les paramètres généraux
export const validateGeneralSettings = (settings: SystemSettings['general']): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!settings.companyName.trim()) {
    errors.push('Le nom de l\'entreprise est requis');
  }

  if (!settings.address.trim()) {
    errors.push('L\'adresse est requise');
  }

  if (!settings.email.trim()) {
    errors.push('L\'email est requis');
  } else if (!validateEmail(settings.email)) {
    errors.push('L\'email n\'est pas valide');
  }

  if (!settings.phone.trim()) {
    errors.push('Le téléphone est requis');
  } else if (!validatePhone(settings.phone)) {
    errors.push('Le numéro de téléphone n\'est pas valide');
  }

  if (settings.website && !validateURL(settings.website)) {
    errors.push('L\'URL du site web n\'est pas valide');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Fonction pour formater les jours de la semaine
export const formatDays = (days: string[]): string => {
  const dayNames: { [key: string]: string } = {
    monday: 'Lun',
    tuesday: 'Mar',
    wednesday: 'Mer',
    thursday: 'Jeu',
    friday: 'Ven',
    saturday: 'Sam',
    sunday: 'Dim'
  };

  return days.map(day => dayNames[day] || day).join(', ');
};

// Fonction pour obtenir le statut d'un service basé sur les heures d'ouverture
export const getServiceStatus = (businessHours: SystemSettings['general']['businessHours']): 'open' | 'closed' | 'unknown' => {
  try {
    const now = new Date();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = dayNames[now.getDay()] as keyof typeof businessHours;
    const currentTime = now.toTimeString().slice(0, 5);

    const daySchedule = businessHours[currentDay];
    
    if (!daySchedule.isOpen) {
      return 'closed';
    }

    const currentMinutes = timeToMinutes(currentTime);
    const openMinutes = timeToMinutes(daySchedule.openTime);
    const closeMinutes = timeToMinutes(daySchedule.closeTime);

    if (currentMinutes >= openMinutes && currentMinutes <= closeMinutes) {
      return 'open';
    } else {
      return 'closed';
    }
  } catch {
    return 'unknown';
  }
};
