import { useState, useMemo } from "react";
import { Client, Abonnement, FiltresClients, StatistiquesClients } from "../types";
import { mockClients, mockAbonnements } from "../constants";

export const useClientData = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [abonnements] = useState<Abonnement[]>(mockAbonnements);
  const [filtres, setFiltres] = useState<FiltresClients>({});

  // Clients filtrés
  const clientsFiltres = useMemo(() => {
    let filtered = clients;

    if (filtres.statut) {
      filtered = filtered.filter(c => c.statut === filtres.statut);
    }

    if (filtres.ville) {
      filtered = filtered.filter(c => c.ville?.toLowerCase().includes(filtres.ville!.toLowerCase()));
    }

    if (filtres.nom) {
      const terme = filtres.nom.toLowerCase();
      filtered = filtered.filter(c => 
        c.nom.toLowerCase().includes(terme) ||
        c.prenom.toLowerCase().includes(terme) ||
        c.email.toLowerCase().includes(terme) ||
        c.telephone.includes(terme)
      );
    }

    return filtered;
  }, [clients, filtres]);

  // Statistiques
  const statistiques: StatistiquesClients = useMemo(() => {
    const totalClients = clients.length;
    const clientsActifs = clients.filter(c => c.statut === 'Actif').length;
    const clientsInactifs = clients.filter(c => c.statut === 'Inactif').length;
    
    const debutMois = new Date();
    debutMois.setDate(1);
    const nouveauxClientsMois = clients.filter(c => 
      new Date(c.dateInscription) >= debutMois
    ).length;
    
    const abonnementsActifs = abonnements.filter(a => a.statut === 'Actif').length;
    const abonnementsExpires = abonnements.filter(a => a.statut === 'Expiré').length;
    
    // Calculs simplifiés pour les statistiques financières
    const chiffreAffairesMois = abonnements
      .filter(a => new Date(a.dateCreation) >= debutMois)
      .reduce((total, a) => total + a.typeAbonnement.prix, 0);
    
    const voyagesMois = abonnements
      .filter(a => a.statut === 'Actif')
      .reduce((total, a) => total + a.nbVoyagesUtilises, 0);

    return {
      totalClients,
      clientsActifs,
      clientsInactifs,
      nouveauxClientsMois,
      abonnementsActifs,
      abonnementsExpires,
      chiffreAffairesMois,
      voyagesMois
    };
  }, [clients, abonnements]);

  // Fonctions CRUD
  const addClient = (newClient: Omit<Client, 'id' | 'dateInscription' | 'derniereMiseAJour'>) => {
    const client: Client = {
      ...newClient,
      id: Date.now().toString(),
      dateInscription: new Date().toISOString(),
      derniereMiseAJour: new Date().toISOString()
    };
    setClients(prev => [...prev, client]);
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients(prev => 
      prev.map(client => 
        client.id === id 
          ? { ...client, ...updates, derniereMiseAJour: new Date().toISOString() }
          : client
      )
    );
  };

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
  };

  return {
    clients,
    clientsFiltres,
    abonnements,
    filtres,
    setFiltres,
    statistiques,
    addClient,
    updateClient,
    deleteClient
  };
};
