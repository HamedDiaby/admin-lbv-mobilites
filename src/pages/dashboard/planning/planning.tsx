import { FC, useState } from "react";
import { PlanningData } from "./types";
import { 
  AddPlanningModal, 
  PlanningCalendar, 
  PlanningDetailsModal,
  PlanningHeader,
  PlanningStats,
  PlanningViewControls,
  PlanningTable
} from "./components";
import { usePlanningData } from "./hooks";

export const Planning: FC = () => {
  const {
    plannings,
    stats,
    addPlanning,
    updatePlanning,
    deletePlanning,
    mockChauffeurs,
    mockBus
  } = usePlanningData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPlanning, setEditingPlanning] = useState<PlanningData | null>(null);
  const [selectedPlanning, setSelectedPlanning] = useState<PlanningData | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'table' | 'calendar'>('table');

  // Handlers
  const handleAddPlanning = async (data: any) => {
    if (editingPlanning) {
      updatePlanning(editingPlanning.id, data);
    } else {
      addPlanning(data);
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingPlanning(null);
  };

  const handleEdit = (planning: PlanningData) => {
    setEditingPlanning(planning);
    setIsAddModalOpen(true);
  };

  const handleViewDetails = (planning: PlanningData) => {
    setSelectedPlanning(planning);
    setIsDetailsModalOpen(true);
  };

  const handleDelete = (planning: PlanningData) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce planning ?')) {
      deletePlanning(planning.id);
    }
  };

  const handleToggleStatus = (planning: PlanningData) => {
    const newStatus = planning.statut === 'Actif' ? 'Suspendu' : 'Actif';
    updatePlanning(planning.id, { statut: newStatus });
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <PlanningHeader />

      {/* Statistiques */}
      <PlanningStats stats={stats} />

      {/* Contrôles de vue et actions */}
      <PlanningViewControls
        currentView={currentView}
        onViewChange={setCurrentView}
        onAddClick={() => setIsAddModalOpen(true)}
      />

      {/* Contenu principal */}
      {currentView === 'table' ? (
        <PlanningTable
          plannings={plannings}
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      ) : (
        <div className="bg-white border border-border rounded-lg p-4">
          <PlanningCalendar
            plannings={plannings}
            onPlanningClick={handleViewDetails}
          />
        </div>
      )}

      {/* Modals */}
      <AddPlanningModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddPlanning}
        editingPlanning={editingPlanning}
        chauffeurs={mockChauffeurs}
        bus={mockBus}
      />

      <PlanningDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedPlanning(null);
        }}
        planning={selectedPlanning}
        onEdit={handleEdit}
      />
    </div>
  );
};