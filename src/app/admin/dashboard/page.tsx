"use client";
import AdminLayout from "../AdminLayout";
import React, { useEffect, useState } from "react";
import {
  faUser,
  faBriefcase,
  faFileAlt,
  faDownload,
  faFileSignature,
  faHourglassHalf,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faChartBar,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../hooks/useAuth";
import { api, authHeaders } from "../../../lib/api";
import StatCard from "../../../components/StatCard";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DashboardStats {
  users: number;
  jobs: number;
  applications: number;
  cvDownloads: number;
  cvRequestsPending: number;
  jobsByCategory: { category: string; count: number }[];
  deletedUsers: number;
  pendingApplications: number;
}

interface JobsStats {
  totalJobs: number;
  totalJobsActive: number;
  activeJobs: number;
  expiredJobs: number;
  upcomingJobs: number;
  remoteJobs: number;
  jobsByType: { type: string; count: number }[];
}

export default function AdminDashboardPage() {
  const { token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jobsStats, setJobsStats] = useState<JobsStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [jobsStatsLoading, setJobsStatsLoading] = useState(true);

  // Redirection si non authentifié
  React.useEffect(() => {
    if (!authLoading && !token) {
      router.push("/login");
    }
  }, [token, authLoading, router]);

  useEffect(() => {
    if (!token) return;
    let isMounted = true;

    const fetchStats = async () => {
      setError(null);
      setStatsLoading(true);
      try {
        const res = await api.get<DashboardStats>(
          `/dashboard/stats`,
          authHeaders(token || undefined),
        );
        if (isMounted) setStats(res.data);
      } catch {
        if (isMounted) setError("Erreur lors du chargement des statistiques");
      } finally {
        if (isMounted) setStatsLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 300000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [token]);

  useEffect(() => {
    if (!token) return;
    let isMounted = true;

    const fetchJobsStats = async () => {
      setJobsStatsLoading(true);
      try {
        const res = await api.get<JobsStats>(
          `/dashboard/jobs-stats`,
          authHeaders(token || undefined),
        );
        if (isMounted) setJobsStats(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des stats jobs:", error);
      } finally {
        if (isMounted) setJobsStatsLoading(false);
      }
    };

    fetchJobsStats();
    const interval = setInterval(fetchJobsStats, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [token]);

  const kpiData = [
    {
      icon: faUser,
      value: stats?.users || 0,
      label: "Utilisateurs",
      iconColor: "text-indigo-400",
      loading: statsLoading,
    },
    {
      icon: faBriefcase,
      value: stats?.jobs || 0,
      label: "Offres actives",
      iconColor: "text-emerald-400",
      loading: statsLoading,
    },
    {
      icon: faFileAlt,
      value: stats?.applications || 0,
      label: "Candidatures",
      iconColor: "text-orange-400",
      loading: statsLoading,
    },
    {
      icon: faDownload,
      value: stats?.cvDownloads || 0,
      label: "Téléchargements CV",
      iconColor: "text-purple-400",
      loading: statsLoading,
    },
    {
      icon: faFileSignature,
      value: stats?.cvRequestsPending || 0,
      label: "Demandes CV en attente",
      iconColor: "text-pink-400",
      loading: statsLoading,
    },
    {
      icon: faHourglassHalf,
      value: stats?.pendingApplications || 0,
      label: "Candidatures en attente",
      iconColor: "text-yellow-400",
      loading: statsLoading,
    },
  ];

  const advancedJobStats = jobsStats
    ? [
        {
          icon: faBriefcase,
          value: jobsStats.totalJobs,
          label: "Offres (total brut)",
          iconColor: "text-indigo-400",
          loading: jobsStatsLoading,
        },
        {
          icon: faBriefcase,
          value: jobsStats.totalJobsActive,
          label: "Offres non supprimées",
          iconColor: "text-emerald-400",
          loading: jobsStatsLoading,
        },
        {
          icon: faCheckCircle,
          value: jobsStats.activeJobs,
          label: "Offres actives",
          iconColor: "text-green-400",
          loading: jobsStatsLoading,
        },
        {
          icon: faTimesCircle,
          value: jobsStats.expiredJobs,
          label: "Offres expirées",
          iconColor: "text-red-400",
          loading: jobsStatsLoading,
        },
        {
          icon: faClock,
          value: jobsStats.upcomingJobs,
          label: "Offres à venir",
          iconColor: "text-yellow-400",
          loading: jobsStatsLoading,
        },
        {
          icon: faFileSignature,
          value: jobsStats.remoteJobs,
          label: "Offres télétravail",
          iconColor: "text-blue-400",
          loading: jobsStatsLoading,
        },
      ]
    : [];

  // Couleurs pour le graphique
  const chartColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-red-500",
    "bg-orange-500",
    "bg-teal-500",
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Tableau de bord
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Statistiques et indicateurs clés de votre plateforme
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Section des statistiques principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {kpiData.map((kpi, index) => (
            <StatCard
              key={index}
              icon={kpi.icon}
              value={kpi.value}
              label={kpi.label}
              iconColor={kpi.iconColor}
              loading={kpi.loading}
            />
          ))}
        </div>

        {/* Section des statistiques avancées */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {advancedJobStats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              iconColor={stat.iconColor}
              loading={stat.loading}
            />
          ))}
        </div>

        {/* Graphique Offres par catégorie */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Offres par catégorie
            </h2>
            <FontAwesomeIcon
              icon={faChartBar}
              className="text-blue-500 text-xl"
            />
          </div>

          {statsLoading ? (
            <div className="flex justify-center py-10">
              <FontAwesomeIcon
                icon={faSpinner}
                className="text-blue-500 text-2xl animate-spin"
              />
            </div>
          ) : stats?.jobsByCategory && stats.jobsByCategory.length > 0 ? (
            <div className="space-y-6">
              {/* Barres horizontales */}
              <div className="space-y-4">
                {stats.jobsByCategory.map((cat, idx) => {
                  const maxCount = Math.max(
                    ...stats.jobsByCategory.map((c) => c.count),
                    1,
                  );
                  const widthPercentage = (cat.count / maxCount) * 100;

                  return (
                    <div key={cat.category} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {cat.category}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {cat.count} offres
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${chartColors[idx % chartColors.length]}`}
                          style={{ width: `${widthPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Légende des couleurs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                {stats.jobsByCategory.map((cat, idx) => (
                  <div key={idx} className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${chartColors[idx % chartColors.length]}`}
                    ></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {cat.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="text-gray-500 dark:text-gray-400">
                Aucune donnée disponible sur les offres par catégorie
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
