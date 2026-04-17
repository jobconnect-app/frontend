import React from "react";

/* ─── TrustIndicators ─── */
export const TrustIndicators = () => (
  <section style={{ padding: "0 24px 60px", maxWidth: 900, margin: "0 auto" }}>
    <div style={{
      display:          "flex",
      alignItems:       "center",
      gap:              "clamp(24px, 4vw, 60px)",
      justifyContent:   "center",
      flexWrap:         "wrap",
      padding:          "28px 40px",
      background:       "var(--bg-card)",
      border:           "1px solid var(--border-subtle)",
      borderRadius:     "var(--radius-xl)",
      backdropFilter:   "blur(16px)",
    }}>
      {[
        { value: "10K+", label: "Offres d'emploi",   color: "var(--accent-blue)" },
        { value: "5K+",  label: "Entreprises",         color: "var(--accent-primary)" },
        { value: "50K+", label: "Candidats actifs",    color: "var(--accent-purple)" },
        { value: "98%",  label: "Taux de satisfaction",color: "var(--accent-orange)" },
      ].map(({ value, label, color }, i) => (
        <React.Fragment key={label}>
          {i > 0 && <div style={{ width: 1, height: 40, background: "var(--border-subtle)" }} />}
          <div style={{ textAlign: "center", minWidth: 100 }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize:   28,
              color,
              lineHeight: 1,
            }}>{value}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>{label}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  </section>
);