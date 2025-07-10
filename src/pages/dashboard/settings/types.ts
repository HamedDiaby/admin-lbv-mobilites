export interface SystemSettings {
  general: GeneralSettings;
  notification: NotificationSettings;
  security: SecuritySettings;
  appearance: AppearanceSettings;
  billing: BillingSettings;
  maintenance: MaintenanceSettings;
}

export interface GeneralSettings {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  timezone: string;
  language: string;
  currency: string;
  businessHours: BusinessHours;
}

export interface BusinessHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  maintenanceAlerts: boolean;
  capacityAlerts: boolean;
  revenueReports: boolean;
  alertThresholds: AlertThresholds;
}

export interface AlertThresholds {
  busCapacity: number; // percentage
  lowFuel: number; // percentage
  maintenanceDue: number; // days
  revenueDropAlert: number; // percentage
}

export interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number; // minutes
  passwordPolicy: PasswordPolicy;
  apiAccess: boolean;
  auditLogs: boolean;
  ipWhitelist: string[];
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  passwordExpiry: number; // days
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'auto';
  primaryColor: string;
  fontSize: 'small' | 'medium' | 'large';
  compactMode: boolean;
  showSidebar: boolean;
  language: string;
}

export interface BillingSettings {
  baseFare: number;
  distanceRate: number;
  peakHourMultiplier: number;
  subscriptionPlans: SubscriptionPlan[];
  paymentMethods: PaymentMethod[];
  taxRate: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  duration: number; // days
  price: number;
  features: string[];
  isActive: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'mobile_money' | 'cash' | 'bank_transfer';
  isActive: boolean;
  fees: number; // percentage
}

export interface MaintenanceSettings {
  scheduleEnabled: boolean;
  maintenanceWindow: {
    startTime: string;
    endTime: string;
    days: string[]; // ['monday', 'tuesday', etc.]
  };
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  retentionPeriod: number; // days
  systemUpdates: boolean;
  updateNotifications: boolean;
}

export interface SettingsTab {
  id: string;
  name: string;
  icon: string;
  description: string;
}
