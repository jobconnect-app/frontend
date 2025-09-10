import { useState } from "react";
import { Setting } from "../lib/types";

export function useSettings() {
  const [settings, setSettings] = useState<Setting[]>([
    { id: 1, key: "2FA", value: "désactivé" },
    { id: 2, key: "theme", value: "clair" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSetting, setEditingSetting] = useState<Setting | null>(null);

  const openAddModal = () => {
    setEditingSetting(null);
    setModalOpen(true);
  };
  const openEditModal = (setting: Setting) => {
    setEditingSetting(setting);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditingSetting(null);
  };

  const addSetting = (setting: Omit<Setting, "id">) => {
    setLoading(true);
    setTimeout(() => {
      setSettings((prev) => [{ ...setting, id: Date.now() }, ...prev]);
      setNotification("Paramètre ajouté avec succès");
      setLoading(false);
      closeModal();
    }, 700);
  };

  const editSetting = (setting: Setting) => {
    setLoading(true);
    setTimeout(() => {
      setSettings((prev) =>
        prev.map((s) => (s.id === setting.id ? setting : s)),
      );
      setNotification("Paramètre modifié avec succès");
      setLoading(false);
      closeModal();
    }, 700);
  };

  const deleteSetting = (id: number) => {
    setLoading(true);
    setTimeout(() => {
      setSettings((prev) => prev.filter((s) => s.id !== id));
      setNotification("Paramètre supprimé");
      setLoading(false);
    }, 700);
  };

  const clearNotification = () => setNotification(null);

  return {
    settings,
    loading,
    error,
    notification,
    modalOpen,
    editingSetting,
    openAddModal,
    openEditModal,
    closeModal,
    addSetting,
    editSetting,
    deleteSetting,
    clearNotification,
  };
}
