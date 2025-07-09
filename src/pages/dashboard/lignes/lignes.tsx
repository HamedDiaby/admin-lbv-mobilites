import { FC, useState, useMemo } from "react";
import { Table, TableColumn, TableAction } from "../../../components/table";
import { Text } from "../../../components/text";
import { Badge } from "../../../components/badge";
import { Button } from "../../../components/button";
import { Icon } from "../../../components/icon";
import { ColorsEnum } from "../../../utils/enums";
import { AddLigneModal } from "./AddLigneModal";
import { Ligne, Station, LigneFormData, Ville } from "./types";

// Données simulées pour les villes
const mockVilles: Ville[] = [
  { id: "1", nom: "Libreville" },
  { id: "2", nom: "Port-Gentil" },
  { id: "3", nom: "Franceville" },
  { id: "4", nom: "Oyem" },
  { id: "5", nom: "Moanda" }
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
    ville: "Libreville",
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
    statut: "active",
    dateCreation: "2024-01-15",
    dateMiseAJour: "2024-12-01"
  },
  {
    id: "2",
    nom: "Ligne B",
    ville: "Libreville",
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
    statut: "active",
    dateCreation: "2024-02-10",
    dateMiseAJour: "2024-11-15"
  },
  {
    id: "3",
    nom: "Ligne C",
    ville: "Libreville",
    stationDepart: { id: "1", nom: "Gare Routière" },
    stationArrivee: { id: "8", nom: "Centre Commercial" },
    distanceTotale: 8.2,
    tempsTotal: 25,
    stationsIntermediaires: [],
    statut: "maintenance",
    dateCreation: "2024-03-05",
    dateMiseAJour: "2024-12-07"
  }
];

export const Lignes: FC = () => {
  const [lignes, setLignes] = useState<Ligne[]>(mockLignes);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLigne, setEditingLigne] = useState<Ligne | null>(null);

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
              {record.ville}
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
            <Icon name="Circle" size={8} color={ColorsEnum.ERROR} />
            <Text variant="p4" className="font-medium">
              {record.stationArrivee.nom}
            </Text>
          </div>
        </div>
      )
    },
    {
      key: "distance",
      title: "Distance & Temps",
      render: (_, record) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={14} color={ColorsEnum.TEXT_SECONDARY} />
            <Text variant="p4" className="font-medium">
              {record.distanceTotale} km
            </Text>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} color={ColorsEnum.TEXT_SECONDARY} />
            <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
              {record.tempsTotal} min
            </Text>
          </div>
        </div>
      ),
      align: "center",
      sortable: true
    },
    {
      key: "stationsCount",
      title: "Stations",
      render: (_, record) => (
        <div className="text-center">
          <Badge
            variant="outline"
            color={ColorsEnum.PRIMARY}
            size="sm"
          >
            {`${record.stationsIntermediaires.length + 2} stations`}
          </Badge>
        </div>
      ),
      align: "center"
    },
    {
      key: "statut",
      title: "Statut",
      render: (value) => {
        const getBadgeProps = (statut: string) => {
          switch (statut) {
            case "active":
              return {
                children: "Active",
                color: ColorsEnum.SUCCESS,
                variant: "solid" as const
              };
            case "inactive":
              return {
                children: "Inactive",
                color: ColorsEnum.WARNING,
                variant: "solid" as const
              };
            case "maintenance":
              return {
                children: "Maintenance",
                color: ColorsEnum.ERROR,
                variant: "solid" as const
              };
            default:
              return {
                children: statut,
                color: ColorsEnum.TEXT_SECONDARY,
                variant: "outline" as const
              };
          }
        };

        const badgeProps = getBadgeProps(value);
        
        return (
          <Badge
            {...badgeProps}
            size="sm"
          />
        );
      },
      align: "center",
      sortable: true
    },
    {
      key: "dateMiseAJour",
      title: "Dernière MAJ",
      render: (value) => (
        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
          {new Date(value).toLocaleDateString('fr-FR')}
        </Text>
      ),
      sortable: true
    }
  ];

  // Actions sur les lignes
  const actions: TableAction<Ligne>[] = [
    {
      label: "Voir détails",
      icon: "Eye",
      onClick: (ligne) => {
        console.log("Voir détails ligne:", ligne);
        // Logique pour afficher les détails
      },
      type: "default"
    },
    {
      label: "Modifier",
      icon: "Edit2",
      onClick: (ligne) => {
        setEditingLigne(ligne);
        setIsAddModalOpen(true);
      },
      type: "primary"
    },
    {
      label: "Activer/Désactiver",
      icon: "Power",
      onClick: (ligne: Ligne) => {
        setLignes(prev => prev.map(l => 
          l.id === ligne.id 
            ? { ...l, statut: l.statut === 'active' ? 'inactive' : 'active' }
            : l
        ));
      },
      type: "warning"
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
    
    if (!stationDepart || !stationArrivee) {
      throw new Error("Stations non trouvées");
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
              ville: data.ville,
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
        ville: data.ville,
        stationDepart: { id: stationDepart.id, nom: stationDepart.nom },
        stationArrivee: { id: stationArrivee.id, nom: stationArrivee.nom },
        stationsIntermediaires: data.stationsIntermediaires.map((si, index) => ({
          id: `si_${Date.now()}_${index}`,
          ...si
        })),
        distanceTotale,
        tempsTotal,
        statut: "active",
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
    const lignesActives = lignes.filter(l => l.statut === 'active').length;
    const lignesInactives = lignes.filter(l => l.statut === 'inactive').length;
    const lignesMaintenance = lignes.filter(l => l.statut === 'maintenance').length;
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
                  Actives
                </Text>
                <Text variant="h3" className="font-bold text-success">
                  {stats.lignesActives}
                </Text>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Icon name="PauseCircle" size={20} color={ColorsEnum.WARNING} />
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                  Inactives
                </Text>
                <Text variant="h3" className="font-bold text-warning">
                  {stats.lignesInactives}
                </Text>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-error/10 rounded-lg">
                <Icon name="AlertTriangle" size={20} color={ColorsEnum.ERROR} />
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                  Maintenance
                </Text>
                <Text variant="h3" className="font-bold text-error">
                  {stats.lignesMaintenance}
                </Text>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="MapPin" size={20} color={ColorsEnum.PRIMARY} />
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

      {/* Tableau des lignes */}
      <Table
        title="Liste des lignes"
        dataSource={lignes}
        columns={columns}
        actions={actions}
        onAdd={() => setIsAddModalOpen(true)}
        addButtonText="Nouvelle ligne"
        pagination
        pageSize={10}
        striped
        searchable
        searchPlaceholder="Rechercher une ligne..."
      />

      {/* Modal d'ajout/modification */}
      <AddLigneModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddLigne}
        stations={mockStations}
        villes={mockVilles}
        editingLigne={editingLigne}
      />
    </div>
  );
};
