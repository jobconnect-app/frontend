"use client";
import AdminLayout from "../AdminLayout";
import React, { useState } from "react";
import { useSettings } from "../../../hooks/useSettings";
import EntityModal from "../../../components/EntityModal";
import Notification from "../../../components/Notification";
import Loader from "../../../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faMagnifyingGlass,
  faPlus,
  faFilter,
  faCog,
  faKey,
  faUser,
  faGlobe,
  faLock,
  faToggleOn,
  faToggleOff,
  faCircleInfo,
  faUserCircle,
  faSignOutAlt,
  faShieldAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import StatCard from "../../../components/StatCard";

export default function AdminSettingsPage() {
  const {
    settings,
    loading,
    notification,
    modalOpen,
    editingSetting,
    openAddModal,
    openEditModal,
    closeModal,
    addSetting,
    editSetting,
    deleteSetting,
    clearNotification,
  } = useSettings();

  const { token, user, logout } = useAuth();
  const router = useRouter();

  // Redirection si non authentifié
  React.useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const settingFields = [
    { name: "key", label: "Clé", required: true },
    {
      name: "value",
      label: "Valeur",
      required: true,
      description: "Valeur du paramètre (chaîne, nombre ou booléen)",
    },
    {
      name: "type",
      label: "Type",
      required: true,
      type: "select",
      options: [
        "système",
        "utilisateur",
        "sécurité",
        "apparence",
        "performance",
      ],
      defaultValue: "système",
    },
    {
      name: "secure",
      label: "Sensible",
      type: "checkbox",
      description: "Cocher si ce paramètre contient des données sensibles",
    },
  ];

  // États pour la recherche, la pagination et la confirmation de suppression
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [settingToDelete, setSettingToDelete] = useState<{
    id: number;
    key: string;
  } | null>(null);
  const [showSensitive, setShowSensitive] = useState(false);

  const perPage = 8;

  // Catégories de paramètres
  const categories = [
    { id: "all", name: "Tous", icon: faCog, color: "bg-gray-200" },
    { id: "system", name: "Système", icon: faCog, color: "bg-blue-100" },
    { id: "user", name: "Utilisateur", icon: faUser, color: "bg-green-100" },
    { id: "security", name: "Sécurité", icon: faLock, color: "bg-red-100" },
    {
      id: "appearance",
      name: "Apparence",
      icon: faGlobe,
      color: "bg-purple-100",
    },
  ];

  // Filtrage des paramètres
  const filtered = settings.filter((setting) => {
    const matchesSearch =
      setting.key.toLowerCase().includes(search.toLowerCase()) ||
      setting.value.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" ||
      (setting.type && setting.type.toLowerCase() === categoryFilter);

    const matchesSensitive = showSensitive || !setting.secure;

    return matchesSearch && matchesCategory && matchesSensitive;
  });

  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  // Statistiques
  const stats = {
    total: settings.length,
    systemSettings: settings.filter((s) => s.type === "system").length,
    securitySettings: settings.filter((s) => s.type === "security").length,
    sensitiveSettings: settings.filter((s) => s.secure).length,
  };

  // Détermine l'icône en fonction du type de paramètre
  const getIconForType = (type: string) => {
    switch (type) {
      case "user":
        return faUser;
      case "security":
        return faLock;
      case "appearance":
        return faGlobe;
      default:
        return faCog;
    }
  };

  // Détermine la couleur en fonction du type
  const getColorForType = (type: string) => {
    switch (type) {
      case "user":
        return "bg-green-100 text-green-800";
      case "security":
        return "bg-red-100 text-red-800";
      case "appearance":
        return "bg-purple-100 text-purple-800";
      case "performance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  // Formate la valeur pour l'affichage
  const formatValue = (value: string, isSecure: boolean) => {
    if (isSecure && !showSensitive) return "••••••••";

    if (value.toLowerCase() === "true" || value.toLowerCase() === "false") {
      return (
        <span className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={value.toLowerCase() === "true" ? faToggleOn : faToggleOff}
            className={
              value.toLowerCase() === "true"
                ? "text-green-500"
                : "text-gray-400"
            }
          />
          {value}
        </span>
      );
    }

    if (!isNaN(Number(value))) {
      return (
        <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          {value}
        </span>
      );
    }

    return value;
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Admin Connecté */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl shadow-lg p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <FontAwesomeIcon icon={faUserCircle} className="text-3xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold flex items-center">
                  {user?.name || "Administrateur"}
                  {user?.role === "admin" && (
                    <span className="ml-3 bg-yellow-500 text-yellow-900 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
                      <FontAwesomeIcon icon={faShieldAlt} className="mr-1" />
                      Admin
                    </span>
                  )}
                </h2>
                <div className="flex items-center mt-1 text-indigo-200">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  <span>{user?.email || "admin@example.com"}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="bg-white/10 p-4 rounded-xl text-center">
                <div className="text-sm opacity-80">Sessions actives</div>
                <div className="text-2xl font-bold mt-1">1</div>
              </div>
              <button
                onClick={logout}
                className="bg-white text-indigo-700 hover:bg-gray-100 px-5 py-3 rounded-xl font-semibold flex items-center justify-center transition mt-4 sm:mt-0"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Paramètres du système
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Gérez les configurations globales de votre plateforme
            </p>
          </div>
          <button
            className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 transition shadow-md"
            onClick={openAddModal}
          >
            <FontAwesomeIcon icon={faPlus} />
            Nouveau paramètre
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard
            icon={faCog}
            value={stats.total}
            label="Paramètres totaux"
            iconColor="text-blue-500"
            loading={loading}
            gradient="from-blue-50 to-blue-100"
          />

          <StatCard
            icon={faCog}
            value={stats.systemSettings}
            label="Paramètres système"
            iconColor="text-indigo-500"
            loading={loading}
            gradient="from-indigo-50 to-indigo-100"
          />

          <StatCard
            icon={faLock}
            value={stats.securitySettings}
            label="Paramètres sécurité"
            iconColor="text-red-500"
            loading={loading}
            gradient="from-red-50 to-red-100"
          />

          <StatCard
            icon={faKey}
            value={stats.sensitiveSettings}
            label="Paramètres sensibles"
            iconColor="text-amber-500"
            loading={loading}
            gradient="from-amber-50 to-amber-100"
          />
        </div>

        {/* Barre d'actions et filtres */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rechercher un paramètre
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 min-w-4 min-h-4"
                />
                <input
                  type="text"
                  placeholder="Clé, valeur ou description..."
                  className="pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Catégorie
                </label>
                <select
                  className="w-full py-2.5 px-3 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="all">Toutes catégories</option>
                  <option value="system">Système</option>
                  <option value="user">Utilisateur</option>
                  <option value="security">Sécurité</option>
                  <option value="appearance">Apparence</option>
                  <option value="performance">Performance</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  className="flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  onClick={() => {
                    setSearch("");
                    setCategoryFilter("all");
                    setPage(1);
                  }}
                >
                  <FontAwesomeIcon icon={faFilter} />
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="show-sensitive"
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                checked={showSensitive}
                onChange={() => setShowSensitive(!showSensitive)}
              />
              <label
                htmlFor="show-sensitive"
                className="ml-2 text-sm text-gray-700 dark:text-gray-300"
              >
                Afficher les paramètres sensibles
              </label>
            </div>

            <div className="ml-auto flex items-center text-sm text-gray-500 dark:text-gray-400">
              <FontAwesomeIcon icon={faCircleInfo} className="mr-1" />
              {filtered.length} paramètre(s) trouvé(s)
            </div>
          </div>
        </div>

        {/* Grille de paramètres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            [...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
                <div className="flex justify-end space-x-2">
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon
                  icon={faCog}
                  className="text-gray-500 text-2xl"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Aucun paramètre trouvé
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Aucun paramètre ne correspond à vos critères de recherche
              </p>
              <button
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                onClick={() => {
                  setSearch("");
                  setCategoryFilter("all");
                  setPage(1);
                }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            paginated.map((setting) => (
              <div
                key={setting.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md"
              >
                <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FontAwesomeIcon
                          icon={getIconForType(setting.type || "system")}
                          className={`${getColorForType(
                            setting.type || "system",
                          )
                            .replace("bg-", "text-")
                            .replace("100", "500")} text-lg`}
                        />
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                          <span className="truncate max-w-[150px]">
                            {setting.key}
                          </span>
                          {setting.secure && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center">
                              <FontAwesomeIcon
                                icon={faLock}
                                className="mr-1 text-xs"
                              />
                              Sensible
                            </span>
                          )}
                        </h3>
                      </div>
                      <span
                        className={`inline-block text-xs px-2 py-1 rounded-full ${getColorForType(setting.type || "system")}`}
                      >
                        {setting.type || "système"}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 transition"
                        onClick={() => openEditModal(setting)}
                        title="Modifier"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-300 transition"
                        onClick={() =>
                          setSettingToDelete({
                            id: setting.id,
                            key: setting.key,
                          })
                        }
                        title="Supprimer"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Valeur
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 rounded-lg px-4 py-3 break-words">
                    {formatValue(setting.value, setting.secure || false)}
                  </div>

                  <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <FontAwesomeIcon icon={faCircleInfo} className="mr-1" />
                    Dernière modification: {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination simplifiée */}
        {filtered.length > perPage && !loading && (
          <div className="flex justify-center mt-8">
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    page === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modale de confirmation suppression */}
      {settingToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <div className="bg-red-100 text-red-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faLock} className="text-xl" />
            </div>
            <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-3">
              Confirmer la suppression
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300 text-center">
              Voulez-vous vraiment supprimer le paramètre{" "}
              <span className="font-semibold">{settingToDelete.key}</span> ?
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className="text-yellow-500"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700 dark:text-yellow-600">
                    Ce paramètre peut être critique pour le fonctionnement du
                    système.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button
                className="px-5 py-2.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                onClick={() => setSettingToDelete(null)}
              >
                Annuler
              </button>
              <button
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition shadow-md"
                onClick={() => {
                  deleteSetting(settingToDelete.id);
                  setSettingToDelete(null);
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
          if (editingSetting) {
            editSetting({ ...editingSetting, ...data });
          } else {
            addSetting({
              key: data.key,
              value: data.value,
              type: data.type,
              secure: data.secure || false,
            });
          }
        }}
        fields={settingFields}
        initialData={
          editingSetting
            ? {
                key: editingSetting.key,
                value: editingSetting.value,
                type: editingSetting.type,
                secure: editingSetting.secure,
              }
            : undefined
        }
        title={
          editingSetting ? "Modifier le paramètre" : "Ajouter un paramètre"
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
