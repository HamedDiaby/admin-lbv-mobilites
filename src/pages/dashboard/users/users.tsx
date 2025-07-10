import React, { useState } from 'react';
import { User, NewUserData } from './types';
import { useUserData } from './hooks/useUserData';
import {
  UserHeader,
  UserStatsComponent,
  UserFiltersComponent,
  UserTable,
  AddUserModal
} from './components';

export const Users: React.FC = () => {
  // État des modales
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Données et logique métier
  const {
    usersFiltres,
    statistiques,
    loading,
    filters,
    setFilters,
    addUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    resetFilters
  } = useUserData();

  // Handlers pour les utilisateurs
  const handleAddUser = async (userData: NewUserData) => {
    try {
      await addUser(userData);
      setShowAddModal(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      alert(error instanceof Error ? error.message : 'Erreur lors de l\'ajout de l\'utilisateur');
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    // TODO: Implémenter le modal d'édition si nécessaire
    console.log('Édition de l\'utilisateur:', user);
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await deleteUser(id);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de l\'utilisateur');
      }
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleUserStatus(id);
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
      alert('Erreur lors du changement de statut');
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <UserHeader
        onAddUser={() => setShowAddModal(true)}
      />

      {/* Statistiques */}
      <UserStatsComponent 
        stats={statistiques} 
        loading={loading}
      />

      {/* Filtres */}
      <UserFiltersComponent
        filters={filters}
        onFiltersChange={setFilters}
        onReset={resetFilters}
      />

      {/* Tableau des utilisateurs */}
      <UserTable
        users={usersFiltres}
        loading={loading}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onToggleStatus={handleToggleStatus}
      />

      {/* Modales */}
      {showAddModal && (
        <AddUserModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddUser}
        />
      )}
    </div>
  );
};

export default Users;