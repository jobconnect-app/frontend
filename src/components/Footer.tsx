import React from "react";
import Link from "next/link";

const Footer = () => (
  <footer className="w-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-6 mt-auto flex flex-col items-center gap-2">
    <div className="flex gap-4 mb-1">
      <Link href="/a-propos" className="hover:underline">
        À propos
      </Link>
      <Link href="/contact" className="hover:underline">
        Contact
      </Link>
    </div>
    <div className="text-xs">
      &copy; {new Date().getFullYear()} JobConnect. Tous droits réservés.
    </div>
  </footer>
);

export default Footer;
