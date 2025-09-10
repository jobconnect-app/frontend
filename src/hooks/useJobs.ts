import { useState, useEffect } from "react";
import { Job } from "../lib/types";
import { api, authHeaders } from "../lib/api";

export interface JobsFilters {
  search?: string;
  typeContrat?: string;
  teletravail?: boolean;
  entreprise?: string;
  lieu?: string;
  adminId?: number;
  categoryId?: number;
  tagId?: number;
  datePublicationMin?: string;
  datePublicationMax?: string;
}

export function useJobs(token?: string) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [_filters, _setFilters] = useState<JobsFilters>({});
  // Setter qui évite les null dans filters
  const setFilters = (updater: (f: JobsFilters) => JobsFilters) => {
    _setFilters((prev) => {
      const next = updater(prev);
      // Remplacer tous les null par undefined, et search null => undefined
      return Object.fromEntries(
        Object.entries(next).map(([k, v]) => [
          k,
          k === "search" && v === null ? undefined : v === null ? undefined : v,
        ]),
      ) as JobsFilters;
    });
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Fonction pour charger les jobs (utilisée aussi après CRUD)
  const fetchJobs = async () => {
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
      const res = await api.get<{ data: Job[]; total: number }>("/jobs", {
        ...authHeaders(token),
        params,
      });
      setJobs(res.data.data);
      setTotal(res.data.total);
    } catch {
      setError("Erreur lors du chargement des offres.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, page, limit, _filters]);

  const openAddModal = () => {
    setEditingJob(null);
    setModalOpen(true);
  };
  const openEditModal = (job: Job) => {
    setEditingJob(job);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditingJob(null);
  };

  // CRUD réels
  const addJob = async (job: Omit<Job, "id">) => {
    setLoading(true);
    setError(null);
    try {
      await api.post<Job>("/jobs", job, authHeaders(token));
      setNotification("Offre ajoutée avec succès");
      closeModal();
      fetchJobs();
    } catch {
      setError("Erreur lors de l'ajout de l'offre");
    } finally {
      setLoading(false);
    }
  };

  const editJob = async (job: Job) => {
    setLoading(true);
    setError(null);
    try {
      // On retire les champs non natifs (categories, tags) si présents
      const jobData = { ...job } as Omit<Job, "categories" | "tags">;
      delete (jobData as any).categories;
      delete (jobData as any).tags;
      await api.patch<Job>(`/jobs/${job.id}`, jobData, authHeaders(token));
      setNotification("Offre modifiée avec succès");
      closeModal();
      fetchJobs();
    } catch {
      setError("Erreur lors de la modification de l'offre");
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/jobs/${id}`, authHeaders(token));
      setNotification("Offre supprimée");
      fetchJobs();
    } catch {
      setError("Erreur lors de la suppression de l'offre");
    } finally {
      setLoading(false);
    }
  };

  const clearNotification = () => setNotification(null);

  return {
    jobs,
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
    editingJob,
    openAddModal,
    openEditModal,
    closeModal,
    addJob,
    editJob,
    deleteJob,
    clearNotification,
    setError,
    fetchJobs, // Ajouté pour pouvoir rafraîchir la liste depuis l'extérieur
  };
}
