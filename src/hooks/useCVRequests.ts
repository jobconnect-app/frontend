import { useState, useEffect, useCallback } from "react";
import { CVRequest } from "../lib/types";
import { api, authHeaders } from "../lib/api";
import { useAuth } from "./useAuth";

export function useCVRequests() {
  const { token } = useAuth();
  const [cvRequests, setCVRequests] = useState<CVRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCVRequest, setEditingCVRequest] = useState<CVRequest | null>(null);

  const fetchCVRequests = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<CVRequest[]>("/cv-requests", authHeaders(token));
      setCVRequests(res.data);
    } catch {
      setError("Erreur lors du chargement des demandes de CV");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCVRequests();
  }, [fetchCVRequests]);

  const openAddModal = () => {
    setEditingCVRequest(null);
    setModalOpen(true);
  };

  const openEditModal = (cvRequest: CVRequest) => {
    setEditingCVRequest(cvRequest);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCVRequest(null);
  };

  const addCVRequest = async (cvRequestData: Omit<CVRequest, "id" | "status" | "dateDemande">) => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/cv-requests", cvRequestData, authHeaders(token));
      setNotification("Demande de CV créée avec succès");
      closeModal();
      fetchCVRequests();
    } catch {
      setError("Erreur lors de la création de la demande de CV");
    } finally {
      setLoading(false);
    }
  };

  const updateCVRequestStatus = async (id: number, statut: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.patch(`/cv-requests/${id}/statut`, { statut }, authHeaders(token));
      setNotification("Statut de la demande mis à jour");
      fetchCVRequests();
    } catch {
      setError("Erreur lors de la mise à jour du statut");
    } finally {
      setLoading(false);
    }
  };

  const deleteCVRequest = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/cv-requests/${id}`, authHeaders(token));
      setNotification("Demande de CV supprimée");
      fetchCVRequests();
    } catch {
      setError("Erreur lors de la suppression de la demande de CV");
    } finally {
      setLoading(false);
    }
  };

  const clearNotification = () => setNotification(null);

  return {
    cvRequests,
    loading,
    error,
    notification,
    modalOpen,
    editingCVRequest,
    openAddModal,
    openEditModal,
    closeModal,
    addCVRequest,
    updateCVRequestStatus,
    deleteCVRequest,
    clearNotification,
  };
}