import { useState, useEffect, useMemo } from 'react';
import { User, UserFilters, UserStats, NewUserData } from '../types';
import { mockUsers } from '../constants';
import { filterUsers, calculateUserStats, generateUserId, validateUserData } from '../utils';

export const useUserData = () => {
  // État des utilisateurs
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // État des filtres
  const [filters, setFilters] = useState<UserFilters>({
    status: 'tous',
    role: 'tous',
    department: 'tous',
    searchTerm: ''
  });

  // Initialisation des données
  useEffect(() => {
    const loadUsers = async () => {
      try {
        // Simulation d'un appel API
        await new Promise(resolve => setTimeout(resolve, 500));
        setUsers(mockUsers);
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Utilisateurs filtrés
  const usersFiltres = useMemo(() => {
    return filterUsers(users, filters);
  }, [users, filters]);

  // Statistiques des utilisateurs
  const statistiques = useMemo(() => {
    return calculateUserStats(users);
  }, [users]);

  // Fonction pour ajouter un utilisateur
  const addUser = async (userData: NewUserData): Promise<void> => {
    const validation = validateUserData(userData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    const newUser: User = {
      id: generateUserId(),
      firstName: userData.firstName.trim(),
      lastName: userData.lastName.trim(),
      email: userData.email.trim().toLowerCase(),
      role: userData.role,
      department: userData.department,
      status: 'pending',
      lastLogin: 'Jamais connecté',
      createdAt: new Date().toISOString()
    };

    setUsers(prevUsers => [...prevUsers, newUser]);
  };

  // Fonction pour modifier un utilisateur
  const updateUser = async (id: string, userData: Partial<User>): Promise<void> => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, ...userData } : user
      )
    );
  };

  // Fonction pour supprimer un utilisateur
  const deleteUser = async (id: string): Promise<void> => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  };

  // Fonction pour changer le statut d'un utilisateur
  const toggleUserStatus = async (id: string): Promise<void> => {
    const user = users.find(u => u.id === id);
    if (!user) return;

    let newStatus: User['status'];
    switch (user.status) {
      case 'active':
        newStatus = 'inactive';
        break;
      case 'inactive':
        newStatus = 'active';
        break;
      case 'pending':
        newStatus = 'active';
        break;
      default:
        newStatus = 'active';
    }

    await updateUser(id, { status: newStatus });
  };

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setFilters({
      status: 'tous',
      role: 'tous',
      department: 'tous',
      searchTerm: ''
    });
  };

  return {
    // Données
    users,
    usersFiltres,
    statistiques,
    loading,

    // Filtres
    filters,
    setFilters,
    resetFilters,

    // Actions
    addUser,
    updateUser,
    deleteUser,
    toggleUserStatus
  };
};
