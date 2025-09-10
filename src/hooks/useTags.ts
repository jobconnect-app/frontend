import { useState, useEffect } from "react";
import { Tag } from "../lib/types";
import { api, authHeaders } from "../lib/api";
import { useAuth } from "./useAuth";

export function useTags() {
  const { token } = useAuth();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const res = await api.get<Tag[]>(
        "/tags",
        authHeaders(token || undefined),
      );
      setTags(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchTags();
  }, [token]);

  const addTag = async (tag: Omit<Tag, "id">) => {
    setLoading(true);
    try {
      await api.post("/tags", tag, authHeaders(token || undefined));
      setNotification("Tag ajouté avec succès");
      fetchTags();
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const editTag = async (tag: Tag) => {
    setLoading(true);
    try {
      await api.patch(`/tags/${tag.id}`, tag, authHeaders(token || undefined));
      setNotification("Tag modifié avec succès");
      fetchTags();
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteTag = async (id: number) => {
    setLoading(true);
    try {
      await api.delete(`/tags/${id}`, authHeaders(token || undefined));
      setNotification("Tag supprimé");
      fetchTags();
    } finally {
      setLoading(false);
    }
  };

  return {
    tags,
    loading,
    notification,
    modalOpen,
    editingTag,
    openAddModal: () => {
      setEditingTag(null);
      setModalOpen(true);
    },
    openEditModal: (tag: Tag) => {
      setEditingTag(tag);
      setModalOpen(true);
    },
    closeModal: () => {
      setModalOpen(false);
      setEditingTag(null);
    },
    addTag,
    editTag,
    deleteTag,
    clearNotification: () => setNotification(null),
  };
}
