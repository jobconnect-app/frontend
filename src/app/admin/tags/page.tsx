"use client";
import AdminLayout from "../AdminLayout";
import React, { useState, useEffect } from "react";
import { useTags } from "../../../hooks/useTags";
import EntityModal from "../../../components/EntityModal";
import Notification from "../../../components/Notification";
import Loader from "../../../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import StatCard from "../../../components/StatCard";
import {
  faTags,
  faMagnifyingGlass,
  faArrowLeft,
  faArrowRight,
  faPlus,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { api } from "../../../lib/api";

export default function AdminTagsPage() {
  const {
    tags,
    loading,
    notification,
    modalOpen,
    editingTag,
    openAddModal,
    openEditModal,
    closeModal,
    addTag,
    editTag,
    deleteTag,
    clearNotification,
  } = useTags();

  const tagFields = [{ name: "nom", label: "Nom", required: true }];

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statsLoading, setStatsLoading] = useState(true);
  const perPage = 10;
  const [tagToDelete, setTagToDelete] = useState<{
    id: number;
    nom: string;
  } | null>(null);

  // Filtrage local sur le nom
  const filtered = tags.filter((tag) =>
    tag.nom.toLowerCase().includes(search.toLowerCase()),
  );
  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const [jobsCount, setJobsCount] = useState<
    { tagId: number; tag: string; count: number }[]
  >([]);

  useEffect(() => {
    const fetchJobsCount = async () => {
      setStatsLoading(true);
      try {
        const res =
          await api.get<{ tagId: number; tag: string; count: number }[]>(
            "/tags/jobs-count",
          );
        setJobsCount(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques:", error);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchJobsCount();
  }, []);

  return (
    <AdminLayout>
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestion des tags
          </h1>
          <button
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            onClick={openAddModal}
          >
            <FontAwesomeIcon icon={faPlus} />
            Ajouter un tag
          </button>
        </div>

        {/* Statistique principale */}
        <div className="mb-8">
          <StatCard
            icon={faTags}
            value={statsLoading ? "--" : tags.length}
            label="Total des tags"
            iconColor="text-indigo-400"
            loading={statsLoading}
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
                  placeholder="Rechercher un tag..."
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

        {/* Tableau des tags */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 mb-4">
                Aucun tag trouvé
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
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Offres associées
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {paginated.map((tag) => {
                      const jobCount =
                        jobsCount.find((jc) => jc.tagId === tag.id)?.count || 0;

                      return (
                        <tr
                          key={tag.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
                        >
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="font-medium text-gray-900 dark:text-white">
                              {tag.nom}
                            </div>
                          </td>

                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-600 dark:text-white">
                              {jobCount}
                            </div>
                          </td>

                          <td className="px-4 py-3 whitespace-nowrap text-right">
                            <div className="flex justify-end space-x-2">
                              <button
                                className="p-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition"
                                onClick={() => openEditModal(tag)}
                                title="Modifier"
                              >
                                <FontAwesomeIcon icon={faPen} />
                              </button>

                              <button
                                className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition"
                                onClick={() =>
                                  setTagToDelete({ id: tag.id, nom: tag.nom })
                                }
                                title="Supprimer"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination améliorée */}
              <div className="flex flex-col sm:flex-row items-center justify-between mt-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
                  {filtered.length} tag(s) • Page {page} sur {totalPages}
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
      {tagToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Confirmer la suppression
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Voulez-vous vraiment supprimer le tag{" "}
              <span className="font-semibold">{tagToDelete.nom}</span> ?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                onClick={() => setTagToDelete(null)}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                onClick={() => {
                  deleteTag(tagToDelete.id);
                  setTagToDelete(null);
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
        onSubmit={(data) => {
          if (editingTag) {
            editTag({ ...editingTag, ...data });
          } else {
            const { nom } = data as { nom: string };
            addTag({ nom });
          }
        }}
        fields={tagFields}
        initialData={editingTag ? { nom: editingTag.nom } : undefined}
        title={editingTag ? "Modifier le tag" : "Ajouter un tag"}
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
