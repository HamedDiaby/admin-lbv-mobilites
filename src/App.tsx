import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Icon } from './components';
import { Button } from './components/button';
import { Text } from './components/text';
import { Card } from './components/card';
import { Input } from './components/input';
import { Select } from './components/select';
import { Checkbox } from './components/checkbox';
import { Switch } from './components/switch';
import { Badge } from './components/badge';
import { Modal } from './components/modal';
import { ModalConfirm } from './components/modalConfirm';
import { Table } from './components/table';
import { ColorsEnum } from './utils/enums';

function App() {
  // État pour les exemples de Select
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedAccess, setSelectedAccess] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('bus');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('');
  
  // État pour les exemples de Checkbox
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // État pour les exemples de Switch
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  
  // État pour les exemples de Modal
  const [modalBasic, setModalBasic] = useState(false);
  const [modalWithTitle, setModalWithTitle] = useState(false);
  const [modalSmall, setModalSmall] = useState(false);
  const [modalLarge, setModalLarge] = useState(false);
  const [modalFullWidth, setModalFullWidth] = useState(false);
  const [modalWithForm, setModalWithForm] = useState(false);
  const [modalPosition, setModalPosition] = useState(false);
  const [modalMaxHeight, setModalMaxHeight] = useState(false);
  const [modalAnimated, setModalAnimated] = useState(false);
  
  // État pour les exemples de ModalConfirm
  const [confirmSuccess, setConfirmSuccess] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [confirmWarning, setConfirmWarning] = useState(false);
  const [confirmInfo, setConfirmInfo] = useState(false);
  const [confirmQuestion, setConfirmQuestion] = useState(false);
  const [confirmCustom, setConfirmCustom] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  
  // Données d'exemple pour les tables
  const usersData = [
    { 
      id: '1', 
      name: 'Jean Dupont', 
      email: 'jean.dupont@example.com', 
      role: 'Administrateur',
      status: 'Actif',
      lastLogin: '2025-07-01T10:30:00'
    },
    { 
      id: '2', 
      name: 'Marie Lambert', 
      email: 'marie.lambert@example.com', 
      role: 'Éditeur',
      status: 'Actif',
      lastLogin: '2025-06-28T14:45:00'
    },
    { 
      id: '3', 
      name: 'Pierre Martin', 
      email: 'pierre.martin@example.com', 
      role: 'Utilisateur',
      status: 'Inactif',
      lastLogin: '2025-05-15T09:20:00'
    },
    { 
      id: '4', 
      name: 'Sophie Dubois', 
      email: 'sophie.dubois@example.com', 
      role: 'Administrateur',
      status: 'En attente',
      lastLogin: '2025-06-30T16:15:00'
    },
    { 
      id: '5', 
      name: 'Thomas Bernard', 
      email: 'thomas.bernard@example.com', 
      role: 'Utilisateur',
      status: 'Actif',
      lastLogin: '2025-07-01T08:50:00'
    }
  ];
  
  const vehiclesData = [
    {
      id: 'V001',
      type: 'Bus',
      registration: 'LBV-2025-A1',
      capacity: 45,
      status: 'En service',
      lastMaintenance: '2025-06-15'
    },
    {
      id: 'V002',
      type: 'Minibus',
      registration: 'LBV-2025-B2',
      capacity: 22,
      status: 'En service',
      lastMaintenance: '2025-06-20'
    },
    {
      id: 'V003',
      type: 'Bus électrique',
      registration: 'LBV-2025-E3',
      capacity: 40,
      status: 'En maintenance',
      lastMaintenance: '2025-07-01'
    }
  ];
  
  // État pour la table avec données de chargement
  const [tableLoading, setTableLoading] = useState(false);
  
  return (
    <div className="min-h-screen bg-green flex flex-col items-center justify-center">
      <header className="p-6 bg-white shadow-md rounded-lg border-4 border-yellow">
        <img src={logo} className="h-20 w-20 animate-spin mb-4" alt="logo" />
        <p className="text-blue font-bold mb-4">
          Edit <code className="bg-yellow p-1 rounded text-green">src/App.tsx</code> and save to reload.
        </p>
        
        <div className="flex items-center space-x-6 mb-6">
          <div className="flex flex-col items-center">
            <Icon name="Activity" size={24} color={ColorsEnum.BLUE} />
            <p className="text-sm mt-2">Activity</p>
          </div>
          
          <div className="flex flex-col items-center">
            <Icon name="AlertCircle" size={24} color={ColorsEnum.ERROR} />
            <p className="text-sm mt-2">Alert</p>
          </div>
          
          <div className="flex flex-col items-center">
            <Icon name="Check" size={24} color={ColorsEnum.SUCCESS} />
            <p className="text-sm mt-2">Check</p>
          </div>
          
          <div className="flex flex-col items-center">
            <Icon name="Settings" size={24} color={ColorsEnum.SECONDARY} strokeWidth={1.5} />
            <p className="text-sm mt-2">Settings</p>
          </div>
        </div>
        
        <a
          className="text-blue hover:text-green underline font-bold flex items-center mb-8"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          <Icon name="ExternalLink" className="ml-2" size={18} color={ColorsEnum.BLUE} />
        </a>
        
        {/* Exemples de boutons */}
        <h3 className="text-lg font-bold mb-4">Exemples de boutons</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button 
            label="Bouton Primary" 
            appearance="solid" 
            variation="primary"
            iconName="Save"
            iconPosition="left"
          />
          
          <Button 
            label="Bouton Secondary" 
            appearance="solid" 
            variation="secondary"
            iconName="Settings"
          />
          
          <Button 
            label="Outline Success" 
            appearance="outline" 
            variation="success"
            iconName="CheckCircle"
          />
          
          <Button 
            label="Clear Error" 
            appearance="clear" 
            variation="error"
            iconName="AlertTriangle"
          />
          
          <Button 
            label="Bouton Arrondi" 
            appearance="solid" 
            variation="warning"
            rounded
          />
          
          <Button 
            label="Taille Large" 
            appearance="solid" 
            variation="info"
            size="lg"
          />
          
          <Button 
            label="Full Width Disabled" 
            appearance="outline" 
            variation="primary"
            fullWidth
            disabled
          />
          
          <Button 
            label="Chargement..." 
            appearance="solid" 
            variation="tertiary"
            loading
          />
        </div>
        
        {/* Exemples de texte */}
        <h3 className="text-lg font-bold mb-4">Exemples de texte</h3>
        
        <div className="space-y-4 mb-6 border p-4 rounded-lg">
          <Text variant="h1" weight="bold" color={ColorsEnum.PRIMARY}>
            Titre H1 en gras bleu
          </Text>
          
          <Text variant="h2" weight="semibold" color={ColorsEnum.SECONDARY}>
            Titre H2 semi-gras vert
          </Text>
          
          <Text variant="h3" color={ColorsEnum.TERTIARY} transform="uppercase">
            Titre H3 en majuscules jaune
          </Text>
          
          <Text variant="p1" weight="medium">
            Paragraphe P1 avec poids médium. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          
          <Text variant="p2" italic color={ColorsEnum.INFO}>
            Paragraphe P2 en italique et couleur info.
          </Text>
          
          <Text variant="p3" decoration="underline" color={ColorsEnum.SUCCESS}>
            Paragraphe P3 souligné en couleur success.
          </Text>
          
          <Text variant="p4" align="center" color={ColorsEnum.ERROR}>
            Paragraphe P4 centré en couleur d'erreur.
          </Text>
          
          <Text variant="p5" truncate maxLines={2} style={{width: '80%'}}>
            Paragraphe P5 avec troncature après 2 lignes. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
        </div>
        
        {/* Exemples de cartes */}
        <h3 className="text-lg font-bold mb-4">Exemples de cartes</h3>
        
        <div className="space-y-6 mb-6">
          {/* Carte simple */}
          <Card title="Carte simple" subtitle="Avec titre et sous-titre">
            <Text variant="p2">
              Contenu principal de la carte. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </Card>
          
          {/* Carte avec contenu à droite */}
          <Card 
            title="Carte avec actions" 
            subtitle="Avec bouton à droite du titre"
            rightContent={
              <Button 
                label="Action" 
                appearance="clear" 
                variation="primary" 
                size="sm"
                iconName="MoreHorizontal"
              />
            }
          >
            <Text variant="p2">
              Cette carte a un bouton d'action positionné à droite du titre.
            </Text>
          </Card>
          
          {/* Carte avec bordure colorée */}
          <Card 
            title="Carte avec bordure colorée" 
            elevation="sm"
            borderColor={ColorsEnum.PRIMARY}
            rounded="lg"
          >
            <Text variant="p2">
              Cette carte a une bordure bleue et des coins plus arrondis.
            </Text>
          </Card>
          
          {/* Carte avec fond coloré */}
          <Card 
            title="Carte avec fond coloré"
            bgColor={ColorsEnum.GREEN_LIGHT}
            border={false}
            padding="lg"
          >
            <Text variant="p2" color={ColorsEnum.TEXT_PRIMARY}>
              Cette carte a un fond vert clair, pas de bordure et plus de padding.
            </Text>
          </Card>
          
          {/* Carte sans titre */}
          <Card elevation="xl">
            <Text variant="p2">
              Cette carte n'a pas de titre, seulement du contenu et une ombre plus prononcée.
            </Text>
          </Card>
        </div>
        
        {/* Exemples d'inputs */}
        <h3 className="text-lg font-bold mb-4">Exemples de champs de saisie</h3>
        
        <div className="space-y-4 mb-6">
          {/* Input texte simple */}
          <Input 
            type="text" 
            label="Champ de texte" 
            placeholder="Entrez du texte" 
            helperText="Ceci est un champ de texte standard"
          />
          
          {/* Input avec icône */}
          <Input 
            type="text" 
            label="Recherche" 
            placeholder="Rechercher..." 
            iconName="Search"
            iconPosition="left"
          />
          
          {/* Input mot de passe */}
          <Input 
            type="password" 
            label="Mot de passe" 
            placeholder="Entrez votre mot de passe" 
            required
          />
          
          {/* Input date */}
          <Input 
            type="date" 
            label="Date" 
            iconName="Calendar"
            iconPosition="right"
          />
          
          {/* Input time */}
          <Input 
            type="time" 
            label="Heure" 
            iconName="Clock"
            iconPosition="right"
          />
          
          {/* Textarea */}
          <Input 
            type="textarea" 
            label="Commentaire" 
            placeholder="Écrivez votre commentaire ici..." 
            rows={4}
          />
          
          {/* Input avec état d'erreur */}
          <Input 
            type="text" 
            label="Email" 
            placeholder="exemple@email.com" 
            error="Veuillez entrer une adresse email valide"
            iconName="Mail"
          />
          
          {/* Input avec état de succès */}
          <Input 
            type="text" 
            label="Nom d'utilisateur" 
            placeholder="Nom d'utilisateur" 
            success
            iconName="User"
          />
          
          {/* Input désactivé */}
          <Input 
            type="text" 
            label="Champ désactivé" 
            placeholder="Non modifiable" 
            disabled
            value="Valeur non modifiable"
          />
          
          {/* Input en lecture seule */}
          <Input 
            type="text" 
            label="Champ en lecture seule" 
            readOnly
            value="Valeur en lecture seule"
          />
        </div>
        
        {/* Exemples de sélecteurs */}
        <h3 className="text-lg font-bold mb-4">Exemples de sélecteurs</h3>
        
        <div className="space-y-4 mb-6">
          {/* Select simple */}
          <Select 
            label="Sélectionnez une option"
            options={[
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
              { value: "option3", label: "Option 3" }
            ]}
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            helperText={`Ceci est un sélecteur standard${selectedOption ? ` (Valeur: ${selectedOption})` : ''}`}
          />
          
          {/* Select avec icône */}
          <Select 
            label="Pays"
            iconName="Globe"
            options={[
              { value: "gabon", label: "Gabon" },
              { value: "france", label: "France" },
              { value: "canada", label: "Canada" },
              { value: "usa", label: "États-Unis" }
            ]}
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          />
          
          {/* Select avec option désactivée */}
          <Select 
            label="Niveau d'accès"
            options={[
              { value: "user", label: "Utilisateur" },
              { value: "editor", label: "Éditeur" },
              { value: "admin", label: "Administrateur" },
              { value: "superadmin", label: "Super Admin", disabled: true }
            ]}
            value={selectedAccess}
            onChange={(e) => setSelectedAccess(e.target.value)}
          />
          
          {/* Select avec état d'erreur */}
          <Select 
            label="Catégorie"
            options={[
              { value: "cat1", label: "Catégorie 1" },
              { value: "cat2", label: "Catégorie 2" },
              { value: "cat3", label: "Catégorie 3" }
            ]}
            error="Veuillez sélectionner une catégorie valide"
            iconName="FolderOpen"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
          
          {/* Select avec état de succès */}
          <Select 
            label="Type de véhicule"
            options={[
              { value: "bus", label: "Bus" },
              { value: "car", label: "Voiture" },
              { value: "train", label: "Train" },
              { value: "boat", label: "Bateau" }
            ]}
            success
            iconName="Bus"
            value="bus"
          />
          
          {/* Select désactivé */}
          <Select 
            label="Sélecteur désactivé"
            options={[
              { value: "opt1", label: "Option 1" },
              { value: "opt2", label: "Option 2" }
            ]}
            disabled
            value="opt1"
          />
          
          {/* Select requis */}
          <Select 
            label="Langue"
            options={[
              { value: "fr", label: "Français" },
              { value: "en", label: "Anglais" },
              { value: "es", label: "Espagnol" }
            ]}
            required
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          />
          
          {/* Select multiple */}
          <Select 
            label="Compétences"
            options={[
              { value: "js", label: "JavaScript" },
              { value: "ts", label: "TypeScript" },
              { value: "react", label: "React" },
              { value: "vue", label: "Vue.js" },
              { value: "angular", label: "Angular" },
              { value: "node", label: "Node.js" }
            ]}
            multiple
            size={4}
            helperText={`Maintenez Ctrl (ou Cmd) pour sélectionner plusieurs options. Sélectionnées: ${selectedSkills.length}`}
            onChange={(e) => {
              const options = e.target.options;
              const values: string[] = [];
              for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                  values.push(options[i].value);
                }
              }
              setSelectedSkills(values);
            }}
          />
          
          {/* Select avec largeur pleine */}
          <Select 
            label="Projet"
            options={[
              { value: "proj1", label: "Projet Alpha" },
              { value: "proj2", label: "Projet Beta" },
              { value: "proj3", label: "Projet Gamma" },
              { value: "proj4", label: "Projet Delta" }
            ]}
            fullWidth
            iconName="Briefcase"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          />
        </div>
        
        {/* Exemples de checkboxes */}
        <h3 className="text-lg font-bold mb-4">Exemples de checkboxes</h3>
        
        <div className="space-y-4 mb-6">
          {/* Checkbox simple */}
          <Checkbox 
            label="Checkbox basique"
            checked={checked1}
            onChange={(e) => setChecked1(e.target.checked)}
            helperText="Ceci est un checkbox standard"
          />
          
          {/* Checkbox pré-coché */}
          <Checkbox 
            label="Checkbox coché"
            checked={checked2}
            onChange={(e) => setChecked2(e.target.checked)}
            success
          />
          
          {/* Checkbox avec erreur */}
          <Checkbox 
            label="Checkbox avec erreur"
            checked={checked3}
            onChange={(e) => setChecked3(e.target.checked)}
            error="Veuillez accepter les conditions"
            required
          />
          
          {/* Checkbox indéterminé */}
          <Checkbox 
            label="Checkbox indéterminé (état intermédiaire)"
            indeterminate={indeterminate}
            checked={false}
            onChange={() => setIndeterminate(!indeterminate)}
            color={ColorsEnum.TERTIARY}
          />
          
          {/* Checkbox désactivé */}
          <Checkbox 
            label="Checkbox désactivé"
            checked={true}
            disabled
          />
          
          {/* Checkbox taille lg */}
          <Checkbox 
            label="Checkbox grande taille"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            size="lg"
            color={ColorsEnum.BLUE}
          />
          
          {/* Checkbox taille sm */}
          <Checkbox 
            label="Checkbox petite taille"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            size="sm"
            color={ColorsEnum.GREEN}
          />
        </div>
        
        {/* Exemples de switches */}
        <h3 className="text-lg font-bold mb-4">Exemples de switches</h3>
        
        <div className="space-y-4 mb-6">
          {/* Switch simple */}
          <Switch 
            label="Switch basique"
            checked={switch1}
            onChange={(e) => setSwitch1(e.target.checked)}
            helperText="Ceci est un switch standard"
          />
          
          {/* Switch avec état activé */}
          <Switch 
            label="Switch activé"
            checked={switch2}
            onChange={(e) => setSwitch2(e.target.checked)}
            success
            onText="ON"
            offText="OFF"
          />
          
          {/* Switch avec libellé à gauche */}
          <Switch 
            label="Mode sombre"
            labelPosition="left"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            color={ColorsEnum.TERTIARY}
          />
          
          {/* Switch avec erreur */}
          <Switch 
            label="Notifications"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            error="Les notifications sont requises pour cette fonction"
            required
          />
          
          {/* Switch désactivé */}
          <Switch 
            label="Switch désactivé"
            checked={true}
            disabled
          />
          
          {/* Switch grande taille */}
          <Switch 
            label="Sauvegarde automatique"
            checked={autoSave}
            onChange={(e) => setAutoSave(e.target.checked)}
            size="lg"
            color={ColorsEnum.SUCCESS}
          />
          
          {/* Switch petite taille */}
          <Switch 
            label="Option compacte"
            checked={autoSave}
            onChange={(e) => setAutoSave(e.target.checked)}
            size="sm"
            color={ColorsEnum.INFO}
          />
        </div>
        
        {/* Exemples de badges */}
        <h3 className="text-lg font-bold mb-4">Exemples de badges</h3>
        
        <div className="space-y-6 mb-6">
          {/* Badges par variante */}
          <div className="flex flex-wrap gap-3">
            <Badge variant="solid" color={ColorsEnum.PRIMARY}>Badge solide</Badge>
            <Badge variant="outline" color={ColorsEnum.SECONDARY}>Badge contour</Badge>
            <Badge variant="soft" color={ColorsEnum.TERTIARY}>Badge doux</Badge>
            <Badge variant="solid" color={ColorsEnum.SUCCESS}>Succès</Badge>
            <Badge variant="solid" color={ColorsEnum.ERROR}>Erreur</Badge>
            <Badge variant="solid" color={ColorsEnum.WARNING}>Attention</Badge>
            <Badge variant="solid" color={ColorsEnum.INFO}>Information</Badge>
          </div>
          
          {/* Badges avec icônes */}
          <div className="flex flex-wrap gap-3">
            <Badge variant="solid" color={ColorsEnum.PRIMARY} iconName="CheckCircle" iconPosition="left">Validé</Badge>
            <Badge variant="outline" color={ColorsEnum.ERROR} iconName="AlertTriangle" iconPosition="left">Alerte</Badge>
            <Badge variant="soft" color={ColorsEnum.INFO} iconName="Info" iconPosition="right">Information</Badge>
          </div>
          
          {/* Badges par taille */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="solid" color={ColorsEnum.PRIMARY} size="xs">XS</Badge>
            <Badge variant="solid" color={ColorsEnum.PRIMARY} size="sm">SM</Badge>
            <Badge variant="solid" color={ColorsEnum.PRIMARY} size="md">MD</Badge>
            <Badge variant="solid" color={ColorsEnum.PRIMARY} size="lg">LG</Badge>
          </div>
          
          {/* Badges arrondis */}
          <div className="flex flex-wrap gap-3">
            <Badge variant="solid" color={ColorsEnum.SUCCESS} rounded>Terminé</Badge>
            <Badge variant="outline" color={ColorsEnum.WARNING} rounded>En attente</Badge>
            <Badge variant="soft" color={ColorsEnum.ERROR} rounded>Annulé</Badge>
          </div>
          
          {/* Badges avec points */}
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <Badge dot color={ColorsEnum.SUCCESS} className="mr-2" />
              <span>En ligne</span>
            </div>
            <div className="flex items-center">
              <Badge dot color={ColorsEnum.WARNING} className="mr-2" />
              <span>Absent</span>
            </div>
            <div className="flex items-center">
              <Badge dot color={ColorsEnum.ERROR} className="mr-2" />
              <span>Hors ligne</span>
            </div>
          </div>
          
          {/* Badges numériques */}
          <div className="flex flex-wrap gap-3">
            <Badge variant="solid" color={ColorsEnum.PRIMARY} rounded>1</Badge>
            <Badge variant="solid" color={ColorsEnum.SECONDARY} rounded>25</Badge>
            <Badge variant="solid" color={ColorsEnum.ERROR} rounded maxCount={99} showCountOverflow={true}>125</Badge>
          </div>
          
          {/* Badges avec bordures */}
          <div className="flex flex-wrap gap-3 bg-gray-100 p-3 rounded">
            <Badge variant="solid" color={ColorsEnum.PRIMARY} bordered>Bordé</Badge>
            <Badge variant="solid" color={ColorsEnum.SECONDARY} bordered rounded>Arrondi</Badge>
          </div>
          
          {/* Badges cliquables */}
          <div className="flex flex-wrap gap-3">
            <Badge variant="solid" color={ColorsEnum.PRIMARY} clickable>Cliquable</Badge>
            <Badge variant="outline" color={ColorsEnum.SECONDARY} clickable iconName="X" iconPosition="right">Fermer</Badge>
          </div>
        </div>
        
        {/* Exemples de modales */}
        <h3 className="text-lg font-bold mb-4">Exemples de modales</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button 
            label="Modal basique" 
            appearance="solid" 
            variation="primary"
            onClick={() => setModalBasic(true)}
          />
          
          <Button 
            label="Modal avec titre" 
            appearance="solid" 
            variation="secondary"
            onClick={() => setModalWithTitle(true)}
          />
          
          <Button 
            label="Modal petite" 
            appearance="solid" 
            variation="tertiary"
            onClick={() => setModalSmall(true)}
          />
          
          <Button 
            label="Modal large" 
            appearance="solid" 
            variation="info"
            onClick={() => setModalLarge(true)}
          />
          
          <Button 
            label="Modal pleine largeur" 
            appearance="solid" 
            variation="warning"
            onClick={() => setModalFullWidth(true)}
          />
          
          <Button 
            label="Modal avec formulaire" 
            appearance="solid" 
            variation="success"
            onClick={() => setModalWithForm(true)}
          />
          
          <Button 
            label="Modal en haut" 
            appearance="solid" 
            variation="error"
            onClick={() => setModalPosition(true)}
          />
          
          <Button 
            label="Modal avec hauteur max" 
            appearance="solid" 
            variation="primary"
            onClick={() => setModalMaxHeight(true)}
          />
          
          <Button 
            label="Modal avec animation" 
            appearance="solid" 
            variation="secondary"
            onClick={() => setModalAnimated(true)}
          />
        </div>
        
        {/* Modales */}
        
        {/* Modal basique */}
        <Modal 
          isOpen={modalBasic} 
          onClose={() => setModalBasic(false)}
        >
          <div className="p-2">
            <Text variant="p2">
              C'est une modal basique sans titre. Cliquez sur la croix en haut à droite pour la fermer.
            </Text>
            <div className="mt-4 flex justify-end">
              <Button 
                label="Fermer" 
                appearance="outline" 
                variation="primary" 
                onClick={() => setModalBasic(false)}
              />
            </div>
          </div>
        </Modal>
        
        {/* Modal avec titre */}
        <Modal 
          isOpen={modalWithTitle} 
          onClose={() => setModalWithTitle(false)}
          title="Titre de la modal"
        >
          <div className="p-2">
            <Text variant="p2">
              Cette modal possède un titre et une croix de fermeture intégrée dans l'en-tête.
            </Text>
            <Text variant="p2" className="mt-2">
              L'en-tête est séparé du contenu par une bordure légère.
            </Text>
            <div className="mt-4 flex justify-end space-x-2">
              <Button 
                label="Annuler" 
                appearance="outline" 
                variation="secondary" 
                onClick={() => setModalWithTitle(false)}
              />
              <Button 
                label="Confirmer" 
                appearance="solid" 
                variation="primary"
                onClick={() => setModalWithTitle(false)} 
              />
            </div>
          </div>
        </Modal>
        
        {/* Modal petite */}
        <Modal 
          isOpen={modalSmall} 
          onClose={() => setModalSmall(false)}
          title="Modal compacte"
          size="xs"
          centerTitle
        >
          <div className="text-center p-2">
            <Icon name="AlertCircle" size={48} color={ColorsEnum.WARNING} className="mx-auto mb-4" />
            <Text variant="p1" weight="medium">
              Confirmation
            </Text>
            <Text variant="p3" className="my-2">
              Êtes-vous sûr de vouloir continuer ?
            </Text>
            <div className="mt-4 flex justify-center space-x-2">
              <Button 
                label="Non" 
                appearance="outline" 
                variation="secondary" 
                onClick={() => setModalSmall(false)}
              />
              <Button 
                label="Oui" 
                appearance="solid" 
                variation="warning"
                onClick={() => setModalSmall(false)} 
              />
            </div>
          </div>
        </Modal>
        
        {/* Modal large */}
        <Modal 
          isOpen={modalLarge} 
          onClose={() => setModalLarge(false)}
          title="Modal large"
          size="xl"
        >
          <div>
            <Text variant="p2">
              Cette modal est plus large que la taille par défaut. Elle est idéale pour afficher plus de contenu.
            </Text>
            <div className="bg-background-light p-4 rounded-md my-4">
              <Text variant="p3" className="mb-2 font-medium">
                Exemple de contenu supplémentaire
              </Text>
              <Text variant="p4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies ultricies, 
                nisl nisl ultricies nisl, eget ultricies nisl nisl eget nisl. Nullam euismod, nisl eget ultricies ultricies,
                nisl nisl ultricies nisl, eget ultricies nisl nisl eget nisl.
              </Text>
            </div>
            <div className="mt-4 flex justify-end">
              <Button 
                label="Fermer" 
                appearance="solid" 
                variation="primary" 
                onClick={() => setModalLarge(false)}
              />
            </div>
          </div>
        </Modal>
        
        {/* Modal pleine largeur */}
        <Modal 
          isOpen={modalFullWidth} 
          onClose={() => setModalFullWidth(false)}
          title="Modal pleine largeur"
          size="full"
        >
          <div>
            <Text variant="p2">
              Cette modal utilise presque toute la largeur de l'écran avec une petite marge sur les côtés.
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
              <Card title="Section 1">
                <Text variant="p4">Contenu de la section 1</Text>
              </Card>
              <Card title="Section 2">
                <Text variant="p4">Contenu de la section 2</Text>
              </Card>
              <Card title="Section 3">
                <Text variant="p4">Contenu de la section 3</Text>
              </Card>
            </div>
            <div className="mt-4 flex justify-end">
              <Button 
                label="Fermer" 
                appearance="solid" 
                variation="primary" 
                onClick={() => setModalFullWidth(false)}
              />
            </div>
          </div>
        </Modal>
        
        {/* Modal avec formulaire */}
        <Modal 
          isOpen={modalWithForm} 
          onClose={() => setModalWithForm(false)}
          title="Formulaire de contact"
          size="md"
        >
          <div className="space-y-4">
            <Input 
              type="text" 
              label="Nom complet" 
              placeholder="Entrez votre nom" 
              required
              fullWidth
            />
            
            <Input 
              type="text" 
              label="Email" 
              placeholder="exemple@email.com" 
              iconName="Mail"
              required
              fullWidth
            />
            
            <Select 
              label="Sujet"
              options={[
                { value: "question", label: "Question" },
                { value: "feedback", label: "Feedback" },
                { value: "support", label: "Support technique" },
                { value: "other", label: "Autre" }
              ]}
              fullWidth
            />
            
            <Input 
              type="textarea" 
              label="Message" 
              placeholder="Écrivez votre message ici..." 
              rows={4}
              fullWidth
            />
            
            <Checkbox 
              label="J'accepte de recevoir des emails" 
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            
            <div className="pt-2 flex justify-end space-x-2">
              <Button 
                label="Annuler" 
                appearance="outline" 
                variation="secondary" 
                onClick={() => setModalWithForm(false)}
              />
              <Button 
                label="Envoyer" 
                appearance="solid" 
                variation="success"
                iconName="Send"
                onClick={() => setModalWithForm(false)} 
              />
            </div>
          </div>
        </Modal>
        
        {/* Modal positionnée en haut */}
        <Modal 
          isOpen={modalPosition} 
          onClose={() => setModalPosition(false)}
          title="Modal en haut de l'écran"
          position="top"
        >
          <div>
            <Text variant="p2">
              Cette modal est positionnée en haut de l'écran au lieu d'être centrée.
            </Text>
            <Text variant="p3" className="mt-2">
              C'est utile pour les notifications ou les alertes qui ne doivent pas interrompre complètement l'attention de l'utilisateur.
            </Text>
            <div className="mt-4 flex justify-end">
              <Button 
                label="Fermer" 
                appearance="solid" 
                variation="error" 
                onClick={() => setModalPosition(false)}
              />
            </div>
          </div>
        </Modal>
        
        {/* Modal avec hauteur maximale et défilement */}
        <Modal 
          isOpen={modalMaxHeight} 
          onClose={() => setModalMaxHeight(false)}
          title="Modal avec hauteur maximale"
          maxHeight={400}
        >
          <div>
            <Text variant="p2" className="mb-4">
              Cette modal a une hauteur maximale de 400px et son contenu défile si nécessaire.
            </Text>
            
            {Array(10).fill(0).map((_, index) => (
              <Card key={index} title={`Section ${index + 1}`} className="mb-4">
                <Text variant="p4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, 
                  nisl eget ultricies ultricies, nisl nisl ultricies nisl, eget ultricies nisl nisl eget nisl.
                </Text>
              </Card>
            ))}
            
            <div className="mt-4 flex justify-end">
              <Button 
                label="Fermer" 
                appearance="solid" 
                variation="primary" 
                onClick={() => setModalMaxHeight(false)}
              />
            </div>
          </div>
        </Modal>
        
        {/* Modal avec animation */}
        <Modal 
          isOpen={modalAnimated} 
          onClose={() => setModalAnimated(false)}
          title="Modal avec animation"
          animation="scale"
        >
          <div>
            <Text variant="p2">
              Cette modal utilise une animation d'échelle pour son entrée et sa sortie.
            </Text>
            <Text variant="p3" className="mt-2">
              Il existe plusieurs types d'animation : fade, scale, slide-top et slide-bottom.
            </Text>
            <div className="mt-4 flex justify-end">
              <Button 
                label="Fermer" 
                appearance="solid" 
                variation="secondary" 
                onClick={() => setModalAnimated(false)}
              />
            </div>
          </div>
        </Modal>
        
        {/* Exemples de modales de confirmation */}
        <h3 className="text-lg font-bold mb-4 mt-8">Exemples de modales de confirmation</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button 
            label="Confirmation de succès" 
            appearance="solid" 
            variation="success"
            onClick={() => setConfirmSuccess(true)}
          />
          
          <Button 
            label="Confirmation d'erreur" 
            appearance="solid" 
            variation="error"
            onClick={() => setConfirmError(true)}
          />
          
          <Button 
            label="Confirmation d'avertissement" 
            appearance="solid" 
            variation="warning"
            onClick={() => setConfirmWarning(true)}
          />
          
          <Button 
            label="Confirmation d'information" 
            appearance="solid" 
            variation="info"
            onClick={() => setConfirmInfo(true)}
          />
          
          <Button 
            label="Confirmation de question" 
            appearance="solid" 
            variation="primary"
            onClick={() => setConfirmQuestion(true)}
          />
          
          <Button 
            label="Confirmation personnalisée" 
            appearance="solid" 
            variation="tertiary"
            onClick={() => setConfirmCustom(true)}
          />
          
          <Button 
            label="Confirmation avec chargement" 
            appearance="solid" 
            variation="secondary"
            onClick={() => setConfirmLoading(true)}
          />
        </div>
        
        {/* Modales de confirmation */}
        
        {/* Confirmation de succès */}
        <ModalConfirm
          isOpen={confirmSuccess}
          onClose={() => setConfirmSuccess(false)}
          onConfirm={() => {
            // Action à effectuer lors de la confirmation
            setConfirmSuccess(false);
          }}
          type="success"
          title="Opération réussie"
          message="L'opération a été effectuée avec succès. Voulez-vous continuer ?"
          confirmText="Continuer"
        />
        
        {/* Confirmation d'erreur */}
        <ModalConfirm
          isOpen={confirmError}
          onClose={() => setConfirmError(false)}
          onConfirm={() => setConfirmError(false)}
          type="error"
          title="Erreur détectée"
          message="Une erreur s'est produite lors de l'opération. Voulez-vous réessayer ?"
          confirmText="Réessayer"
        />
        
        {/* Confirmation d'avertissement */}
        <ModalConfirm
          isOpen={confirmWarning}
          onClose={() => setConfirmWarning(false)}
          onConfirm={() => setConfirmWarning(false)}
          type="warning"
          message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer cet élément ?"
          confirmText="Supprimer"
          cancelText="Annuler"
        />
        
        {/* Confirmation d'information */}
        <ModalConfirm
          isOpen={confirmInfo}
          onClose={() => setConfirmInfo(false)}
          onConfirm={() => setConfirmInfo(false)}
          type="info"
          message="Une mise à jour est disponible. Voulez-vous l'installer maintenant ?"
          confirmText="Installer"
          cancelText="Plus tard"
        />
        
        {/* Confirmation de question */}
        <ModalConfirm
          isOpen={confirmQuestion}
          onClose={() => setConfirmQuestion(false)}
          onConfirm={() => setConfirmQuestion(false)}
          type="question"
          message="Voulez-vous enregistrer les modifications avant de quitter ?"
          confirmText="Enregistrer"
          cancelText="Ne pas enregistrer"
        />
        
        {/* Confirmation personnalisée */}
        <ModalConfirm
          isOpen={confirmCustom}
          onClose={() => setConfirmCustom(false)}
          onConfirm={() => setConfirmCustom(false)}
          type="custom"
          title="Mode hors ligne"
          message={
            <div>
              <Text variant="p2" className="mb-2">
                Vous êtes sur le point d'activer le mode hors ligne. Cela vous permettra de :
              </Text>
              <ul className="list-disc list-inside space-y-1 mb-2">
                <li>Accéder aux données en cache</li>
                <li>Travailler sans connexion internet</li>
                <li>Synchroniser les modifications ultérieurement</li>
              </ul>
              <Text variant="p3" color={ColorsEnum.WARNING}>
                Note: Certaines fonctionnalités ne seront pas disponibles.
              </Text>
            </div>
          }
          customIcon={
            <div className="p-3 bg-tertiary/20 rounded-full">
              <Icon name="WifiOff" size={36} color={ColorsEnum.TERTIARY} />
            </div>
          }
          confirmText="Activer"
          cancelText="Annuler"
          confirmVariation="tertiary"
          centerContent={false}
        />
        
        {/* Confirmation avec chargement */}
        <ModalConfirm
          isOpen={confirmLoading}
          onClose={() => !confirmLoading && setConfirmLoading(false)}
          onConfirm={() => {
            // Simuler une action qui prend du temps
            setTimeout(() => {
              setConfirmLoading(false);
            }, 2000);
          }}
          type="warning"
          title="Confirmer le redémarrage"
          message="Le système va redémarrer. Toutes les sessions en cours seront fermées."
          confirmText="Redémarrer"
          cancelText="Annuler"
          loading={confirmLoading}
          disabled={confirmLoading}
          closeOnOverlayClick={!confirmLoading}
        />
        
        {/* Exemples de tables */}
        <h3 className="text-lg font-bold mb-4 mt-8">Exemples de tables</h3>
        
        {/* Table avec recherche et tri */}
        <div className="mb-8">
          <Table
            title="Liste des utilisateurs"
            subtitle="Gestion des utilisateurs du système"
            rightContent={
              <Button 
                label="Ajouter un utilisateur" 
                appearance="outline" 
                variation="primary" 
                size="sm"
                iconName="UserPlus"
              />
            }
            searchable={true}
            searchPlaceholder="Rechercher un utilisateur..."
            sortable={true}
            defaultSortKey="name"
            defaultSortDirection="asc"
            pagination={true}
            pageSize={2}
            dataSource={usersData}
            columns={[
              {
                key: 'name',
                title: 'Nom',
                sortable: true,
                render: (value, record) => (
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                      <Text variant="p3" weight="medium">
                        {value.split(' ').map((n: string) => n[0]).join('')}
                      </Text>
                    </div>
                    <Text variant="p3" weight="medium">
                      {value}
                    </Text>
                  </div>
                )
              },
              {
                key: 'email',
                title: 'Email',
                sortable: true,
                render: (value) => (
                  <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                    {value}
                  </Text>
                )
              },
              {
                key: 'role',
                title: 'Rôle',
                align: 'center',
                sortable: true,
                render: (value) => {
                  const getBadgeColor = () => {
                    switch (value) {
                      case 'Administrateur': return ColorsEnum.PRIMARY;
                      case 'Éditeur': return ColorsEnum.TERTIARY;
                      default: return ColorsEnum.SECONDARY;
                    }
                  };
                  return (
                    <Badge variant="soft" color={getBadgeColor()}>
                      {value}
                    </Badge>
                  );
                }
              },
              {
                key: 'status',
                title: 'Statut',
                align: 'center',
                render: (value) => {
                  const getBadgeConfig = () => {
                    switch (value) {
                      case 'Actif': return { color: ColorsEnum.SUCCESS, icon: 'CheckCircle' };
                      case 'Inactif': return { color: ColorsEnum.ERROR, icon: 'XCircle' };
                      default: return { color: ColorsEnum.WARNING, icon: 'Clock' };
                    }
                  };
                  const config = getBadgeConfig();
                  return (
                    <Badge 
                      variant="soft" 
                      color={config.color} 
                      iconName={config.icon as any}
                    >
                      {value}
                    </Badge>
                  );
                }
              },
              {
                key: 'lastLogin',
                title: 'Dernière connexion',
                render: (value) => {
                  const date = new Date(value);
                  return (
                    <Text variant="p4">
                      {date.toLocaleDateString()} à {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  );
                }
              }
            ]}
            actions={[
              {
                label: 'Modifier',
                icon: 'Edit',
                type: 'primary',
                onClick: (record) => alert(`Modifier l'utilisateur ${record.name}`)
              },
              {
                label: 'Désactiver',
                icon: 'UserX',
                type: 'warning',
                onClick: (record) => alert(`Désactiver l'utilisateur ${record.name}`),
                visible: (record) => record.status !== 'Inactif',
                size: 'sm'
              },
              {
                label: 'Supprimer',
                icon: 'Trash',
                type: 'danger',
                onClick: (record) => alert(`Supprimer l'utilisateur ${record.name}`),
                size: 'sm'
              }
            ]}
            onRowClick={(record) => console.log('Ligne cliquée:', record)}
          />
        </div>
        
        {/* Table compacte */}
        <div className="mb-8">
          <Table
            title="Liste des véhicules"
            dataSource={vehiclesData}
            compact
            bordered
            columns={[
              {
                key: 'id',
                title: 'ID',
                width: '100px'
              },
              {
                key: 'type',
                title: 'Type'
              },
              {
                key: 'registration',
                title: 'Immatriculation'
              },
              {
                key: 'capacity',
                title: 'Capacité',
                align: 'center'
              },
              {
                key: 'status',
                title: 'Statut',
                align: 'center',
                render: (value) => {
                  const color = value === 'En service' ? ColorsEnum.SUCCESS : ColorsEnum.WARNING;
                  return <Badge variant="soft" color={color}>{value}</Badge>;
                }
              },
              {
                key: 'lastMaintenance',
                title: 'Dernière maintenance',
                render: (value) => new Date(value).toLocaleDateString()
              }
            ]}
            actions={[
              {
                label: 'Détails',
                icon: 'Info',
                type: 'link',
                onClick: (record) => alert(`Voir les détails de ${record.registration}`)
              },
              {
                label: 'Modifier',
                icon: 'Edit',
                type: 'link',
                onClick: (record) => alert(`Modifier ${record.registration}`)
              }
            ]}
          />
        </div>
        
        {/* Table avec chargement */}
        <div className="mb-8">
          <Table
            title="Table avec chargement"
            rightContent={
              <Button 
                label={tableLoading ? "Arrêter" : "Charger"} 
                appearance="solid" 
                variation={tableLoading ? "error" : "info"} 
                size="sm"
                iconName={tableLoading ? "StopCircle" : "RefreshCw"}
                onClick={() => {
                  setTableLoading(!tableLoading);
                  if (!tableLoading) {
                    setTimeout(() => setTableLoading(false), 3000);
                  }
                }}
              />
            }
            dataSource={vehiclesData}
            columns={[
              { key: 'id', title: 'ID' },
              { key: 'type', title: 'Type' },
              { key: 'registration', title: 'Immatriculation' },
              { key: 'capacity', title: 'Capacité' },
              { key: 'status', title: 'Statut' }
            ]}
            loading={tableLoading}
          />
        </div>
        
        {/* Table vide */}
        <div className="mb-8">
          <Table
            title="Table sans données"
            dataSource={[]}
            columns={[
              { key: 'id', title: 'ID' },
              { key: 'name', title: 'Nom' },
              { key: 'description', title: 'Description' }
            ]}
            emptyText="Aucune donnée disponible. Cliquez sur le bouton 'Ajouter' pour créer un nouvel élément."
          />
        </div>
        
        {/* Table avec recherche, tri et pagination */}
        <div className="mb-8">
          <Table
            title="Table avec recherche et tri"
            subtitle="Exemple de toutes les fonctionnalités avancées"
            dataSource={usersData}
            searchable={true}
            searchPlaceholder="Rechercher un utilisateur..."
            sortable={true}
            defaultSortKey="name"
            defaultSortDirection="asc"
            pagination={true}
            pageSize={2}
            columns={[
              { 
                key: 'name', 
                title: 'Nom', 
                sortable: true,
                render: (value) => (
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                      <Text variant="p3" weight="medium">
                        {value.split(' ').map((n: string) => n[0]).join('')}
                      </Text>
                    </div>
                    <Text variant="p3" weight="medium">{value}</Text>
                  </div>
                )
              },
              { 
                key: 'email', 
                title: 'Email', 
                sortable: true
              },
              { 
                key: 'role', 
                title: 'Rôle', 
                align: 'center',
                sortable: true,
                render: (value) => {
                  const getColor = () => {
                    switch (value) {
                      case 'Administrateur': return ColorsEnum.PRIMARY;
                      case 'Éditeur': return ColorsEnum.TERTIARY;
                      default: return ColorsEnum.SECONDARY;
                    }
                  };
                  return <Badge variant="soft" color={getColor()}>{value}</Badge>;
                }
              },
              { 
                key: 'status', 
                title: 'Statut', 
                align: 'center',
                sortable: true,
                render: (value) => {
                  const getConfig = () => {
                    switch (value) {
                      case 'Actif': return { color: ColorsEnum.SUCCESS, icon: 'CheckCircle' };
                      case 'Inactif': return { color: ColorsEnum.ERROR, icon: 'XCircle' };
                      default: return { color: ColorsEnum.WARNING, icon: 'Clock' };
                    }
                  };
                  const config = getConfig();
                  return (
                    <Badge variant="soft" color={config.color} iconName={config.icon as any}>{value}</Badge>
                  );
                }
              }
            ]}
            actions={[
              {
                label: 'Éditer',
                icon: 'Edit',
                type: 'primary',
                onClick: (record) => alert(`Modifier l'utilisateur ${record.name}`)
              },
              {
                label: 'Supprimer',
                icon: 'Trash',
                type: 'danger',
                onClick: (record) => alert(`Supprimer l'utilisateur ${record.name}`),
                size: 'sm'
              }
            ]}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
