"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/">
          <span className="text-xl font-bold text-blue-700">JobConnect</span>
        </Link>
        <div className="hidden md:flex gap-4 ml-8">
          <Link href="/offres" className="hover:underline">
            Offres
          </Link>
          <Link href="/cv" className="hover:underline">
            CV Pro
          </Link>
          <Link href="/a-propos" className="hover:underline">
            À propos
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/faq" className="hover:underline">
            FAQ
          </Link>
          <Link href="/profil" className="hover:underline">
            Profil
          </Link>
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>
        </div>
      </div>
      <div className="hidden md:block">
        <Link href="/login">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition">
            Connexion
          </button>
        </Link>
      </div>
      {/* Burger menu mobile */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        ☰
      </button>
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md flex flex-col items-center gap-4 py-4 z-50 animate-fadein">
          <Link
            href="/offres"
            className="hover:underline"
            onClick={() => setOpen(false)}
          >
            Offres
          </Link>
          <Link
            href="/cv"
            className="hover:underline"
            onClick={() => setOpen(false)}
          >
            CV Pro
          </Link>
          <Link
            href="/a-propos"
            className="hover:underline"
            onClick={() => setOpen(false)}
          >
            À propos
          </Link>
          <Link
            href="/contact"
            className="hover:underline"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/faq"
            className="hover:underline"
            onClick={() => setOpen(false)}
          >
            FAQ
          </Link>
          <Link
            href="/profil"
            className="hover:underline"
            onClick={() => setOpen(false)}
          >
            Profil
          </Link>
          <Link
            href="/admin"
            className="hover:underline"
            onClick={() => setOpen(false)}
          >
            Admin
          </Link>
          <Link
            href="/login"
            className="hover:underline"
            onClick={() => setOpen(false)}
          >
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition">
              Connexion
            </button>
          </Link>
        </div>
      )}
      <style jsx global>{`
        .animate-fadein {
          animation: fadein 0.4s ease;
        }
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
