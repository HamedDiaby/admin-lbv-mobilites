import { TypeAbonnement, Client, Abonnement } from "../types";

// Données simulées pour les types d'abonnements
export const mockTypesAbonnements: TypeAbonnement[] = [
  {
    id: "1",
    nom: "Étudiant",
    description: "Tarif préférentiel pour les étudiants",
    duree: 30,
    prix: 15000,
    nbVoyagesMax: 60,
    avantages: ["50% de réduction", "Valide sur toutes les lignes", "Transfert gratuit"],
    couleur: "#3B82F6",
    actif: true
  },
  {
    id: "2",
    nom: "Mensuel Standard",
    description: "Abonnement mensuel tout public",
    duree: 30,
    prix: 25000,
    nbVoyagesMax: undefined,
    avantages: ["Voyages illimités", "Toutes lignes incluses", "Priorité embarquement"],
    couleur: "#10B981",
    actif: true
  },
  {
    id: "3",
    nom: "Hebdomadaire",
    description: "Abonnement pour une semaine",
    duree: 7,
    prix: 8000,
    nbVoyagesMax: 14,
    avantages: ["Pratique pour visiteurs", "Activable immédiatement"],
    couleur: "#F59E0B",
    actif: true
  },
  {
    id: "4",
    nom: "Premium Annuel",
    description: "Abonnement annuel avec avantages premium",
    duree: 365,
    prix: 250000,
    nbVoyagesMax: undefined,
    avantages: ["Voyages illimités", "Support prioritaire", "Wi-Fi gratuit", "Places réservées"],
    couleur: "#8B5CF6",
    actif: true
  }
];

// Données simulées pour les clients
export const mockClients: Client[] = [
  {
    id: "1",
    nom: "Mbadinga",
    prenom: "Audrey",
    telephone: "+241 06 12 34 56",
    email: "audrey.mbadinga@email.ga",
    dateNaissance: "1995-03-15",
    adresse: "Quartier Glass, Libreville",
    ville: "Libreville",
    statut: "Actif",
    dateInscription: "2024-01-15",
    derniereMiseAJour: "2024-12-01",
    qrCodeId: "QR_CLIENT_001"
  },
  {
    id: "2",
    nom: "Ondo Meyo",
    prenom: "Kevin",
    telephone: "+241 06 98 76 54",
    email: "kevin.ondo@email.ga",
    dateNaissance: "1998-11-22",
    adresse: "Akanda, Libreville",
    ville: "Libreville",
    statut: "Actif",
    dateInscription: "2024-02-10",
    derniereMiseAJour: "2024-11-28",
    qrCodeId: "QR_CLIENT_002"
  },
  {
    id: "3",
    nom: "Nze Bekale",
    prenom: "Sarah",
    telephone: "+241 06 55 44 33",
    email: "sarah.nze@email.ga",
    dateNaissance: "2001-07-08",
    adresse: "Université Omar Bongo, Libreville",
    ville: "Libreville",
    statut: "Actif",
    dateInscription: "2024-09-01",
    derniereMiseAJour: "2024-12-05",
    qrCodeId: "QR_CLIENT_003"
  },
  {
    id: "4",
    nom: "Obame Nguema",
    prenom: "Michel",
    telephone: "+241 06 77 88 99",
    email: "michel.obame@email.ga",
    dateNaissance: "1987-12-03",
    adresse: "Owendo, Libreville",
    ville: "Libreville",
    statut: "Suspendu",
    dateInscription: "2023-11-20",
    derniereMiseAJour: "2024-11-30",
    qrCodeId: "QR_CLIENT_004"
  },
  {
    id: "5",
    nom: "Koumba Diaby",
    prenom: "Fatou",
    telephone: "+241 06 11 22 33",
    email: "fatou.koumba@email.ga",
    dateNaissance: "1992-05-17",
    adresse: "Port-Gentil Centre",
    ville: "Port-Gentil",
    statut: "Actif",
    dateInscription: "2024-06-12",
    derniereMiseAJour: "2024-12-02",
    qrCodeId: "QR_CLIENT_005"
  }
];

// Données simulées pour les abonnements
export const mockAbonnements: Abonnement[] = [
  {
    id: "1",
    clientId: "1",
    client: mockClients[0],
    typeAbonnementId: "2",
    typeAbonnement: mockTypesAbonnements[1],
    dateDebut: "2024-12-01",
    dateFin: "2024-12-31",
    statut: "Actif",
    nbVoyagesUtilises: 23,
    qrCode: "QR_ABO_001_DEC2024",
    historiquePaiements: [],
    dateCreation: "2024-12-01",
    dateMiseAJour: "2024-12-08"
  },
  {
    id: "2",
    clientId: "2",
    client: mockClients[1],
    typeAbonnementId: "1",
    typeAbonnement: mockTypesAbonnements[0],
    dateDebut: "2024-12-01",
    dateFin: "2024-12-31",
    statut: "Actif",
    nbVoyagesUtilises: 15,
    nbVoyagesRestants: 45,
    qrCode: "QR_ABO_002_DEC2024",
    historiquePaiements: [],
    dateCreation: "2024-12-01",
    dateMiseAJour: "2024-12-05"
  },
  {
    id: "3",
    clientId: "3",
    client: mockClients[2],
    typeAbonnementId: "1",
    typeAbonnement: mockTypesAbonnements[0],
    dateDebut: "2024-12-05",
    dateFin: "2025-01-04",
    statut: "Actif",
    nbVoyagesUtilises: 8,
    nbVoyagesRestants: 52,
    qrCode: "QR_ABO_003_DEC2024",
    historiquePaiements: [],
    dateCreation: "2024-12-05",
    dateMiseAJour: "2024-12-08"
  }
];
