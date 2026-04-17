import React from "react";
import { 
  Building2, 
  MapPin,  
  ArrowRight, 
  Star,
  Clock
} from "lucide-react";

type JobCardProps = {
  title:    string;
  company:  string;
  location: string;
  salary:   string;
  tags:     string[];
  featured?: boolean;
  id?:      string;
};

const CONTRACT_COLORS: Record<string, string> = {
  CDI:        "badge-green",
  CDD:        "badge-blue",
  FREELANCE:  "badge-purple",
  STAGE:      "badge-gray",
  Remote:     "badge-green",
};

const JobCard = ({ title, company, location, salary, tags, featured }: JobCardProps) => (
  <div
    className="glass-card glass-card-hover"
    style={{ 
      padding: "28px", 
      display: "flex", 
      flexDirection: "column", 
      gap: "20px", 
      position: "relative",
      height: "100%",
      border: featured ? "1px solid var(--border-accent)" : "1px solid var(--border-subtle)"
    }}
  >
    {featured && (
      <div style={{
        position: "absolute",
        top: "-12px",
        left: "24px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 12px",
        background: "var(--bg-surface)",
        border: "1px solid var(--accent-primary)",
        borderRadius: "20px",
        fontSize: "10px",
        fontWeight: 700,
        color: "var(--accent-primary)",
        boxShadow: "0 4px 12px rgba(0, 229, 176, 0.2)"
      }}>
        <Star size={12} fill="var(--accent-primary)" /> POPULAIRE
      </div>
    )}

    {/* Header Section */}
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
      <div style={{
        width: "52px",
        height: "52px",
        borderRadius: "12px",
        background: "linear-gradient(135deg, var(--bg-elevated), var(--bg-surface))",
        border: "1px solid var(--border-strong)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: "0 8px 16px rgba(0,0,0,0.2)"
      }}>
        <Building2 size={24} color="var(--accent-primary)" strokeWidth={1.5} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: "17px",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "4px",
          lineHeight: 1.2
        }}>{title}</h3>
        <p style={{ 
          fontSize: "14px", 
          color: "var(--text-secondary)",
          display: "flex",
          alignItems: "center",
          gap: "6px"
        }}>
          {company}
        </p>
      </div>
    </div>

    {/* Info Row (Location & Salary) */}
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", fontSize: "14px" }}>
            <MapPin size={16} color="var(--accent-primary)" />
            <span>{location}</span>
        </div>
        <div style={{ 
            fontSize: "16px", 
            fontWeight: 700, 
            color: "var(--accent-primary)",
            fontFamily: "var(--font-display)"
        }}>
            {salary}
        </div>
    </div>

    {/* Tags Section */}
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {tags.map(tag => (
        <span
          key={tag}
          className={`badge ${CONTRACT_COLORS[tag] || "badge-gray"}`}
          style={{ display: "flex", alignItems: "center", gap: "4px", padding: "4px 10px" }}
        >
          {tag === "Remote" && <Clock size={12} />}
          {tag}
        </span>
      ))}
    </div>

    {/* CTA Section */}
    <div style={{ marginTop: "auto", paddingTop: "16px" }}>
      <button
        className="btn-primary"
        style={{ 
            width: "100%", 
            justifyContent: "center", 
            fontSize: "14px", 
            padding: "12px",
            background: "linear-gradient(90deg, var(--accent-primary), #00d1ff)"
        }}
      >
        Voir l&apos;offre <ArrowRight size={16} style={{ marginLeft: "8px" }} />
      </button>
    </div>
  </div>
);

export default JobCard;