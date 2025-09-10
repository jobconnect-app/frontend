import React from "react";

const JobFilters = () => (
  <form className="flex flex-wrap gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
    <select className="px-3 py-2 rounded border border-gray-300 dark:bg-gray-900 dark:border-gray-700">
      <option>Catégorie</option>
      <option>Tech</option>
      <option>Marketing</option>
      <option>Santé</option>
      <option>Finance</option>
      <option>Éducation</option>
      <option>BTP</option>
      <option>RH</option>
      <option>Design</option>
    </select>
    <select className="px-3 py-2 rounded border border-gray-300 dark:bg-gray-900 dark:border-gray-700">
      <option>Type de contrat</option>
      <option>CDI</option>
      <option>CDD</option>
      <option>Stage</option>
      <option>Freelance</option>
      <option>Alternance</option>
    </select>
    <select className="px-3 py-2 rounded border border-gray-300 dark:bg-gray-900 dark:border-gray-700">
      <option>Salaire</option>
      <option>&lt; 30k€</option>
      <option>30-50k€</option>
      <option>50-70k€</option>
      <option>&gt; 70k€</option>
    </select>
    <select className="px-3 py-2 rounded border border-gray-300 dark:bg-gray-900 dark:border-gray-700">
      <option>Télétravail</option>
      <option>Oui</option>
      <option>Non</option>
      <option>Partiel</option>
    </select>
    <button
      type="submit"
      className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
    >
      Filtrer
    </button>
  </form>
);

export default JobFilters;
