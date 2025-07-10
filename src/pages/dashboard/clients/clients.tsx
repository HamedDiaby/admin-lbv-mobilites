import { FC, useState } from "react";
import { Client, Abonnement, FiltresClients } from "./types";
import { useClientData } from "./hooks/useClientData";
import {
  ClientHeader,
  ClientStats,
  ClientViewControls,
  ClientFilters,
  ClientsTable,
  AbonnementsTable,
  AddClientModal,
  ClientDetailsModal,
  QRScannerModal
} from "./components";

export const Clients: FC = () => {
  // État principal
  const [vueActive, setVueActive] = useState<'clients' | 'abonnements'>('clients');
  const [filtres, setFiltres] = useState<FiltresClients>({});
  
  // Modales
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showClientDetailsModal, setShowClientDetailsModal] = useState(false);
  const [showQRScannerModal, setShowQRScannerModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Données et logique métier
  const {
    clients,
    abonnements,
    statistiques,
    clientsFiltres,
    addClient,
    updateClient,
    deleteClient
  } = useClientData();

  // Handlers pour les clients
  const handleClientDetails = (client: Client) => {
    setSelectedClient(client);
    setShowClientDetailsModal(true);
  };

  const handleClientEdit = (client: Client) => {
    setSelectedClient(client);
    setShowAddClientModal(true);
  };

  const handleClientDelete = async (clientId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      await deleteClient(clientId);
    }
  };

  // Handlers pour les abonnements
  const handleAbonnementDetails = (abonnement: Abonnement) => {
    console.log('Détails abonnement:', abonnement);
    // TODO: Implémenter modal détails abonnement
  };

  const handleAbonnementEdit = (abonnement: Abonnement) => {
    console.log('Modifier abonnement:', abonnement);
    // TODO: Implémenter modal édition abonnement
  };

  const handleAbonnementDelete = async (abonnementId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet abonnement ?')) {
      console.log('Supprimer abonnement:', abonnementId);
      // TODO: Implémenter suppression abonnement
    }
  };

  // Handler pour réinitialiser les filtres
  const handleResetFiltres = () => {
    setFiltres({});
  };

  // Handler pour sauvegarder client
  const handleSaveClient = async (clientData: any) => {
    try {
      if (selectedClient) {
        await updateClient(selectedClient.id, clientData);
      } else {
        await addClient(clientData);
      }
      setShowAddClientModal(false);
      setSelectedClient(null);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <ClientHeader
        onScanQR={() => setShowQRScannerModal(true)}
        onAddClient={() => {
          setSelectedClient(null);
          setShowAddClientModal(true);
        }}
      />

      {/* Statistiques */}
      <ClientStats stats={statistiques} />

      {/* Contrôles de vue */}
      <ClientViewControls
        currentView={vueActive}
        onViewChange={setVueActive}
        clientsCount={clients.length}
        abonnementsCount={abonnements.length}
      />

      {/* Filtres */}
      <ClientFilters
        filtres={filtres}
        onFiltresChange={setFiltres}
        onReset={handleResetFiltres}
      />

      {/* Tableaux */}
      {vueActive === 'clients' ? (
        <ClientsTable
          clients={clientsFiltres}
          onClientDetails={handleClientDetails}
          onClientEdit={handleClientEdit}
          onClientDelete={handleClientDelete}
        />
      ) : (
        <AbonnementsTable
          abonnements={abonnements.filter(a => 
            filtres.nom ? 
              a.client.nom.toLowerCase().includes(filtres.nom.toLowerCase()) ||
              a.client.prenom.toLowerCase().includes(filtres.nom.toLowerCase()) ||
              a.client.email.toLowerCase().includes(filtres.nom.toLowerCase())
            : true
          )}
          onAbonnementDetails={handleAbonnementDetails}
          onAbonnementEdit={handleAbonnementEdit}
          onAbonnementDelete={handleAbonnementDelete}
        />
      )}

      {/* Modales */}
      {showAddClientModal && (
        <AddClientModal
          isOpen={showAddClientModal}
          editingClient={selectedClient}
          onSubmit={handleSaveClient}
          onClose={() => {
            setShowAddClientModal(false);
            setSelectedClient(null);
          }}
        />
      )}

      {showClientDetailsModal && selectedClient && (
        <ClientDetailsModal
          isOpen={showClientDetailsModal}
          client={selectedClient}
          abonnements={abonnements.filter(a => a.clientId === selectedClient.id)}
          onClose={() => {
            setShowClientDetailsModal(false);
            setSelectedClient(null);
          }}
        />
      )}

      {showQRScannerModal && (
        <QRScannerModal
          isOpen={showQRScannerModal}
          onScanSuccess={(result) => {
            console.log('QR scan result:', result);
            setShowQRScannerModal(false);
          }}
          onClose={() => setShowQRScannerModal(false)}
        />
      )}
    </div>
  );
};