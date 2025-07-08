#!/bin/bash
echo "Arrêt des processus sur le port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "Port 3000 libre"

echo "Nettoyage du cache..."
cd /Users/hameddiabykoumba/Desktop/entreprises/investBus/lbv-mobilites/admin-lbv-mobilites
rm -rf node_modules/.cache

echo "Démarrage du serveur..."
yarn start
