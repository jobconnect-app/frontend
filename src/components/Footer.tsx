import React from "react";
import Link from "next/link";

const Footer = () => (
  <footer style={{
    borderTop:   "1px solid var(--border-subtle)",
    padding:     "48px 24px 32px",
    maxWidth:    1100,
    margin:      "0 auto",
  }}>
    <div style={{
      display:         "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
      gap:             40,
      marginBottom:    48,
    }}>
      {/* Brand */}
      <div style={{ gridColumn: "span 2" }}>
        <div style={{
          fontFamily:    "var(--font-display)",
          fontWeight:    700,
          fontSize:      20,
          letterSpacing: "-0.03em",
          marginBottom:  12,
        }}>
          Job<span style={{ color: "var(--accent-primary)" }}>Connect</span>
        </div>
        <p style={{
          fontSize:   13,
          color:      "var(--text-muted)",
          lineHeight: 1.7,
          maxWidth:   240,
        }}>
          La plateforme moderne pour trouver un emploi et créer un CV professionnel.
        </p>
      </div>

      {/* Links */}
      {[
        {
          title: "Plateforme",
          links: [
            { href: "/offres",    label: "Offres d'emploi" },
            { href: "/cv",        label: "CV Pro" },
            { href: "/profil",    label: "Mon profil" },
          ],
        },
        {
          title: "Entreprise",
          links: [
            { href: "/a-propos",  label: "À propos" },
            { href: "/contact",   label: "Contact" },
            { href: "/faq",       label: "FAQ" },
          ],
        },
      ].map(({ title, links }) => (
        <div key={title}>
          <h4 style={{
            fontFamily:    "var(--font-display)",
            fontSize:      12,
            fontWeight:    600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color:         "var(--text-muted)",
            marginBottom:  16,
          }}>{title}</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize:   13,
                  color:      "var(--text-secondary)",
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = "var(--text-primary)")}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = "var(--text-secondary)")}
              >{label}</Link>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Bottom bar */}
    <div style={{
      display:         "flex",
      justifyContent:  "space-between",
      alignItems:      "center",
      flexWrap:        "wrap",
      gap:             12,
      paddingTop:      24,
      borderTop:       "1px solid var(--border-subtle)",
    }}>
      <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
        © {new Date().getFullYear()} JobConnect. Tous droits réservés.
      </p>
      <div style={{ display: "flex", gap: 20 }}>
        {["Mentions légales", "Confidentialité", "CGU"].map(label => (
          <span
            key={label}
            style={{ fontSize: 12, color: "var(--text-muted)", cursor: "pointer" }}
          >{label}</span>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;