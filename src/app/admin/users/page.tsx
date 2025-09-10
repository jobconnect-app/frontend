"use client";
import AdminLayout from "../AdminLayout";
import React, { useState, useEffect, useCallback } from "react";
import { useUsers } from "../../../hooks/useUsers";
import EntityModal from "../../../components/EntityModal";
import Notification from "../../../components/Notification";
import Loader from "../../../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../../lib/api";
import {
  faMagnifyingGlass,
  faArrowLeft,
  faArrowRight,
  faEye,
  faEyeSlash,
  faDownload,
  faFilter,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../hooks/useAuth";
import { authHeaders } from "../../../lib/api";
import {
  faUser,
  faUserPlus,
  faUserCheck,
  faUserXmark,
} from "@fortawesome/free-solid-svg-icons";
import StatCard from "../../../components/StatCard";

const userFields = [
  { name: "nom", label: "Nom", disabled: true },
  { name: "prenom", label: "Prénom", disabled: true },
  { name: "email", label: "Email", type: "email", disabled: true },
  {
    name: "role",
    label: "Rôle",
    required: true,
    options: ["ADMIN", "CANDIDAT", "RECRUTEUR"],
  },
];

interface UserStats {
  users: number;
  newUsersToday: number;
  deletedUsers: number;
}

export default function AdminUsersPage() {
  const { token } = useAuth();
  const {
    users,
    loading,
    error,
    notification,
    modalOpen,
    editingUser,
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
    total,
    search,
    setSearch,
    limit,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    role,
    setRole,
    isDeleted,
    setIsDeleted,
  } = useUsers();

  const [confirmDeleteUser, setConfirmDeleteUser] = useState<null | {
    id: number;
    nom: string;
    prenom: string;
  }>(null);
  const totalPages = Math.ceil(total / limit) || 1;
  const [stats, setStats] = useState<UserStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  // Fonction pour rafraîchir les stats
  const fetchStats = useCallback(async () => {
    if (!token) return;
    setStatsLoading(true);
    try {
      const res = await api.get<UserStats>(
        `/dashboard/stats`,
        authHeaders(token || undefined),
      );
      setStats(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des stats:", err);
    } finally {
      setStatsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // KPIs dynamiques
  const totalUsers = stats?.users ?? 0;
  const activeUsers = stats ? totalUsers - (stats.deletedUsers ?? 0) : 0;
  const newUsersToday = stats?.newUsersToday ?? 0;
  const churnRate =
    stats && totalUsers > 0 && stats.deletedUsers !== undefined
      ? ((stats.deletedUsers / totalUsers) * 100).toFixed(1) + "%"
      : "0%";

  const softDeleteUser = async (id: number) => {
    try {
      await api.patch(
        `/users/${id}/soft-delete`,
        {},
        authHeaders(token || undefined),
      );
      setUsers(users.map((u) => (u.id === id ? { ...u, isDeleted: true } : u)));
      fetchStats();
    } catch (err) {
      console.error("Erreur lors de la désactivation:", err);
    }
  };

  const restoreUser = async (id: number) => {
    try {
      await api.patch(
        `/users/${id}/restore`,
        {},
        authHeaders(token || undefined),
      );
      setUsers(
        users.map((u) => (u.id === id ? { ...u, isDeleted: false } : u)),
      );
      fetchStats();
    } catch (err) {
      console.error("Erreur lors de la réactivation:", err);
    }
  };

  const handleExport = async () => {
    try {
      const params = new URLSearchParams({
        search,
        sortBy,
        sortOrder,
      });
      if (role) params.append("role", role);
      if (isDeleted !== undefined) params.append("isDeleted", isDeleted);

      const url = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/users/export?${params.toString()}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'export");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "users.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (e) {
      console.error(e);
      alert("Erreur lors de l'export CSV");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestion des utilisateurs
          </h1>
        </div>

        {/* KPIs Users */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={faUser}
            value={statsLoading ? "--" : totalUsers}
            label="Total des Utilisateurs"
            iconColor="text-indigo-400"
            loading={statsLoading}
          />
          <StatCard
            icon={faUserPlus}
            value={statsLoading ? "--" : newUsersToday}
            label="Nouveaux aujourd'hui"
            iconColor="text-emerald-400"
            loading={statsLoading}
          />
          <StatCard
            icon={faUserCheck}
            value={statsLoading ? "--" : activeUsers}
            label="Utilisateurs Actifs"
            iconColor="text-orange-400"
            loading={statsLoading}
          />
          <StatCard
            icon={faUserXmark}
            value={statsLoading ? "--" : churnRate}
            label="Taux de Churn"
            iconColor="text-red-400"
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
                  placeholder="Nom, prénom ou email..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Trier par
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="dateInscription">
                    Date d&apos;inscription
                  </option>
                  <option value="nom">Nom</option>
                  <option value="email">Email</option>
                  <option value="role">Rôle</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ordre
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(e.target.value as "asc" | "desc")
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="desc">Décroissant</option>
                  <option value="asc">Croissant</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rôle
                </label>
                <select
                  value={role || ""}
                  onChange={(e) => setRole(e.target.value || undefined)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tous rôles</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="CANDIDAT">CANDIDAT</option>
                  <option value="RECRUTEUR">RECRUTEUR</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Statut
                </label>
                <select
                  value={isDeleted || ""}
                  onChange={(e) => setIsDeleted(e.target.value || undefined)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tous statuts</option>
                  <option value="false">Actif</option>
                  <option value="true">Supprimé</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {total} utilisateur(s) trouvé(s)
            </span>

            <div className="flex gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                onClick={() => {
                  setSearch("");
                  setRole(undefined);
                  setIsDeleted(undefined);
                  setSortBy("dateInscription");
                  setSortOrder("desc");
                }}
              >
                <FontAwesomeIcon icon={faFilter} />
                Réinitialiser les filtres
              </button>

              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                onClick={handleExport}
              >
                <FontAwesomeIcon icon={faDownload} />
                Exporter CSV
              </button>
            </div>
          </div>
        </div>

        {/* Tableau des utilisateurs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8 overflow-x-auto">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 mb-4">
                Aucun utilisateur trouvé
              </div>
              <button
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                onClick={() => {
                  setSearch("");
                  setRole(undefined);
                  setIsDeleted(undefined);
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
                        Prénom
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Rôle
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Inscription
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200 ${loading ? "opacity-70" : ""}`}
                      >
                        {/* Nom */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                            <FontAwesomeIcon
                              icon={faUser}
                              className="text-gray-400"
                            />
                            {user.nom}
                          </div>
                        </td>

                        {/* Prénom */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <FontAwesomeIcon
                              icon={faUser}
                              className="text-gray-400"
                            />
                            {user.prenom}
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-4 py-3">
                          <div className="text-gray-700 dark:text-gray-300 truncate max-w-xs flex items-center gap-2">
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              className="text-gray-400"
                            />
                            {user.email}
                          </div>
                        </td>

                        {/* Rôle */}
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-600 dark:text-white">
                            {user.role}
                          </span>
                        </td>

                        {/* Date d'inscription */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-gray-700 dark:text-gray-300">
                            {new Date(
                              user.dateInscription,
                            ).toLocaleDateString()}
                          </div>
                        </td>

                        {/* Statut */}
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.isDeleted
                                ? "bg-red-100 text-red-800 dark:bg-red-600 dark:text-white"
                                : "bg-green-100 text-green-800 dark:bg-green-600 dark:text-white"
                            }`}
                          >
                            {user.isDeleted ? "Supprimé" : "Actif"}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <div className="flex justify-center space-x-1">
                            <button
                              className={`p-2 rounded-full transition ${
                                user.isDeleted
                                  ? "text-gray-400 cursor-not-allowed dark:text-gray-600"
                                  : "text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900"
                              }`}
                              onClick={() => openEditModal(user)}
                              disabled={user.isDeleted || loading}
                              title={
                                user.isDeleted
                                  ? "Utilisateur désactivé"
                                  : "Modifier"
                              }
                            >
                              <FontAwesomeIcon icon={faPen} />
                            </button>

                            <button
                              className={`p-2 rounded-full transition ${
                                user.isDeleted
                                  ? "text-gray-400 cursor-not-allowed dark:text-gray-600"
                                  : "text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                              }`}
                              onClick={() =>
                                setConfirmDeleteUser({
                                  id: user.id,
                                  nom: user.nom,
                                  prenom: user.prenom,
                                })
                              }
                              disabled={user.isDeleted || loading}
                              title={
                                user.isDeleted
                                  ? "Utilisateur désactivé"
                                  : "Supprimer définitivement"
                              }
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>

                            {!user.isDeleted ? (
                              <button
                                className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-full transition dark:text-yellow-400 dark:hover:bg-yellow-900"
                                onClick={() => softDeleteUser(user.id)}
                                disabled={loading}
                                title="Désactiver le compte"
                              >
                                <FontAwesomeIcon icon={faEyeSlash} />
                              </button>
                            ) : (
                              <button
                                className="p-2 text-green-600 hover:bg-green-100 rounded-full transition dark:text-green-400 dark:hover:bg-green-900"
                                onClick={() => restoreUser(user.id)}
                                disabled={loading}
                                title="Réactiver le compte"
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
                  {total} utilisateur(s) • Page {page} sur {totalPages}
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

      {/* Modale de confirmation de suppression */}
      {confirmDeleteUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Confirmer la suppression
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Voulez-vous vraiment supprimer définitivement l&apos;utilisateur{" "}
              <span className="font-semibold">
                {confirmDeleteUser.nom} {confirmDeleteUser.prenom}
              </span>{" "}
              ?<br />
              <span className="text-red-500">
                Cette action est irréversible.
              </span>
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                onClick={() => setConfirmDeleteUser(null)}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                onClick={async () => {
                  await deleteUser(confirmDeleteUser.id);
                  setConfirmDeleteUser(null);
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
          if (editingUser) {
            editUser({ ...editingUser, ...data });
          } else {
            const { nom, prenom, email, role, motDePasse } = data as {
              nom: string;
              prenom: string;
              email: string;
              role: string;
              motDePasse?: string;
            };
            addUser({
              nom,
              prenom,
              email,
              role: role as "CANDIDAT" | "ADMIN" | "RECRUTEUR",
              motDePasse:
                motDePasse && motDePasse.length > 0 ? motDePasse : "changeme",
              dateInscription: new Date().toISOString(),
              isDeleted: false,
            });
          }
        }}
        fields={
          modalOpen && !editingUser
            ? [
                ...userFields,
                {
                  name: "motDePasse",
                  label: "Mot de passe",
                  type: "password",
                  required: true,
                },
              ]
            : userFields
        }
        initialData={
          editingUser
            ? {
                nom: editingUser.nom,
                prenom: editingUser.prenom,
                email: editingUser.email,
                role: editingUser.role,
              }
            : undefined
        }
        title={
          editingUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"
        }
        loading={loading}
      />

      {notification && (
        <Notification
          message={notification}
          type="success"
          onClose={clearNotification}
        />
      )}
      {error && (
        <Notification message={error} type="error" onClose={clearError} />
      )}
    </AdminLayout>
  );
}
