"use client";
import AdminLayout from "../AdminLayout";
import React, { useState, useCallback } from "react";
import { useJobs } from "../../../hooks/useJobs";
import OffreModal from "../../../components/OffreModal";
import Notification from "../../../components/Notification";
import Loader from "../../../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import StatCard from "../../../components/StatCard";
import {
  faMagnifyingGlass,
  faBriefcase,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faHome,
  faArrowLeft,
  faArrowRight,
  faEye,
  faEyeSlash,
  faPlus,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../hooks/useAuth";
import { api, authHeaders } from "../../../lib/api";
import { Job } from "../../../lib/types";
import { useCategories } from "../../../hooks/useCategories";
import { useTags } from "../../../hooks/useTags";

export default function AdminJobsPage() {
  const { token } = useAuth();
  const {
    jobs,
    total,
    page,
    setPage,
    limit,
    filters,
    setFilters,
    loading,
    // error,
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
    // setError,
    fetchJobs,
  } = useJobs(token ?? undefined);

  const { categories } = useCategories();
  const { tags: allTags } = useTags();
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const totalPages = Math.ceil(total / limit) || 1;
  const [statsLoading, setStatsLoading] = useState(false);
  const [jobStats, setJobStats] = useState({
    total: 0,
    active: 0,
    expired: 0,
    upcoming: 0,
    remote: 0,
  });

  // Calcul des stats locales
  const calculateStats = useCallback(() => {
    if (jobs.length === 0) return;

    const now = new Date();
    setStatsLoading(true);

    try {
      const stats = {
        total: jobs.length,
        active: jobs.filter((j) => !j.isDeleted).length,
        expired: jobs.filter(
          (j) =>
            !j.isDeleted &&
            j.dateExpiration &&
            new Date(j.dateExpiration) < now,
        ).length,
        upcoming: jobs.filter(
          (j) =>
            !j.isDeleted &&
            j.datePublication &&
            new Date(j.datePublication) > now,
        ).length,
        remote: jobs.filter((j) => !j.isDeleted && j.teletravail).length,
      };

      setJobStats(stats);
    } catch (err) {
      console.error("Erreur lors du calcul des stats:", err);
    } finally {
      setStatsLoading(false);
    }
  }, [jobs]);

  React.useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  // Options pour les filtres
  const typeContratOptions = [
    "",
    "CDI",
    "CDD",
    "FREELANCE",
    "STAGE",
    "ALTERNANCE",
  ];

  // const handleExport = async () => {
  //   try {
  //     const params = new URLSearchParams(
  //       Object.entries({
  //         ...filters,
  //         page: page.toString(),
  //         limit: limit.toString(),
  //       })
  //       .filter(([, value]) => value !== null && value !== undefined)
  //       .reduce((acc, [key, value]) => ({ ...acc, [key]: String(value) }), {})
  //     );

  //     const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/jobs/export?${params.toString()}`;

  //     const response = await fetch(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error('Erreur lors de l\'export');
  //     }

  //     const blob = await response.blob();
  //     const downloadUrl = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = downloadUrl;
  //     a.download = 'jobs.csv';
  //     document.body.appendChild(a);
  //     a.click();
  //     a.remove();
  //     window.URL.revokeObjectURL(downloadUrl);
  //   } catch (e) {
  //     console.error(e);
  //     alert('Erreur lors de l\'export CSV');
  //   }
  // };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestion des offres d&apos;emploi
          </h1>
          <button
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            onClick={openAddModal}
            disabled={loading}
          >
            <FontAwesomeIcon icon={faPlus} />
            Ajouter une offre
          </button>
        </div>

        {/* StatCards Offres */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            icon={faBriefcase}
            value={statsLoading ? "--" : jobStats.total}
            label="Total des offres"
            iconColor="text-indigo-400"
            loading={statsLoading}
          />
          <StatCard
            icon={faCheckCircle}
            value={statsLoading ? "--" : jobStats.active}
            label="Offres actives"
            iconColor="text-emerald-400"
            loading={statsLoading}
          />
          <StatCard
            icon={faTimesCircle}
            value={statsLoading ? "--" : jobStats.expired}
            label="Offres expirées"
            iconColor="text-red-400"
            loading={statsLoading}
          />
          <StatCard
            icon={faClock}
            value={statsLoading ? "--" : jobStats.upcoming}
            label="Offres à venir"
            iconColor="text-yellow-400"
            loading={statsLoading}
          />
          <StatCard
            icon={faHome}
            value={statsLoading ? "--" : jobStats.remote}
            label="Télétravail"
            iconColor="text-blue-400"
            loading={statsLoading}
          />
        </div>

        {/* Section Filtres */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
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
                  placeholder="Titre, entreprise, lieu..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.search || ""}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, search: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type de contrat
                </label>
                <select
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.typeContrat || ""}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      typeContrat: e.target.value || undefined,
                    }))
                  }
                >
                  {typeContratOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt || "Tous contrats"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Télétravail
                </label>
                <select
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={
                    filters.teletravail === undefined
                      ? ""
                      : filters.teletravail
                        ? "true"
                        : "false"
                  }
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      teletravail:
                        e.target.value === ""
                          ? undefined
                          : e.target.value === "true",
                    }))
                  }
                >
                  <option value="">Tous</option>
                  <option value="true">Oui</option>
                  <option value="false">Non</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Entreprise
                </label>
                <input
                  type="text"
                  placeholder="Entreprise"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.entreprise || ""}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, entreprise: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Lieu
                </label>
                <input
                  type="text"
                  placeholder="Lieu"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.lieu || ""}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, lieu: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {total} offre(s) trouvée(s)
            </span>

            <div className="flex gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                onClick={() => setFilters(() => ({}))}
              >
                <FontAwesomeIcon icon={faFilter} />
                Réinitialiser les filtres
              </button>

              {/* <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                onClick={handleExport}
              >
                <FontAwesomeIcon icon={faDownload} />
                Exporter CSV
              </button> */}
            </div>
          </div>
        </div>

        {/* Tableau des offres */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 overflow-x-auto">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 mb-4">
                Aucune offre trouvée
              </div>
              <button
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                onClick={() => setFilters(() => ({}))}
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
                        Titre
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Entreprise
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Contrat
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Lieu
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Remote
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Catégories
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Tags
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {jobs.map((job) => (
                      <tr
                        key={job.id}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200 ${loading ? "opacity-70" : ""}`}
                      >
                        {/* Titre */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {job.titre}
                          </div>
                        </td>

                        {/* Entreprise */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-gray-700 dark:text-gray-300">
                            {job.entreprise}
                          </div>
                        </td>

                        {/* Statut */}
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              job.isDeleted
                                ? "bg-red-100 text-red-800 dark:bg-red-600 dark:text-white"
                                : "bg-green-100 text-green-800 dark:bg-green-600 dark:text-white"
                            }`}
                          >
                            {job.isDeleted ? "Désactivée" : "Active"}
                          </span>
                        </td>

                        {/* Contrat */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-gray-700 dark:text-gray-300">
                            {job.typeContrat}
                          </div>
                        </td>

                        {/* Lieu */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-gray-700 dark:text-gray-300">
                            {job.lieu}
                          </div>
                        </td>

                        {/* Remote */}
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          {job.teletravail ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-600 dark:text-white">
                              Oui
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                              Non
                            </span>
                          )}
                        </td>

                        {/* Catégories */}
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {job.categories &&
                              job.categories.slice(0, 2).map((cat) => {
                                const catObj = categories.find(
                                  (c) => c.id === cat.categoryId,
                                );
                                return catObj ? (
                                  <span
                                    key={cat.categoryId}
                                    className="bg-blue-100 text-blue-800 dark:bg-blue-600 dark:text-white text-xs font-medium px-2 py-1 rounded-full"
                                  >
                                    {catObj.nom}
                                  </span>
                                ) : null;
                              })}
                            {job.categories && job.categories.length > 2 && (
                              <span className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full">
                                +{job.categories.length - 2}
                              </span>
                            )}
                            {(!job.categories ||
                              job.categories.length === 0) && (
                              <span className="text-xs text-gray-400">-</span>
                            )}
                          </div>
                        </td>

                        {/* Tags */}
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {job.tags &&
                              job.tags.slice(0, 2).map((tag) => {
                                const tagObj = allTags.find(
                                  (t) => t.id === tag.tagId,
                                );
                                return tagObj ? (
                                  <span
                                    key={tag.tagId}
                                    className="bg-green-100 text-green-800 dark:bg-yellow-500 dark:text-white text-xs font-medium px-2 py-1 rounded-full"
                                  >
                                    {tagObj.nom}
                                  </span>
                                ) : null;
                              })}
                            {job.tags && job.tags.length > 2 && (
                              <span className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full">
                                +{job.tags.length - 2}
                              </span>
                            )}
                            {(!job.tags || job.tags.length === 0) && (
                              <span className="text-xs text-gray-400">-</span>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <div className="flex justify-center space-x-1">
                            <button
                              className="p-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition"
                              onClick={() => openEditModal(job)}
                              disabled={loading}
                              title="Modifier"
                            >
                              <FontAwesomeIcon icon={faPen} />
                            </button>

                            <button
                              className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition"
                              onClick={() => setJobToDelete(job)}
                              disabled={loading}
                              title="Supprimer"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>

                            {!job.isDeleted ? (
                              <button
                                className="p-2 text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300 transition"
                                onClick={async () => {
                                  await api.patch(
                                    `/jobs/${job.id}`,
                                    { isDeleted: true },
                                    authHeaders(token || undefined),
                                  );
                                  fetchJobs();
                                }}
                                disabled={loading}
                                title="Désactiver"
                              >
                                <FontAwesomeIcon icon={faEyeSlash} />
                              </button>
                            ) : (
                              <button
                                className="p-2 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition"
                                onClick={async () => {
                                  await api.patch(
                                    `/jobs/${job.id}`,
                                    { isDeleted: false },
                                    authHeaders(token || undefined),
                                  );
                                  fetchJobs();
                                }}
                                disabled={loading}
                                title="Réactiver"
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </button>
                            )}
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
                  {total} offre(s) • Page {page} sur {totalPages}
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
      </div>

      <OffreModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={(data) => {
          if (editingJob) {
            editJob({
              ...editingJob,
              ...data,
            });
          } else {
            addJob({
              ...data,
              datePublication: new Date().toISOString(),
              adminId: 1,
              isDeleted: false,
            } as Omit<Job, "id">);
          }
        }}
        initialData={
          editingJob
            ? {
                titre: editingJob.titre,
                description: editingJob.description,
                entreprise: editingJob.entreprise,
                lieu: editingJob.lieu,
                salaireMin: editingJob.salaireMin,
                salaireMax: editingJob.salaireMax,
                typeContrat: editingJob.typeContrat,
                teletravail: editingJob.teletravail,
                dateExpiration: editingJob.dateExpiration,
                urlPostulation: editingJob.urlPostulation,
                categoryIds:
                  editingJob.categories?.map((c) => c.categoryId) || [],
                tagIds: editingJob.tags?.map((t) => t.tagId) || [],
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

      {/* Modale de confirmation suppression */}
      {jobToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Confirmer la suppression
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Voulez-vous vraiment supprimer définitivement l&apos;offre{" "}
              <span className="font-semibold">{jobToDelete.titre}</span> ?
              <br />
              <span className="text-red-500">
                Cette action est irréversible.
              </span>
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                onClick={() => setJobToDelete(null)}
                disabled={loading}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                onClick={() => {
                  deleteJob(jobToDelete.id);
                  setJobToDelete(null);
                }}
                disabled={loading}
              >
                Supprimer définitivement
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
