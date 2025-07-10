// Constantes pour les graphiques
export const CHART_COLORS = {
  primary: '#3B82F6',
  secondary: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#06B6D4',
  purple: '#8B5CF6',
  pink: '#EC4899',
  gray: '#6B7280'
};

export const CHART_CONFIG = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
    },
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
      },
    },
    y: {
      display: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
};

// Périodes de temps disponibles
export const TIME_PERIODS = [
  { value: 'week', label: '7 derniers jours' },
  { value: 'month', label: '30 derniers jours' },
  { value: 'quarter', label: '3 derniers mois' }
] as const;

// Types de graphiques disponibles
export const CHART_TYPES = [
  { value: 'line', label: 'Ligne', icon: 'TrendingUp' },
  { value: 'bar', label: 'Barres', icon: 'BarChart3' },
  { value: 'doughnut', label: 'Anneau', icon: 'PieChart' }
] as const;

// KPIs par défaut
export const DEFAULT_KPIS = [
  {
    key: 'revenue',
    label: 'Revenus',
    icon: 'DollarSign',
    color: CHART_COLORS.success,
    format: 'currency'
  },
  {
    key: 'trips',
    label: 'Trajets',
    icon: 'MapPin',
    color: CHART_COLORS.primary,
    format: 'number'
  },
  {
    key: 'users',
    label: 'Utilisateurs',
    icon: 'Users',
    color: CHART_COLORS.purple,
    format: 'number'
  },
  {
    key: 'subscriptions',
    label: 'Abonnements',
    icon: 'CreditCard',
    color: CHART_COLORS.warning,
    format: 'number'
  }
] as const;

// Configuration des intervalles de rafraîchissement
export const REFRESH_INTERVALS = [
  { value: 60000, label: '1 minute' },
  { value: 300000, label: '5 minutes' },
  { value: 900000, label: '15 minutes' },
  { value: 1800000, label: '30 minutes' }
] as const;
