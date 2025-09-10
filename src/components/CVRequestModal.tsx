import React, { useState, useEffect } from "react";

type CVRequestModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; status: string }) => void;
  initialData?: { name: string; email: string; status: string };
};

const CVRequestModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: CVRequestModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("En attente");

  useEffect(() => {
    setName(initialData?.name || "");
    setEmail(initialData?.email || "");
    setStatus(initialData?.status || "En attente");
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
          {initialData
            ? "Modifier la demande de CV"
            : "Ajouter une demande de CV"}
        </h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ name, email, status });
            onClose();
          }}
        >
          <input
            type="text"
            placeholder="Nom"
            className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <select
            className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>En attente</option>
            <option>Traité</option>
          </select>
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

export default CVRequestModal;
