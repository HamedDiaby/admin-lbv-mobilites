import { FC, useState } from "react";
import { Modal } from "../../../../components/modal";
import { Text } from "../../../../components/text";
import { Badge } from "../../../../components/badge";
import { Button } from "../../../../components/button";
import { Icon } from "../../../../components/icon";
import { Input } from "../../../../components/input";
import { Select } from "../../../../components/select";
import { QRScanner } from "../../../../components/QRScanner";
import { ColorsEnum } from "../../../../utils/enums";
import { VerificationQRData, VerificationQRResult } from "../types";

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (result: VerificationQRResult) => void;
}

// Données simulées pour les lignes
const mockLignes = [
  { id: "1", nom: "Ligne A", numero: "L01" },
  { id: "2", nom: "Ligne B", numero: "L02" },
  { id: "3", nom: "Ligne C", numero: "L03" },
  { id: "4", nom: "Ligne Express", numero: "L04" }
];

// Données simulées pour les stations
const mockStations = [
  { id: "1", nom: "Gare Routière", lignes: ["1", "2", "3"] },
  { id: "2", nom: "Université Omar Bongo", lignes: ["1", "3"] },
  { id: "3", nom: "Akanda", lignes: ["2"] },
  { id: "4", nom: "Owendo", lignes: ["1", "4"] },
  { id: "5", nom: "Aéroport", lignes: ["4"] }
];

