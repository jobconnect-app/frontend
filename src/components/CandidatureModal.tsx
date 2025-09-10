import React, { useRef } from "react";

type CandidatureModalProps = {
  open: boolean;
  onClose: () => void;
};

const CandidatureModal = ({ open, onClose }: CandidatureModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
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
        <h2 className="text-2xl font-bold mb-4">Postuler à cette offre</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nom complet"
            className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700"
            required
          />
          <textarea
            placeholder="Message (optionnel)"
            className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700 min-h-[80px]"
          />
          <div>
            <label className="block mb-1 font-medium">CV (PDF)</label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition"
          >
            Envoyer la candidature
          </button>
        </form>
      </div>
    </div>
  );
};

export default CandidatureModal;
