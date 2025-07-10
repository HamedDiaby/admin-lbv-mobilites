import { FC, useState, useEffect } from "react";
import { Modal } from "../../../../components/modal";
import { Input } from "../../../../components/input";
import { Select } from "../../../../components/select";
import { Button } from "../../../../components/button";
import { Text } from "../../../../components/text";
import { Icon } from "../../../../components/icon";
import { ColorsEnum } from "../../../../utils/enums";
import { PlanningData, PlanningFormData, Chauffeur, Bus, Horaire, Recurrence } from "../types";

interface AddPlanningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PlanningFormData) => Promise<void>;
  editingPlanning?: PlanningData | null;
  chauffeurs: Chauffeur[];
  bus: Bus[];
}

// Données simulées pour les lignes (à remplacer par de vraies données)
const mockLignes = [
  { id: "1", nom: "Ligne A", numero: "L01" },
  { id: "2", nom: "Ligne B", numero: "L02" },
  { id: "3", nom: "Ligne C", numero: "L03" },
  { id: "4", nom: "Ligne Express", numero: "L04" }
];

const JOURS_SEMAINE = [
  "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"
];

export const AddPlanningModal: FC<AddPlanningModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingPlanning,
  chauffeurs,
  bus
}) => {
  const [formData, setFormData] = useState<PlanningFormData>({
    ligneId: "",
    busId: "",
    chauffeurId: "",
    horaires: [{ heureDepart: "", heureArrivee: "", type: "Aller" }],
    recurrence: {
      type: "Hebdomadaire",
      joursActifs: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
      dateDebut: new Date().toISOString().split('T')[0]
    }
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialisation du formulaire lors de l'édition
  useEffect(() => {
    if (editingPlanning) {
      setFormData({
        ligneId: editingPlanning.ligneId,
        busId: editingPlanning.busId,
        chauffeurId: editingPlanning.chauffeurId,
        horaires: editingPlanning.horaires.map(h => ({
          heureDepart: h.heureDepart,
          heureArrivee: h.heureArrivee,
          type: h.type
        })),
        recurrence: editingPlanning.recurrence,
        commentaires: editingPlanning.commentaires
      });
    } else {
      // Réinitialiser le formulaire
      setFormData({
        ligneId: "",
        busId: "",
        chauffeurId: "",
        horaires: [{ heureDepart: "", heureArrivee: "", type: "Aller" }],
        recurrence: {
          type: "Hebdomadaire",
          joursActifs: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
          dateDebut: new Date().toISOString().split('T')[0]
        }
      });
    }
    setErrors({});
  }, [editingPlanning, isOpen]);

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.ligneId) {
      newErrors.ligneId = "Veuillez sélectionner une ligne";
    }
    if (!formData.busId) {
      newErrors.busId = "Veuillez sélectionner un bus";
    }
    if (!formData.chauffeurId) {
      newErrors.chauffeurId = "Veuillez sélectionner un chauffeur";
    }
    if (!formData.recurrence.dateDebut) {
      newErrors.dateDebut = "Veuillez sélectionner une date de début";
    }
    if (formData.horaires.length === 0) {
      newErrors.horaires = "Veuillez ajouter au moins un horaire";
    }

    // Validation des horaires
    formData.horaires.forEach((horaire, index) => {
      if (!horaire.heureDepart) {
        newErrors[`horaire_${index}_depart`] = "Heure de départ requise";
      }
      if (!horaire.heureArrivee) {
        newErrors[`horaire_${index}_arrivee`] = "Heure d'arrivée requise";
      }
      if (horaire.heureDepart && horaire.heureArrivee && horaire.heureDepart >= horaire.heureArrivee) {
        newErrors[`horaire_${index}_ordre`] = "L'heure de départ doit être antérieure à l'heure d'arrivée";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    } finally {
      setLoading(false);
    }
  };

  // Gestion des horaires
  const addHoraire = () => {
    setFormData(prev => ({
      ...prev,
      horaires: [...prev.horaires, { heureDepart: "", heureArrivee: "", type: "Aller" }]
    }));
  };

  const removeHoraire = (index: number) => {
    setFormData(prev => ({
      ...prev,
      horaires: prev.horaires.filter((_, i) => i !== index)
    }));
  };

  const updateHoraire = (index: number, field: keyof Omit<Horaire, 'id'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      horaires: prev.horaires.map((horaire, i) => 
        i === index ? { ...horaire, [field]: value } : horaire
      )
    }));
  };

  // Gestion de la récurrence
  const toggleJourActif = (jour: string) => {
    setFormData(prev => ({
      ...prev,
      recurrence: {
        ...prev.recurrence,
        joursActifs: prev.recurrence.joursActifs?.includes(jour)
          ? prev.recurrence.joursActifs.filter(j => j !== jour)
          : [...(prev.recurrence.joursActifs || []), jour]
      }
    }));
  };

  // Options pour les selects
  const ligneOptions = mockLignes.map(ligne => ({
    value: ligne.id,
    label: `${ligne.numero} - ${ligne.nom}`
  }));

  const busOptions = bus
    .filter(b => b.statut === 'Disponible' || (editingPlanning && b.id === editingPlanning.busId))
    .map(b => ({
      value: b.id,
      label: `${b.numeroImmatriculation} - ${b.marque} ${b.modele} (${b.capacite} places)`
    }));

  const chauffeurOptions = chauffeurs
    .filter(c => c.statut === 'Disponible' || (editingPlanning && c.id === editingPlanning.chauffeurId))
    .map(c => ({
      value: c.id,
      label: `${c.prenom} ${c.nom} (${c.experience} ans d'exp.)`
    }));

  const typeRecurrenceOptions = [
    { value: "Quotidien", label: "Quotidien" },
    { value: "Hebdomadaire", label: "Hebdomadaire" },
    { value: "Mensuel", label: "Mensuel" },
    { value: "Personnalisé", label: "Personnalisé" }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingPlanning ? "Modifier le planning" : "Nouveau planning"}
      size="lg"
    >
      <div className="space-y-6">
        {/* Section Ligne, Bus et Chauffeur */}
        <div className="space-y-4">
          <Text variant="h4" className="font-semibold">
            Affectation
          </Text>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Select
                label="Ligne"
                placeholder="Sélectionner une ligne"
                options={ligneOptions}
                value={formData.ligneId}
                onChange={(e) => setFormData(prev => ({ ...prev, ligneId: e.target.value }))}
                error={errors.ligneId}
                required
              />
            </div>

            <div>
              <Select
                label="Bus"
                placeholder="Sélectionner un bus"
                options={busOptions}
                value={formData.busId}
                onChange={(e) => setFormData(prev => ({ ...prev, busId: e.target.value }))}
                error={errors.busId}
                required
              />
            </div>

            <div>
              <Select
                label="Chauffeur"
                placeholder="Sélectionner un chauffeur"
                options={chauffeurOptions}
                value={formData.chauffeurId}
                onChange={(e) => setFormData(prev => ({ ...prev, chauffeurId: e.target.value }))}
                error={errors.chauffeurId}
                required
              />
            </div>
          </div>
        </div>

        {/* Section Horaires */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Text variant="h4" className="font-semibold">
              Horaires
            </Text>
            <Button
              appearance="outline"
              variation="primary"
              size="sm"
              onClick={addHoraire}
              className="flex items-center space-x-2"
            >
              <Icon name="Plus" size={16} />
              <span>Ajouter un horaire</span>
            </Button>
          </div>

          <div className="space-y-3">
            {formData.horaires.map((horaire, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <Input
                    type="time"
                    label="Heure de départ"
                    value={horaire.heureDepart}
                    onChange={(e) => updateHoraire(index, 'heureDepart', e.target.value)}
                    error={errors[`horaire_${index}_depart`] || errors[`horaire_${index}_ordre`]}
                  />
                  
                  <Input
                    type="time"
                    label="Heure d'arrivée"
                    value={horaire.heureArrivee}
                    onChange={(e) => updateHoraire(index, 'heureArrivee', e.target.value)}
                    error={errors[`horaire_${index}_arrivee`]}
                  />
                  
                  <Select
                    label="Type"
                    options={[
                      { value: "Aller", label: "Aller" },
                      { value: "Retour", label: "Retour" }
                    ]}
                    value={horaire.type}
                    onChange={(e) => updateHoraire(index, 'type', e.target.value as 'Aller' | 'Retour')}
                  />
                </div>
                
                {formData.horaires.length > 1 && (
                  <Button
                    appearance="outline"
                    variation="error"
                    size="sm"
                    onClick={() => removeHoraire(index)}
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                )}
              </div>
            ))}
            {errors.horaires && (
              <Text variant="p4" color={ColorsEnum.ERROR}>
                {errors.horaires}
              </Text>
            )}
          </div>
        </div>

        {/* Section Récurrence */}
        <div className="space-y-4">
          <Text variant="h4" className="font-semibold">
            Récurrence
          </Text>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Type de récurrence"
              options={typeRecurrenceOptions}
              value={formData.recurrence.type}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                recurrence: { ...prev.recurrence, type: e.target.value as Recurrence['type'] }
              }))}
            />

            <Input
              type="date"
              label="Date de début"
              value={formData.recurrence.dateDebut}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                recurrence: { ...prev.recurrence, dateDebut: e.target.value }
              }))}
              error={errors.dateDebut}
              required
            />
          </div>

          {formData.recurrence.type === 'Hebdomadaire' && (
            <div>
              <Text variant="p3" className="mb-2">Jours actifs :</Text>
              <div className="flex flex-wrap gap-2">
                {JOURS_SEMAINE.map(jour => (
                  <button
                    key={jour}
                    type="button"
                    onClick={() => toggleJourActif(jour)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      formData.recurrence.joursActifs?.includes(jour)
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {jour.substring(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Input
            type="date"
            label="Date de fin (optionnel)"
            value={formData.recurrence.dateFin || ""}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              recurrence: { ...prev.recurrence, dateFin: e.target.value || undefined }
            }))}
          />
        </div>

        {/* Section Commentaires */}
        <div>
          <Input
            type="textarea"
            label="Commentaires (optionnel)"
            placeholder="Notes ou instructions particulières..."
            value={formData.commentaires || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, commentaires: e.target.value }))}
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t">
          <Button
            appearance="outline"
            variation="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            appearance="solid"
            variation="primary"
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            {loading && <Icon name="Loader2" size={16} className="animate-spin" />}
            <span>{editingPlanning ? "Modifier" : "Créer"}</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
