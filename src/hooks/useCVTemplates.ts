import { useState } from "react";
import { CVTemplate } from "../lib/types";

export function useCVTemplates() {
  const [cvTemplates, setCVTemplates] = useState<CVTemplate[]>([
    { id: 1, name: "Moderne", downloads: 24 },
    { id: 2, name: "Classique", downloads: 12 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCVTemplate, setEditingCVTemplate] = useState<CVTemplate | null>(
    null,
  );

  const openAddModal = () => {
    setEditingCVTemplate(null);
    setModalOpen(true);
  };
  const openEditModal = (cvTemplate: CVTemplate) => {
    setEditingCVTemplate(cvTemplate);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditingCVTemplate(null);
  };

  const addCVTemplate = (cvTemplate: Omit<CVTemplate, "id">) => {
    setLoading(true);
    setTimeout(() => {
      setCVTemplates((prev) => [{ ...cvTemplate, id: Date.now() }, ...prev]);
      setNotification("Template CV ajouté avec succès");
      setLoading(false);
      closeModal();
    }, 700);
  };

  const editCVTemplate = (cvTemplate: CVTemplate) => {
    setLoading(true);
    setTimeout(() => {
      setCVTemplates((prev) =>
        prev.map((t) => (t.id === cvTemplate.id ? cvTemplate : t)),
      );
      setNotification("Template CV modifié avec succès");
      setLoading(false);
      closeModal();
    }, 700);
  };

  const deleteCVTemplate = (id: number) => {
    setLoading(true);
    setTimeout(() => {
      setCVTemplates((prev) => prev.filter((t) => t.id !== id));
      setNotification("Template CV supprimé");
      setLoading(false);
    }, 700);
  };

  const clearNotification = () => setNotification(null);

  return {
    cvTemplates,
    loading,
    error,
    notification,
    modalOpen,
    editingCVTemplate,
    openAddModal,
    openEditModal,
    closeModal,
    addCVTemplate,
    editCVTemplate,
    deleteCVTemplate,
    clearNotification,
  };
}
