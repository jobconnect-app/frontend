"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUser,
  faBriefcase,
  faFileAlt,
  faTags,
  faIdBadge,
  faFileSignature,
  faCog,
  faLayerGroup,
  faBook,
  faHeart,
  faTimes,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: faTachometerAlt },
  { href: "/admin/users", label: "Utilisateurs", icon: faUser },
  { href: "/admin/jobs", label: "Offres", icon: faBriefcase },
  { href: "/admin/applications", label: "Candidatures", icon: faFileAlt },
  { href: "/admin/categories", label: "Catégories", icon: faLayerGroup },
  { href: "/admin/tags", label: "Tags", icon: faTags },
  { href: "/admin/cv-templates", label: "Templates CV", icon: faIdBadge },
  { href: "/admin/cv-requests", label: "Demandes CV", icon: faFileSignature },
  { href: "/admin/pages", label: "Pages", icon: faBook },
  { href: "/admin/favorites", label: "Favoris", icon: faHeart },
  { href: "/admin/settings", label: "Paramètres", icon: faCog },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Fermer la sidebar lors du redimensionnement de l'écran
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Overlay pour mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Bouton hamburger mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={open}
      >
        <FontAwesomeIcon
          icon={faBars}
          className="text-gray-700 dark:text-gray-200 text-xl"
        />
      </button>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        aria-label="Navigation principale"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Admin
          </span>
          <button
            className="md:hidden text-xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={() => setOpen(false)}
            aria-label="Fermer le menu"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <nav className="flex-1 py-4 px-2 flex flex-col gap-1 overflow-y-auto">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-inner"
                      : "text-gray-700 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="w-6 text-center">
                  <FontAwesomeIcon
                    icon={link.icon}
                    className={`${isActive ? "text-white" : "text-gray-500 dark:text-gray-400"}`}
                  />
                </span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          Version 1.0.0
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
