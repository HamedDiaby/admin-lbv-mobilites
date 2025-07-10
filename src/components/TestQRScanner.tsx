import { QRScanner } from "./QRScanner";

// Test basique du composant QRScanner
export const TestQRScanner = () => {
  const handleScan = (result: string) => {
    console.log("QR Code scanné:", result);
  };

  const handleError = (error: string) => {
    console.error("Erreur de scan:", error);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Test QR Scanner</h2>
      <QRScanner
        onScan={handleScan}
        onError={handleError}
        width={400}
        height={300}
      />
    </div>
  );
};
