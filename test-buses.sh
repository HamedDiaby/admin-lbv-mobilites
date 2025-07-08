#!/bin/bash
echo "🔄 Nettoyage et redémarrage du serveur..."

# Aller au répertoire du projet
cd /Users/hameddiabykoumba/Desktop/entreprises/investBus/lbv-mobilites/admin-lbv-mobilites

# Tuer tous les processus sur le port 3000
echo "🛑 Arrêt des processus existants..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "Port 3000 libre"

# Nettoyer le cache
echo "🧹 Nettoyage du cache..."
rm -rf node_modules/.cache
rm -rf build

# Démarrer le serveur
echo "🚀 Démarrage du serveur..."
yarn start &

# Attendre que le serveur démarre
sleep 10

# Tester la route
echo "🧪 Test de la route /dashboard/buses..."
curl -s http://localhost:3000/dashboard/buses > /dev/null && echo "✅ Route /dashboard/buses accessible" || echo "❌ Route /dashboard/buses non accessible"

echo "🌐 Serveur accessible sur http://localhost:3000"
echo "🚌 Route des buses : http://localhost:3000/dashboard/buses"
