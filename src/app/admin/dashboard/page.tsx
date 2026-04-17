"use client";
import AdminLayout from "../AdminLayout";
import React, { useEffect, useState } from "react";
import {
  faUser, faBriefcase, faFileAlt, faDownload,
  faFileSignature, faHourglassHalf, faCheckCircle,
  faTimesCircle, faClock, faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../../hooks/useAuth";
import { api, authHeaders } from "../../../lib/api";
import StatCard from "../../../components/StatCard";
import Loader from "../../../components/Loader";
import { useRouter } from "next/navigation";

interface DashboardStats {
  users:              number;
  jobs:               number;
  applications:       number;
  cvDownloads:        number;
  cvRequestsPending:  number;
  jobsByCategory:     { category: string; count: number }[];
  deletedUsers:       number;
  pendingApplications:number;
  newUsersToday:      number;
}

interface JobsStats {
  totalJobs:       number;
  totalJobsActive: number;
  activeJobs:      number;
  expiredJobs:     number;
  upcomingJobs:    number;
  remoteJobs:      number;
  jobsByType:      { type: string; count: number }[];
}

const CHART_COLORS = [
  "#00e5b0", "#3b9eff", "#a78bfa", "#fb923c",
  "#f87171", "#34d399", "#60a5fa", "#f472b6",
];

export default function AdminDashboardPage() {
  const { token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats,      setStats]      = useState<DashboardStats | null>(null);
  const [jobsStats,  setJobsStats]  = useState<JobsStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [jobsLoading,  setJobsLoading]  = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !token) router.push("/login");
  }, [token, authLoading, router]);

  useEffect(() => {
    if (!token) return;
    (async () => {
      setStatsLoading(true);
      try {
        const res = await api.get<DashboardStats>(`/dashboard/stats`, authHeaders(token));
        setStats(res.data);
      } catch { setError("Erreur lors du chargement des statistiques"); }
      finally { setStatsLoading(false); }
    })();
  }, [token]);

  useEffect(() => {
    if (!token) return;
    (async () => {
      setJobsLoading(true);
      try {
        const res = await api.get<JobsStats>(`/dashboard/jobs-stats`, authHeaders(token));
        setJobsStats(res.data);
      } catch {}
      finally { setJobsLoading(false); }
    })();
  }, [token]);

  const kpis = [
    { icon: faUser,          value: stats?.users ?? 0,              label: "Utilisateurs",           iconColor: "#a78bfa" },
    { icon: faBriefcase,     value: stats?.jobs ?? 0,               label: "Offres actives",         iconColor: "#00e5b0" },
    { icon: faFileAlt,       value: stats?.applications ?? 0,       label: "Candidatures",           iconColor: "#fb923c" },
    { icon: faDownload,      value: stats?.cvDownloads ?? 0,        label: "Téléchargements CV",     iconColor: "#3b9eff" },
    { icon: faFileSignature, value: stats?.cvRequestsPending ?? 0,  label: "Demandes CV en attente", iconColor: "#f472b6" },
    { icon: faHourglassHalf, value: stats?.pendingApplications ?? 0,label: "Candidatures en attente",iconColor: "#fbbf24" },
  ];

  const jobKpis = jobsStats ? [
    { icon: faBriefcase,  value: jobsStats.totalJobs,       label: "Total des offres",    iconColor: "#a78bfa" },
    { icon: faCheckCircle,value: jobsStats.activeJobs,      label: "Offres actives",      iconColor: "#00e5b0" },
    { icon: faTimesCircle,value: jobsStats.expiredJobs,     label: "Offres expirées",     iconColor: "#f87171" },
    { icon: faClock,      value: jobsStats.upcomingJobs,    label: "Offres à venir",      iconColor: "#fbbf24" },
    { icon: faChartBar,   value: jobsStats.remoteJobs,      label: "Télétravail",         iconColor: "#3b9eff" },
    { icon: faBriefcase,  value: jobsStats.totalJobsActive, label: "Non supprimées",      iconColor: "#34d399" },
  ] : [];

  return (
    <AdminLayout>
      {/* Page header */}
      <div style={{ marginBottom: 36 }}>
        <p style={{
          fontSize:   11,
          fontWeight: 600,
          color:      "var(--text-muted)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontFamily: "var(--font-display)",
          marginBottom: 8,
        }}>
          Vue d&apos;ensemble
        </p>
        <h1 style={{
          fontFamily:    "var(--font-display)",
          fontSize:      28,
          fontWeight:    800,
          letterSpacing: "-0.02em",
          marginBottom:  6,
        }}>
          Tableau de bord
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
          Statistiques et indicateurs clés de la plateforme
        </p>
      </div>

      {error && (
        <div style={{
          padding:      "14px 18px",
          background:   "rgba(248,113,113,0.08)",
          border:       "1px solid rgba(248,113,113,0.2)",
          borderRadius: "var(--radius-md)",
          color:        "var(--accent-red)",
          fontSize:     14,
          marginBottom: 24,
        }}>
          {error}
        </div>
      )}

      {/* KPI Grid */}
      <div style={{
        display:             "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap:                 16,
        marginBottom:        32,
      }}>
        {kpis.map((kpi, i) => (
          <StatCard key={i} {...kpi} loading={statsLoading} />
        ))}
      </div>

      {/* Section label */}
      <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize:   16,
          fontWeight: 700,
          color:      "var(--text-primary)",
        }}>
          Statistiques des offres
        </h2>
        <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
      </div>

      <div style={{
        display:             "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap:                 16,
        marginBottom:        32,
      }}>
        {jobKpis.map((kpi, i) => (
          <StatCard key={i} {...kpi} loading={jobsLoading} />
        ))}
      </div>

      {/* Category chart */}
      <div className="glass-card" style={{ padding: "28px" }}>
        <div style={{
          display:       "flex",
          justifyContent:"space-between",
          alignItems:    "center",
          marginBottom:  24,
        }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize:   16,
            fontWeight: 700,
          }}>
            Répartition par catégorie
          </h2>
          <FontAwesomeIcon icon={faChartBar} style={{ color: "var(--text-muted)", fontSize: 16 }} />
        </div>

        {statsLoading ? (
          <Loader fullPage />
        ) : stats?.jobsByCategory && stats.jobsByCategory.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {stats.jobsByCategory.map(({ category, count }, idx) => {
              const max = Math.max(...stats.jobsByCategory.map(c => c.count), 1);
              const pct = (count / max) * 100;
              const color = CHART_COLORS[idx % CHART_COLORS.length];
              return (
                <div key={category}>
                  <div style={{
                    display:       "flex",
                    justifyContent:"space-between",
                    marginBottom:  8,
                    fontSize:      13,
                  }}>
                    <span style={{ color: "var(--text-secondary)" }}>{category}</span>
                    <span style={{ color, fontWeight: 600, fontFamily: "var(--font-display)" }}>
                      {count}
                    </span>
                  </div>
                  <div style={{
                    width:        "100%",
                    height:       6,
                    background:   "var(--bg-elevated)",
                    borderRadius: 99,
                    overflow:     "hidden",
                  }}>
                    <div style={{
                      width:        `${pct}%`,
                      height:       "100%",
                      background:   color,
                      borderRadius: 99,
                      boxShadow:    `0 0 8px ${color}60`,
                      transition:   "width 0.8s var(--ease-smooth)",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{
            textAlign: "center", padding: "40px",
            color: "var(--text-muted)", fontSize: 14,
          }}>
            Aucune donnée disponible
          </div>
        )}
      </div>
    </AdminLayout>
  );
}