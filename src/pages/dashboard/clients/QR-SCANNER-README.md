# Système de Scanner QR - Client Management

Ce système permet de scanner et vérifier les QR codes des clients pour valider leurs abonnements.

## Fonctionnalités

### 1. Scanner QR Code
- **Scanner caméra** : Utilise la caméra pour scanner automatiquement les QR codes
- **Saisie manuelle** : Permet la saisie manuelle du code QR
- **Vérification automatique** : Vérifie automatiquement l'abonnement après le scan

### 2. Vérification des abonnements
- Validation du QR code client
- Vérification du statut d'abonnement
- Contrôle des voyages restants
- Validation des lignes autorisées

### 3. Gestion des erreurs
- Gestion des permissions de caméra
- Messages d'erreur explicites
- Fallback vers la saisie manuelle

## Composants

### QRScanner
Composant réutilisable pour scanner les QR codes via la caméra.

```tsx
import { QRScanner } from "../components/QRScanner";

<QRScanner
  onScan={(result) => console.log("QR Code:", result)}
  onError={(error) => console.error("Erreur:", error)}
  width={400}
  height={300}
/>
```

### QRScannerModal
Modal complète pour la vérification des abonnements clients.

```tsx
import { QRScannerModal } from "./QRScannerModal";

<QRScannerModal
  isOpen={isOpen}
  onClose={onClose}
  onScanSuccess={(result) => console.log("Vérification:", result)}
/>
```

## QR Codes de test

Pour tester le système, utilisez ces codes :

- `QR_ABO_001_DEC2024` : Abonnement mensuel standard valide
- `QR_ABO_002_DEC2024` : Abonnement étudiant valide
- Tout autre code : Invalide

## Permissions requises

Le scanner nécessite l'autorisation d'accès à la caméra :

1. Le navigateur demandera automatiquement l'autorisation
2. Si refusée, un message d'erreur apparaîtra
3. L'utilisateur peut basculer vers la saisie manuelle

## Technologies utilisées

- **@zxing/library** : Décodage des QR codes
- **React Hooks** : Gestion de l'état et des effets
- **MediaDevices API** : Accès à la caméra
- **TypeScript** : Typage strict

## Débogage

### Erreurs communes

1. **Permission refusée** : L'utilisateur a refusé l'accès à la caméra
2. **Caméra indisponible** : Aucune caméra détectée
3. **Caméra occupée** : Utilisée par une autre application

### Solutions

- Vérifier les permissions dans les paramètres du navigateur
- Utiliser la saisie manuelle comme fallback
- Recharger la page pour redemander les permissions