export const QRScannerModal: FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  onScanSuccess
}) => {
  const [scanMode, setScanMode] = useState<'camera' | 'manual'>('manual');
  const [verificationData, setVerificationData] = useState<VerificationQRData>({
    qrCode: "",
    ligneId: "",
    stationDepart: "",
    stationArrivee: ""
  });
  const [verificationResult, setVerificationResult] = useState<VerificationQRResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Gestion du scan réussi
  const handleScanSuccess = (qrCode: string) => {
    setVerificationData(prev => ({ ...prev, qrCode }));
    setCameraError(null);
    
    // Afficher un message de succès temporaire
    const successMessage = "QR code détecté ! Vérification en cours...";
    
    // Vérifier automatiquement après le scan
    setTimeout(() => {
      verifyQRCode({ ...verificationData, qrCode });
    }, 500);
  };

  // Gestion des erreurs de caméra
  const handleCameraError = (error: string) => {
    setCameraError(error);
  };

  // Simulation de la vérification QR
  const verifyQRCode = async (data: VerificationQRData): Promise<VerificationQRResult> => {
    // Simulation d'une requête API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Logique de simulation
    if (data.qrCode === "QR_ABO_001_DEC2024") {
      return {
        valide: true,
        client: {
          id: "1",
          nom: "Mbadinga",
          prenom: "Audrey",
          telephone: "+241 06 12 34 56",
          email: "audrey.mbadinga@email.ga",
          statut: "Actif",
          dateInscription: "2024-01-15",
          derniereMiseAJour: "2024-12-01",
          qrCodeId: "QR_CLIENT_001"
        },
        abonnement: {
          id: "1",
          typeAbonnement: {
            id: "2",
            nom: "Mensuel Standard",
            couleur: "#10B981",
            prix: 25000,
            duree: 30,
            description: "Abonnement mensuel tout public",
            avantages: ["Voyages illimités"],
            actif: true
          },
          statut: "Actif",
          dateDebut: "2024-12-01",
          dateFin: "2024-12-31",
          nbVoyagesUtilises: 23
        } as any,
        message: "Abonnement valide",
        voyageAutorise: true,
        informationsVoyage: {
          lignesAutorisees: ["Toutes"],
          dateExpiration: "2024-12-31"
        }
      };
    } else if (data.qrCode === "QR_ABO_002_DEC2024") {
      return {
        valide: true,
        client: {
          id: "2",
          nom: "Ondo Meyo",
          prenom: "Kevin",
          telephone: "+241 06 98 76 54",
          email: "kevin.ondo@email.ga",
          statut: "Actif",
          dateInscription: "2024-02-10",
          derniereMiseAJour: "2024-11-28",
          qrCodeId: "QR_CLIENT_002"
        },
        abonnement: {
          id: "2",
          typeAbonnement: {
            id: "1",
            nom: "Étudiant",
            couleur: "#3B82F6",
            prix: 15000,
            duree: 30,
            description: "Tarif préférentiel pour les étudiants",
            avantages: ["50% de réduction"],
            nbVoyagesMax: 60,
            actif: true
          },
          statut: "Actif",
          dateDebut: "2024-12-01",
          dateFin: "2024-12-31",
          nbVoyagesUtilises: 15,
          nbVoyagesRestants: 45
        } as any,
        message: "Abonnement étudiant valide",
        voyageAutorise: true,
        informationsVoyage: {
          nbVoyagesRestants: 45,
          lignesAutorisees: ["Toutes"],
          dateExpiration: "2024-12-31"
        }
      };
    } else {
      return {
        valide: false,
        message: "QR code invalide ou abonnement expiré",
        erreurs: ["QR code non reconnu", "Vérifiez le code client"],
        voyageAutorise: false
      };
    }
  };

  // Gestion de la vérification
  const handleVerification = async () => {
    if (!verificationData.qrCode.trim()) {
      return;
    }

    setLoading(true);
    setVerificationResult(null);

    try {
      const result = await verifyQRCode(verificationData);
      setVerificationResult(result);
      onScanSuccess(result);
    } catch (error) {
      console.error("Erreur lors de la vérification:", error);
      setVerificationResult({
        valide: false,
        message: "Erreur lors de la vérification",
        erreurs: ["Erreur de connexion"],
        voyageAutorise: false
      });
    } finally {
      setLoading(false);
    }
  };

  // Reset du formulaire
  const handleReset = () => {
    setVerificationData({
      qrCode: "",
      ligneId: "",
      stationDepart: "",
      stationArrivee: ""
    });
    setVerificationResult(null);
    setCameraError(null);
  };

  const ligneOptions = [
    { value: "", label: "Sélectionner une ligne" },
    ...mockLignes.map(ligne => ({
      value: ligne.id,
      label: `${ligne.numero} - ${ligne.nom}`
    }))
  ];

  const stationOptions = [
    { value: "", label: "Sélectionner une station" },
    ...mockStations.map(station => ({
      value: station.nom,
      label: station.nom
    }))
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Vérification QR Code Client"
      size="md"
    >
      <div className="space-y-6">
        {/* Mode de scan */}
        <div>
          <Text variant="h4" className="font-semibold mb-3">
            Mode de vérification
          </Text>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setScanMode('camera')}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-colors
                ${scanMode === 'camera' 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-gray-300 hover:border-gray-400'
                }
              `}
            >
              <Icon name="Camera" size={16} />
              <span>Scanner caméra</span>
            </button>
            <button
              onClick={() => setScanMode('manual')}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-colors
                ${scanMode === 'manual' 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-gray-300 hover:border-gray-400'
                }
              `}
            >
              <Icon name="Type" size={16} />
              <span>Saisie manuelle</span>
            </button>
          </div>
        </div>

        {/* Formulaire de vérification */}
        <div className="space-y-4">
          {scanMode === 'manual' ? (
            <div>
              <Input
                label="Code QR du client"
                placeholder="Entrez ou collez le code QR..."
                value={verificationData.qrCode}
                onChange={(e) => setVerificationData(prev => ({ 
                  ...prev, 
                  qrCode: e.target.value 
                }))}
                className="font-mono"
              />
              <div className="mt-2 space-y-1">
                <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
                  Codes de test disponibles :
                </Text>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setVerificationData(prev => ({ 
                      ...prev, 
                      qrCode: "QR_ABO_001_DEC2024" 
                    }))}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded font-mono"
                  >
                    QR_ABO_001_DEC2024
                  </button>
                  <button
                    onClick={() => setVerificationData(prev => ({ 
                      ...prev, 
                      qrCode: "QR_ABO_002_DEC2024" 
                    }))}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded font-mono"
                  >
                    QR_ABO_002_DEC2024
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <QRScanner
                onScan={handleScanSuccess}
                onError={handleCameraError}
                width={400}
                height={300}
                className="mx-auto"
              />
              
              {cameraError && (
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <Text variant="p3" color={ColorsEnum.ERROR}>
                    {cameraError}
                  </Text>
                  <Button
                    appearance="outline"
                    variation="primary"
                    size="sm"
                    className="mt-2"
                    onClick={() => setScanMode('manual')}
                  >
                    Passer à la saisie manuelle
                  </Button>
                </div>
              )}
              
              <div className="text-center">
                <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
                  Positionnez le QR code du client dans le cadre
                </Text>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                  Le scan se fera automatiquement
                </Text>
              </div>
              
              {verificationData.qrCode && (
                <div className="mt-4">
                  <Input
                    label="QR Code détecté"
                    value={verificationData.qrCode}
                    readOnly
                    className="font-mono bg-green-50 border-green-300"
                  />
                </div>
              )}
            </div>
          )}

          {/* Informations optionnelles de voyage */}
          <div className="border-t pt-4">
            <Text variant="p3" className="font-medium mb-3">
              Informations du voyage (optionnel)
            </Text>
            <div className="grid grid-cols-1 gap-3">
              <Select
                label="Ligne"
                options={ligneOptions}
                value={verificationData.ligneId || ""}
                onChange={(e) => setVerificationData(prev => ({ 
                  ...prev, 
                  ligneId: e.target.value 
                }))}
              />
              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Station de départ"
                  options={stationOptions}
                  value={verificationData.stationDepart || ""}
                  onChange={(e) => setVerificationData(prev => ({ 
                    ...prev, 
                    stationDepart: e.target.value 
                  }))}
                />
                <Select
                  label="Station d'arrivée"
                  options={stationOptions}
                  value={verificationData.stationArrivee || ""}
                  onChange={(e) => setVerificationData(prev => ({ 
                    ...prev, 
                    stationArrivee: e.target.value 
                  }))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Résultat de la vérification */}
        {verificationResult && (
          <div className={`
            p-4 rounded-lg border-2
            ${verificationResult.valide 
              ? 'border-green-200 bg-green-50' 
              : 'border-red-200 bg-red-50'
            }
          `}>
            <div className="flex items-start space-x-3">
              <Icon 
                name={verificationResult.valide ? "CheckCircle" : "XCircle"} 
                size={24} 
                color={verificationResult.valide ? ColorsEnum.SUCCESS : ColorsEnum.ERROR}
              />
              <div className="flex-1">
                <Text 
                  variant="p2" 
                  className="font-semibold"
                  color={verificationResult.valide ? ColorsEnum.SUCCESS : ColorsEnum.ERROR}
                >
                  {verificationResult.valide ? "✅ Vérification réussie" : "❌ Vérification échouée"}
                </Text>
                <Text variant="p3" className="mt-1">
                  {verificationResult.message}
                </Text>

                {verificationResult.valide && verificationResult.client && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Text variant="p3" className="font-medium">
                          {verificationResult.client.prenom} {verificationResult.client.nom}
                        </Text>
                        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                          {verificationResult.client.telephone}
                        </Text>
                      </div>
                      <Badge variant="outline" color={ColorsEnum.SUCCESS}>
                        {verificationResult.client.statut}
                      </Badge>
                    </div>

                    {verificationResult.abonnement && (
                      <div className="bg-white p-3 rounded border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: verificationResult.abonnement.typeAbonnement.couleur }}
                            />
                            <Text variant="p3" className="font-medium">
                              {verificationResult.abonnement.typeAbonnement.nom}
                            </Text>
                          </div>
                          <Badge variant="outline" color={ColorsEnum.SUCCESS}>
                            {verificationResult.abonnement.statut}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Expire le</Text>
                            <Text variant="p4">
                              {new Date(verificationResult.abonnement.dateFin).toLocaleDateString('fr-FR')}
                            </Text>
                          </div>
                          <div>
                            <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Voyages</Text>
                            <Text variant="p4">
                              {verificationResult.informationsVoyage?.nbVoyagesRestants !== undefined
                                ? `${verificationResult.informationsVoyage.nbVoyagesRestants} restants`
                                : "Illimités"
                              }
                            </Text>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {verificationResult.erreurs && (
                  <div className="mt-3">
                    <Text variant="p4" color={ColorsEnum.ERROR}>
                      Erreurs :
                    </Text>
                    <ul className="list-disc list-inside mt-1">
                      {verificationResult.erreurs.map((erreur, index) => (
                        <li key={index}>
                          <Text variant="p4" color={ColorsEnum.ERROR}>{erreur}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            appearance="outline"
            variation="secondary"
            onClick={handleReset}
            disabled={loading}
          >
            Réinitialiser
          </Button>
          
          <div className="flex items-center space-x-3">
            <Button
              appearance="outline"
              variation="secondary"
              onClick={onClose}
              disabled={loading}
            >
              Fermer
            </Button>
            <Button
              appearance="solid"
              variation="primary"
              onClick={handleVerification}
              disabled={loading || !verificationData.qrCode.trim()}
              className="flex items-center space-x-2"
            >
              {loading && <Icon name="Loader2" size={16} className="animate-spin" />}
              <span>Vérifier</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
