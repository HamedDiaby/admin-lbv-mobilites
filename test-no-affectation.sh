#!/bin/bash
echo "✅ Section 'Affectation (optionnel)' retirée avec succès !"
echo ""
echo "🔧 Modifications apportées :"
echo "  - ❌ Suppression de la section 'Affectation (optionnel)' du modal d'ajout"
echo "  - ❌ Retrait du champ 'stationId' du formulaire"
echo "  - ❌ Suppression de la prop 'stations' du composant AddBusModal"
echo "  - ❌ Nettoyage des types NewBusData et BusFormErrors"
echo ""
echo "📋 Champs restants dans le formulaire :"
echo "  ✅ Numéro du bus"
echo "  ✅ Plaque d'immatriculation"
echo "  ✅ Capacité"
echo "  ✅ Type de carburant"
echo "  ✅ Marque"
echo "  ✅ Modèle"
echo "  ✅ Année"
echo "  ✅ Couleur"
echo ""
echo "🚀 Démarrage du serveur..."

cd /Users/hameddiabykoumba/Desktop/entreprises/investBus/lbv-mobilites/admin-lbv-mobilites

# Arrêter les processus existants
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "Port 3000 libre"

# Nettoyer le cache
rm -rf node_modules/.cache 2>/dev/null || true

# Démarrer le serveur
yarn start &

echo ""
echo "🌐 Serveur accessible sur : http://localhost:3000"
echo "🚌 Section Bus : http://localhost:3000/dashboard/buses"
echo "➕ Testez le bouton 'Ajouter un bus' pour voir le formulaire simplifié"
