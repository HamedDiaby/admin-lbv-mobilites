import { FC } from "react";
import { Button } from "../../../../components/button";
import { Icon } from "../../../../components/icon";

interface ClientViewControlsProps {
  currentView: 'clients' | 'abonnements';
  onViewChange: (view: 'clients' | 'abonnements') => void;
  clientsCount: number;
  abonnementsCount: number;
}

export const ClientViewControls: FC<ClientViewControlsProps> = ({
  currentView,
  onViewChange,
  clientsCount,
  abonnementsCount
}) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8">
        <button
          onClick={() => onViewChange('clients')}
          className={`py-2 px-1 border-b-2 font-medium text-sm ${
            currentView === 'clients'
              ? 'border-green text-green'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <Icon name="Users" size={16} className="mr-2 inline" />
          Clients ({clientsCount})
        </button>
        <button
          onClick={() => onViewChange('abonnements')}
          className={`py-2 px-1 border-b-2 font-medium text-sm ${
            currentView === 'abonnements'
              ? 'border-green text-green'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <Icon name="CreditCard" size={16} className="mr-2 inline" />
          Abonnements ({abonnementsCount})
        </button>
      </nav>
    </div>
  );
};
