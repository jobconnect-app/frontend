import React, { useState, useEffect } from "react";

type CategorieModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { nom: string; description?: string }) => void;
  initialData?: { nom: string; description?: string };
};

const CategorieModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: CategorieModalProps) => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setNom(initialData?.nom || "");
    setDescription(initialData?.description || "");
  }, [initialData, open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadein">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fadein">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold"
          aria-label="Fermer"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {initialData ? "Modifier la catégorie" : "Ajouter une catégorie"}
        </h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ nom, description: description || undefined });
            onClose();
          }}
        >
          <input
            type="text"
            placeholder="Nom de la catégorie"
            className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
          <textarea
            placeholder="Description (optionnelle)"
            className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            {initialData ? "Modifier" : "Ajouter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategorieModal;
