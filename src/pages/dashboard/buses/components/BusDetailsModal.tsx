import { FC, useEffect, useState } from "react";
import { Modal, Text, Button, Badge } from "@components";
import { ColorsEnum } from "@utils/enums";
import { Bus, OBD2Data } from "../types";

interface BusDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bus: Bus | null;
  onEdit?: (bus: Bus) => void;
  onDelete?: (bus: Bus) => void;
}

// Simulation des données ODB2 en temps réel
const generateRandomODB2Data = (): OBD2Data => {
  const baseVitesse = Math.random() * 60; // 0-60 km/h
  const baseTemperature = 85 + Math.random() * 20; // 85-105°C
  const basePression = 1.8 + Math.random() * 0.4; // 1.8-2.2 bar
  
  return {
    vitesse: Math.round(baseVitesse),
    rpm: Math.round(1000 + Math.random() * 2000), // 1000-3000 RPM
    temperatureMoteur: Math.round(baseTemperature),
    pressionHuile: Math.round(basePression * 10) / 10,
    niveauCarburant: Math.round(20 + Math.random() * 80), // 20-100%
    consommationInstantanee: Math.round((8 + Math.random() * 4) * 10) / 10, // 8-12 L/100km
    
    kilometrage: Math.round(50000 + Math.random() * 100000), // 50k-150k km
    heuresMoteur: Math.round(2000 + Math.random() * 5000), // 2k-7k heures
    pressionPneus: {
      avantGauche: Math.round((2.2 + Math.random() * 0.3) * 10) / 10,
      avantDroit: Math.round((2.2 + Math.random() * 0.3) * 10) / 10,
      arriereGauche: Math.round((2.2 + Math.random() * 0.3) * 10) / 10,
      arriereDroit: Math.round((2.2 + Math.random() * 0.3) * 10) / 10
    },
    
    alertes: Math.random() > 0.8 ? [
      {
        id: '1',
        type: 'avertissement' as const,
        code: 'P0171',
        message: 'Température moteur élevée',
        timestamp: new Date().toISOString(),
        resolved: false
      }
    ] : [],
    scoreEtat: Math.round(70 + Math.random() * 30), // 70-100
    prochaineMaintenance: Math.round(1000 + Math.random() * 4000), // 1k-5k km
    
    emissionsCO2: Math.round(800 + Math.random() * 200), // 800-1000 g/km
    consommationMoyenne: Math.round((25 + Math.random() * 10) * 10) / 10, // 25-35 L/100km
    
    latitude: -0.3976 + (Math.random() - 0.5) * 0.1, // Autour de Libreville
    longitude: 9.4547 + (Math.random() - 0.5) * 0.1,
    
    lastUpdate: new Date().toISOString()
  };
};

// Fonction pour déterminer la couleur selon la valeur et les seuils
const getStatusColor = (value: number, good: number, warning: number, danger: number): ColorsEnum => {
  if (value <= good) return ColorsEnum.SUCCESS;
  if (value <= warning) return ColorsEnum.WARNING;
  return ColorsEnum.ERROR;
};

