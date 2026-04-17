import React from "react";
import Link from "next/link";

const HeroBanner = () => (
  <section
    style={{
      position:    "relative",
      overflow:    "hidden",
      padding:     "90px 24px 100px",
      textAlign:   "center",
      display:     "flex",
      flexDirection: "column",
      alignItems:  "center",
    }}
  >
    {/* Glow orbs */}
    <div className="glow-orb animate-glow-pulse" style={{
      width: 600, height: 600,
      background: "radial-gradient(circle, rgba(0,229,176,0.12) 0%, transparent 70%)",
      top: -200, left: "50%", transform: "translateX(-50%)",
      position: "absolute",
    }} />
    <div className="glow-orb" style={{
      width: 400, height: 400,
      background: "radial-gradient(circle, rgba(59,158,255,0.08) 0%, transparent 70%)",
      bottom: 0, right: "10%",
      position: "absolute",
    }} />

    {/* Grid overlay */}
    <div style={{
      position:   "absolute",
      inset:      0,
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
      maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
      WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
    }} />

    <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
      {/* Tag */}
      <div className="section-label anim-hidden animate-fade-up" style={{ marginBottom: 24 }}>
        <span style={{
          display: "inline-block", width: 6, height: 6,
          borderRadius: "50%", background: "var(--accent-primary)",
        }} />
        La plateforme emploi nouvelle génération
      </div>

      {/* Headline */}
      <h1
        className="anim-hidden animate-fade-up delay-100"
        style={{
          fontSize:   "clamp(42px, 7vw, 76px)",
          fontWeight: 800,
          lineHeight: 1.05,
          marginBottom: 24,
          letterSpacing: "-0.03em",
        }}
      >
        Votre prochain emploi,{" "}
        <span className="text-gradient">trouvé ici.</span>
      </h1>

      <p
        className="anim-hidden animate-fade-up delay-200"
        style={{
          fontSize:    "clamp(16px, 2.5vw, 19px)",
          color:       "var(--text-secondary)",
          maxWidth:    520,
          margin:      "0 auto 40px",
          lineHeight:  1.7,
          fontWeight:  300,
        }}
      >
        Des milliers d&apos;offres d&apos;emploi, des outils de CV professionnels,
        et une plateforme pensée pour booster votre carrière.
      </p>

      {/* CTAs */}
      <div
        className="anim-hidden animate-fade-up delay-300"
        style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
      >
        {/* Utilise Link à la place de <a> */}
        <Link href="/offres">
          <button className="btn-primary" style={{ fontSize: 15, padding: "13px 28px" }}>
            Explorer les offres →
          </button>
        </Link>

        <Link href="/cv">
          <button className="btn-secondary" style={{ fontSize: 15, padding: "13px 28px" }}>
            Créer mon CV Pro
          </button>
        </Link>
      </div>

      {/* Social proof */}
      <div
        className="anim-hidden animate-fade-up delay-400"
        style={{
          marginTop:   56,
          display:     "flex",
          alignItems:  "center",
          gap:         24,
          justifyContent: "center",
          flexWrap:    "wrap",
        }}
      >
        {[
          { value: "10K+", label: "offres actives" },
          { value: "50K+", label: "candidats" },
          { value: "5K+", label: "entreprises" },
          { value: "98%", label: "satisfaction" },
        ].map(({ value, label }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize:   22,
              color:      "var(--text-primary)",
            }}>{value}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HeroBanner;