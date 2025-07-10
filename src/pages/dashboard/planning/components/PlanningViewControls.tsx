import { FC } from "react";
import { Button } from "../../../../components/button";
import { Icon } from "../../../../components/icon";

interface PlanningViewControlsProps {
  currentView: 'table' | 'calendar';
  onViewChange: (view: 'table' | 'calendar') => void;
  onAddClick: () => void;
}

export const PlanningViewControls: FC<PlanningViewControlsProps> = ({
  currentView,
  onViewChange,
  onAddClick
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Button
          appearance={currentView === 'table' ? 'solid' : 'outline'}
          variation={currentView === 'table' ? 'primary' : 'primary'}
          size="sm"
          onClick={() => onViewChange('table')}
          className="flex items-center space-x-2"
        >
          <Icon name="List" size={16} />
          <span>Liste</span>
        </Button>
        <Button
          appearance={currentView === 'calendar' ? 'solid' : 'outline'}
          variation={currentView === 'calendar' ? 'primary' : 'primary'}
          size="sm"
          onClick={() => onViewChange('calendar')}
          className="flex items-center space-x-2"
        >
          <Icon name="Calendar" size={16} />
          <span>Calendrier</span>
        </Button>
      </div>

      <Button
        appearance="solid"
        variation="primary"
        onClick={onAddClick}
        className="flex items-center space-x-2"
      >
        <Icon name="Plus" size={16} />
        <span>Nouveau planning</span>
      </Button>
    </div>
  );
};
