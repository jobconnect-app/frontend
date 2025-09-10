import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => (
  <form className="flex bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition focus-within:ring-2 focus-within:ring-blue-400">
    <span className="flex items-center px-3 text-gray-400">
      {/* Icône loupe */}
      <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
    </span>
    <input
      type="text"
      placeholder="Recherche par mots-clés, entreprise, localisation..."
      className="flex-1 px-2 py-3 outline-none bg-transparent text-gray-900 dark:text-white"
    />
    <button
      type="submit"
      className="bg-blue-600 text-white px-6 py-3 font-semibold hover:bg-blue-700 transition"
    >
      Rechercher
    </button>
  </form>
);

export default SearchBar;
