"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/offres",    label: "Offres" },
  { href: "/cv",        label: "CVs" },
  { href: "/faq",       label: "FAQ" },
];

const Navbar = () => {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <nav
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          right:           0,
          zIndex:          100,
          height:          "60px",
          display:         "flex",
          alignItems:      "center",
          padding:         "0 24px",
          justifyContent:  "space-between",
          background:      scrolled ? "rgba(7,11,18,0.95)" : "transparent",
          borderBottom:    scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
          backdropFilter:  scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          transition:      "all 0.3s ease",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30,
            background: "linear-gradient(135deg, var(--accent-primary), var(--accent-blue))",
            borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 800, color: "#070b12",
            fontFamily: "var(--font-display)",
          }}>J</div>
          <span style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 17,
            color: "var(--text-primary)",
            letterSpacing: "-0.03em",
          }}>
            Job<span style={{ color: "var(--accent-primary)" }}>Connect</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden-mobile">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  padding:         "6px 14px",
                  borderRadius:    "var(--radius-sm)",
                  fontSize:        14,
                  fontWeight:      active ? 600 : 400,
                  color:           active ? "var(--text-primary)" : "var(--text-secondary)",
                  background:      active ? "var(--bg-glass)" : "transparent",
                  border:          active ? "1px solid var(--border-subtle)" : "1px solid transparent",
                  transition:      "all 0.15s",
                }}
                onMouseEnter={e => {
                  if (!active) {
                    (e.target as HTMLElement).style.color = "var(--text-primary)";
                    (e.target as HTMLElement).style.background = "var(--bg-glass)";
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    (e.target as HTMLElement).style.color = "var(--text-secondary)";
                    (e.target as HTMLElement).style.background = "transparent";
                  }
                }}
              >{label}</Link>
            );
          })}
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="hidden-mobile">
          <Link href="/login">
            <button className="btn-ghost" style={{ fontSize: 14 }}>Se connecter</button>
          </Link>
          <Link href="/login">
            <button className="btn-primary" style={{ padding: "8px 18px", fontSize: 13 }}>
              Commencer →
            </button>
          </Link>
        </div>

        {/* Burger */}
        <button
          onClick={() => setOpen(!open)}
          className="show-mobile"
          aria-label="Menu"
          style={{
            background: "var(--bg-glass)",
            border:     "1px solid var(--border-default)",
            borderRadius: "var(--radius-sm)",
            width: 36, height: 36,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "var(--text-primary)", fontSize: 18,
          }}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position:   "fixed",
          inset:      0,
          zIndex:     99,
          background: "rgba(7,11,18,0.98)",
          display:    "flex",
          flexDirection: "column",
          padding:    "80px 24px 32px",
          gap:        8,
          animation:  "fade-in 0.2s ease",
        }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                padding:      "14px 16px",
                borderRadius: "var(--radius-md)",
                fontSize:     16,
                fontWeight:   500,
                color:        pathname === href ? "var(--accent-primary)" : "var(--text-secondary)",
                background:   pathname === href ? "var(--accent-primary-dim)" : "transparent",
                border:       `1px solid ${pathname === href ? "var(--border-accent)" : "transparent"}`,
              }}
            >{label}</Link>
          ))}

          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
            <Link href="/login">
              <button className="btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
                Se connecter
              </button>
            </Link>
            <Link href="/login">
              <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Commencer gratuitement →
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: 60 }} />

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile   { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;