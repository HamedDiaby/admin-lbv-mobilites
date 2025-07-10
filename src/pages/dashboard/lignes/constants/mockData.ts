import { Ligne, Station, Ville } from '../types';

// Données simulées pour les villes
export const mockVilles: Ville[] = [
  { id: "1", nom: "Libreville", coordonnees: { lat: 0.4162, lng: 9.4673 } },
  { id: "2", nom: "Port-Gentil", coordonnees: { lat: -0.7193, lng: 8.7815 } },
  { id: "3", nom: "Franceville", coordonnees: { lat: -1.6333, lng: 13.5833 } },
  { id: "4", nom: "Oyem", coordonnees: { lat: 1.5993, lng: 11.5804 } },
  { id: "5", nom: "Moanda", coordonnees: { lat: -1.5667, lng: 13.2167 } }
];

// Données simulées pour les stations
export const mockStations: Station[] = [
  { id: "1", nom: "Gare Routière", ville: "Libreville", adresse: "Centre-ville" },
  { id: "2", nom: "Aéroport", ville: "Libreville", adresse: "Aéroport Léon M'ba" },
  { id: "3", nom: "Université", ville: "Libreville", adresse: "Campus universitaire" },
  { id: "4", nom: "Marché du Mont-Bouët", ville: "Libreville", adresse: "Mont-Bouët" },
  { id: "5", nom: "Hôpital Central", ville: "Libreville", adresse: "Centre hospitalier" },
  { id: "6", nom: "Port Autonome", ville: "Libreville", adresse: "Zone portuaire" },
  { id: "7", nom: "Stade Omar Bongo", ville: "Libreville", adresse: "Zone sportive" },
  { id: "8", nom: "Centre Commercial", ville: "Libreville", adresse: "Quartier Glass" },
  
  // Stations Port-Gentil
  { id: "9", nom: "Gare Port-Gentil", ville: "Port-Gentil", adresse: "Centre-ville" },
  { id: "10", nom: "Zone Industrielle", ville: "Port-Gentil", adresse: "Zone industrielle" },
  { id: "11", nom: "Hôpital Provincial", ville: "Port-Gentil", adresse: "Centre médical" },
  
  // Stations autres villes
  { id: "12", nom: "Gare Franceville", ville: "Franceville", adresse: "Centre-ville" },
  { id: "13", nom: "Gare Oyem", ville: "Oyem", adresse: "Centre-ville" },
  { id: "14", nom: "Gare Moanda", ville: "Moanda", adresse: "Centre-ville" }
];

