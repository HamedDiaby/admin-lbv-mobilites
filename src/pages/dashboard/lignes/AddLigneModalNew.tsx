import { FC, useState, useEffect, ChangeEvent } from "react";
import { Modal } from "../../../components/modal";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { Select } from "../../../components/select";
import { Text } from "../../../components/text";
import { Icon } from "../../../components/icon";
import { ColorsEnum } from "../../../utils/enums";
import { Ligne, LigneFormData, Station, StationIntermediaire, Ville } from "./types";

interface AddLigneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LigneFormData) => void;
  stations: Station[];
  villes: Ville[];
  editingLigne?: Ligne | null;
}

export const AddLigneModal: FC<AddLigneModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  stations,
  villes,
  editingLigne
}) => {
  const [formData, setFormData] = useState<LigneFormData>({
    nom: "",
    ville: "",
    stationDepartId: "",
    stationArriveeId: "",
    stationsIntermediaires: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Effet pour initialiser le formulaire en mode édition
  useEffect(() => {
    if (editingLigne && isOpen) {
      setFormData({
        nom: editingLigne.nom,
        ville: editingLigne.ville,
        stationDepartId: editingLigne.stationDepart.id,
        stationArriveeId: editingLigne.stationArrivee.id,
        stationsIntermediaires: editingLigne.stationsIntermediaires.map(si => ({
          stationId: si.stationId,
          nomStation: si.nomStation,
          ordre: si.ordre,
          distanceDepuisStation: si.distanceDepuisStation,
          tempsDepuisStation: si.tempsDepuisStation
        }))
      });
    } else if (isOpen && !editingLigne) {
      setFormData({
        nom: "",
        ville: "",
        stationDepartId: "",
        stationArriveeId: "",
        stationsIntermediaires: []
      });
    }
  }, [editingLigne, isOpen]);

  // Réinitialiser les erreurs et le formulaire à la fermeture
  useEffect(() => {
    if (!isOpen) {
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Options pour les selects des stations
  const stationOptions = stations.map(station => ({
    value: station.id,
    label: `${station.nom} (${station.ville})`
  }));

  // Options pour les villes
  const villeOptions = villes.map(ville => ({
    value: ville.nom,
    label: ville.nom
  }));

  // Stations disponibles pour les stations intermédiaires (exclut départ et arrivée)
  const availableIntermediateStations = stations.filter(
    station => 
      station.id !== formData.stationDepartId && 
      station.id !== formData.stationArriveeId &&
      !formData.stationsIntermediaires.some(si => si.stationId === station.id)
  );

  const intermediateStationOptions = availableIntermediateStations.map(station => ({
    value: station.id,
    label: `${station.nom} (${station.ville})`
  }));

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom de la ligne est requis";
    }

    if (!formData.ville.trim()) {
      newErrors.ville = "La ville est requise";
    }

    if (!formData.stationDepartId) {
      newErrors.stationDepartId = "La station de départ est requise";
    }

    if (!formData.stationArriveeId) {
      newErrors.stationArriveeId = "La station d'arrivée est requise";
    }

    if (formData.stationDepartId === formData.stationArriveeId) {
      newErrors.stationArriveeId = "La station d'arrivée doit être différente de la station de départ";
    }

    // Validation des stations intermédiaires
    formData.stationsIntermediaires.forEach((si, index) => {
      if (!si.stationId) {
        newErrors[`station_${index}`] = "Station requise";
      }
      if (si.distanceDepuisStation <= 0) {
        newErrors[`distance_${index}`] = "Distance doit être positive";
      }
      if (si.tempsDepuisStation <= 0) {
        newErrors[`temps_${index}`] = "Temps doit être positif";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Ajouter une station intermédiaire
  const addStationIntermediaire = () => {
    const newStation: Omit<StationIntermediaire, 'id'> = {
      stationId: "",
      nomStation: "",
      ordre: formData.stationsIntermediaires.length + 1,
      distanceDepuisStation: 0,
      tempsDepuisStation: 0
    };

    setFormData(prev => ({
      ...prev,
      stationsIntermediaires: [...prev.stationsIntermediaires, newStation]
    }));
  };

  // Supprimer une station intermédiaire
  const removeStationIntermediaire = (index: number) => {
    setFormData(prev => ({
      ...prev,
      stationsIntermediaires: prev.stationsIntermediaires
        .filter((_, i) => i !== index)
        .map((si, i) => ({ ...si, ordre: i + 1 }))
    }));
  };

  // Mettre à jour une station intermédiaire
  const updateStationIntermediaire = (index: number, field: keyof Omit<StationIntermediaire, 'id'>, value: any) => {
    setFormData(prev => {
      const newStations = [...prev.stationsIntermediaires];
      
      if (field === 'stationId') {
        const station = stations.find(s => s.id === value);
        newStations[index] = {
          ...newStations[index],
          stationId: value,
          nomStation: station ? station.nom : ""
        };
      } else {
        newStations[index] = {
          ...newStations[index],
          [field]: value
        };
      }
      
      return {
        ...prev,
        stationsIntermediaires: newStations
      };
    });
  };

  // Calculer distance et temps total
  const calculateTotals = () => {
    let totalDistance = 0;
    let totalTime = 0;

    formData.stationsIntermediaires.forEach(station => {
      totalDistance += station.distanceDepuisStation;
      totalTime += station.tempsDepuisStation;
    });

    return { totalDistance, totalTime };
  };

  const { totalDistance, totalTime } = calculateTotals();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingLigne ? "Modifier la ligne" : "Ajouter une nouvelle ligne"}
      size="lg"
      maxHeight="90vh"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations générales */}
        <div className="space-y-4">
          <Text variant="h4" className="font-semibold text-text-primary border-b border-border pb-2">
            Informations générales
          </Text>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nom de la ligne"
              placeholder="Ex: Ligne A, Bus 101..."
              value={formData.nom}
              onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
              error={errors.nom}
              required
            />
            
            <Select
              label="Ville"
              value={formData.ville}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormData(prev => ({ ...prev, ville: e.target.value }))}
              options={villeOptions}
              placeholder="Sélectionner une ville"
              error={errors.ville}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Station de départ"
              value={formData.stationDepartId}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormData(prev => ({ ...prev, stationDepartId: e.target.value }))}
              options={stationOptions}
              placeholder="Sélectionner une station"
              error={errors.stationDepartId}
              required
            />
            
            <Select
              label="Station d'arrivée"
              value={formData.stationArriveeId}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormData(prev => ({ ...prev, stationArriveeId: e.target.value }))}
              options={stationOptions}
              placeholder="Sélectionner une station"
              error={errors.stationArriveeId}
              required
            />
          </div>
        </div>

        {/* Totaux calculés */}
        {(totalDistance > 0 || totalTime > 0) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <Text variant="h4" className="font-semibold text-blue-900 mb-2">
              Distance et temps total du trajet
            </Text>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} color="#1e40af" />
                <Text variant="p3" className="font-medium text-blue-800">
                  {totalDistance.toFixed(1)} km
                </Text>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} color="#1e40af" />
                <Text variant="p3" className="font-medium text-blue-800">
                  {totalTime} min
                </Text>
              </div>
            </div>
          </div>
        )}

        {/* Stations intermédiaires */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <Text variant="h4" className="font-semibold text-text-primary">
              Stations intermédiaires
            </Text>
            <Button
              htmlType="button"
              appearance="outline"
              variation="primary"
              size="sm"
              iconName="Plus"
              onClick={addStationIntermediaire}
              disabled={intermediateStationOptions.length === 0}
            >
              Ajouter
            </Button>
          </div>

          {formData.stationsIntermediaires.length === 0 ? (
            <div className="text-center py-6 text-text-secondary">
              <Icon name="MapPin" size={32} className="mx-auto mb-2 opacity-50" />
              <Text variant="p3">
                Aucune station intermédiaire ajoutée
              </Text>
              <Text variant="p4" className="mt-1">
                Cliquez sur "Ajouter" pour ajouter des stations entre le départ et l'arrivée
              </Text>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.stationsIntermediaires.map((station, index) => (
                <div key={index} className="border border-border rounded-lg p-4 bg-background">
                  <div className="flex items-center justify-between mb-3">
                    <Text variant="p2" className="font-medium">
                      Station #{station.ordre}
                    </Text>
                    <Button
                      htmlType="button"
                      appearance="outline"
                      variation="error"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => removeStationIntermediaire(index)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Select
                      label="Station"
                      value={station.stationId}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => updateStationIntermediaire(index, 'stationId', e.target.value)}
                      options={[
                        ...intermediateStationOptions,
                        ...(station.stationId ? [{
                          value: station.stationId,
                          label: station.nomStation
                        }] : [])
                      ]}
                      placeholder="Sélectionner une station"
                      error={errors[`station_${index}`]}
                      required
                    />
                    
                    <Input
                      label="Distance depuis la station précédente (km)"
                      placeholder="0"
                      value={station.distanceDepuisStation?.toString()}
                      onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateStationIntermediaire(index, 'distanceDepuisStation', parseFloat(e.target.value) || 0)}
                      error={errors[`distance_${index}`]}
                      required
                    />
                    
                    <Input
                      label="Temps depuis la station précédente (min)"
                      placeholder="0"
                      value={station.tempsDepuisStation?.toString()}
                      onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateStationIntermediaire(index, 'tempsDepuisStation', parseInt(e.target.value) || 0)}
                      error={errors[`temps_${index}`]}
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-border">
          <Button
            htmlType="button"
            appearance="outline"
            variation="secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Annuler
          </Button>
          
          <Button
            htmlType="submit"
            appearance="solid"
            variation="primary"
            loading={isSubmitting}
            iconName={editingLigne ? "Save" : "Plus"}
          >
            {editingLigne ? "Modifier" : "Ajouter"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
