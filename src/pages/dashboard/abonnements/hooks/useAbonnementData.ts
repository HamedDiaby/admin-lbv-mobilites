import { useState, useEffect, useMemo } from 'react';
import { Abonnement, AbonnementFilters, AbonnementStats } from '../types';
import { mockAbonnements } from '../constants';
import { calculateAbonnementStats, filterAbonnements, generateAbonnementId } from '../utils';

export const useAbonnementData = () => {
  const [abonnements, setAbonnements] = useState<Abonnement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<AbonnementFilters>({
    statut: 'tous',
    typeAbonnement: 'tous',
    prixMin: 0,
    prixMax: 1000000,
  });

  // Simulation du chargement des données
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 500));
      setAbonnements(mockAbonnements);
      setLoading(false);
    };

    loadData();
  }, []);

  // Calcul des abonnements filtrés
  const abonnementsFiltres = useMemo(() => {
    return filterAbonnements(abonnements, {
      statut: filters.statut,
      typeAbonnement: filters.typeAbonnement,
      prixMin: filters.prixMin,
      prixMax: filters.prixMax
    });
  }, [abonnements, filters]);

  // Calcul des statistiques
  const statistiques = useMemo(() => {
    return calculateAbonnementStats(abonnements);
  }, [abonnements]);

  // Actions CRUD
  const addAbonnement = async (newAbonnement: Omit<Abonnement, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    const abonnement: Abonnement = {
      ...newAbonnement,
      id: generateAbonnementId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'current_user' // À remplacer par l'utilisateur connecté
    };

    setAbonnements(prev => [...prev, abonnement]);
    return abonnement;
  };

  const updateAbonnement = async (id: string, updates: Partial<Abonnement>) => {
    setAbonnements(prev => 
      prev.map(abonnement => 
        abonnement.id === id 
          ? { 
              ...abonnement, 
              ...updates, 
              updatedAt: new Date().toISOString() 
            }
          : abonnement
      )
    );
  };

  const deleteAbonnement = async (id: string) => {
    setAbonnements(prev => prev.filter(abonnement => abonnement.id !== id));
  };

  const duplicateAbonnement = async (id: string) => {
    const original = abonnements.find(a => a.id === id);
    if (!original) return;

    const duplicate: Abonnement = {
      ...original,
      id: generateAbonnementId(),
      nom: `${original.nom} (Copie)`,
      statut: 'brouillon',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'current_user'
    };

    setAbonnements(prev => [...prev, duplicate]);
    return duplicate;
  };

  const toggleStatutAbonnement = async (id: string) => {
    const abonnement = abonnements.find(a => a.id === id);
    if (!abonnement) return;

    const newStatut = abonnement.statut === 'actif' ? 'inactif' : 'actif';
    await updateAbonnement(id, { statut: newStatut });
  };

  return {
    // Données
    abonnements,
    abonnementsFiltres,
    statistiques,
    loading,
    
    // Filtres
    filters,
    setFilters,
    
    // Actions
    addAbonnement,
    updateAbonnement,
    deleteAbonnement,
    duplicateAbonnement,
    toggleStatutAbonnement
  };
};
