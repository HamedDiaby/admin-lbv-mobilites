import { FC, useState, useMemo } from "react";
import { Table, TableColumn, TableAction } from "../../../components/table";
import { Text } from "../../../components/text";
import { Badge } from "../../../components/badge";
import { Button } from "../../../components/button";
import { Icon } from "../../../components/icon";
import { ColorsEnum } from "../../../utils/enums";
import { AddLigneModal } from "./AddLigneModal";
import { Ligne, Station, LigneFormData, Ville } from "./types";
import LignesMap from "./LignesMap";

// Données simulées pour les villes
const mockVilles: Ville[] = [
  { id: "1", nom: "Libreville", coordonnees: { lat: 0.4162, lng: 9.4673 } },
  { id: "2", nom: "Port-Gentil", coordonnees: { lat: -0.7193, lng: 8.7815 } },
  { id: "3", nom: "Franceville", coordonnees: { lat: -1.6333, lng: 13.5833 } },
  { id: "4", nom: "Oyem", coordonnees: { lat: 1.5993, lng: 11.5804 } },
  { id: "5", nom: "Moanda", coordonnees: { lat: -1.5667, lng: 13.2167 } }
];

// Données simulées pour les stations
const mockStations: Station[] = [
  { id: "1", nom: "Gare Routière", ville: "Libreville", adresse: "Centre-ville" },
  { id: "2", nom: "Aéroport", ville: "Libreville", adresse: "Aéroport Léon M'ba" },
  { id: "3", nom: "Université", ville: "Libreville", adresse: "Campus universitaire" },
  { id: "4", nom: "Marché du Mont-Bouët", ville: "Libreville", adresse: "Mont-Bouët" },
  { id: "5", nom: "Hôpital Central", ville: "Libreville", adresse: "Centre hospitalier" },
  { id: "6", nom: "Port Autonome", ville: "Libreville", adresse: "Zone portuaire" },
  { id: "7", nom: "Stade Omar Bongo", ville: "Libreville", adresse: "Zone sportive" },
  { id: "8", nom: "Centre Commercial", ville: "Libreville", adresse: "Quartier Glass" }
];

// Données simulées pour les lignes
const mockLignes: Ligne[] = [
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
        distanceDepuisStation: 4.1,
        tempsDepuisStation: 12
      }
    ],
    statut: "Active",
    dateCreation: "2024-01-15",
    dateMiseAJour: "2024-12-01"
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
        id: "si3",
        stationId: "7",
        nomStation: "Stade Omar Bongo",
        ordre: 1,
        distanceDepuisStation: 5.5,
        tempsDepuisStation: 15
      }
    ],
    statut: "Active",
    dateCreation: "2024-02-10",
    dateMiseAJour: "2024-11-15"
  },
  {
    id: "3",
    nom: "Ligne C",
    numero: "L03",
    ville: { id: "1", nom: "Libreville" },
    stationDepart: { id: "1", nom: "Gare Routière" },
    stationArrivee: { id: "8", nom: "Centre Commercial" },
    distanceTotale: 8.2,
    tempsTotal: 25,
    stationsIntermediaires: [],
    statut: "Maintenance",
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
        id: "si4",
        stationId: "3",
        nomStation: "Université",
        ordre: 1,
        distanceDepuisStation: 4.5,
        tempsDepuisStation: 12
      },
      {
        id: "si5",
        stationId: "4",
        nomStation: "Marché du Mont-Bouët",
        ordre: 2,
        distanceDepuisStation: 3.8,
        tempsDepuisStation: 10
      },
      {
        id: "si6",
        stationId: "5",
        nomStation: "Hôpital Central",
        ordre: 3,
        distanceDepuisStation: 2.9,
        tempsDepuisStation: 8
      },
      {
        id: "si7",
        stationId: "6",
        nomStation: "Port Autonome",
        ordre: 4,
        distanceDepuisStation: 5.2,
        tempsDepuisStation: 15
      },
      {
        id: "si8",
        stationId: "7",
        nomStation: "Stade Omar Bongo",
        ordre: 5,
        distanceDepuisStation: 6.1,
        tempsDepuisStation: 20
      }
    ],
    statut: "Active",
    dateCreation: "2024-04-12",
    dateMiseAJour: "2024-12-08"
  },
  {
    id: "5",
    nom: "Ligne Rapide",
    numero: "L05",
    ville: { id: "2", nom: "Port-Gentil" },
    stationDepart: { id: "1", nom: "Centre-ville PG" },
    stationArrivee: { id: "2", nom: "Zone Industrielle" },
    distanceTotale: 18.7,
    tempsTotal: 50,
    stationsIntermediaires: [
      {
        id: "si9",
        stationId: "3",
        nomStation: "Marché Central PG",
        ordre: 1,
        distanceDepuisStation: 6.2,
        tempsDepuisStation: 18
      },
      {
        id: "si10",
        stationId: "4",
        nomStation: "Hôpital de Port-Gentil",
        ordre: 2,
        distanceDepuisStation: 4.8,
        tempsDepuisStation: 14
      },
      {
        id: "si11",
        stationId: "5",
        nomStation: "Port Pétrolier",
        ordre: 3,
        distanceDepuisStation: 7.7,
        tempsDepuisStation: 18
      }
    ],
    statut: "Inactive",
    dateCreation: "2024-05-20",
    dateMiseAJour: "2024-11-30"
  }
];

