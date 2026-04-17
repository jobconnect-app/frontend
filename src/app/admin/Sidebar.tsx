"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt, faUser, faBriefcase, faFileAlt, faTags,
  faIdBadge, faFileSignature, faCog, faLayerGroup, faBook,
  faHeart, faTimes, faBars, faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth";

const links = [
  { href: "/admin/dashboard",   label: "Dashboard",     icon: faTachometerAlt, group: "main" },
  { href: "/admin/users",       label: "Utilisateurs",  icon: faUser,          group: "main" },
  { href: "/admin/jobs",        label: "Offres",         icon: faBriefcase,     group: "main" },
  { href: "/admin/applications",label: "Candidatures",  icon: faFileAlt,       group: "main" },
  { href: "/admin/categories",  label: "Catégories",    icon: faLayerGroup,    group: "content" },
  { href: "/admin/tags",        label: "Tags",           icon: faTags,          group: "content" },
  { href: "/admin/cv-templates",label: "Templates CV",  icon: faIdBadge,       group: "content" },
  { href: "/admin/cv-requests", label: "Demandes CV",   icon: faFileSignature, group: "content" },
  { href: "/admin/pages",       label: "Pages",         icon: faBook,          group: "content" },
  { href: "/admin/favorites",   label: "Favoris",       icon: faHeart,         group: "other" },
  { href: "/admin/settings",    label: "Paramètres",    icon: faCog,           group: "other" },
];

const GroupLabel = ({ label }: { label: string }) => (
  <div style={{
    padding:       "16px 16px 6px",
    fontSize:      10,
    fontWeight:    700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color:         "var(--text-muted)",
    fontFamily:    "var(--font-display)",
  }}>{label}</div>
);

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { logout, user } = useAuth();

  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const SidebarContent = () => (
    <div style={{
      height:        "100%",
      display:       "flex",
      flexDirection: "column",
      overflow:      "hidden",
    }}>
      {/* Header */}
      <div style={{
        padding:     "20px 16px",
        borderBottom:"1px solid var(--border-subtle)",
        display:     "flex",
        alignItems:  "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: "linear-gradient(135deg, var(--accent-primary), var(--accent-blue))",
            borderRadius: "var(--radius-sm)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 800, color: "#070b12",
            fontFamily: "var(--font-display)",
            flexShrink: 0,
          }}>J</div>
          <div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700, fontSize: 15,
              color: "var(--text-primary)",
            }}>Admin</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>
              {user?.email?.split("@")[0] ?? "Panel"}
            </div>
          </div>
        </div>
        <button
          className="show-mobile"
          onClick={() => setOpen(false)}
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: "var(--text-muted)", fontSize: 14, padding: 4,
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "8px 8px" }}>
        <GroupLabel label="Principal" />
        {links.filter(l => l.group === "main").map(link => <NavItem key={link.href} link={link} pathname={pathname} onNav={() => setOpen(false)} />)}

        <GroupLabel label="Contenu" />
        {links.filter(l => l.group === "content").map(link => <NavItem key={link.href} link={link} pathname={pathname} onNav={() => setOpen(false)} />)}

        <GroupLabel label="Autre" />
        {links.filter(l => l.group === "other").map(link => <NavItem key={link.href} link={link} pathname={pathname} onNav={() => setOpen(false)} />)}
      </nav>

      {/* Footer */}
      <div style={{ padding: "12px 8px", borderTop: "1px solid var(--border-subtle)" }}>
        <button
          onClick={logout}
          style={{
            width:        "100%",
            display:      "flex",
            alignItems:   "center",
            gap:          10,
            padding:      "10px 12px",
            borderRadius: "var(--radius-md)",
            background:   "transparent",
            border:       "1px solid var(--border-subtle)",
            color:        "var(--text-muted)",
            fontSize:     13,
            fontFamily:   "var(--font-body)",
            cursor:       "pointer",
            transition:   "all 0.15s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(248,113,113,0.08)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,113,113,0.2)";
            (e.currentTarget as HTMLElement).style.color = "var(--accent-red)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
            (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
          }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} style={{ width: 14 }} />
          Se déconnecter
        </button>
        <div style={{ textAlign: "center", fontSize: 10, color: "var(--text-muted)", marginTop: 10 }}>
          JobConnect Admin v1.0
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 40,
            background: "rgba(7,11,18,0.8)", backdropFilter: "blur(4px)",
          }}
          className="show-mobile"
        />
      )}

      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="show-mobile"
        aria-label="Menu"
        style={{
          position:     "fixed",
          top:          12,
          left:         12,
          zIndex:       30,
          width:        36,
          height:       36,
          borderRadius: "var(--radius-sm)",
          background:   "var(--bg-elevated)",
          border:       "1px solid var(--border-default)",
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
          color:        "var(--text-primary)",
          cursor:       "pointer",
          fontSize:     14,
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Sidebar */}
      <aside
        style={{
          position:    "fixed",
          top:         0,
          left:        0,
          height:      "100vh",
          width:       236,
          background:  "var(--bg-surface)",
          borderRight: "1px solid var(--border-subtle)",
          zIndex:      50,
          transform:   open ? "translateX(0)" : undefined,
          transition:  "transform 0.3s var(--ease-smooth)",
        }}
        className="sidebar-desktop"
      >
        <SidebarContent />
      </aside>

      <style>{`
        @media (min-width: 768px) {
          .sidebar-desktop { transform: translateX(0) !important; }
          .show-mobile      { display: none !important; }
        }
        @media (max-width: 767px) {
          .sidebar-desktop { transform: translateX(-100%); }
          .show-mobile      { display: flex !important; }
        }
      `}</style>
    </>
  );
};

const NavItem = ({
  link,
  pathname,
  onNav,
}: {
  link: { href: string; label: string; icon: any };
  pathname: string;
  onNav: () => void;
}) => {
  const active = pathname.startsWith(link.href);
  return (
    <Link
      href={link.href}
      onClick={onNav}
      style={{
        display:      "flex",
        alignItems:   "center",
        gap:          10,
        padding:      "9px 12px",
        borderRadius: "var(--radius-md)",
        marginBottom: 2,
        fontSize:     13,
        fontWeight:   active ? 600 : 400,
        color:        active ? "var(--accent-primary)" : "var(--text-secondary)",
        background:   active ? "var(--accent-primary-dim)" : "transparent",
        border:       `1px solid ${active ? "var(--border-accent)" : "transparent"}`,
        transition:   "all 0.15s",
        textDecoration: "none",
      }}
      onMouseEnter={e => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
          (e.currentTarget as HTMLElement).style.background = "var(--bg-glass)";
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
          (e.currentTarget as HTMLElement).style.background = "transparent";
        }
      }}
    >
      <FontAwesomeIcon
        icon={link.icon}
        style={{
          width:    14,
          flexShrink: 0,
          color:    active ? "var(--accent-primary)" : "var(--text-muted)",
        }}
      />
      {link.label}
    </Link>
  );
};

export default Sidebar;