import React, { useEffect } from 'react';
import { Text, Icon, Button } from '@components';
import { ColorsEnum } from '@utils/enums';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  isRead: boolean;
  icon: string;
}

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  // Simuler des notifications
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Nouvelle demande de transport',
      message: 'Une nouvelle demande de transport a été soumise pour validation.',
      type: 'info',
      time: 'Il y a 5 minutes',
      isRead: false,
      icon: 'Bus'
    },
    {
      id: '2',
      title: 'Maintenance programmée',
      message: 'La maintenance du système est prévue pour demain à 02:00.',
      type: 'warning',
      time: 'Il y a 1 heure',
      isRead: false,
      icon: 'AlertTriangle'
    },
    {
      id: '3',
      title: 'Rapport mensuel généré',
      message: 'Le rapport mensuel des activités a été généré avec succès.',
      type: 'success',
      time: 'Il y a 2 heures',
      isRead: true,
      icon: 'FileText'
    },
    {
      id: '4',
      title: 'Nouveau message',
      message: 'Vous avez reçu un nouveau message de l\'équipe support.',
      type: 'info',
      time: 'Il y a 3 heures',
      isRead: true,
      icon: 'Mail'
    },
    {
      id: '5',
      title: 'Erreur système',
      message: 'Une erreur temporaire a été détectée et corrigée automatiquement.',
      type: 'error',
      time: 'Il y a 4 heures',
      isRead: true,
      icon: 'XCircle'
    }
  ];

  const getNotificationTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Fermer le drawer avec Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Empêcher le scroll du body quand le drawer est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} color={ColorsEnum.TEXT_PRIMARY} />
            <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold">
              Notifications
            </Text>
            {unreadCount > 0 && (
              <div className="w-5 h-5 bg-yellow rounded-full flex items-center justify-center">
                <Text variant="p5" color={ColorsEnum.BLUE_DARK} className="font-semibold text-xs">
                  {unreadCount}
                </Text>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Icon name="X" size={18} color={ColorsEnum.TEXT_SECONDARY} />
          </button>
        </div>

        {/* Actions */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <Button
              appearance="outline"
              size="sm"
              iconName="Check"
              iconPosition="left"
              className="text-green-600 hover:bg-green-50 border-green-200"
            >
              Tout marquer comme lu
            </Button>
            <Button
              appearance="outline"
              size="sm"
              iconName="Settings"
              iconPosition="left"
              className="text-gray-600 hover:bg-gray-50 border-gray-200"
            >
              Paramètres
            </Button>
          </div>
        </div>

        {/* Liste des notifications */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Icon name="Bell" size={48} color={ColorsEnum.TEXT_SECONDARY} className="opacity-50" />
              <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="mt-4">
                Aucune notification
              </Text>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="mt-2">
                Vous êtes à jour !
              </Text>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
                    notification.isRead
                      ? 'bg-white border-gray-200 hover:bg-gray-50'
                      : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getNotificationTypeColor(notification.type)}`}>
                      <Icon name={notification.icon as any} size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <Text 
                          variant="p3" 
                          color={ColorsEnum.TEXT_PRIMARY} 
                          className={`font-medium ${!notification.isRead ? 'font-semibold' : ''}`}
                        >
                          {notification.title}
                        </Text>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                      <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="mt-1 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {notification.message}
                      </Text>
                      <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY} className="mt-2 text-xs">
                        {notification.time}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <Button
            appearance="outline"
            size="sm"
            iconName="MoreHorizontal"
            iconPosition="left"
            className="w-full text-gray-600 hover:bg-gray-100 border-gray-200"
          >
            Voir toutes les notifications
          </Button>
        </div>
      </div>
    </>
  );
};
