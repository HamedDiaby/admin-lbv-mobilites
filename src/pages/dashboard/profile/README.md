# Page Profile

## 📋 Description
Page de profil utilisateur affichant les informations personnelles et les paramètres de compte.

## 🔧 Fonctionnalités
- ✅ Affichage des informations utilisateur (nom, prénom, email, rôle)
- ✅ Informations sur le département et la dernière connexion
- ✅ Paramètres du compte (statut, permissions)
- ✅ Actions rapides (modifier profil, changer mot de passe)
- ✅ Design responsive avec thème Gabon

## 📍 Navigation
- **URL**: `/dashboard/profile`
- **Sidebar**: Item "Mon profil" avec icône User
- **Header**: Menu utilisateur → "Mon profil"

## 🎨 Composants utilisés
- `Card` - Conteneurs des sections
- `Text` - Typographie
- `Icon` - Icônes Lucide
- `Button` - Actions utilisateur

## 📱 Responsive
- Mobile-first design
- Grille adaptative pour les informations
- Espacement optimisé sur tous les écrans

## 🔗 Intégration
- Utilise `useAuth()` pour récupérer les données utilisateur
- Intégrée dans le routing dashboard
- Accessible via sidebar et menu header
