# 🚌 Système de Gestion des Bus - LBV Mobilités

## 🎯 Fonctionnalités principales

### 📊 **Page Bus** (`/dashboard/buses`)
- **Tableau avancé** avec pagination, recherche et tri
- **Colonnes** : Numéro, Plaque, Marque/Modèle, Capacité, Carburant, Statut, Score santé
- **Actions** : Voir détails, Modifier, Supprimer
- **Filtres** : Statut, Carburant, Station, État de santé

### ➕ **Ajout de Bus**
- **Informations principales** : Numéro, Plaque d'immatriculation, Capacité, Carburant
- **Détails véhicule** : Marque, Modèle, Année, Couleur
- **Affectation** : Station d'affectation (optionnel)
- **Validation** : Format plaque (AB-123-CD), années, capacités

### 🔍 **Détails Bus avec OBD2**
- **Informations véhicule** complètes
- **Données OBD2 en temps réel** (mise à jour toutes les 3 secondes) :
  - 🏎️ Vitesse actuelle
  - 🌡️ Température moteur avec alertes colorées
  - ⚡ Régime moteur (RPM)
  - 🛢️ Pression huile
  - ⛽ Niveau et consommation carburant
  - 🛞 Pression des pneus (4 roues)
  - 🔋 Batterie (tension, charge)
  - 📊 Score d'état de santé (0-100)
  - 🚨 Alertes et diagnostics
  - 🔧 Prochaine maintenance

### 🎨 **Interface utilisateur**
- **Indicateurs colorés** selon les seuils de sécurité
- **Badges dynamiques** pour les statuts
- **Mise à jour temps réel** avec indicateur LIVE
- **Design responsive** pour mobile et desktop

## 📋 **Données Bus**

### 🚌 **Informations de base**
- **Numéro** : Identifiant unique du bus
- **Plaque** : Immatriculation (format AB-123-CD)
- **Capacité** : Nombre de passagers
- **Carburant** : Diesel, Essence, Électrique, Hybride
- **Marque/Modèle** : Mercedes, Volvo, Iveco, etc.
- **Année** : Année de fabrication
- **Couleur** : Couleur principale
- **Station** : Station d'affectation

### 📡 **Données OBD2 temps réel**
- **Moteur** : Température, régime, pression huile
- **Carburant** : Niveau, consommation instantanée/moyenne
- **Sécurité** : Pression pneus, état batterie
- **Maintenance** : Score santé, alertes, diagnostics
- **Géolocalisation** : Position GPS (optionnel)

## 🛠️ **Fonctionnalités techniques**

### 🔄 **Simulation temps réel**
- Génération de données OBD2 aléatoires
- Mise à jour automatique toutes les 3 secondes
- Alertes basées sur des seuils prédéfinis

### 🎯 **Filtres et recherche**
- Recherche par numéro, plaque, marque
- Filtres multiples : statut, carburant, station
- Tri par colonnes
- Pagination intelligente

### 📱 **Responsive Design**
- Adapté mobile et desktop
- Modals responsive
- Navigation tactile

## 🚀 **Démarrage**

Pour démarrer le serveur avec toutes les fonctionnalités :

```bash
cd /Users/hameddiabykoumba/Desktop/entreprises/investBus/lbv-mobilites/admin-lbv-mobilites
./start-buses.sh
```

Ou manuellement :
```bash
yarn start
```

Accédez à : **http://localhost:3000/dashboard/buses**

## 🔮 **Évolutions futures**

- **API OBD2 réelle** : Intégration avec de vrais capteurs
- **Alertes push** : Notifications en temps réel
- **Historique** : Stockage des données de santé
- **Rapports** : Génération de rapports de maintenance
- **Géofencing** : Alertes de zone géographique
- **Machine Learning** : Prédiction de pannes

---

✨ **Le système est maintenant prêt et fonctionnel !** ✨
