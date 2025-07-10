import { FC, useState, useMemo } from "react";
import { Table, TableColumn, TableAction } from "../../../components/table";
import { Text } from "../../../components/text";
import { Badge } from "../../../components/badge";
import { Button } from "../../../components/button";
import { Icon } from "../../../components/icon";
import { Input } from "../../../components/input";
import { Select } from "../../../components/select";
import { ColorsEnum } from "../../../utils/enums";
import { Client, Abonnement, TypeAbonnement, StatistiquesClients, FiltresClients, VerificationQRResult } from "./types";
import { AddClientModal } from "./AddClientModal";
import { ClientDetailsModal } from "./ClientDetailsModal";
import { QRScannerModal } from "./QRScannerModal";

// Données simulées pour les types d'abonnements
const mockTypesAbonnements: TypeAbonnement[] = [
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
const mockClients: Client[] = [
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
const mockAbonnements: Abonnement[] = [
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
    dateMiseAJour: "2024-12-07"
  },
  {
    id: "3",
    clientId: "3",
    client: mockClients[2],
    typeAbonnementId: "1",
    typeAbonnement: mockTypesAbonnements[0],
    dateDebut: "2024-12-01",
    dateFin: "2024-12-31",
    statut: "Actif",
    nbVoyagesUtilises: 8,
    nbVoyagesRestants: 52,
    qrCode: "QR_ABO_003_DEC2024",
    historiquePaiements: [],
    dateCreation: "2024-12-01",
    dateMiseAJour: "2024-12-06"
  }
];

export const Clients: FC = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [abonnements] = useState<Abonnement[]>(mockAbonnements);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [filtres, setFiltres] = useState<FiltresClients>({});
  const [currentView, setCurrentView] = useState<'clients' | 'abonnements'>('clients');

  // Filtrer les clients
  const clientsFiltres = useMemo(() => {
    return clients.filter(client => {
      if (filtres.nom && !`${client.prenom} ${client.nom}`.toLowerCase().includes(filtres.nom.toLowerCase())) {
        return false;
      }
      if (filtres.statut && filtres.statut !== 'tous' && client.statut.toLowerCase() !== filtres.statut) {
        return false;
      }
      if (filtres.ville && filtres.ville !== 'toutes' && client.ville !== filtres.ville) {
        return false;
      }
      return true;
    });
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
    
    return {
      totalClients,
      clientsActifs,
      clientsInactifs,
      nouveauxClientsMois,
      abonnementsActifs,
      abonnementsExpires,
      chiffreAffairesMois: 0, // À calculer selon les paiements
      voyagesMois: 0 // À calculer selon l'historique
    };
  }, [clients, abonnements]);

  // Colonnes du tableau clients
  const clientColumns: TableColumn<Client>[] = [
    {
      key: "client",
      title: "Client",
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={18} color={ColorsEnum.PRIMARY} />
          </div>
          <div>
            <Text variant="p3" className="font-medium">
              {record.prenom} {record.nom}
            </Text>
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              {record.telephone}
            </Text>
          </div>
        </div>
      ),
      sortable: true
    },
    {
      key: "email",
      title: "Email",
      render: (value) => (
        <Text variant="p4">{value}</Text>
      )
    },
    {
      key: "ville",
      title: "Ville",
      render: (value) => (
        <Text variant="p4">{value || "Non renseignée"}</Text>
      )
    },
    {
      key: "abonnement",
      title: "Abonnement actuel",
      render: (_, record) => {
        const abonnementActif = abonnements.find(a => 
          a.clientId === record.id && a.statut === 'Actif'
        );
        
        if (!abonnementActif) {
          return (
            <Badge variant="outline" color={ColorsEnum.TEXT_SECONDARY}>
              Aucun
            </Badge>
          );
        }
        
        return (
          <div>
            <Badge 
              variant="solid" 
              style={{ backgroundColor: abonnementActif.typeAbonnement.couleur }}
              className="text-white"
            >
              {abonnementActif.typeAbonnement.nom}
            </Badge>
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY} className="mt-1">
              Expire le {new Date(abonnementActif.dateFin).toLocaleDateString('fr-FR')}
            </Text>
          </div>
        );
      }
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
            case 'Inactif':
              return ColorsEnum.ERROR;
            default:
              return ColorsEnum.TEXT_SECONDARY;
          }
        };

        return (
          <Badge
            variant="outline"
            color={getStatutColor(value)}
          >
            {value}
          </Badge>
        );
      },
      sortable: true
    },
    {
      key: "dateInscription",
      title: "Inscription",
      render: (value) => (
        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
          {new Date(value).toLocaleDateString('fr-FR')}
        </Text>
      ),
      sortable: true
    },
    {
      key: "qrCode",
      title: "QR Code",
      render: (_, record) => (
        <Button
          appearance="outline"
          variation="primary"
          size="sm"
          onClick={() => generateQRCode(record)}
          className="flex items-center space-x-1"
        >
          <Icon name="QrCode" size={14} />
          <span>Voir</span>
        </Button>
      )
    }
  ];

  // Actions du tableau
  const clientActions: TableAction<Client>[] = [
    {
      label: "Voir détails",
      icon: "Eye",
      onClick: (client) => {
        setSelectedClient(client);
        setIsDetailsModalOpen(true);
      }
    },
    {
      label: "Modifier",
      icon: "Edit",
      onClick: (client) => {
        setEditingClient(client);
        setIsAddModalOpen(true);
      }
    },
    {
      label: "Basculer statut",
      icon: "ToggleLeft",
      onClick: (client) => {
        setClients(prev => prev.map(c => 
          c.id === client.id 
            ? { 
                ...c, 
                statut: c.statut === 'Actif' ? 'Suspendu' : 'Actif',
                derniereMiseAJour: new Date().toISOString().split('T')[0]
              }
            : c
        ));
      }
    },
    {
      label: "Supprimer",
      icon: "Trash2",
      onClick: (client) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer le client "${client.prenom} ${client.nom}" ?`)) {
          setClients(prev => prev.filter(c => c.id !== client.id));
        }
      },
      type: "danger"
    }
  ];

  // Gestion des actions
  const handleAddClient = async (data: any) => {
    // Logique d'ajout/modification
    console.log("Ajout/modification client:", data);
    setIsAddModalOpen(false);
    setEditingClient(null);
  };

  const generateQRCode = (client: Client) => {
    // Logique de génération QR code
    console.log("Génération QR code pour:", client);
  };

  const handleViewDetails = (client: Client) => {
    setSelectedClient(client);
    setIsDetailsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingClient(null);
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Text variant="h1" className="font-bold text-text-primary">
              Gestion des Clients
            </Text>
            <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY} className="mt-1">
              Gérez vos clients, leurs abonnements et vérifiez les QR codes
            </Text>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Users" size={20} color={ColorsEnum.PRIMARY} />
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                  Total clients
                </Text>
                <Text variant="h3" className="font-bold">
                  {statistiques.totalClients}
                </Text>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Icon name="UserCheck" size={20} color={ColorsEnum.SUCCESS} />
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                  Clients actifs
                </Text>
                <Text variant="h3" className="font-bold">
                  {statistiques.clientsActifs}
                </Text>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-info/10 rounded-lg">
                <Icon name="CreditCard" size={20} color={ColorsEnum.INFO} />
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                  Abonnements actifs
                </Text>
                <Text variant="h3" className="font-bold">
                  {statistiques.abonnementsActifs}
                </Text>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Icon name="UserPlus" size={20} color={ColorsEnum.WARNING} />
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                  Nouveaux ce mois
                </Text>
                <Text variant="h3" className="font-bold">
                  {statistiques.nouveauxClientsMois}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contrôles et filtres */}
      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          {/* Filtres */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Input
              placeholder="Rechercher par nom..."
              value={filtres.nom || ""}
              onChange={(e) => setFiltres(prev => ({ ...prev, nom: e.target.value }))}
              className="w-full sm:w-64"
            />
            
            <Select
              options={[
                { value: 'tous', label: 'Tous les statuts' },
                { value: 'actif', label: 'Actifs' },
                { value: 'suspendu', label: 'Suspendus' },
                { value: 'inactif', label: 'Inactifs' }
              ]}
              value={filtres.statut || 'tous'}
              onChange={(e) => setFiltres(prev => ({ ...prev, statut: e.target.value }))}
            />

            <Select
              options={[
                { value: 'toutes', label: 'Toutes les villes' },
                { value: 'Libreville', label: 'Libreville' },
                { value: 'Port-Gentil', label: 'Port-Gentil' },
                { value: 'Franceville', label: 'Franceville' }
              ]}
              value={filtres.ville || 'toutes'}
              onChange={(e) => setFiltres(prev => ({ ...prev, ville: e.target.value }))}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              appearance="outline"
              variation="primary"
              onClick={() => setIsQRScannerOpen(true)}
              className="flex items-center space-x-2"
            >
              <Icon name="Scan" size={16} />
              <span>Scanner QR</span>
            </Button>
            
            <Button
              appearance="solid"
              variation="primary"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-2"
            >
              <Icon name="Plus" size={16} />
              <span>Nouveau client</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Tableau des clients */}
      <div className="bg-white border border-border rounded-lg">
        <Table
          columns={clientColumns}
          dataSource={clientsFiltres}
          actions={clientActions}
          emptyText="Aucun client trouvé"
        />
      </div>

      {/* Modals */}
      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddClient}
        editingClient={editingClient}
      />

      <ClientDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedClient(null);
        }}
        client={selectedClient}
        abonnements={abonnements.filter(a => a.clientId === selectedClient?.id)}
        onEdit={(client) => {
          setEditingClient(client);
          setIsAddModalOpen(true);
          setIsDetailsModalOpen(false);
        }}
      />

      <QRScannerModal
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onScanSuccess={(result) => {
          console.log("QR scanné:", result);
          // Logique de vérification
        }}
      />
    </div>
  );
};
