import { FC, useState, useMemo } from "react";
import { Table, TableColumn, TableAction } from "../../../components/table";
import { Text } from "../../../components/text";
import { Badge } from "../../../components/badge";
import { Button } from "../../../components/button";
import { Icon } from "../../../components/icon";
import { ColorsEnum } from "../../../utils/enums";
import { PlanningData, Chauffeur, Bus, FiltresPlanning } from "./types";
import { AddPlanningModal } from "./AddPlanningModal";
import { PlanningCalendar } from "./PlanningCalendar";
import { PlanningDetailsModal } from "./PlanningDetailsModal";

// Données simulées pour les chauffeurs
const mockChauffeurs: Chauffeur[] = [
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
const mockBus: Bus[] = [
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
const mockPlannings: PlanningData[] = [
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

export const Planning: FC = () => {
  const [plannings, setPlannings] = useState<PlanningData[]>(mockPlannings);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPlanning, setEditingPlanning] = useState<PlanningData | null>(null);
  const [selectedPlanning, setSelectedPlanning] = useState<PlanningData | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'table' | 'calendar'>('table');
  const [filtres, setFiltres] = useState<FiltresPlanning>({});

  // Colonnes du tableau
  const columns: TableColumn<PlanningData>[] = [
    {
      key: "ligne",
      title: "Ligne",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Icon name="Route" size={18} color={ColorsEnum.PRIMARY} />
          <div>
            <Text variant="p3" className="font-medium">
              {record.ligne.numero}
            </Text>
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              {record.ligne.nom}
            </Text>
          </div>
        </div>
      ),
      sortable: true
    },
    {
      key: "bus",
      title: "Bus",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Icon name="Bus" size={18} color={ColorsEnum.INFO} />
          <div>
            <Text variant="p3" className="font-medium">
              {record.bus.numeroImmatriculation}
            </Text>
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              {record.bus.marque} {record.bus.modele}
            </Text>
          </div>
        </div>
      )
    },
    {
      key: "chauffeur",
      title: "Chauffeur",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Icon name="User" size={18} color={ColorsEnum.SUCCESS} />
          <div>
            <Text variant="p3" className="font-medium">
              {record.chauffeur.prenom} {record.chauffeur.nom}
            </Text>
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              {record.chauffeur.experience} ans d'exp.
            </Text>
          </div>
        </div>
      )
    },
    {
      key: "horaires",
      title: "Horaires",
      render: (_, record) => (
        <div className="space-y-1">
          {record.horaires.slice(0, 2).map((horaire) => (
            <div key={horaire.id} className="flex items-center space-x-2">
              <Icon 
                name={horaire.type === 'Aller' ? "ArrowRight" : "ArrowLeft"} 
                size={12} 
                color={horaire.type === 'Aller' ? ColorsEnum.SUCCESS : ColorsEnum.WARNING} 
              />
              <Text variant="p4">
                {horaire.heureDepart} - {horaire.heureArrivee}
              </Text>
            </div>
          ))}
          {record.horaires.length > 2 && (
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              +{record.horaires.length - 2} autres
            </Text>
          )}
        </div>
      )
    },
    {
      key: "recurrence",
      title: "Récurrence",
      render: (_, record) => (
        <div>
          <Text variant="p3" className="font-medium">
            {record.recurrence.type}
          </Text>
          {record.recurrence.joursActifs && (
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              {record.recurrence.joursActifs.length} jours/semaine
            </Text>
          )}
        </div>
      )
    },
    {
      key: "statut",
      title: "Statut",
      render: (value) => {
        const getStatutColor = (statut: string) => {
          switch (statut) {
            case 'Actif':
              return ColorsEnum.SUCCESS;
            case 'Suspendu':
              return ColorsEnum.WARNING;
            case 'Terminé':
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
      title: "Créé le",
      render: (value) => (
        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
          {new Date(value).toLocaleDateString('fr-FR')}
        </Text>
      ),
      sortable: true
    }
  ];

  // Actions du tableau
  const actions: TableAction<PlanningData>[] = [
    {
      label: "Voir détails",
      icon: "Eye",
      onClick: (planning) => {
        setSelectedPlanning(planning);
        setIsDetailsModalOpen(true);
      }
    },
    {
      label: "Modifier",
      icon: "Edit",
      onClick: (planning) => {
        setEditingPlanning(planning);
        setIsAddModalOpen(true);
      }
    },
    {
      label: "Basculer statut",
      icon: "ToggleLeft",
      onClick: (planning) => {
        setPlannings(prev => prev.map(p => 
          p.id === planning.id 
            ? { 
                ...p, 
                statut: p.statut === 'Actif' ? 'Suspendu' : 'Actif',
                dateMiseAJour: new Date().toISOString().split('T')[0]
              }
            : p
        ));
      }
    },
    {
      label: "Dupliquer",
      icon: "Copy",
      onClick: (planning) => {
        const newPlanning: PlanningData = {
          ...planning,
          id: `planning_${Date.now()}`,
          statut: 'Suspendu',
          dateCreation: new Date().toISOString().split('T')[0],
          dateMiseAJour: new Date().toISOString().split('T')[0]
        };
        setPlannings(prev => [...prev, newPlanning]);
      }
    },
    {
      label: "Supprimer",
      icon: "Trash2",
      onClick: (planning) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer ce planning pour la ligne "${planning.ligne.nom}" ?`)) {
          setPlannings(prev => prev.filter(p => p.id !== planning.id));
        }
      },
      type: "danger"
    }
  ];

  // Gestion de l'ajout/modification
  const handleAddPlanning = async (data: any) => {
    // Cette fonction sera implémentée avec le modal
    console.log("Ajout/modification planning:", data);
  };

  // Fermeture du modal
  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingPlanning(null);
  };

  // Statistiques rapides
  const stats = useMemo(() => {
    const totalPlannings = plannings.length;
    const planningsActifs = plannings.filter(p => p.statut === 'Actif').length;
    const planningsSuspendus = plannings.filter(p => p.statut === 'Suspendu').length;
    const chauffeurs = new Set(plannings.map(p => p.chauffeurId)).size;
    const busUtilises = new Set(plannings.map(p => p.busId)).size;

    return {
      totalPlannings,
      planningsActifs,
      planningsSuspendus,
      chauffeurs,
      busUtilises
    };
  }, [plannings]);

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Text variant="h1" className="font-bold text-text-primary">
              Gestion du Planning
            </Text>
            <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY} className="mt-1">
              Programmez et gérez les horaires, bus et chauffeurs pour chaque ligne
            </Text>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Calendar" size={20} color={ColorsEnum.PRIMARY} />
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                  Total plannings
                </Text>
                <Text variant="h3" className="font-bold">
                  {stats.totalPlannings}
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
                  Plannings actifs
                </Text>
                <Text variant="h3" className="font-bold">
                  {stats.planningsActifs}
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
                  Suspendus
                </Text>
                <Text variant="h3" className="font-bold">
                  {stats.planningsSuspendus}
                </Text>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-info/10 rounded-lg">
                <Icon name="Users" size={20} color={ColorsEnum.INFO} />
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                  Chauffeurs actifs
                </Text>
                <Text variant="h3" className="font-bold">
                  {stats.chauffeurs}
                </Text>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Icon name="Bus" size={20} color={ColorsEnum.SECONDARY} />
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                  Bus utilisés
                </Text>
                <Text variant="h3" className="font-bold">
                  {stats.busUtilises}
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
            appearance={currentView === 'calendar' ? 'solid' : 'outline'}
            variation={currentView === 'calendar' ? 'primary' : 'primary'}
            size="sm"
            onClick={() => setCurrentView('calendar')}
            className="flex items-center space-x-2"
          >
            <Icon name="Calendar" size={16} />
            <span>Calendrier</span>
          </Button>
        </div>

        <Button
          appearance="solid"
          variation="primary"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2"
        >
          <Icon name="Plus" size={16} />
          <span>Nouveau planning</span>
        </Button>
      </div>

      {/* Contenu principal */}
      {currentView === 'table' ? (
        <div className="bg-white border border-border rounded-lg">
          <Table
            columns={columns}
            dataSource={plannings}
            actions={actions}
            emptyText="Aucun planning trouvé"
          />
        </div>
      ) : (
        <div className="bg-white border border-border rounded-lg p-4">
          <PlanningCalendar
            plannings={plannings}
            onPlanningClick={(planning) => {
              setSelectedPlanning(planning);
              setIsDetailsModalOpen(true);
            }}
          />
        </div>
      )}

      {/* Modal d'ajout/modification */}
      <AddPlanningModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddPlanning}
        editingPlanning={editingPlanning}
        chauffeurs={mockChauffeurs}
        bus={mockBus}
      />

      {/* Modal de détails */}
      <PlanningDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedPlanning(null);
        }}
        planning={selectedPlanning}
        onEdit={(planning) => {
          setEditingPlanning(planning);
          setIsAddModalOpen(true);
        }}
      />
    </div>
  );
};
