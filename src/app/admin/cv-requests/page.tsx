"use client";
import AdminLayout from "../AdminLayout";
import React, { useState } from "react";
import { useCVRequests } from "../../../hooks/useCVRequests";
import CVRequestModal from "../../../components/CVRequestModal";
import Notification from "../../../components/Notification";
import Loader from "../../../components/Loader";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faMagnifyingGlass,
  faArrowLeft,
  faArrowRight,
  faPlus,
  faFilter,
  faFileAlt,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import StatCard from "../../../components/StatCard";

export default function AdminCVRequestsPage() {
  const {
    cvRequests,
    loading,
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
  } = useCVRequests();

  const { token } = useAuth();
  const router = useRouter();

  // Redirection si non authentifié
  React.useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  // États pour la recherche, la pagination et la confirmation de suppression
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [requestToDelete, setRequestToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  // Filtrage local sur les demandes
  const filtered = cvRequests.filter(
    (request) =>
      request.name.toLowerCase().includes(search.toLowerCase()) ||
      request.email.toLowerCase().includes(search.toLowerCase()) ||
      request.status.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  // Calcul des statistiques
  const stats = {
    total: cvRequests.length,
    pending: cvRequests.filter((req) => req.status === "En attente").length,
    processed: cvRequests.filter((req) => req.status === "Traité").length,
    rejected: cvRequests.filter((req) => req.status === "Rejeté").length,
  };

  return (
    <AdminLayout>
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestion des demandes de CV
          </h1>
          <button
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            onClick={openAddModal}
          >
            <FontAwesomeIcon icon={faPlus} />
            Ajouter une demande
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={faFileAlt}
            value={stats.total}
            label="Total des demandes"
            iconColor="text-indigo-400"
            loading={loading}
          />
          <StatCard
            icon={faFileAlt}
            value={stats.pending}
            label="En attente"
            iconColor="text-yellow-400"
            loading={loading}
          />
          <StatCard
            icon={faFileAlt}
            value={stats.processed}
            label="Traitées"
            iconColor="text-green-400"
            loading={loading}
          />
          <StatCard
            icon={faFileAlt}
            value={stats.rejected}
            label="Rejetées"
            iconColor="text-red-400"
            loading={loading}
          />
        </div>

        {/* Section Filtres */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rechercher
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 min-w-4 min-h-4"
                />
                <input
                  type="text"
                  placeholder="Nom, email ou statut..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
              >
                <FontAwesomeIcon icon={faFilter} />
                Réinitialiser
              </button>
            </div>
          </div>
        </div>

        {/* Tableau des demandes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 mb-4">
                Aucune demande trouvée
              </div>
              <button
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Nom
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {paginated.map((cv) => (
                      <tr
                        key={cv.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                            <FontAwesomeIcon
                              icon={faUser}
                              className="text-gray-400"
                            />
                            {cv.name}
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              className="text-gray-400"
                            />
                            {cv.email}
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              cv.status === "Traité"
                                ? "bg-green-100 text-green-800 dark:bg-green-600 dark:text-white"
                                : cv.status === "Rejeté"
                                  ? "bg-red-100 text-red-800 dark:bg-red-600 dark:text-white"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-white"
                            }`}
                          >
                            {cv.status}
                          </span>
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-2"
                              onClick={() => openEditModal(cv)}
                            >
                              <FontAwesomeIcon icon={faPen} />
                              <span>Traiter</span>
                            </button>

                            <button
                              className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition"
                              onClick={() =>
                                setRequestToDelete({
                                  id: cv.id,
                                  name: cv.name,
                                })
                              }
                              title="Supprimer"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination améliorée */}
              <div className="flex flex-col sm:flex-row items-center justify-between mt-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
                  {filtered.length} demande(s) • Page {page} sur {totalPages}
                </div>

                <div className="flex gap-2">
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-50"
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                  >
                    Première
                  </button>

                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-50"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Précédent
                  </button>

                  <div className="flex">
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const pageNum =
                        Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
                      return (
                        <button
                          key={pageNum}
                          className={`px-3 py-2 rounded-lg mx-0.5 min-w-[40px] ${
                            page === pageNum
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                          onClick={() => setPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-50"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Suivant
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>

                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-50"
                    onClick={() => setPage(totalPages)}
                    disabled={page === totalPages}
                  >
                    Dernière
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      {/* </div> */}

      {/* Modale de confirmation suppression */}
      {requestToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Confirmer la suppression
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Voulez-vous vraiment supprimer la demande de{" "}
              <span className="font-semibold">{requestToDelete.name}</span> ?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                onClick={() => setRequestToDelete(null)}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                onClick={() => {
                  deleteCVRequest(requestToDelete.id);
                  setRequestToDelete(null);
                }}
              >
                Supprimer définitivement
              </button>
            </div>
          </div>
        </div>
      )}

      <CVRequestModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={(data) => {
          editingCVRequest
            ? editCVRequest({ ...editingCVRequest, ...data })
            : addCVRequest({ name: data.name, email: data.email });
        }}
        initialData={
          editingCVRequest
            ? {
                name: editingCVRequest.name,
                email: editingCVRequest.email,
                status: editingCVRequest.status,
              }
            : undefined
        }
      />

      {notification && (
        <Notification
          message={notification}
          type="success"
          onClose={clearNotification}
        />
      )}
    </AdminLayout>
  );
}
