import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface StatCardProps {
  icon:      IconDefinition;
  value:     string | number;
  label:     React.ReactNode;
  iconColor: string;
  className?: string;
  loading?:  boolean;
  trend?:    { value: number; label: string };
}

const StatCard = ({ icon, value, label, iconColor, className = "", loading = false, trend }: StatCardProps) => (
  <div
    className={`glass-card glass-card-hover ${className}`}
    style={{
      padding:        "20px 22px",
      display:        "flex",
      flexDirection:  "column",
      gap:            12,
    }}
  >
    {/* Top row */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      {loading ? (
        <div style={{
          width: 36, height: 36,
          borderRadius: "var(--radius-sm)",
          background: "var(--bg-elevated)",
        }} className="shimmer" />
      ) : (
        <div style={{
          width:        36,
          height:       36,
          borderRadius: "var(--radius-sm)",
          background:   `${iconColor.replace("text-", "")}15`,
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
          fontSize:     15,
        }}>
          <FontAwesomeIcon icon={icon} style={{ color: iconColor.startsWith("text-") ? undefined : iconColor }} className={iconColor.startsWith("text-") ? iconColor : ""} />
        </div>
      )}

      {trend && !loading && (
        <span style={{
          fontSize:   11,
          fontWeight: 600,
          color:      trend.value >= 0 ? "var(--accent-primary)" : "var(--accent-red)",
          background: trend.value >= 0 ? "var(--accent-primary-dim)" : "rgba(248,113,113,0.1)",
          border:     `1px solid ${trend.value >= 0 ? "var(--border-accent)" : "rgba(248,113,113,0.2)"}`,
          borderRadius: "99px",
          padding:    "2px 8px",
        }}>
          {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
        </span>
      )}
    </div>

    {/* Value */}
    {loading ? (
      <div style={{
        width: "60%", height: 28,
        background: "var(--bg-elevated)",
        borderRadius: "var(--radius-sm)",
      }} className="shimmer" />
    ) : (
      <div style={{
        fontFamily:  "var(--font-display)",
        fontWeight:  800,
        fontSize:    28,
        lineHeight:  1,
        color:       "var(--text-primary)",
        letterSpacing: "-0.02em",
      }}>
        {value}
      </div>
    )}

    {/* Label */}
    {loading ? (
      <div style={{
        width: "80%", height: 14,
        background: "var(--bg-elevated)",
        borderRadius: "var(--radius-sm)",
      }} className="shimmer" />
    ) : (
      <div style={{
        fontSize:   13,
        color:      "var(--text-secondary)",
        lineHeight: 1.4,
      }}>
        {label}
      </div>
    )}

    <style>{`
      @keyframes shimmer-anim {
        0%   { opacity: 0.4; }
        50%  { opacity: 0.8; }
        100% { opacity: 0.4; }
      }
      .shimmer { animation: shimmer-anim 1.5s ease-in-out infinite; }
    `}</style>
  </div>
);

export default StatCard;