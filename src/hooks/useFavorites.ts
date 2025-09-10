import { useState } from "react";
import { Favorite } from "../lib/types";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([
    { id: 1, user: "Jean Dupont", job: "Développeur Fullstack JS" },
    { id: 2, user: "Marie Martin", job: "Chef de projet Marketing" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFavorite, setEditingFavorite] = useState<Favorite | null>(null);

  const openAddModal = () => {
    setEditingFavorite(null);
    setModalOpen(true);
  };
  const openEditModal = (favorite: Favorite) => {
    setEditingFavorite(favorite);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditingFavorite(null);
  };

  const addFavorite = (favorite: Omit<Favorite, "id">) => {
    setLoading(true);
    setTimeout(() => {
      setFavorites((prev) => [{ ...favorite, id: Date.now() }, ...prev]);
      setNotification("Favori ajouté avec succès");
      setLoading(false);
      closeModal();
    }, 700);
  };

  const editFavorite = (favorite: Favorite) => {
    setLoading(true);
    setTimeout(() => {
      setFavorites((prev) =>
        prev.map((f) => (f.id === favorite.id ? favorite : f)),
      );
      setNotification("Favori modifié avec succès");
      setLoading(false);
      closeModal();
    }, 700);
  };

  const deleteFavorite = (id: number) => {
    setLoading(true);
    setTimeout(() => {
      setFavorites((prev) => prev.filter((f) => f.id !== id));
      setNotification("Favori supprimé");
      setLoading(false);
    }, 700);
  };

  const clearNotification = () => setNotification(null);

  return {
    favorites,
    loading,
    error,
    notification,
    modalOpen,
    editingFavorite,
    openAddModal,
    openEditModal,
    closeModal,
    addFavorite,
    editFavorite,
    deleteFavorite,
    clearNotification,
  };
}
