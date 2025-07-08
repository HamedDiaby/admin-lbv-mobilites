#!/bin/bash
cd /Users/hameddiabykoumba/Desktop/entreprises/investBus/lbv-mobilites/admin-lbv-mobilites
nohup yarn start > /dev/null 2>&1 &
echo "Serveur démarré en arrière-plan"
echo "Accédez à http://localhost:3000"
