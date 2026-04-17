import React from "react";
import Link from "next/link";
// Importation des icônes Lucide
import { 
  Monitor, 
  Megaphone, 
  Stethoscope, 
  TrendingUp, 
  GraduationCap, 
  HardHat, 
  Users, 
  Palette,
  ArrowRight
} from "lucide-react";

const categories = [
  { name: "Tech",       icon: <Monitor size={22} />,      count: 2840, color: "var(--accent-blue-dim)",    accent: "var(--accent-blue)" },
  { name: "Marketing",  icon: <Megaphone size={22} />,    count: 1230, color: "rgba(251,146,60,0.1)",       accent: "var(--accent-orange)" },
  { name: "Santé",      icon: <Stethoscope size={22} />,  count: 980,  color: "rgba(248,113,113,0.1)",       accent: "var(--accent-red)" },
  { name: "Finance",    icon: <TrendingUp size={22} />,   count: 760,  color: "var(--accent-primary-dim)",   accent: "var(--accent-purple)" }, // Note: Purple non défini en dim dans ton CSS, adapté ici
  { name: "Éducation",  icon: <GraduationCap size={22} />, count: 540,  color: "var(--accent-primary-dim)",   accent: "var(--accent-primary)" },
  { name: "BTP",        icon: <HardHat size={22} />,      count: 420,  color: "rgba(251,146,60,0.1)",       accent: "var(--accent-orange)" },
  { name: "RH",         icon: <Users size={22} />,        count: 390,  color: "var(--accent-blue-dim)",      accent: "var(--accent-blue)" },
  { name: "Design",     icon: <Palette size={22} />,      count: 310,  color: "rgba(167,139,250,0.1)",       accent: "var(--accent-purple)" },
];

const PopularCategories = () => (
  <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
    {/* Header */}
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <div className="section-label" style={{ margin: "0 auto 16px" }}>
        Catégories
      </div>
      <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, marginBottom: 14 }}>
        Trouvez votre secteur
      </h2>
      <p style={{ color: "var(--text-secondary)", maxWidth: 420, margin: "0 auto", lineHeight: 1.7 }}>
        Parcourez les offres par domaine d&apos;activité
      </p>
    </div>

    <div style={{
      display:             "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap:                 16,
    }}>
      {categories.map(({ name, icon, count, color, accent }) => (
        <Link
          key={name}
          href={`/offres?category=${name.toLowerCase()}`}
          className="glass-card-hover" // Utilisation de ta classe de hover globale
          style={{
            display:      "flex",
            alignItems:   "center",
            gap:          16,
            padding:      "20px",
            borderRadius: "var(--radius-lg)",
            background:   "var(--bg-card)", // Fond sombre cohérent avec ton thème
            border:       "1px solid var(--border-subtle)",
            cursor:       "pointer",
            textDecoration: "none",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Conteneur de l'icône SVG */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: "var(--radius-md)",
            background: color,
            color: accent,
          }}>
            {icon}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize:   15,
              color:      "var(--text-primary)",
            }}>{name}</div>
            <div style={{ 
              fontSize: 12, 
              color: "var(--text-secondary)", 
              marginTop: 2,
              display: "flex",
              alignItems: "center",
              gap: 4
            }}>
              <span style={{ color: accent, fontWeight: 600 }}>{count}</span> offres
            </div>
          </div>

          <ArrowRight size={14} style={{ color: "var(--text-muted)", opacity: 0.5 }} />
        </Link>
      ))}
    </div>
  </section>
);

export default PopularCategories;