// Génération de données mockées pour les lignes
export const generateMockLignes = (): Ligne[] => {
  const lignes: Ligne[] = [
    {
      id: "1",
      nom: "Ligne A",
      numero: "L01",
      ville: { id: "1", nom: "Libreville" },
      stationDepart: { id: "1", nom: "Gare Routière" },
      stationArrivee: { id: "2", nom: "Aéroport" },
      distanceTotale: 15.5,
      tempsTotal: 45,
      stationsIntermediaires: [
        {
          id: "si1",
          stationId: "4",
          nomStation: "Marché du Mont-Bouët",
          ordre: 1,
          distanceDepuisStation: 3.2,
          tempsDepuisStation: 8
        },
        {
          id: "si2",
          stationId: "5",
          nomStation: "Hôpital Central",
          ordre: 2,
          distanceDepuisStation: 4.8,
          tempsDepuisStation: 12
        },
        {
          id: "si3",
          stationId: "3",
          nomStation: "Université",
          ordre: 3,
          distanceDepuisStation: 7.5,
          tempsDepuisStation: 18
        }
      ],
      statut: 'Active',
      dateCreation: "2024-01-15",
      dateMiseAJour: "2024-12-07"
    },
    {
      id: "2",
      nom: "Ligne B",
      numero: "L02",
      ville: { id: "1", nom: "Libreville" },
      stationDepart: { id: "3", nom: "Université" },
      stationArrivee: { id: "6", nom: "Port Autonome" },
      distanceTotale: 12.8,
      tempsTotal: 35,
      stationsIntermediaires: [
        {
          id: "si4",
          stationId: "4",
          nomStation: "Marché du Mont-Bouët",
          ordre: 1,
          distanceDepuisStation: 5.2,
          tempsDepuisStation: 15
        },
        {
          id: "si5",
          stationId: "8",
          nomStation: "Centre Commercial",
          ordre: 2,
          distanceDepuisStation: 7.6,
          tempsDepuisStation: 20
        }
      ],
      statut: 'Active',
      dateCreation: "2024-02-10",
      dateMiseAJour: "2024-11-20"
    },
    {
      id: "3",
      nom: "Ligne C",
      numero: "L03",
      ville: { id: "1", nom: "Libreville" },
      stationDepart: { id: "7", nom: "Stade Omar Bongo" },
      stationArrivee: { id: "5", nom: "Hôpital Central" },
      distanceTotale: 8.2,
      tempsTotal: 25,
      stationsIntermediaires: [
        {
          id: "si6",
          stationId: "8",
          nomStation: "Centre Commercial",
          ordre: 1,
          distanceDepuisStation: 4.1,
          tempsDepuisStation: 12
        }
      ],
      statut: 'Maintenance',
      dateCreation: "2024-03-05",
      dateMiseAJour: "2024-12-07"
    },
    {
      id: "4",
      nom: "Ligne Express",
      numero: "L04",
      ville: { id: "1", nom: "Libreville" },
      stationDepart: { id: "1", nom: "Gare Routière" },
      stationArrivee: { id: "2", nom: "Aéroport" },
      distanceTotale: 22.5,
      tempsTotal: 65,
      stationsIntermediaires: [
        {
          id: "si7",
          stationId: "3",
          nomStation: "Université",
          ordre: 1,
          distanceDepuisStation: 4.5,
          tempsDepuisStation: 12
        },
        {
          id: "si8",
          stationId: "4",
          nomStation: "Marché du Mont-Bouët",
          ordre: 2,
          distanceDepuisStation: 3.8,
          tempsDepuisStation: 10
        },
        {
          id: "si9",
          stationId: "5",
          nomStation: "Hôpital Central",
          ordre: 3,
          distanceDepuisStation: 2.9,
          tempsDepuisStation: 8
        },
        {
          id: "si10",
          stationId: "6",
          nomStation: "Port Autonome",
          ordre: 4,
          distanceDepuisStation: 5.2,
          tempsDepuisStation: 15
        },
        {
          id: "si11",
          stationId: "7",
          nomStation: "Stade Omar Bongo",
          ordre: 5,
          distanceDepuisStation: 6.1,
          tempsDepuisStation: 20
        }
      ],
      statut: 'Active',
      dateCreation: "2024-04-12",
      dateMiseAJour: "2024-12-01"
    },
    {
      id: "5",
      nom: "Ligne Port-Gentil A",
      numero: "PG01",
      ville: { id: "2", nom: "Port-Gentil" },
      stationDepart: { id: "9", nom: "Gare Port-Gentil" },
      stationArrivee: { id: "10", nom: "Zone Industrielle" },
      distanceTotale: 18.7,
      tempsTotal: 40,
      stationsIntermediaires: [
        {
          id: "si12",
          stationId: "11",
          nomStation: "Hôpital Provincial",
          ordre: 1,
          distanceDepuisStation: 9.2,
          tempsDepuisStation: 20
        }
      ],
      statut: 'Active',
      dateCreation: "2024-05-20",
      dateMiseAJour: "2024-11-15"
    },
    {
      id: "6",
      nom: "Ligne Intercité LBV-PG",
      numero: "IC01",
      ville: { id: "1", nom: "Libreville" },
      stationDepart: { id: "1", nom: "Gare Routière" },
      stationArrivee: { id: "9", nom: "Gare Port-Gentil" },
      distanceTotale: 275.0,
      tempsTotal: 360,
      stationsIntermediaires: [],
      statut: 'Active',
      dateCreation: "2024-06-10",
      dateMiseAJour: "2024-12-05"
    },
    {
      id: "7",
      nom: "Ligne Franceville",
      numero: "FC01",
      ville: { id: "3", nom: "Franceville" },
      stationDepart: { id: "12", nom: "Gare Franceville" },
      stationArrivee: { id: "14", nom: "Gare Moanda" },
      distanceTotale: 85.0,
      tempsTotal: 120,
      stationsIntermediaires: [],
      statut: 'Inactive',
      dateCreation: "2024-07-15",
      dateMiseAJour: "2024-10-20"
    }
  ];

  return lignes;
};

// Options pour les filtres
export const FILTER_OPTIONS = {
  statuts: [
    { value: '', label: 'Tous les statuts' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Maintenance', label: 'En maintenance' }
  ],
  villes: [
    { value: '', label: 'Toutes les villes' },
    ...mockVilles.map(ville => ({
      value: ville.id,
      label: ville.nom
    }))
  ]
};

// Configuration des colonnes du tableau
export const LIGNE_TABLE_COLUMNS = [
  { key: 'numero', label: 'N° Ligne', sortable: true },
  { key: 'nom', label: 'Nom', sortable: true },
  { key: 'ville', label: 'Ville', sortable: true },
  { key: 'trajet', label: 'Trajet', sortable: false },
  { key: 'distance', label: 'Distance', sortable: true },
  { key: 'duree', label: 'Durée', sortable: true },
  { key: 'stations', label: 'Stations', sortable: true },
  { key: 'statut', label: 'Statut', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false }
];

// Couleurs selon le statut
export const STATUS_COLORS = {
  'Active': 'green',
  'Inactive': 'red',
  'Maintenance': 'orange'
} as const;
