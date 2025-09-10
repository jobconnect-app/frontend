"use client";
import AdminLayout from "../AdminLayout";
import React, { useState } from "react";
import { usePages } from "../../../hooks/usePages";
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
  faPlus,
  faFilter,
  faFileAlt,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";
import StatCard from "../../../components/StatCard";

export default function AdminPagesPage() {
  const {
    pages,
    loading,
    notification,
    modalOpen,
    editingPage,
    openAddModal,
    openEditModal,
    closeModal,
    addPage,
    editPage,
    deletePage,
    clearNotification,
  } = usePages();

  const { token } = useAuth();
  const router = useRouter();

  // Redirection si non authentifié
  React.useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const pageFields = [
    { name: "title", label: "Titre", required: true },
    { name: "type", label: "Type", required: true },
  ];

  // États pour la recherche, la pagination et la confirmation de suppression
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [pageToDelete, setPageToDelete] = useState<{
    id: number;
    title: string;
  } | null>(null);

  // Filtrage local sur les pages
  const filtered = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  // Calcul des statistiques par type de page
  const pageTypes = [...new Set(pages.map((p) => p.type))];
  const stats = {
    total: pages.length,
    types: pageTypes.map((type) => ({
      type,
      count: pages.filter((p) => p.type === type).length,
    })),
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestion des pages de contenu
          </h1>
          <button
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            onClick={openAddModal}
          >
            <FontAwesomeIcon icon={faPlus} />
            Ajouter une page
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={faFile}
            value={stats.total}
            label="Total des pages"
            iconColor="text-indigo-400"
            loading={loading}
          />

          {stats.types.slice(0, 3).map((stat, index) => (
            <div
              key={stat.type}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4"
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className={`text-xl ${
                    index === 0
                      ? "text-blue-500"
                      : index === 1
                        ? "text-green-500"
                        : "text-yellow-500"
                  }`}
                />
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Pages {stat.type}
                  </h3>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {stat.count}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
                  placeholder="Titre ou type de page..."
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

        {/* Tableau des pages */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 mb-4">
                Aucune page trouvée
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
                        Titre
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {paginated.map((page) => (
                      <tr
                        key={page.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                            <FontAwesomeIcon
                              icon={faFileAlt}
                              className="text-gray-400"
                            />
                            {page.title}
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="text-gray-700 dark:text-gray-300">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-600 dark:text-white">
                              {page.type}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              className="p-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition"
                              onClick={() => openEditModal(page)}
                              title="Modifier"
                            >
                              <FontAwesomeIcon icon={faPen} />
                            </button>

                            <button
                              className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition"
                              onClick={() =>
                                setPageToDelete({
                                  id: page.id,
                                  title: page.title,
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
                  {filtered.length} page(s) • Page {page} sur {totalPages}
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

      {/* Modale de confirmation suppression */}
      {pageToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Confirmer la suppression
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Voulez-vous vraiment supprimer la page{" "}
              <span className="font-semibold">{pageToDelete.title}</span> ?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                onClick={() => setPageToDelete(null)}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                onClick={() => {
                  deletePage(pageToDelete.id);
                  setPageToDelete(null);
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
          if (editingPage) {
            editPage({ ...editingPage, ...data });
          } else {
            const { title, type } = data as { title: string; type: string };
            addPage({ title, type });
          }
        }}
        fields={pageFields}
        initialData={
          editingPage
            ? {
                title: editingPage.title,
                type: editingPage.type,
              }
            : undefined
        }
        title={editingPage ? "Modifier la page" : "Ajouter une page"}
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
