import { FC, useState } from "react";
import { Text, Button, Icon, Badge, Table, TableColumn, TableAction } from "../../../components";
import { ColorsEnum } from "../../../utils/enums";
import { AddUserModal, NewUserData } from "./components/AddUserModal";

// Interface pour les données utilisateur
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  createdAt: string;
  avatar?: string;
}

export const Users: FC = () => {
  // Données simulées des utilisateurs
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      firstName: 'Admin',
      lastName: 'LBV',
      email: 'admin@lbv-mobilites.ga',
      role: 'Administrateur',
      department: 'Administration',
      status: 'active',
      lastLogin: '2025-01-08 14:30:00',
      createdAt: '2024-01-15 09:00:00'
    },
    {
      id: '2',
      firstName: 'Marie',
      lastName: 'Dupont',
      email: 'marie.dupont@lbv-mobilites.ga',
      role: 'Gestionnaire',
      department: 'Transport',
      status: 'active',
      lastLogin: '2025-01-08 11:45:00',
      createdAt: '2024-02-20 10:30:00'
    },
    {
      id: '3',
      firstName: 'Jean',
      lastName: 'Martin',
      email: 'jean.martin@lbv-mobilites.ga',
      role: 'Opérateur',
      department: 'Logistique',
      status: 'active',
      lastLogin: '2025-01-07 16:20:00',
      createdAt: '2024-03-10 14:15:00'
    },
    {
      id: '4',
      firstName: 'Sophie',
      lastName: 'Bernard',
      email: 'sophie.bernard@lbv-mobilites.ga',
      role: 'Superviseur',
      department: 'Maintenance',
      status: 'inactive',
      lastLogin: '2025-01-05 09:30:00',
      createdAt: '2024-04-05 11:00:00'
    },
    {
      id: '5',
      firstName: 'Pierre',
      lastName: 'Rousseau',
      email: 'pierre.rousseau@lbv-mobilites.ga',
      role: 'Technicien',
      department: 'Maintenance',
      status: 'pending',
      lastLogin: 'Jamais connecté',
      createdAt: '2025-01-07 16:45:00'
    },
    {
      id: '6',
      firstName: 'Alice',
      lastName: 'Moreau',
      email: 'alice.moreau@lbv-mobilites.ga',
      role: 'Gestionnaire',
      department: 'Finance',
      status: 'active',
      lastLogin: '2025-01-08 08:15:00',
      createdAt: '2024-05-12 13:20:00'
    },
    {
      id: '7',
      firstName: 'David',
      lastName: 'Lefort',
      email: 'david.lefort@lbv-mobilites.ga',
      role: 'Opérateur',
      department: 'Transport',
      status: 'active',
      lastLogin: '2025-01-08 12:00:00',
      createdAt: '2024-06-18 09:45:00'
    },
    {
      id: '8',
      firstName: 'Emma',
      lastName: 'Dubois',
      email: 'emma.dubois@lbv-mobilites.ga',
      role: 'Analyste',
      department: 'Analyse',
      status: 'active',
      lastLogin: '2025-01-08 10:30:00',
      createdAt: '2024-07-22 15:10:00'
    }
  ]);

  // État pour la modal d'ajout d'utilisateur
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Fonction pour formater une date
  const formatDate = (dateString: string): string => {
    if (dateString === 'Jamais connecté') return dateString;
    
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Fonction pour obtenir la couleur du badge de statut
  const getStatusBadgeProps = (status: User['status']) => {
    switch (status) {
      case 'active':
        return { color: ColorsEnum.SUCCESS, text: 'Actif' };
      case 'inactive':
        return { color: ColorsEnum.ERROR, text: 'Inactif' };
      case 'pending':
        return { color: ColorsEnum.WARNING, text: 'En attente' };
      default:
        return { color: ColorsEnum.TEXT_SECONDARY, text: 'Inconnu' };
    }
  };

  // Fonction pour obtenir la couleur du badge de rôle
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Administrateur':
        return ColorsEnum.ERROR;
      case 'Superviseur':
        return ColorsEnum.WARNING;
      case 'Gestionnaire':
        return ColorsEnum.PRIMARY;
      case 'Analyste':
        return ColorsEnum.INFO;
      default:
        return ColorsEnum.TEXT_SECONDARY;
    }
  };

  // Fonction pour ajouter un nouvel utilisateur
  const handleAddUser = (userData: NewUserData) => {
    // Générer un nouvel ID (dans un vrai projet, ce serait fait par l'API)
    const newId = (users.length + 1).toString();
    
    const newUser: User = {
      id: newId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role,
      department: userData.department,
      status: 'active',
      lastLogin: 'Jamais connecté',
      createdAt: new Date().toISOString()
    };

    setUsers(prev => [...prev, newUser]);
    console.log('Nouvel utilisateur ajouté:', newUser);
  };

  // Actions pour chaque ligne
  const actions: TableAction<User>[] = [
    {
      label: 'Voir le profil',
      icon: 'Eye',
      onClick: (user: User) => {
        console.log('Voir le profil de:', user.firstName, user.lastName);
      },
      type: 'default'
    },
    {
      label: 'Modifier',
      icon: 'Edit',
      onClick: (user: User) => {
        console.log('Modifier:', user.firstName, user.lastName);
      },
      type: 'primary'
    },
    {
      label: 'Désactiver',
      icon: 'UserX',
      onClick: (user: User) => {
        console.log('Désactiver:', user.firstName, user.lastName);
      },
      type: 'warning',
      visible: (user: User) => user.status === 'active'
    },
    {
      label: 'Activer',
      icon: 'UserCheck',
      onClick: (user: User) => {
        console.log('Activer:', user.firstName, user.lastName);
      },
      type: 'success',
      visible: (user: User) => user.status === 'inactive'
    },
    {
      label: 'Supprimer',
      icon: 'Trash2',
      onClick: (user: User) => {
        console.log('Supprimer:', user.firstName, user.lastName);
      },
      type: 'danger'
    }
  ];

  // Définition des colonnes
  const columns: TableColumn<User>[] = [
    {
      key: 'user',
      title: 'Utilisateur',
      sortable: true,
      render: (_: any, record: User) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-green to-yellow rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color={ColorsEnum.WHITE} />
            </div>
          </div>
          <div className="flex-1">
            <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
              {record.firstName} {record.lastName}
            </Text>
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              {record.email}
            </Text>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      title: 'Rôle',
      sortable: true,
      render: (value: string) => (
        <Badge 
          color={getRoleBadgeColor(value)}
          size="sm"
        >
          {value}
        </Badge>
      )
    },
    {
      key: 'department',
      title: 'Département',
      sortable: true,
      render: (value: string) => (
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
          {value}
        </Text>
      )
    },
    {
      key: 'status',
      title: 'Statut',
      sortable: true,
      render: (value: User['status']) => {
        const { color, text } = getStatusBadgeProps(value);
        return (
          <Badge 
            color={color}
            size="sm"
          >
            {text}
          </Badge>
        );
      }
    },
    {
      key: 'lastLogin',
      title: 'Dernière connexion',
      sortable: true,
      render: (value: string) => (
        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
          {formatDate(value)}
        </Text>
      )
    },
    {
      key: 'createdAt',
      title: 'Créé le',
      sortable: true,
      render: (value: string) => (
        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
          {formatDate(value)}
        </Text>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Text variant="h1" color={ColorsEnum.TEXT_PRIMARY} className="font-bold text-2xl mb-2">
            Gestion des utilisateurs
          </Text>
          <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="text-base">
            Gérez les comptes utilisateurs et leurs permissions
          </Text>
        </div>
        <Button
          appearance="solid"
          variation="primary"
          size="md"
          iconName="UserPlus"
          iconPosition="left"
          onClick={() => setIsAddModalOpen(true)}
        >
          Ajouter un utilisateur
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Icon name="Users" size={20} color={ColorsEnum.PRIMARY} />
            </div>
            <div className="ml-3">
              <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
                Total utilisateurs
              </Text>
              <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
                {users.length}
              </Text>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Icon name="UserCheck" size={20} color={ColorsEnum.SUCCESS} />
            </div>
            <div className="ml-3">
              <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
                Actifs
              </Text>
              <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
                {users.filter(u => u.status === 'active').length}
              </Text>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Icon name="UserX" size={20} color={ColorsEnum.ERROR} />
            </div>
            <div className="ml-3">
              <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
                Inactifs
              </Text>
              <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
                {users.filter(u => u.status === 'inactive').length}
              </Text>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Icon name="Clock" size={20} color={ColorsEnum.WARNING} />
            </div>
            <div className="ml-3">
              <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
                En attente
              </Text>
              <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
                {users.filter(u => u.status === 'pending').length}
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Table des utilisateurs */}
      <Table
        dataSource={users}
        columns={columns}
        actions={actions}
        rowKey="id"
        pagination={true}
        pageSize={5}
        searchable={true}
        searchPlaceholder="Rechercher par nom, email ou département..."
        striped={true}
        bordered={true}
        title="Liste des utilisateurs"
        subtitle={`${users.length} utilisateurs au total`}
      />

      {/* Modal d'ajout d'utilisateur */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddUser}
      />
    </div>
  );
};
