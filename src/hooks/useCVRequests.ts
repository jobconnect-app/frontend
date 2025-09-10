import { useState } from "react";
import { CVRequest } from "../lib/types";

export function useCVRequests() {
  const [cvRequests, setCVRequests] = useState<CVRequest[]>([
    {
      id: 1,
      name: "Alice Dupont",
      email: "alice@email.com",
      status: "En attente",
    },
    { id: 2, name: "Bob Martin", email: "bob@email.com", status: "Traité" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCVRequest, setEditingCVRequest] = useState<CVRequest | null>(
    null,
  );

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

  const addCVRequest = (cvRequest: Omit<CVRequest, "id" | "status">) => {
    setLoading(true);
    setTimeout(() => {
      setCVRequests((prev) => [
        { ...cvRequest, id: Date.now(), status: "En attente" },
        ...prev,
      ]);
      setNotification("Demande de CV ajoutée avec succès");
      setLoading(false);
      closeModal();
    }, 700);
  };

  const editCVRequest = (cvRequest: CVRequest) => {
    setLoading(true);
    setTimeout(() => {
      setCVRequests((prev) =>
        prev.map((c) => (c.id === cvRequest.id ? cvRequest : c)),
      );
      setNotification("Demande de CV modifiée avec succès");
      setLoading(false);
      closeModal();
    }, 700);
  };

  const deleteCVRequest = (id: number) => {
    setLoading(true);
    setTimeout(() => {
      setCVRequests((prev) => prev.filter((c) => c.id !== id));
      setNotification("Demande de CV supprimée");
      setLoading(false);
    }, 700);
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
    editCVRequest,
    deleteCVRequest,
    clearNotification,
  };
}
