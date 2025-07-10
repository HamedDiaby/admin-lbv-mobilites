import { Chauffeur, Bus, PlanningData } from "../types";

// Données simulées pour les chauffeurs
export const mockChauffeurs: Chauffeur[] = [
  {
    id: "1",
    nom: "Mbadinga",
    prenom: "Jean-Claude",
    telephone: "+241 06 12 34 56",
    email: "jc.mbadinga@transport.ga",
    numeroPermis: "GA123456789",
    dateEmbauche: "2020-03-15",
    statut: "Disponible",
    experience: 8
  },
  {
    id: "2",
    nom: "Ondo",
    prenom: "Marie-Claire",
    telephone: "+241 06 98 76 54",
    email: "mc.ondo@transport.ga",
    numeroPermis: "GA987654321",
    dateEmbauche: "2019-07-22",
    statut: "En service",
    experience: 12
  },
  {
    id: "3",
    nom: "Nze",
    prenom: "Patrick",
    telephone: "+241 06 55 44 33",
    email: "p.nze@transport.ga",
    numeroPermis: "GA555444333",
    dateEmbauche: "2021-11-08",
    statut: "Disponible",
    experience: 5
  },
  {
    id: "4",
    nom: "Obame",
    prenom: "Sylvie",
    telephone: "+241 06 77 88 99",
    email: "s.obame@transport.ga",
    numeroPermis: "GA778899000",
    dateEmbauche: "2018-04-12",
    statut: "Repos",
    experience: 15
  }
];

// Données simulées pour les bus
export const mockBus: Bus[] = [
  {
    id: "1",
    numeroImmatriculation: "GA-001-LBV",
    marque: "Mercedes-Benz",
    modele: "Sprinter 516",
    capacite: 22,
    annee: 2022,
    statut: "Disponible",
    kilometrage: 45000,
    dateAchat: "2022-01-15",
    prochaineMaintenance: "2025-02-15"
  },
  {
    id: "2",
    numeroImmatriculation: "GA-002-LBV",
    marque: "Iveco",
    modele: "Daily 70C21",
    capacite: 28,
    annee: 2021,
    statut: "En service",
    kilometrage: 67000,
    dateAchat: "2021-06-10",
    prochaineMaintenance: "2025-01-20"
  },
  {
    id: "3",
    numeroImmatriculation: "GA-003-LBV",
    marque: "Ford",
    modele: "Transit 460",
    capacite: 18,
    annee: 2023,
    statut: "Disponible",
    kilometrage: 12000,
    dateAchat: "2023-03-22",
    prochaineMaintenance: "2025-03-22"
  },
  {
    id: "4",
    numeroImmatriculation: "GA-004-LBV",
    marque: "Volkswagen",
    modele: "Crafter 50",
    capacite: 25,
    annee: 2020,
    statut: "Maintenance",
    kilometrage: 89000,
    dateAchat: "2020-09-05",
    prochaineMaintenance: "2024-12-15"
  }
];

// Données simulées pour les plannings
export const mockPlannings: PlanningData[] = [
  {
    id: "1",
    ligneId: "1",
    ligne: { id: "1", nom: "Ligne A", numero: "L01" },
    busId: "1",
    bus: mockBus[0],
    chauffeurId: "1",
    chauffeur: mockChauffeurs[0],
    horaires: [
      { id: "h1", heureDepart: "06:00", heureArrivee: "06:45", type: "Aller" },
      { id: "h2", heureDepart: "07:00", heureArrivee: "07:45", type: "Retour" },
      { id: "h3", heureDepart: "08:00", heureArrivee: "08:45", type: "Aller" },
      { id: "h4", heureDepart: "17:00", heureArrivee: "17:45", type: "Retour" }
    ],
    recurrence: {
      type: "Hebdomadaire",
      joursActifs: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
      dateDebut: "2024-12-01",
      dateFin: "2025-06-30"
    },
    statut: "Actif",
    commentaires: "Service régulier en semaine",
    dateCreation: "2024-11-15",
    dateMiseAJour: "2024-12-01"
  },
  {
    id: "2",
    ligneId: "2",
    ligne: { id: "2", nom: "Ligne B", numero: "L02" },
    busId: "2",
    bus: mockBus[1],
    chauffeurId: "2",
    chauffeur: mockChauffeurs[1],
    horaires: [
      { id: "h5", heureDepart: "05:30", heureArrivee: "06:05", type: "Aller" },
      { id: "h6", heureDepart: "06:30", heureArrivee: "07:05", type: "Retour" },
      { id: "h7", heureDepart: "18:00", heureArrivee: "18:35", type: "Aller" }
    ],
    recurrence: {
      type: "Quotidien",
      dateDebut: "2024-12-01",
      dateFin: "2025-03-31"
    },
    statut: "Actif",
    dateCreation: "2024-11-20",
    dateMiseAJour: "2024-11-25"
  },
  {
    id: "3",
    ligneId: "4",
    ligne: { id: "4", nom: "Ligne Express", numero: "L04" },
    busId: "3",
    bus: mockBus[2],
    chauffeurId: "3",
    chauffeur: mockChauffeurs[2],
    horaires: [
      { id: "h8", heureDepart: "07:30", heureArrivee: "08:35", type: "Aller" },
      { id: "h9", heureDepart: "16:30", heureArrivee: "17:35", type: "Retour" }
    ],
    recurrence: {
      type: "Hebdomadaire",
      joursActifs: ["Lundi", "Mercredi", "Vendredi"],
      dateDebut: "2024-12-15",
      dateFin: "2025-05-15"
    },
    statut: "Suspendu",
    commentaires: "Suspendu temporairement pour maintenance de la ligne",
    dateCreation: "2024-12-01",
    dateMiseAJour: "2024-12-10"
  }
];
