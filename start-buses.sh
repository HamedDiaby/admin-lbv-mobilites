#!/bin/bash
echo "🚌 Démarrage du serveur avec la section Bus complète..."

cd /Users/hameddiabykoumba/Desktop/entreprises/investBus/lbv-mobilites/admin-lbv-mobilites

# Arrêter les processus existants
echo "🛑 Arrêt des processus existants..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "Port 3000 libre"

# Nettoyer le cache
echo "🧹 Nettoyage du cache..."
rm -rf node_modules/.cache 2>/dev/null || true

# Démarrer le serveur
echo "🚀 Démarrage du serveur..."
yarn start &

# Attendre le démarrage
echo "⏳ Attente du démarrage du serveur..."
sleep 15

echo ""
echo "🎉 Serveur démarré avec succès !"
echo "🌐 Accédez à l'application : http://localhost:3000"
echo "🚌 Section Bus : http://localhost:3000/dashboard/buses"
echo ""
echo "✨ Fonctionnalités disponibles :"
echo "  - 📊 Tableau avec pagination, recherche et tri"
echo "  - ➕ Bouton d'ajout de bus"
echo "  - 🔍 Filtres par statut, carburant, station"
echo "  - 📱 Informations OBD2 en temps réel"
echo "  - 🏥 Monitoring de l'état de santé des bus"
echo ""
