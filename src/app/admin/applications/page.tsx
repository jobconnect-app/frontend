"use client";
import AdminLayout from "../AdminLayout";
import React, { useState } from "react";
import { useApplications } from "../../../hooks/useApplications";
import EntityModal from "../../../components/EntityModal";
import Notification from "../../../components/Notification";
import Loader from "../../../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faMagnifyingGlass,
  faArrowLeft,
  faArrowRight,
  faFilter,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
// import { useRouter } from "next/navigation";
// import { useAuth } from "../../../hooks/useAuth";
import StatCard from "../../../components/StatCard";
import { faFileAlt } from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../../../hooks/useAuth";
import { ApplicationWithRelations } from "../../../lib/types";
import { ApplicationFilters as AppFilters } from "../../../hooks/useApplications";
// ...existing code...

export default function AdminApplicationsPage() {
  const { token } = useAuth();
  const {
    applications = [],
    total,
    page,
    setPage,
    limit,
    filters,
    setFilters,
    loading,
    notification,
    modalOpen,
    editingApplication,
    // openAddModal,
    openEditModal,
    closeModal,
    addApplication,
    editApplication,
    deleteApplication,
    clearNotification,
  } = useApplications(token ?? undefined) as {
    applications: ApplicationWithRelations[];
    total: number;
    page: number;
    setPage: (p: number) => void;
    limit: number;
    filters: AppFilters;
    setFilters: (updater: (f: AppFilters) => AppFilters) => void;
    loading: boolean;
    notification: string | null;
    modalOpen: boolean;
    editingApplication: ApplicationWithRelations | null;
    openAddModal: () => void;
    openEditModal: (app: ApplicationWithRelations) => void;
    closeModal: () => void;
    addApplication: (app: Partial<ApplicationWithRelations>) => void;
    editApplication: (app: Partial<ApplicationWithRelations>) => void;
    deleteApplication: (id: number) => void;
    clearNotification: () => void;
  };

  // const { token } = useAuth();
  // const router = useRouter();

  // Redirection si non authentifié
  // React.useEffect(() => {
  //   if (!token) {
  //     router.push("/login");
  //   }
  // }, [token, router]);

  const applicationFields = [
    { name: "userId", label: "Candidat", required: true },
    { name: "jobId", label: "Offre", required: true },
    {
      name: "statut",
      label: "Statut",
      required: true,
      options: ["EN_ATTENTE", "ACCEPTEE", "REFUSEE"],
    },
  ];

  // Champs passés à la modal : si on édite, afficher le nom du candidat et le titre de l'offre en disabled
  const modalFields = editingApplication
    ? [
        // Champ visible (disabled) pour le nom du candidat
        {
          name: "candidateName",
          label: "Candidat",
          type: "text",
          disabled: true,
        },
        // hidden inputs pour garder les ids
        // { name: 'userId', label: 'UserId', type: 'hidden' },
        // { name: 'jobId', label: 'JobId', type: 'hidden' },
        // Champ visible pour l'offre
        { name: "jobTitle", label: "Offre", type: "text", disabled: true },
        {
          name: "statut",
          label: "Statut",
          required: true,
          options: ["EN_ATTENTE", "ACCEPTEE", "REFUSEE"],
        },
      ]
    : applicationFields;

  // États pour la confirmation de suppression
  const [search, setSearch] = useState(filters.search ?? "");
  const [applicationToDelete, setApplicationToDelete] = useState<{
    id: number;
    candidate: string;
  } | null>(null);

  // Pagination backend
  const totalPages = Math.ceil(total / limit) || 1;

  // Statistiques calculées sur les données paginées (à améliorer côté backend si besoin)
  const stats = {
    total,
    pending: (applications ?? []).filter((app) => app.statut === "EN_ATTENTE")
      .length,
    accepted: (applications ?? []).filter((app) => app.statut === "ACCEPTEE")
      .length,
    rejected: (applications ?? []).filter((app) => app.statut === "REFUSEE")
      .length,
  };

  return (
    <AdminLayout>
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestion des candidatures
          </h1>
          {/* <button
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            onClick={openAddModal}
          >
            <FontAwesomeIcon icon={faPlus} />
            Ajouter une candidature
          </button> */}
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={faFileAlt}
            value={stats.total}
            label="Total candidatures"
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
            value={stats.accepted}
            label="Acceptées"
            iconColor="text-green-400"
            loading={loading}
          />
          <StatCard
            icon={faFileAlt}
            value={stats.rejected}
            label="Refusées"
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
                  placeholder="Candidat, offre ou statut..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={search}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearch(value);
                    setFilters((f: AppFilters) => ({ ...f, search: value }));
                  }}
                />
              </div>
            </div>

            <div className="flex items-end gap-2">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                onClick={() => {
                  setSearch("");
                  setFilters((f: AppFilters) => ({ ...f, search: "" }));
                }}
              >
                <FontAwesomeIcon icon={faFilter} />
                Réinitialiser
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
                onClick={() => alert("Export des candidatures...")}
              >
                <FontAwesomeIcon icon={faFileExport} />
                Exporter
              </button>
            </div>
          </div>
        </div>

        {/* Tableau des candidatures */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 mb-4">
                Aucune candidature trouvée
              </div>
              <button
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                onClick={() => {
                  setSearch("");
                  setFilters((f: AppFilters) => ({ ...f, search: "" }));
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
                        Candidat
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Offre
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
                    {applications.map((application) => (
                      <tr
                        key={application.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {application.user
                              ? `${application.user.prenom ?? ""} ${application.user.nom ?? ""}`.trim() ||
                                `Candidat #${application.userId}`
                              : `Candidat #${application.userId}`}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-gray-700 dark:text-gray-300">
                            {application.job
                              ? application.job.titre ||
                                `Offre #${application.jobId}`
                              : `Offre #${application.jobId}`}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              application.statut === "ACCEPTEE"
                                ? "bg-green-100 text-green-800 dark:bg-green-600 dark:text-white"
                                : application.statut === "REFUSEE"
                                  ? "bg-red-100 text-red-800 dark:bg-red-600 dark:text-white"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-white"
                            }`}
                          >
                            {application.statut === "ACCEPTEE"
                              ? "Acceptée"
                              : application.statut === "REFUSEE"
                                ? "Refusée"
                                : "En attente"}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              className="p-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition"
                              onClick={() => openEditModal(application)}
                              title="Modifier"
                            >
                              <FontAwesomeIcon icon={faPen} />
                            </button>

                            <button
                              className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition"
                              onClick={() =>
                                setApplicationToDelete({
                                  id: application.id,
                                  candidate: application.user
                                    ? `${application.user.prenom ?? ""} ${application.user.nom ?? ""}`.trim() ||
                                      `Candidat #${application.userId}`
                                    : `Candidat #${application.userId}`,
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
                  {total} candidature(s) • Page {page} sur {totalPages}
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
                    onClick={() => setPage(Math.max(1, page - 1))}
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
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
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
      {applicationToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Confirmer la suppression
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Voulez-vous vraiment supprimer la candidature de{" "}
              <span className="font-semibold">
                {applicationToDelete.candidate}
              </span>{" "}
              ?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                onClick={() => setApplicationToDelete(null)}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                onClick={() => {
                  deleteApplication(applicationToDelete.id);
                  setApplicationToDelete(null);
                }}
              >
                Supprimer définitivement
              </button>
            </div>
          </div>
        </div>
      )}

      <EntityModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={(data: Record<string, string | number | undefined>) => {
          if (editingApplication) {
            // data will contain userId/jobId (hidden) and statut
            // ensure we pass numeric ids back to the API
            const payload: Partial<ApplicationWithRelations> = {
              ...editingApplication,
              ...data,
              userId: Number(data.userId),
              jobId: Number(data.jobId),
            };
            editApplication(payload);
          } else {
            const { userId, jobId, statut } = data as unknown as {
              userId: number;
              jobId: number;
              statut: "EN_ATTENTE" | "ACCEPTEE" | "REFUSEE";
            };
            addApplication({
              userId,
              jobId,
              statut,
              dateCandidature: new Date().toISOString(),
            });
          }
        }}
        fields={modalFields}
        initialData={
          editingApplication
            ? {
                candidateName: editingApplication.user
                  ? `${editingApplication.user.prenom ?? ""} ${editingApplication.user.nom ?? ""}`.trim()
                  : `Candidat #${editingApplication.userId}`,
                jobTitle: editingApplication.job
                  ? (editingApplication.job.titre ??
                    `Offre #${editingApplication.jobId}`)
                  : `Offre #${editingApplication.jobId}`,
                userId: editingApplication.userId,
                jobId: editingApplication.jobId,
                statut: editingApplication.statut,
              }
            : undefined
        }
        title={
          editingApplication
            ? "Modifier la candidature"
            : "Ajouter une candidature"
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
