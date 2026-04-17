import React from "react";

/* ─── Testimonials ─── */
const testimonials = [
  {
    name:    "Jean Dupont",
    role:    "Développeur web",
    content: "J'ai trouvé mon emploi actuel grâce à JobConnect. Le processus de candidature est simple et l'équipe ultra réactive.",
    avatar:  "JD",
    color:   "#3b9eff",
  },
  {
    name:    "Marie Laurent",
    role:    "Responsable RH",
    content: "JobConnect nous a permis de trouver des candidats qualifiés rapidement. La qualité des profils est exceptionnelle.",
    avatar:  "ML",
    color:   "#00e5b0",
  },
  {
    name:    "Pierre Leroy",
    role:    "Designer UX",
    content: "Les modèles de CV sont modernes et percutants. J'ai reçu des compliments à chaque entretien !",
    avatar:  "PL",
    color:   "#a78bfa",
  },
];
 
export const Testimonials = () => (
  <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <div className="section-label" style={{ margin: "0 auto 16px" }}>Témoignages</div>
      <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800 }}>
        Ils nous font confiance
      </h2>
    </div>
 
    <div style={{
      display:             "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap:                 16,
    }}>
      {testimonials.map(({ name, role, content, avatar, color }) => (
        <div
          key={name}
          className="glass-card glass-card-hover"
          style={{ padding: "28px", display: "flex", flexDirection: "column", gap: 18 }}
        >
          {/* Stars */}
          <div style={{ color: "#f59e0b", fontSize: 13, letterSpacing: 2 }}>★★★★★</div>
 
          <p style={{
            fontSize:   14,
            color:      "var(--text-secondary)",
            lineHeight: 1.75,
            fontStyle:  "italic",
            flex:       1,
          }}>
            &ldquo;{content}&rdquo;
          </p>
 
          <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid var(--border-subtle)" }}>
            <div style={{
              width:        38,
              height:       38,
              borderRadius: "50%",
              background:   `${color}20`,
              border:       `1px solid ${color}40`,
              display:      "flex",
              alignItems:   "center",
              justifyContent: "center",
              fontFamily:   "var(--font-display)",
              fontWeight:   700,
              fontSize:     13,
              color,
            }}>{avatar}</div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14 }}>{name}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);