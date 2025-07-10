import React, { useState } from 'react';
import { Abonnement } from './types';
import { useAbonnementData } from './hooks/useAbonnementData';
import {
  AbonnementHeader,
  AbonnementStatsComponent,
  AbonnementFiltersComponent,
  AbonnementTable,
  AddAbonnementModal,
  AbonnementDetailsModal,
  EditAbonnementModal
} from './components';

export const Abonnements: React.FC = () => {
  // État des modales
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAbonnement, setSelectedAbonnement] = useState<Abonnement | null>(null);

  // Données et logique métier
  const {
    abonnementsFiltres,
    statistiques,
    loading,
    filters,
    setFilters,
    addAbonnement,
    updateAbonnement,
    deleteAbonnement,
    duplicateAbonnement,
    toggleStatutAbonnement
  } = useAbonnementData();

  // Handlers pour les abonnements
  const handleAddAbonnement = async (abonnementData: any) => {
    try {
      await addAbonnement(abonnementData);
      setShowAddModal(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
    }
  };

  const handleEditAbonnement = async (abonnementData: any) => {
    try {
      if (selectedAbonnement) {
        await updateAbonnement(selectedAbonnement.id, abonnementData);
        setShowEditModal(false);
        setSelectedAbonnement(null);
      }
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
    }
  };

  const handleDeleteAbonnement = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet abonnement ?')) {
      try {
        await deleteAbonnement(id);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const handleDetailsAbonnement = (abonnement: Abonnement) => {
    setSelectedAbonnement(abonnement);
    setShowDetailsModal(true);
  };

  const handleEditClick = (abonnement: Abonnement) => {
    setSelectedAbonnement(abonnement);
    setShowEditModal(true);
  };

  const handleDuplicate = async (id: string) => {
    try {
      await duplicateAbonnement(id);
    } catch (error) {
      console.error('Erreur lors de la duplication:', error);
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleStatutAbonnement(id);
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      statut: 'tous',
      typeAbonnement: 'tous',
      prixMin: 0,
      prixMax: 1000000,
    });
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <AbonnementHeader
        onAddAbonnement={() => setShowAddModal(true)}
      />

      {/* Statistiques */}
      <AbonnementStatsComponent 
        stats={statistiques} 
        loading={loading}
      />

      {/* Filtres */}
      <AbonnementFiltersComponent
        filters={filters}
        onFiltersChange={setFilters}
        onReset={handleResetFilters}
      />

      {/* Tableau des abonnements */}
      <AbonnementTable
        abonnements={abonnementsFiltres}
        loading={loading}
        onEdit={handleEditClick}
        onDelete={handleDeleteAbonnement}
        onDetails={handleDetailsAbonnement}
        onDuplicate={handleDuplicate}
        onToggleStatus={handleToggleStatus}
      />

      {/* Modales */}
      {showAddModal && (
        <AddAbonnementModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddAbonnement}
        />
      )}

      {showDetailsModal && selectedAbonnement && (
        <AbonnementDetailsModal
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedAbonnement(null);
          }}
          abonnement={selectedAbonnement}
          onEdit={(abonnement) => {
            setShowDetailsModal(false);
            handleEditClick(abonnement);
          }}
          onDelete={(id) => {
            setShowDetailsModal(false);
            setSelectedAbonnement(null);
            handleDeleteAbonnement(id);
          }}
        />
      )}

      {showEditModal && selectedAbonnement && (
        <EditAbonnementModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedAbonnement(null);
          }}
          abonnement={selectedAbonnement}
          onSubmit={handleEditAbonnement}
        />
      )}
    </div>
  );
};

export default Abonnements;