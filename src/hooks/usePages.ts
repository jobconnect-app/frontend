import { useState } from "react";
import { Page } from "../lib/types";

export function usePages() {
  const [pages, setPages] = useState<Page[]>([
    { id: 1, title: "FAQ", type: "Foire aux questions" },
    { id: 2, title: "À propos", type: "Page statique" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);

  const openAddModal = () => {
    setEditingPage(null);
    setModalOpen(true);
  };
  const openEditModal = (page: Page) => {
    setEditingPage(page);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditingPage(null);
  };

  const addPage = (page: Omit<Page, "id">) => {
    setLoading(true);
    setTimeout(() => {
      setPages((prev) => [{ ...page, id: Date.now() }, ...prev]);
      setNotification("Page ajoutée avec succès");
      setLoading(false);
      closeModal();
    }, 700);
  };

  const editPage = (page: Page) => {
    setLoading(true);
    setTimeout(() => {
      setPages((prev) => prev.map((p) => (p.id === page.id ? page : p)));
      setNotification("Page modifiée avec succès");
      setLoading(false);
      closeModal();
    }, 700);
  };

  const deletePage = (id: number) => {
    setLoading(true);
    setTimeout(() => {
      setPages((prev) => prev.filter((p) => p.id !== id));
      setNotification("Page supprimée");
      setLoading(false);
    }, 700);
  };

  const clearNotification = () => setNotification(null);

  return {
    pages,
    loading,
    error,
    notification,
    modalOpen,
    editingPage,
    openAddModal,
    openEditModal,
    closeModal,
    addPage,
    editPage,
    deletePage,
    clearNotification,
  };
}
