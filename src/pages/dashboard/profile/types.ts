// Types pour la gestion du profil utilisateur

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
}

export interface User extends ProfileData {
  id?: string;
  role?: string;
  lastLogin?: string;
  status?: 'active' | 'inactive' | 'pending';
  permissions?: string[];
  avatar?: string;
  phone?: string;
  position?: string;
  joinDate?: string;
}

export interface ProfileFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  department?: string;
  phone?: string;
  position?: string;
}

export interface ProfileSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange?: string;
  activeSessions: number;
  loginAttempts: number;
}

export interface ProfileActionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: () => void;
  variant: 'primary' | 'secondary' | 'warning' | 'danger';
  disabled?: boolean;
}

export interface AccountInfo {
  accountType: string;
  memberSince: string;
  accountStatus: 'verified' | 'pending' | 'suspended';
  permissions: string[];
  lastActivity: string;
}