export const Lignes: FC = () => {
  const [lignes, setLignes] = useState<Ligne[]>(mockLignes);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLigne, setEditingLigne] = useState<Ligne | null>(null);
  const [currentView, setCurrentView] = useState<'table' | 'map'>('table');

  // Colonnes du tableau
  const columns: TableColumn<Ligne>[] = [
    {
      key: "nom",
      title: "Ligne",
      render: (value, record) => (
        <div className="flex items-center space-x-2">
          <Icon name="Route" size={18} color={ColorsEnum.PRIMARY} />
          <div>
            <Text variant="p3" className="font-medium">
              {value}
            </Text>
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              {record.ville.nom}
            </Text>
          </div>
        </div>
      ),
      sortable: true
    },
    {
      key: "trajet",
      title: "Trajet",
      render: (_, record) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Icon name="Circle" size={8} color={ColorsEnum.SUCCESS} />
            <Text variant="p4" className="font-medium">
              {record.stationDepart.nom}
            </Text>
          </div>
          
          {record.stationsIntermediaires.length > 0 && (
            <div className="ml-2 space-y-1">
              {record.stationsIntermediaires.map((station) => (
                <div key={station.id} className="flex items-center space-x-2">
                  <div className="w-1 h-4 border-l border-border ml-1"></div>
                  <Icon name="Circle" size={6} color={ColorsEnum.TEXT_SECONDARY} />
                  <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
                    {station.nomStation}
                  </Text>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Icon name="Square" size={8} color={ColorsEnum.ERROR} />
            <Text variant="p4" className="font-medium">
              {record.stationArrivee.nom}
            </Text>
          </div>
        </div>
      )
    },
    {
      key: "distanceTotale",
      title: "Distance",
      render: (value) => (
        <div className="text-center">
          <Text variant="p3" className="font-medium">
            {value} km
          </Text>
        </div>
      ),
      sortable: true
    },
    {
      key: "tempsTotal",
      title: "Temps",
      render: (value) => (
        <div className="text-center">
          <Text variant="p3" className="font-medium">
            {value} min
          </Text>
        </div>
      ),
      sortable: true
    },
    {
      key: "statut",
      title: "Statut",
      render: (value) => {
        const getStatutColor = (statut: string) => {
          switch (statut) {
            case 'Active':
              return ColorsEnum.SUCCESS;
            case 'Inactive':
              return ColorsEnum.WARNING;
            case 'Maintenance':
              return ColorsEnum.ERROR;
            default:
              return ColorsEnum.TEXT_SECONDARY;
          }
        };

        return (
          <Badge
            variant="outline"
            color={getStatutColor(value)}
            className="capitalize"
          >
            {value}
          </Badge>
        );
      },
      sortable: true
    },
    {
      key: "dateCreation",
      title: "Créée le",
      render: (value) => (
        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
          {new Date(value).toLocaleDateString('fr-FR')}
        </Text>
      ),
      sortable: true
    }
  ];

  // Actions du tableau
  const actions: TableAction<Ligne>[] = [
    {
      label: "Modifier",
      icon: "Edit",
      onClick: (ligne) => {
        setEditingLigne(ligne);
        setIsAddModalOpen(true);
      }
    },
    {
      label: "Basculer statut",
      icon: "Pause" as const,
      onClick: (ligne) => {
        setLignes(prev => prev.map(l => 
          l.id === ligne.id 
            ? { ...l, statut: l.statut === 'Active' ? 'Inactive' : 'Active' }
            : l
        ));
      }
    },
    {
      label: "Supprimer",
      icon: "Trash2",
      onClick: (ligne) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer la ligne "${ligne.nom}" ?`)) {
          setLignes(prev => prev.filter(l => l.id !== ligne.id));
        }
      },
      type: "danger"
    }
  ];

  // Gestion de l'ajout/modification
  const handleAddLigne = async (data: LigneFormData) => {
    const stationDepart = mockStations.find(s => s.id === data.stationDepartId);
    const stationArrivee = mockStations.find(s => s.id === data.stationArriveeId);
    const villeObj = mockVilles.find(v => v.id === data.ville);
    
    if (!stationDepart || !stationArrivee || !villeObj) {
      throw new Error("Stations ou ville non trouvées");
    }

    // Calculer la distance et le temps total
    const distanceTotale = data.stationsIntermediaires.length > 0
      ? data.stationsIntermediaires.reduce((sum, s) => sum + s.distanceDepuisStation, 0)
      : 10; // Distance par défaut s'il n'y a pas d'intermédiaires

    const tempsTotal = data.stationsIntermediaires.length > 0
      ? data.stationsIntermediaires.reduce((sum, s) => sum + s.tempsDepuisStation, 0)
      : 30; // Temps par défaut

    if (editingLigne) {
      // Modification
      setLignes(prev => prev.map(ligne => 
        ligne.id === editingLigne.id
          ? {
              ...ligne,
              nom: data.nom,
              ville: villeObj,
              stationDepart: { id: stationDepart.id, nom: stationDepart.nom },
              stationArrivee: { id: stationArrivee.id, nom: stationArrivee.nom },
              stationsIntermediaires: data.stationsIntermediaires.map((si, index) => ({
                id: `si_${editingLigne.id}_${index}`,
                ...si
              })),
              distanceTotale,
              tempsTotal,
              dateMiseAJour: new Date().toISOString().split('T')[0]
            }
          : ligne
      ));
    } else {
      // Ajout
      const newLigne: Ligne = {
        id: `ligne_${Date.now()}`,
        nom: data.nom,
        numero: `L${String(lignes.length + 1).padStart(2, '0')}`,
        ville: villeObj,
        stationDepart: { id: stationDepart.id, nom: stationDepart.nom },
        stationArrivee: { id: stationArrivee.id, nom: stationArrivee.nom },
        stationsIntermediaires: data.stationsIntermediaires.map((si, index) => ({
          id: `si_${Date.now()}_${index}`,
          ...si
        })),
        distanceTotale,
        tempsTotal,
        statut: "Active",
        dateCreation: new Date().toISOString().split('T')[0],
        dateMiseAJour: new Date().toISOString().split('T')[0]
      };

      setLignes(prev => [...prev, newLigne]);
    }

    setEditingLigne(null);
  };

  // Fermeture du modal
  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingLigne(null);
  };

  // Statistiques rapides
  const stats = useMemo(() => {
    const totalLignes = lignes.length;
    const lignesActives = lignes.filter(l => l.statut === 'Active').length;
    const lignesInactives = lignes.filter(l => l.statut === 'Inactive').length;
    const lignesMaintenance = lignes.filter(l => l.statut === 'Maintenance').length;
    const distanceTotale = lignes.reduce((sum, l) => sum + l.distanceTotale, 0);

    return {
      totalLignes,
      lignesActives,
      lignesInactives,
      lignesMaintenance,
      distanceTotale: Math.round(distanceTotale * 10) / 10
    };
  }, [lignes]);

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Text variant="h1" className="font-bold text-text-primary">
              Gestion des Lignes de Transport
            </Text>
            <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY} className="mt-1">
              Gérez les lignes de transport, stations et itinéraires
            </Text>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Route" size={20} color={ColorsEnum.PRIMARY} />
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                  Total lignes
                </Text>
                <Text variant="h3" className="font-bold">
                  {stats.totalLignes}
                </Text>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Icon name="CheckCircle" size={20} color={ColorsEnum.SUCCESS} />
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                  Lignes actives
                </Text>
                <Text variant="h3" className="font-bold">
                  {stats.lignesActives}
                </Text>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Icon name="Pause" size={20} color={ColorsEnum.WARNING} />
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                  Lignes inactives
                </Text>
                <Text variant="h3" className="font-bold">
                  {stats.lignesInactives}
                </Text>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-danger/10 rounded-lg">
                <Icon name="AlertTriangle" size={20} color={ColorsEnum.ERROR} />
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                  En maintenance
                </Text>
                <Text variant="h3" className="font-bold">
                  {stats.lignesMaintenance}
                </Text>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-info/10 rounded-lg">
                <Icon name="MapPin" size={20} color={ColorsEnum.INFO} />
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                  Distance totale
                </Text>
                <Text variant="h3" className="font-bold">
                  {stats.distanceTotale} km
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contrôles de vue et actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            appearance={currentView === 'table' ? 'solid' : 'outline'}
            variation={currentView === 'table' ? 'primary' : 'primary'}
            size="sm"
            onClick={() => setCurrentView('table')}
            className="flex items-center space-x-2"
          >
            <Icon name="List" size={16} />
            <span>Liste</span>
          </Button>
          <Button
            appearance={currentView === 'map' ? 'solid' : 'outline'}
            variation={currentView === 'map' ? 'primary' : 'primary'}
            size="sm"
            onClick={() => setCurrentView('map')}
            className="flex items-center space-x-2"
          >
            <Icon name="Map" size={16} />
            <span>Carte</span>
          </Button>
        </div>

        <Button
          appearance="solid"
          variation="primary"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2"
        >
          <Icon name="Plus" size={16} />
          <span>Ajouter une ligne</span>
        </Button>
      </div>

      {/* Contenu principal */}
      {currentView === 'table' ? (
        <div className="bg-white border border-border rounded-lg">
          <Table
            columns={columns}
            dataSource={lignes}
            actions={actions}
            emptyText="Aucune ligne trouvée"
          />
        </div>
      ) : (
        <div className="bg-white border border-border rounded-lg p-4">
          <LignesMap lignes={lignes} />
        </div>
      )}

      {/* Modal d'ajout/modification */}
      <AddLigneModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddLigne}
        editingLigne={editingLigne}
        stations={mockStations}
        villes={mockVilles}
      />
    </div>
  );
};
