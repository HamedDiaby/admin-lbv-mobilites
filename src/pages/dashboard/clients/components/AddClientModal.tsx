import { FC, useState, useEffect } from "react";
import { Modal } from "../../../../components/modal";
import { Input } from "../../../../components/input";
import { Select } from "../../../../components/select";
import { Button } from "../../../../components/button";
import { Text } from "../../../../components/text";
import { Icon } from "../../../../components/icon";
import { ColorsEnum } from "../../../../utils/enums";
import { Client, ClientFormData } from "../types";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClientFormData) => Promise<void>;
  editingClient?: Client | null;
}

export const AddClientModal: FC<AddClientModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingClient
}) => {
  const [formData, setFormData] = useState<ClientFormData>({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    dateNaissance: "",
    adresse: "",
    ville: ""
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialisation du formulaire lors de l'édition
  useEffect(() => {
    if (editingClient) {
      setFormData({
        nom: editingClient.nom,
        prenom: editingClient.prenom,
        telephone: editingClient.telephone,
        email: editingClient.email,
        dateNaissance: editingClient.dateNaissance || "",
        adresse: editingClient.adresse || "",
        ville: editingClient.ville || ""
      });
    } else {
      // Réinitialiser le formulaire
      setFormData({
        nom: "",
        prenom: "",
        telephone: "",
        email: "",
        dateNaissance: "",
        adresse: "",
        ville: ""
      });
    }
    setErrors({});
  }, [editingClient, isOpen]);

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    }
    if (!formData.prenom.trim()) {
      newErrors.prenom = "Le prénom est requis";
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = "Le téléphone est requis";
    } else if (!/^(\+241|241)?\s?[0-9\s-]{8,}$/.test(formData.telephone)) {
      newErrors.telephone = "Format de téléphone invalide (ex: +241 06 12 34 56)";
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

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

  // Options pour les villes
  const villeOptions = [
    { value: "", label: "Sélectionner une ville" },
    { value: "Libreville", label: "Libreville" },
    { value: "Port-Gentil", label: "Port-Gentil" },
    { value: "Franceville", label: "Franceville" },
    { value: "Oyem", label: "Oyem" },
    { value: "Moanda", label: "Moanda" },
    { value: "Lambaréné", label: "Lambaréné" },
    { value: "Koulamoutou", label: "Koulamoutou" },
    { value: "Tchibanga", label: "Tchibanga" }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingClient ? "Modifier le client" : "Nouveau client"}
      size="md"
    >
      <div className="space-y-6">
        {/* Informations personnelles */}
        <div className="space-y-4">
          <Text variant="h4" className="font-semibold">
            Informations personnelles
          </Text>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nom"
              placeholder="Nom de famille"
              value={formData.nom}
              onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
              error={errors.nom}
              required
            />

            <Input
              label="Prénom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={(e) => setFormData(prev => ({ ...prev, prenom: e.target.value }))}
              error={errors.prenom}
              required
            />
          </div>

          <Input
            type="date"
            label="Date de naissance"
            value={formData.dateNaissance}
            onChange={(e) => setFormData(prev => ({ ...prev, dateNaissance: e.target.value }))}
            error={errors.dateNaissance}
          />
        </div>

        {/* Informations de contact */}
        <div className="space-y-4">
          <Text variant="h4" className="font-semibold">
            Informations de contact
          </Text>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              label="Téléphone"
              placeholder="+241 06 12 34 56"
              value={formData.telephone}
              onChange={(e) => setFormData(prev => ({ ...prev, telephone: e.target.value }))}
              error={errors.telephone}
              required
            />

            <Input
              type="email"
              label="Email"
              placeholder="email@exemple.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              error={errors.email}
              required
            />
          </div>
        </div>

        {/* Adresse */}
        <div className="space-y-4">
          <Text variant="h4" className="font-semibold">
            Adresse
          </Text>
          
          <Input
            label="Adresse complète"
            placeholder="Quartier, rue, numéro..."
            value={formData.adresse}
            onChange={(e) => setFormData(prev => ({ ...prev, adresse: e.target.value }))}
            error={errors.adresse}
          />

          <Select
            label="Ville"
            options={villeOptions}
            value={formData.ville}
            onChange={(e) => setFormData(prev => ({ ...prev, ville: e.target.value }))}
            error={errors.ville}
          />
        </div>

        {/* Informations importantes */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} color={ColorsEnum.INFO} className="mt-0.5" />
            <div>
              <Text variant="p3" className="font-semibold text-blue-900">
                Après création
              </Text>
              <Text variant="p4" className="text-blue-800 mt-1">
                Un QR code unique sera automatiquement généré pour ce client. 
                Vous pourrez l'imprimer ou l'envoyer par email pour l'utilisation dans l'app mobile.
              </Text>
            </div>
          </div>
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
            <span>{editingClient ? "Modifier" : "Créer"}</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
