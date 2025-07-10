import { FC, useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { Text } from "./text";
import { Button } from "./button";
import { Icon } from "./icon";
import { ColorsEnum } from "../utils/enums";

interface QRScannerProps {
  onScan: (result: string) => void;
  onError?: (error: string) => void;
  className?: string;
  width?: number;
  height?: number;
}

export const QRScanner: FC<QRScannerProps> = ({
  onScan,
  onError,
  className = "",
  width = 300,
  height = 300
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    return () => {
      // Nettoyage lors du démontage
      if (readerRef.current) {
        readerRef.current.reset();
      }
    };
  }, []);

  const startScanning = async () => {
    if (!videoRef.current) return;

    try {
      setError(null);
      setIsScanning(true);

      // Demander l'autorisation d'accès à la caméra
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" } // Utiliser la caméra arrière si disponible
      });

      setHasPermission(true);

      // Créer le reader ZXing
      const reader = new BrowserMultiFormatReader();
      readerRef.current = reader;

      // Démarrer le scan
      reader.decodeFromVideoDevice(
        null, // Utiliser la caméra par défaut
        videoRef.current,
        (result, error) => {
          if (result) {
            onScan(result.getText());
            stopScanning();
          }
        }
      );

    } catch (err) {
      console.error("Erreur lors du démarrage du scan:", err);
      let errorMessage = "Erreur lors de l'accès à la caméra";
      
      if (err instanceof Error) {
        if (err.name === "NotAllowedError") {
          errorMessage = "Permission d'accès à la caméra refusée";
          setHasPermission(false);
        } else if (err.name === "NotFoundError") {
          errorMessage = "Aucune caméra trouvée";
        } else if (err.name === "NotReadableError") {
          errorMessage = "Caméra utilisée par une autre application";
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      setIsScanning(false);
      onError?.(errorMessage);
    }
  };

  const stopScanning = () => {
    if (readerRef.current) {
      readerRef.current.reset();
      readerRef.current = null;
    }
    setIsScanning(false);
  };

  const retry = () => {
    setError(null);
    setHasPermission(null);
    startScanning();
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div 
        className="relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"
        style={{ width, height }}
      >
        {!isScanning && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
            <Icon name="Camera" size={48} color={ColorsEnum.TEXT_SECONDARY} />
            <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="mt-2 text-center">
              Cliquez sur démarrer pour scanner
            </Text>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 text-center p-4">
            <Icon name="AlertCircle" size={32} color={ColorsEnum.ERROR} />
            <Text variant="p3" color={ColorsEnum.ERROR} className="mt-2">
              {error}
            </Text>
            {hasPermission === false && (
              <div className="mt-3 space-y-2">
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                  Pour utiliser le scanner, veuillez :
                </Text>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Autoriser l'accès à la caméra</li>
                  <li>• Recharger la page</li>
                  <li>• Ou utiliser la saisie manuelle</li>
                </ul>
              </div>
            )}
          </div>
        )}

        <video
          ref={videoRef}
          className={`w-full h-full object-cover ${isScanning ? "block" : "hidden"}`}
          autoPlay
          playsInline
          muted
        />

        {isScanning && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Overlay de scan */}
            <div className="absolute inset-0 bg-black bg-opacity-50">
              <div className="absolute inset-8 border-2 border-white rounded-lg">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
              </div>
            </div>
            
            {/* Indicateur de scan */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <Text variant="p4" className="text-white">
                  Scan en cours...
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-3">
        {!isScanning && !error && (
          <Button
            appearance="solid"
            variation="primary"
            onClick={startScanning}
            className="flex items-center space-x-2"
          >
            <Icon name="Camera" size={16} />
            <span>Démarrer le scan</span>
          </Button>
        )}

        {isScanning && (
          <Button
            appearance="outline"
            variation="secondary"
            onClick={stopScanning}
            className="flex items-center space-x-2"
          >
            <Icon name="Square" size={16} />
            <span>Arrêter</span>
          </Button>
        )}

        {error && (
          <Button
            appearance="solid"
            variation="primary"
            onClick={retry}
            className="flex items-center space-x-2"
          >
            <Icon name="RefreshCw" size={16} />
            <span>Réessayer</span>
          </Button>
        )}
      </div>

      {isScanning && (
        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-center">
          Placez le QR code dans le cadre pour le scanner
        </Text>
      )}
    </div>
  );
};
