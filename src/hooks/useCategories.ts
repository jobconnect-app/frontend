import { useState, useEffect } from "react";
import { Category } from "../lib/types";
import { api, authHeaders } from "../lib/api";
import { useAuth } from "./useAuth";

export function useCategories() {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get<Category[]>(
        "/categories",
        authHeaders(token || undefined),
      );
      setCategories(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchCategories();
  }, [token]);

  const addCategory = async (cat: Omit<Category, "id">) => {
    setLoading(true);
    try {
      await api.post("/categories", cat, authHeaders(token || undefined));
      setNotification("Catégorie ajoutée avec succès");
      fetchCategories();
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const editCategory = async (cat: Category) => {
    setLoading(true);
    try {
      await api.patch(
        `/categories/${cat.id}`,
        cat,
        authHeaders(token || undefined),
      );
      setNotification("Catégorie modifiée avec succès");
      fetchCategories();
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: number) => {
    setLoading(true);
    try {
      await api.delete(`/categories/${id}`, authHeaders(token || undefined));
      setNotification("Catégorie supprimée");
      fetchCategories();
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    notification,
    modalOpen,
    editingCategory,
    openAddModal: () => {
      setEditingCategory(null);
      setModalOpen(true);
    },
    openEditModal: (cat: Category) => {
      setEditingCategory(cat);
      setModalOpen(true);
    },
    closeModal: () => {
      setModalOpen(false);
      setEditingCategory(null);
    },
    addCategory,
    editCategory,
    deleteCategory,
    clearNotification: () => setNotification(null),
  };
}
