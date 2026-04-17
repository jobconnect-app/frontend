import React from "react";

/* ─── CVProSection ─── */
export const CVProSection = () => (
  <section style={{ padding: "0 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
    <div
      style={{
        position:     "relative",
        overflow:     "hidden",
        borderRadius: "var(--radius-xl)",
        border:       "1px solid var(--border-accent)",
        background:   "linear-gradient(135deg, rgba(0,229,176,0.06) 0%, rgba(59,158,255,0.04) 100%)",
        padding:      "clamp(36px, 5vw, 64px)",
        display:      "flex",
        alignItems:   "center",
        justifyContent: "space-between",
        gap:          40,
        flexWrap:     "wrap",
      }}
    >
      {/* Background glow */}
      <div style={{
        position:   "absolute",
        top:        -60,
        right:      -60,
        width:      300,
        height:     300,
        background: "radial-gradient(circle, rgba(0,229,176,0.12), transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />
 
      <div style={{ position: "relative", zIndex: 1, maxWidth: 520 }}>
        <div className="section-label" style={{ marginBottom: 16 }}>
          ✦ Service Premium
        </div>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
          Créez un CV qui fait<br />
          <span className="text-gradient">la différence.</span>
        </h2>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 28, fontSize: 15 }}>
          Nos modèles de CV modernes et personnalisables vous donnent l&apos;avantage
          sur des milliers de candidats. Adapté à chaque secteur.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="/cv">
            <button className="btn-primary" style={{ fontSize: 14 }}>
              Voir les modèles →
            </button>
          </a>
          <a href="/contact">
            <button className="btn-ghost" style={{ color: "var(--text-secondary)", fontSize: 14 }}>
              Demander un devis
            </button>
          </a>
        </div>
      </div>
 
      {/* Pricing pills */}
      <div style={{
        position: "relative",
        zIndex:   1,
        display:  "flex",
        flexDirection: "column",
        gap:      12,
      }}>
        {[
          { label: "CV personnalisé",         price: "49€",  popular: false },
          { label: "Pack CV + Lettre de motivation", price: "69€", popular: true },
          { label: "Coaching entretien",      price: "39€/h", popular: false },
        ].map(({ label, price, popular }) => (
          <div
            key={label}
            style={{
              display:      "flex",
              alignItems:   "center",
              justifyContent: "space-between",
              gap:          32,
              padding:      "14px 20px",
              borderRadius: "var(--radius-md)",
              background:   popular ? "var(--accent-primary-dim)" : "var(--bg-glass)",
              border:       `1px solid ${popular ? "var(--border-accent)" : "var(--border-subtle)"}`,
              minWidth:     260,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {popular && <span style={{ fontSize: 12, color: "var(--accent-primary)" }}>★</span>}
              <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>{label}</span>
            </div>
            <span style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize:   16,
              color:      popular ? "var(--accent-primary)" : "var(--text-primary)",
            }}>{price}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
