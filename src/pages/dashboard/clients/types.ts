// Interface pour les clients
export interface Client {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  dateNaissance?: string;
  adresse?: string;
  ville?: string;
  photoProfile?: string;
  statut: 'Actif' | 'Inactif' | 'Suspendu';
  dateInscription: string;
  derniereMiseAJour: string;
  qrCodeId: string; // Identifiant unique pour le QR code
}

// Interface pour les types d'abonnements
export interface TypeAbonnement {
  id: string;
  nom: string;
  description: string;
  duree: number; // en jours
  prix: number; // en FCFA
  nbVoyagesMax?: number; // undefined = illimité
  lignesIncluses?: string[]; // IDs des lignes, undefined = toutes
  avantages: string[];
  couleur: string; // pour l'affichage
  actif: boolean;
}

// Interface pour les abonnements des clients
export interface Abonnement {
  id: string;
  clientId: string;
  client: Client;
  typeAbonnementId: string;
  typeAbonnement: TypeAbonnement;
  dateDebut: string;
  dateFin: string;
  statut: 'Actif' | 'Expiré' | 'Suspendu' | 'Annulé';
  nbVoyagesUtilises: number;
  nbVoyagesRestants?: number; // calculé
  qrCode: string; // données du QR code
  historiquePaiements: PaiementAbonnement[];
  dateCreation: string;
  dateMiseAJour: string;
}

// Interface pour les paiements
export interface PaiementAbonnement {
  id: string;
  abonnementId: string;
  montant: number;
  methodePaiement: 'Espèces' | 'Carte bancaire' | 'Mobile Money' | 'Virement';
  statutPaiement: 'En attente' | 'Validé' | 'Échoué' | 'Remboursé';
  referencePaiement?: string;
  datePaiement: string;
  operateur?: string; // pour Mobile Money
}

// Interface pour l'historique des voyages
export interface HistoriqueVoyage {
  id: string;
  clientId: string;
  abonnementId: string;
  ligneId: string;
  ligne: {
    id: string;
    nom: string;
    numero: string;
  };
  stationDepart: string;
  stationArrivee: string;
  dateHeure: string;
  busId: string;
  chauffeurId: string;
  prix: number;
  statutValidation: 'Validé' | 'Refusé' | 'En attente';
  methodeScan: 'QR Code' | 'Manuel' | 'NFC';
}

// Interface pour les formulaires
export interface ClientFormData {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  dateNaissance?: string;
  adresse?: string;
  ville?: string;
}

export interface AbonnementFormData {
  clientId: string;
  typeAbonnementId: string;
  dateDebut: string;
  methodePaiement: string;
  montantPaye: number;
  referencePaiement?: string;
}

// Interface pour les filtres
export interface FiltresClients {
  nom?: string;
  statut?: string;
  ville?: string;
  typeAbonnement?: string;
  dateInscriptionDebut?: string;
  dateInscriptionFin?: string;
}

export interface FiltresAbonnements {
  clientId?: string;
  typeAbonnementId?: string;
  statut?: string;
  dateDebutDebut?: string;
  dateDebutFin?: string;
  expireSous?: number; // nombre de jours
}

// Interface pour les statistiques
export interface StatistiquesClients {
  totalClients: number;
  clientsActifs: number;
  clientsInactifs: number;
  nouveauxClientsMois: number;
  abonnementsActifs: number;
  abonnementsExpires: number;
  chiffreAffairesMois: number;
  voyagesMois: number;
}

// Interface pour la vérification QR
export interface VerificationQRData {
  qrCode: string;
  ligneId?: string;
  stationDepart?: string;
  stationArrivee?: string;
}

export interface VerificationQRResult {
  valide: boolean;
  client?: Client;
  abonnement?: Abonnement;
  message: string;
  erreurs?: string[];
  voyageAutorise?: boolean;
  informationsVoyage?: {
    nbVoyagesRestants?: number;
    lignesAutorisees?: string[];
    dateExpiration: string;
  };
}
