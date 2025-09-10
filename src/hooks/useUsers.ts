import { useState, useEffect } from "react";
import { User } from "../lib/types";
import { api, authHeaders } from "../lib/api";
import { useAuth } from "./useAuth";

export function useUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  // Pagination & recherche côté serveur
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("dateInscription");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [role, setRole] = useState<string | undefined>();
  const [isDeleted, setIsDeleted] = useState<string | undefined>();

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, search, sortBy, sortOrder, role, isDeleted, token]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search,
        sortBy,
        sortOrder,
      });
      if (role) params.append("role", role);
      if (isDeleted !== undefined) params.append("isDeleted", isDeleted);
      const res = await api.get<{ users: User[]; total: number }>(
        `/users?${params.toString()}`,
        authHeaders(token || undefined),
      );
      setUsers(res.data.users);
      setTotal(res.data.total);
    } catch {
      setError("Erreur lors du chargement des utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingUser(null);
    setModalOpen(true);
  };
  const openEditModal = (user: User) => {
    setEditingUser(user);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditingUser(null);
  };

  const addUser = async (user: Omit<User, "id">) => {
    setLoading(true);
    try {
      const res = await api.post<User>(
        "/users",
        user,
        authHeaders(token || undefined),
      );
      setUsers((prev) => [res.data, ...prev]);
      setNotification("Utilisateur ajouté avec succès");
      closeModal();
    } catch {
      setError("Erreur lors de l'ajout de l'utilisateur");
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (user: User) => {
    setLoading(true);
    try {
      const res = await api.patch<User>(
        `/users/${user.id}`,
        user,
        authHeaders(token || undefined),
      );
      setUsers((prev) => prev.map((u) => (u.id === user.id ? res.data : u)));
      setNotification("Utilisateur modifié avec succès");
      closeModal();
    } catch {
      setError("Erreur lors de la modification de l'utilisateur");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    setLoading(true);
    try {
      await api.delete(`/users/${id}`, authHeaders(token || undefined));
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setNotification("Utilisateur supprimé");
    } catch {
      setError("Erreur lors de la suppression de l'utilisateur");
    } finally {
      setLoading(false);
    }
  };

  const clearNotification = () => setNotification(null);
  const clearError = () => setError(null);

  return {
    users,
    loading,
    error,
    notification,
    modalOpen,
    editingUser,
    openAddModal,
    openEditModal,
    closeModal,
    addUser,
    editUser,
    deleteUser,
    clearNotification,
    clearError,
    setUsers,
    page,
    setPage,
    limit,
    setLimit,
    total,
    search,
    setSearch,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    role,
    setRole,
    isDeleted,
    setIsDeleted,
  };
}
