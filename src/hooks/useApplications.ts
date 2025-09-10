import { useState, useEffect } from "react";
import { Application, ApplicationWithRelations } from "../lib/types";
import { api, authHeaders } from "../lib/api";

export interface ApplicationFilters {
  search?: string;
  id?: number;
  userId?: number;
  jobId?: number;
  dateCandidature?: string; // Date ISO
  statut?: string;
}

export function useApplications(token?: string) {
  const [applications, setApplications] = useState<ApplicationWithRelations[]>(
    [],
  );
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [_filters, _setFilters] = useState<ApplicationFilters>({});
  // Setter qui évite les null dans filters
  const setFilters = (
    updater: (f: ApplicationFilters) => ApplicationFilters,
  ) => {
    _setFilters((prev) => {
      const next = updater(prev);
      // Remplacer tous les null par undefined, et search null => undefined
      return Object.fromEntries(
        Object.entries(next).map(([k, v]) => [
          k,
          k === "search" && v === null ? undefined : v === null ? undefined : v,
        ]),
      ) as ApplicationFilters;
    });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] =
    useState<Application | null>(null);

  const fetchApplications = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    const params: Record<string, unknown> = {
      page,
      limit,
      ..._filters,
    };
    // Nettoyer les filtres vides
    Object.keys(params).forEach(
      (k) => (params[k] === undefined || params[k] === "") && delete params[k],
    );
    try {
      const res = await api.get<{
        data: ApplicationWithRelations[];
        total: number;
      }>("/applications", {
        ...authHeaders(token),
        params,
      });
      setApplications(res.data.data);
      setTotal(res.data.total);
    } catch {
      setError("Erreur lors du chargement des offres.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, page, limit, _filters]);

  const openAddModal = () => {
    setEditingApplication(null);
    setModalOpen(true);
  };
  const openEditModal = (application: Application) => {
    setEditingApplication(application);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditingApplication(null);
  };

  const addApplication = async (application: Omit<Application, "id">) => {
    setLoading(true);
    setError(null);
    try {
      await api.post<Application>(
        "/applications",
        application,
        authHeaders(token),
      );
      setNotification("candidature ajoutée avec succès");
      closeModal();
      fetchApplications();
    } catch {
      setError("Erreur lors de l'ajout de la candidature");
    } finally {
      setLoading(false);
    }
  };

  const editApplication = async (application: Application) => {
    setLoading(true);
    setError(null);
    try {
      // Changez l'URL pour inclure /statut
      await api.patch<Application>(
        `/applications/${application.id}/statut`,
        { statut: application.statut }, // Envoyez seulement le statut
        authHeaders(token),
      );
      setNotification("candidature modifiée avec succès");
      closeModal();
      fetchApplications();
    } catch {
      setError("Erreur lors de la modification de la candidature");
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/applications/${id}`, authHeaders(token));
      setNotification("candidature supprimée");
      fetchApplications();
    } catch {
      setError("Erreur lors de la suppression de la candidature");
    } finally {
      setLoading(false);
    }
  };

  const clearNotification = () => setNotification(null);

  return {
    applications,
    total,
    page,
    setPage,
    limit,
    setLimit,
    filters: _filters,
    setFilters,
    loading,
    error,
    notification,
    modalOpen,
    editingApplication,
    openAddModal,
    openEditModal,
    closeModal,
    addApplication,
    editApplication,
    deleteApplication,
    clearNotification,
    setError,
    fetchApplications, // Ajouté pour pouvoir rafraîchir la liste depuis l'extérieur
  };
}