export const BusDetailsModal: FC<BusDetailsModalProps> = ({
  isOpen,
  onClose,
  bus,
  onEdit,
  onDelete
}) => {
  const [odb2Data, setOdb2Data] = useState<OBD2Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulation de la récupération des données ODB2 en temps réel
  useEffect(() => {
    if (!isOpen || !bus) return;

    setIsLoading(true);
    
    // Simulation d'un délai de chargement initial
    const initialTimeout = setTimeout(() => {
      setOdb2Data(generateRandomODB2Data());
      setIsLoading(false);
    }, 1000);

    // Mise à jour des données toutes les 3 secondes
    const interval = setInterval(() => {
      setOdb2Data(generateRandomODB2Data());
    }, 3000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isOpen, bus]);

  if (!bus) return null;

  const handleEdit = () => {
    if (onEdit) {
      onEdit(bus);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(bus);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={`Détails du bus ${bus.numero}`}
      size="xl"
    >
      <div className="space-y-6">
        {/* Informations du bus */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold mb-4">
              Informations du véhicule
            </Text>
            <div className="space-y-3">
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Numéro</Text>
                <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                  {bus.numero}
                </Text>
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Plaque</Text>
                <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                  {bus.plaqueImmatriculation}
                </Text>
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Marque / Modèle</Text>
                <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                  {bus.marque} {bus.modele}
                </Text>
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Année</Text>
                <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                  {bus.annee}
                </Text>
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Couleur</Text>
                <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                  {bus.couleur}
                </Text>
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Capacité</Text>
                <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                  {bus.capacite} passagers
                </Text>
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Carburant</Text>
                <Badge 
                  color={bus.carburant === 'electrique' ? ColorsEnum.SUCCESS : ColorsEnum.INFO}
                >
                  {bus.carburant.charAt(0).toUpperCase() + bus.carburant.slice(1)}
                </Badge>
              </div>
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Statut</Text>
                <Badge 
                  color={bus.statut === 'actif' ? ColorsEnum.SUCCESS : 
                         bus.statut === 'maintenance' ? ColorsEnum.WARNING : ColorsEnum.ERROR}
                >
                  {bus.statut.charAt(0).toUpperCase() + bus.statut.slice(1)}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold mb-4">
              Données ODB2 en temps réel
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                LIVE
              </span>
            </Text>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="ml-2">
                  Connexion ODB2...
                </Text>
              </div>
            ) : odb2Data ? (
              <div className="space-y-4">
                {/* Vitesse */}
                <div className="flex items-center justify-between">
                  <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Vitesse</Text>
                  <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                    {odb2Data.vitesse} km/h
                  </Text>
                </div>

                {/* Moteur */}
                <div>
                  <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="mb-2">Moteur</Text>
                  <div className="pl-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>Température</Text>
                      <Badge 
                        color={getStatusColor(odb2Data.temperatureMoteur, 90, 100, 110)}
                      >
                        {odb2Data.temperatureMoteur}°C
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>Régime</Text>
                      <Text variant="p5" color={ColorsEnum.TEXT_PRIMARY}>
                        {odb2Data.rpm} RPM
                      </Text>
                    </div>
                    <div className="flex items-center justify-between">
                      <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>Pression huile</Text>
                      <Text variant="p5" color={ColorsEnum.TEXT_PRIMARY}>
                        {odb2Data.pressionHuile} bar
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Carburant */}
                <div>
                  <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="mb-2">Carburant</Text>
                  <div className="pl-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>Niveau</Text>
                      <Badge 
                        color={getStatusColor(100 - odb2Data.niveauCarburant, 80, 90, 95)}
                      >
                        {odb2Data.niveauCarburant}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>Consommation</Text>
                      <Text variant="p5" color={ColorsEnum.TEXT_PRIMARY}>
                        {odb2Data.consommationInstantanee} L/100km
                      </Text>
                    </div>
                    <div className="flex items-center justify-between">
                      <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>Moyenne</Text>
                      <Text variant="p5" color={ColorsEnum.TEXT_PRIMARY}>
                        {odb2Data.consommationMoyenne} L/100km
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Pneus */}
                <div>
                  <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="mb-2">Pression pneus</Text>
                  <div className="pl-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>Avant gauche</Text>
                      <Badge 
                        color={getStatusColor(Math.abs(odb2Data.pressionPneus.avantGauche - 2.2), 0.2, 0.4, 0.6)}
                      >
                        {odb2Data.pressionPneus.avantGauche} bar
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>Avant droit</Text>
                      <Badge 
                        color={getStatusColor(Math.abs(odb2Data.pressionPneus.avantDroit - 2.2), 0.2, 0.4, 0.6)}
                      >
                        {odb2Data.pressionPneus.avantDroit} bar
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Score d'état */}
                <div className="flex items-center justify-between">
                  <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Score d'état</Text>
                  <Badge 
                    color={getStatusColor(100 - odb2Data.scoreEtat, 20, 40, 60)}
                  >
                    {odb2Data.scoreEtat}/100
                  </Badge>
                </div>

                {/* Alertes */}
                {odb2Data.alertes.length > 0 && (
                  <div>
                    <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="mb-2">
                      Alertes
                    </Text>
                    <div className="pl-4 space-y-2">
                      {odb2Data.alertes.map((alerte, index) => (
                        <Badge 
                          key={index}
                          color={alerte.type === 'critique' ? ColorsEnum.ERROR : 
                                 alerte.type === 'avertissement' ? ColorsEnum.WARNING : ColorsEnum.INFO}
                        >
                          {alerte.message}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Maintenance */}
                <div className="flex items-center justify-between">
                  <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Prochaine maintenance</Text>
                  <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
                    {odb2Data.prochaineMaintenance} km
                  </Text>
                </div>

                {/* Dernière mise à jour */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>Dernière mise à jour</Text>
                  <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
                    {new Date(odb2Data.lastUpdate).toLocaleTimeString()}
                  </Text>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                  Aucune donnée ODB2 disponible
                </Text>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4 border-t border-gray-200">
          <div>
            <Button
              appearance="outline"
              variation="error"
              onClick={handleDelete}
              iconName="Trash2"
              iconPosition="left"
            >
              Supprimer
            </Button>
          </div>
          <div className="flex space-x-3">
            <Button
              appearance="outline"
              variation="secondary"
              onClick={onClose}
            >
              Fermer
            </Button>
            <Button
              appearance="solid"
              variation="primary"
              onClick={handleEdit}
              iconName="Edit"
              iconPosition="left"
            >
              Modifier
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
