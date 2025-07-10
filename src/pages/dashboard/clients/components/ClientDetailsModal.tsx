import { FC, useState } from "react";
import { Modal } from "../../../../components/modal";
import { Text } from "../../../../components/text";
import { Badge } from "../../../../components/badge";
import { Button } from "../../../../components/button";
import { Icon } from "../../../../components/icon";
import { Table, TableColumn } from "../../../../components/table";
import { ColorsEnum } from "../../../../utils/enums";
import { Client, Abonnement } from "../types";

interface ClientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
  abonnements: Abonnement[];
  onEdit?: (client: Client) => void;
}

export const ClientDetailsModal: FC<ClientDetailsModalProps> = ({
  isOpen,
  onClose,
  client,
  abonnements,
  onEdit
}) => {
  const [currentTab, setCurrentTab] = useState<'infos' | 'abonnements' | 'historique'>('infos');

  if (!client) return null;

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

  const abonnementActif = abonnements.find(a => a.statut === 'Actif');

  // Colonnes pour le tableau des abonnements
  const abonnementColumns: TableColumn<Abonnement>[] = [
    {
      key: "typeAbonnement",
      title: "Type",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: record.typeAbonnement.couleur }}
          />
          <Text variant="p3" className="font-medium">
            {record.typeAbonnement.nom}
          </Text>
        </div>
      )
    },
    {
      key: "periode",
      title: "Période",
      render: (_, record) => (
        <div>
          <Text variant="p4">
            {new Date(record.dateDebut).toLocaleDateString('fr-FR')} 
            {' - '}
            {new Date(record.dateFin).toLocaleDateString('fr-FR')}
          </Text>
        </div>
      )
    },
    {
      key: "statut",
      title: "Statut",
      render: (value) => (
        <Badge
          variant="outline"
          color={getStatutColor(value)}
        >
          {value}
        </Badge>
      )
    },
    {
      key: "utilisation",
      title: "Utilisation",
      render: (_, record) => {
        if (record.typeAbonnement.nbVoyagesMax) {
          const pourcentage = (record.nbVoyagesUtilises / record.typeAbonnement.nbVoyagesMax) * 100;
          return (
            <div>
              <Text variant="p4">
                {record.nbVoyagesUtilises} / {record.typeAbonnement.nbVoyagesMax}
              </Text>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${Math.min(pourcentage, 100)}%` }}
                />
              </div>
            </div>
          );
        }
        return (
          <Text variant="p4">
            {record.nbVoyagesUtilises} voyages
          </Text>
        );
      }
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Détails du client"
      size="lg"
    >
      <div className="space-y-6">
        {/* En-tête client */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="User" size={32} color={ColorsEnum.PRIMARY} />
            </div>
            <div>
              <Text variant="h3" className="font-bold">
                {client.prenom} {client.nom}
              </Text>
              <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
                Client depuis le {new Date(client.dateInscription).toLocaleDateString('fr-FR')}
              </Text>
              <div className="flex items-center space-x-2 mt-1">
                <Badge
                  variant="outline"
                  color={getStatutColor(client.statut)}
                >
                  {client.statut}
                </Badge>
                {abonnementActif && (
                  <Badge 
                    variant="solid" 
                    style={{ backgroundColor: abonnementActif.typeAbonnement.couleur }}
                    className="text-white"
                  >
                    {abonnementActif.typeAbonnement.nom}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
              QR Code ID
            </Text>
            <Text variant="p3" className="font-mono">
              {client.qrCodeId}
            </Text>
            <Button
              appearance="outline"
              variation="primary"
              size="sm"
              className="mt-2"
              onClick={() => console.log("Générer QR")}
            >
              <Icon name="QrCode" size={14} />
            </Button>
          </div>
        </div>

        {/* Onglets */}
        <div className="border-b border-border">
          <div className="flex space-x-8">
            {[
              { key: 'infos', label: 'Informations', icon: 'User' },
              { key: 'abonnements', label: 'Abonnements', icon: 'CreditCard' },
              { key: 'historique', label: 'Historique', icon: 'Clock' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setCurrentTab(tab.key as any)}
                className={`
                  flex items-center space-x-2 pb-3 px-1 border-b-2 transition-colors
                  ${currentTab === tab.key 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }
                `}
              >
                <Icon name={tab.icon as any} size={16} />
                <Text variant="p3" className="font-medium">
                  {tab.label}
                </Text>
              </button>
            ))}
          </div>
        </div>

        {/* Contenu des onglets */}
        <div className="min-h-[300px]">
          {currentTab === 'infos' && (
            <div className="space-y-6">
              {/* Informations personnelles */}
              <div>
                <Text variant="h4" className="font-semibold mb-4">
                  Informations personnelles
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Nom complet</Text>
                      <Text variant="p3">{client.prenom} {client.nom}</Text>
                    </div>
                    <div>
                      <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Date de naissance</Text>
                      <Text variant="p3">
                        {client.dateNaissance 
                          ? new Date(client.dateNaissance).toLocaleDateString('fr-FR')
                          : "Non renseignée"
                        }
                      </Text>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Téléphone</Text>
                      <Text variant="p3">{client.telephone}</Text>
                    </div>
                    <div>
                      <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Email</Text>
                      <Text variant="p3">{client.email}</Text>
                    </div>
                  </div>
                </div>
              </div>

              {/* Adresse */}
              <div>
                <Text variant="h4" className="font-semibold mb-4">
                  Adresse
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Adresse</Text>
                    <Text variant="p3">{client.adresse || "Non renseignée"}</Text>
                  </div>
                  <div>
                    <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Ville</Text>
                    <Text variant="p3">{client.ville || "Non renseignée"}</Text>
                  </div>
                </div>
              </div>

              {/* Abonnement actuel */}
              {abonnementActif && (
                <div>
                  <Text variant="h4" className="font-semibold mb-4">
                    Abonnement actuel
                  </Text>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: abonnementActif.typeAbonnement.couleur }}
                        />
                        <Text variant="p2" className="font-medium">
                          {abonnementActif.typeAbonnement.nom}
                        </Text>
                      </div>
                      <Badge variant="outline" color={ColorsEnum.SUCCESS}>
                        {abonnementActif.statut}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Expire le</Text>
                        <Text variant="p3">
                          {new Date(abonnementActif.dateFin).toLocaleDateString('fr-FR')}
                        </Text>
                      </div>
                      <div>
                        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Voyages utilisés</Text>
                        <Text variant="p3">
                          {abonnementActif.nbVoyagesUtilises}
                          {abonnementActif.typeAbonnement.nbVoyagesMax && 
                            ` / ${abonnementActif.typeAbonnement.nbVoyagesMax}`
                          }
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentTab === 'abonnements' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <Text variant="h4" className="font-semibold">
                  Historique des abonnements
                </Text>
                <Button
                  appearance="solid"
                  variation="primary"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Icon name="Plus" size={14} />
                  <span>Nouvel abonnement</span>
                </Button>
              </div>
              
              {abonnements.length > 0 ? (
                <Table
                  columns={abonnementColumns}
                  dataSource={abonnements}
                  emptyText="Aucun abonnement trouvé"
                />
              ) : (
                <div className="text-center py-8">
                  <Icon name="CreditCard" size={48} color={ColorsEnum.TEXT_SECONDARY} />
                  <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY} className="mt-2">
                    Aucun abonnement
                  </Text>
                  <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                    Ce client n'a pas encore d'abonnement
                  </Text>
                </div>
              )}
            </div>
          )}

          {currentTab === 'historique' && (
            <div className="text-center py-8">
              <Icon name="Clock" size={48} color={ColorsEnum.TEXT_SECONDARY} />
              <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY} className="mt-2">
                Historique des voyages
              </Text>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                Fonctionnalité en cours de développement
              </Text>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t">
          <Button
            appearance="outline"
            variation="secondary"
            onClick={onClose}
          >
            Fermer
          </Button>
          {onEdit && (
            <Button
              appearance="solid"
              variation="primary"
              onClick={() => {
                onEdit(client);
                onClose();
              }}
              className="flex items-center space-x-2"
            >
              <Icon name="Edit" size={16} />
              <span>Modifier</span>
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
