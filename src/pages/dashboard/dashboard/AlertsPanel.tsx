import React from 'react';
import { Card } from '../../../components/card';
import { Badge } from '../../../components/badge';
import { Icon } from '../../../components/icon';
import { Button } from '../../../components/button';
import { Incident } from './types';
import { ColorsEnum } from '../../../utils/enums';

interface AlertsPanelProps {
  incidents: Incident[];
  onIncidentResolve?: (incidentId: string) => void;
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ 
  incidents, 
  onIncidentResolve 
}) => {
  const activeIncidents = incidents.filter(incident => incident.statut === 'actif');

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'panne': return 'AlertTriangle';
      case 'accident': return 'AlertCircle';
      case 'retard': return 'Clock';
      case 'embouteillage': return 'Car';
      case 'maintenance': return 'Wrench';
      default: return 'AlertCircle';
    }
  };

  const getIncidentColor = (severite: string) => {
    switch (severite) {
      case 'eleve': return ColorsEnum.ERROR;
      case 'moyen': return ColorsEnum.WARNING;
      case 'faible': return ColorsEnum.INFO_LIGHT;
      default: return ColorsEnum.GRAY_500;
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Icon name="Bell" className="mr-2" size={20} />
          Alertes et Incidents
        </h3>
        <Badge variant="solid" color={activeIncidents.length > 0 ? ColorsEnum.ERROR : ColorsEnum.SUCCESS}>
          {activeIncidents.length} actif{activeIncidents.length > 1 ? 's' : ''}
        </Badge>
      </div>

      {activeIncidents.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Icon name="CheckCircle" size={48} color={ColorsEnum.SUCCESS} className="mx-auto mb-2" />
          <p>Aucun incident actif</p>
          <p className="text-sm">Tous les systèmes fonctionnent normalement</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {activeIncidents.map((incident) => (
            <div 
              key={incident.id} 
              className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-shrink-0">
                <Icon 
                  name={getIncidentIcon(incident.type) as any} 
                  size={20} 
                  color={getIncidentColor(incident.severite)} 
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <Badge 
                    variant="solid" 
                    color={getIncidentColor(incident.severite)}
                    size="xs"
                  >
                    {incident.severite}
                  </Badge>
                  <span className="text-xs text-gray-500 capitalize">
                    {incident.type}
                  </span>
                </div>
                
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {incident.description}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  {incident.ligne && (
                    <span>Ligne: {incident.ligne}</span>
                  )}
                  {incident.bus && (
                    <span>Bus: {incident.bus}</span>
                  )}
                  <span>
                    Il y a {Math.floor((Date.now() - incident.dateDebut.getTime()) / (1000 * 60))} min
                  </span>
                </div>
              </div>
              
              {onIncidentResolve && (
                <Button
                  size="sm"
                  appearance="outline"
                  onClick={() => onIncidentResolve(incident.id)}
                  className="text-xs"
                >
                  Résoudre
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
