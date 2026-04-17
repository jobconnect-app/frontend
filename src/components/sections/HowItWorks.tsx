import React from "react";
// Importation des icônes Lucide
import { FileText, MousePointerClick, Target } from "lucide-react";

export const HowItWorks = () => (
  <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      <div className="section-label" style={{ margin: "0 auto 16px" }}>Simple & rapide</div>
      <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, marginBottom: 12 }}>
        Comment ça marche
      </h2>
      <p style={{ color: "var(--text-secondary)", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
        3 étapes pour trouver le poste de vos rêves ou créer votre CV idéal
      </p>
    </div>

    <div style={{
      display:             "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap:                 20,
    }}>
      {[
        {
          step: "01",
          icon: <FileText size={24} />,
          title: "Créez votre CV",
          desc:  "Utilisez nos modèles professionnels pour créer un CV qui attire l'attention des recruteurs.",
          color: "var(--accent-primary)",
        },
        {
          step: "02",
          icon: <MousePointerClick size={24} />,
          title: "Postulez en 1 clic",
          desc:  "Trouvez des offres qui correspondent à votre profil et postulez directement via la plateforme.",
          color: "var(--accent-blue)",
        },
        {
          step: "03",
          icon: <Target size={24} />,
          title: "Suivez vos candidatures",
          desc:  "Gardez une trace de toutes vos candidatures et recevez des notifications en temps réel.",
          color: "var(--accent-purple)",
        },
      ].map(({ step, icon, title, desc, color }) => (
        <div
          key={step}
          className="glass-card glass-card-hover"
          style={{ 
            padding: "32px", 
            display: "flex", 
            flexDirection: "column", 
            gap: 20,
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Petit indicateur d'étape */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize:   10,
              fontWeight: 800,
              color,
              letterSpacing: "0.1em",
              background:   `${color}15`,
              border:       `1px solid ${color}30`,
              borderRadius: "4px",
              padding:      "2px 6px",
            }}>ÉTAPE {step}</div>
          </div>

          {/* Conteneur de l'icône */}
          <div style={{ 
            color, 
            background: `${color}10`,
            width: "50px",
            height: "50px",
            borderRadius: "var(--radius-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1px solid ${color}20`
          }}>
            {icon}
          </div>

          <div>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize:   18,
              fontWeight: 700,
              color:      "var(--text-primary)",
              marginBottom: 8
            }}>{title}</h3>
            <p style={{ 
              fontSize: 14, 
              color: "var(--text-secondary)", 
              lineHeight: 1.6,
              fontWeight: 300
            }}>{desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);