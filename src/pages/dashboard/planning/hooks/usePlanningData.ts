import { useState, useMemo } from "react";
import { PlanningData, FiltresPlanning } from "../types";
import { mockPlannings, mockChauffeurs, mockBus } from "../constants";

export const usePlanningData = () => {
  const [plannings, setPlannings] = useState<PlanningData[]>(mockPlannings);
  const [filtres, setFiltres] = useState<FiltresPlanning>({});

  // Calcul des statistiques
  const stats = useMemo(() => {
    const totalPlannings = plannings.length;
    const planningsActifs = plannings.filter(p => p.statut === 'Actif').length;
    const planningSuspendus = plannings.filter(p => p.statut === 'Suspendu').length;
    const chauffeursUtilises = new Set(plannings.map(p => p.chauffeurId)).size;
    const busUtilises = new Set(plannings.map(p => p.busId)).size;

    return {
      totalPlannings,
      planningsActifs,
      planningSuspendus,
      chauffeursUtilises,
      busUtilises
    };
  }, [plannings]);

  // Fonctions de gestion des plannings
  const addPlanning = (newPlanning: Omit<PlanningData, 'id' | 'dateCreation' | 'dateMiseAJour'>) => {
    const planning: PlanningData = {
      ...newPlanning,
      id: Date.now().toString(),
      dateCreation: new Date().toISOString(),
      dateMiseAJour: new Date().toISOString()
    };
    setPlannings(prev => [...prev, planning]);
  };

  const updatePlanning = (id: string, updates: Partial<PlanningData>) => {
    setPlannings(prev => 
      prev.map(planning => 
        planning.id === id 
          ? { ...planning, ...updates, dateMiseAJour: new Date().toISOString() }
          : planning
      )
    );
  };

  const deletePlanning = (id: string) => {
    setPlannings(prev => prev.filter(planning => planning.id !== id));
  };

  return {
    plannings,
    setPlannings,
    filtres,
    setFiltres,
    stats,
    addPlanning,
    updatePlanning,
    deletePlanning,
    mockChauffeurs,
    mockBus
  };
};
