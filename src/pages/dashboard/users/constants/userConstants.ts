import { User } from '../types';

// Données simulées des utilisateurs
export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Admin',
    lastName: 'LBV',
    email: 'admin@lbv-mobilites.ga',
    role: 'Administrateur',
    department: 'Administration',
    status: 'active',
    lastLogin: '2025-01-08 14:30:00',
    createdAt: '2024-01-15 09:00:00'
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@lbv-mobilites.ga',
    role: 'Gestionnaire',
    department: 'Transport',
    status: 'active',
    lastLogin: '2025-01-08 11:45:00',
    createdAt: '2024-02-20 10:30:00'
  },
  {
    id: '3',
    firstName: 'Jean',
    lastName: 'Martin',
    email: 'jean.martin@lbv-mobilites.ga',
    role: 'Opérateur',
    department: 'Logistique',
    status: 'active',
    lastLogin: '2025-01-07 16:20:00',
    createdAt: '2024-03-10 14:15:00'
  },
  {
    id: '4',
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@lbv-mobilites.ga',
    role: 'Superviseur',
    department: 'Maintenance',
    status: 'inactive',
    lastLogin: '2025-01-05 09:30:00',
    createdAt: '2024-04-05 11:00:00'
  },
  {
    id: '5',
    firstName: 'Pierre',
    lastName: 'Rousseau',
    email: 'pierre.rousseau@lbv-mobilites.ga',
    role: 'Technicien',
    department: 'Maintenance',
    status: 'pending',
    lastLogin: 'Jamais connecté',
    createdAt: '2025-01-07 16:45:00'
  },
  {
    id: '6',
    firstName: 'Alice',
    lastName: 'Moreau',
    email: 'alice.moreau@lbv-mobilites.ga',
    role: 'Gestionnaire',
    department: 'Finance',
    status: 'active',
    lastLogin: '2025-01-08 08:15:00',
    createdAt: '2024-05-12 13:20:00'
  },
  {
    id: '7',
    firstName: 'David',
    lastName: 'Lefort',
    email: 'david.lefort@lbv-mobilites.ga',
    role: 'Opérateur',
    department: 'Transport',
    status: 'active',
    lastLogin: '2025-01-08 12:00:00',
    createdAt: '2024-06-18 09:45:00'
  },
  {
    id: '8',
    firstName: 'Lucie',
    lastName: 'Garnier',
    email: 'lucie.garnier@lbv-mobilites.ga',
    role: 'Analyste',
    department: 'Finance',
    status: 'active',
    lastLogin: '2025-01-08 13:20:00',
    createdAt: '2024-07-22 08:30:00'
  }
];

// Options pour les rôles
export const roleOptions = [
  { value: 'Administrateur', label: 'Administrateur' },
  { value: 'Gestionnaire', label: 'Gestionnaire' },
  { value: 'Superviseur', label: 'Superviseur' },
  { value: 'Opérateur', label: 'Opérateur' },
  { value: 'Technicien', label: 'Technicien' },
  { value: 'Analyste', label: 'Analyste' }
];

// Options pour les départements
export const departmentOptions = [
  { value: 'Administration', label: 'Administration' },
  { value: 'Transport', label: 'Transport' },
  { value: 'Logistique', label: 'Logistique' },
  { value: 'Maintenance', label: 'Maintenance' },
  { value: 'Finance', label: 'Finance' }
];

// Options pour les statuts
export const statusOptions = [
  { value: 'active', label: 'Actif' },
  { value: 'inactive', label: 'Inactif' },
  { value: 'pending', label: 'En attente' }
];

// Options pour les filtres
export const filterStatusOptions = [
  { value: 'tous', label: 'Tous les statuts' },
  ...statusOptions
];

export const filterRoleOptions = [
  { value: 'tous', label: 'Tous les rôles' },
  ...roleOptions
];

export const filterDepartmentOptions = [
  { value: 'tous', label: 'Tous les départements' },
  ...departmentOptions
];
