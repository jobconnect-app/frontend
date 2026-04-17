import React from "react";

/* ─── Newsletter ─── */
export const Newsletter = () => (
  <section style={{ padding: "0 24px 100px", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
    <div className="glass-card" style={{ padding: "clamp(36px, 5vw, 60px)" }}>
      <div className="section-label" style={{ margin: "0 auto 16px", display: "inline-flex" }}>
        Newsletter
      </div>
      <h2 style={{ fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 800, marginBottom: 12 }}>
        Restez informé des meilleures offres
      </h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: 28, lineHeight: 1.7, fontSize: 14 }}>
        Recevez chaque semaine les offres qui correspondent à votre profil.
      </p>
 
      <form style={{
        display:      "flex",
        gap:          10,
        maxWidth:     440,
        margin:       "0 auto",
        flexWrap:     "wrap",
      }}>
        <input
          type="email"
          placeholder="votre@email.com"
          className="input-field"
          style={{ flex: 1, minWidth: 200 }}
        />
        <button type="submit" className="btn-primary" style={{ flexShrink: 0 }}>
          S&apos;inscrire
        </button>
      </form>
 
      <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 14 }}>
        Aucun spam. Désabonnement en 1 clic.
      </p>
    </div>
  </section>
);