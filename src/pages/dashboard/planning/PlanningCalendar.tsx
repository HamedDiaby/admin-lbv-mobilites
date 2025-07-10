import { FC, useState, useMemo, useCallback } from "react";
import { Text } from "../../../components/text";
import { Button } from "../../../components/button";
import { Icon } from "../../../components/icon";
import { Badge } from "../../../components/badge";
import { Select } from "../../../components/select";
import { ColorsEnum } from "../../../utils/enums";
import { PlanningData } from "./types";

interface PlanningCalendarProps {
  plannings: PlanningData[];
  onPlanningClick?: (planning: PlanningData) => void;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  plannings: PlanningData[];
}

const JOURS_SEMAINE = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const MOIS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

export const PlanningCalendar: FC<PlanningCalendarProps> = ({
  plannings,
  onPlanningClick
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filtreStatut, setFiltreStatut] = useState<string>('tous');

  // Filtrer les plannings selon le statut
  const planningsFiltres = useMemo(() => {
    if (filtreStatut === 'tous') return plannings;
    return plannings.filter(p => p.statut.toLowerCase() === filtreStatut);
  }, [plannings, filtreStatut]);

  // Vérifier si un planning est actif à une date donnée
  const isPlanningActiveOnDate = useCallback((planning: PlanningData, date: Date): boolean => {
    const dateStr = date.toISOString().split('T')[0];
    const dateDebut = new Date(planning.recurrence.dateDebut);
    const dateFin = planning.recurrence.dateFin ? new Date(planning.recurrence.dateFin) : null;
    
    // Vérifier si la date est dans la période
    if (date < dateDebut) return false;
    if (dateFin && date > dateFin) return false;
    
    // Vérifier selon le type de récurrence
    switch (planning.recurrence.type) {
      case 'Quotidien':
        return true;
      
      case 'Hebdomadaire':
        const jourSemaine = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'][date.getDay()];
        return planning.recurrence.joursActifs?.includes(jourSemaine) || false;
      
      case 'Mensuel':
        return date.getDate() === dateDebut.getDate();
      
      case 'Personnalisé':
        // Pour personnalisé, on suppose que c'est comme hebdomadaire pour l'instant
        const jourPersonnalise = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'][date.getDay()];
        return planning.recurrence.joursActifs?.includes(jourPersonnalise) || false;
      
      default:
        return false;
    }
  }, []);

  // Générer les jours du calendrier
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Premier jour du mois
    const firstDay = new Date(year, month, 1);
    // Dernier jour du mois
    const lastDay = new Date(year, month + 1, 0);
    
    // Premier dimanche à afficher (peut être du mois précédent)
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    // Dernier samedi à afficher (peut être du mois suivant)
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    
    const days: CalendarDay[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dayDate = new Date(date);
      dayDate.setHours(0, 0, 0, 0);
      
      // Trouver les plannings pour cette date
      const dayPlannings = planningsFiltres.filter(planning => {
        return isPlanningActiveOnDate(planning, dayDate);
      });
      
      days.push({
        date: new Date(dayDate),
        isCurrentMonth: dayDate.getMonth() === month,
        isToday: dayDate.getTime() === today.getTime(),
        plannings: dayPlannings
      });
    }
    
    return days;
  }, [currentDate, planningsFiltres, isPlanningActiveOnDate]);

  // Navigation dans le calendrier
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Obtenir la couleur du statut
  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Actif':
        return 'bg-green-100 border-green-300 text-green-700';
      case 'Suspendu':
        return 'bg-yellow-100 border-yellow-300 text-yellow-700';
      case 'Terminé':
        return 'bg-red-100 border-red-300 text-red-700';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      {/* En-tête du calendrier */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              appearance="outline"
              variation="primary"
              size="sm"
              onClick={() => navigateMonth('prev')}
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            
            <Text variant="h3" className="font-bold min-w-[200px] text-center">
              {MOIS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Text>
            
            <Button
              appearance="outline"
              variation="primary"
              size="sm"
              onClick={() => navigateMonth('next')}
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
          
          <Button
            appearance="outline"
            variation="secondary"
            size="sm"
            onClick={goToToday}
          >
            Aujourd'hui
          </Button>
        </div>

        {/* Filtre par statut */}
        <div className="flex items-center space-x-2">
          <Text variant="p3">Filtrer :</Text>
          <Select
            options={[
              { value: 'tous', label: 'Tous les statuts' },
              { value: 'actif', label: 'Actifs' },
              { value: 'suspendu', label: 'Suspendus' },
              { value: 'terminé', label: 'Terminés' }
            ]}
            value={filtreStatut}
            onChange={(e) => setFiltreStatut(e.target.value)}
          />
        </div>
      </div>

      {/* Légende */}
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-200 border border-green-300 rounded"></div>
          <Text variant="p4">Actif</Text>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-yellow-200 border border-yellow-300 rounded"></div>
          <Text variant="p4">Suspendu</Text>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-200 border border-red-300 rounded"></div>
          <Text variant="p4">Terminé</Text>
        </div>
      </div>

      {/* Grille du calendrier */}
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        {/* En-tête des jours de la semaine */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-border">
          {JOURS_SEMAINE.map(jour => (
            <div
              key={jour}
              className="p-3 text-center font-medium text-gray-600 border-r border-border last:border-r-0"
            >
              <Text variant="p4" className="font-semibold">{jour}</Text>
            </div>
          ))}
        </div>

        {/* Grille des jours */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`
                min-h-[120px] p-2 border-r border-b border-border last:border-r-0
                ${!day.isCurrentMonth ? 'bg-gray-50' : 'bg-white'}
                ${day.isToday ? 'bg-blue-50' : ''}
              `}
            >
              {/* Numéro du jour */}
              <div className="flex items-center justify-between mb-2">
                <Text
                  variant="p4"
                  className={`
                    font-medium
                    ${!day.isCurrentMonth ? 'text-gray-400' : 'text-gray-700'}
                    ${day.isToday ? 'text-blue-600 font-bold' : ''}
                  `}
                >
                  {day.date.getDate()}
                </Text>
                
                {day.plannings.length > 0 && (
                  <Badge
                    variant="solid"
                    color={ColorsEnum.PRIMARY}
                    className="text-xs"
                  >
                    {day.plannings.length}
                  </Badge>
                )}
              </div>

              {/* Plannings du jour */}
              <div className="space-y-1">
                {day.plannings.slice(0, 3).map(planning => (
                  <div
                    key={planning.id}
                    onClick={() => onPlanningClick?.(planning)}
                    className={`
                      text-xs p-1 rounded border cursor-pointer hover:shadow-sm transition-shadow
                      ${getStatutColor(planning.statut)}
                    `}
                  >
                    <div className="font-medium truncate">
                      {planning.ligne.numero}
                    </div>
                    <div className="text-xs opacity-75 truncate">
                      {planning.bus.numeroImmatriculation}
                    </div>
                    {planning.horaires.length > 0 && (
                      <div className="text-xs opacity-75">
                        {planning.horaires[0].heureDepart}
                      </div>
                    )}
                  </div>
                ))}
                
                {day.plannings.length > 3 && (
                  <div className="text-xs text-gray-500 p-1">
                    +{day.plannings.length - 3} autres
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistiques du mois */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Icon name="CheckCircle" size={20} color={ColorsEnum.SUCCESS} />
            </div>
            <div>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                Plannings actifs
              </Text>
              <Text variant="h3" className="font-bold">
                {planningsFiltres.filter(p => p.statut === 'Actif').length}
              </Text>
            </div>
          </div>
        </div>

        <div className="bg-white border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Icon name="Pause" size={20} color={ColorsEnum.WARNING} />
            </div>
            <div>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                Suspendus
              </Text>
              <Text variant="h3" className="font-bold">
                {planningsFiltres.filter(p => p.statut === 'Suspendu').length}
              </Text>
            </div>
          </div>
        </div>

        <div className="bg-white border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Icon name="Bus" size={20} color={ColorsEnum.INFO} />
            </div>
            <div>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                Bus mobilisés
              </Text>
              <Text variant="h3" className="font-bold">
                {new Set(planningsFiltres.map(p => p.busId)).size}
              </Text>
            </div>
          </div>
        </div>

        <div className="bg-white border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Icon name="Users" size={20} color={ColorsEnum.SECONDARY} />
            </div>
            <div>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
                Chauffeurs actifs
              </Text>
              <Text variant="h3" className="font-bold">
                {new Set(planningsFiltres.map(p => p.chauffeurId)).size}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
