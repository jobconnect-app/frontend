import React, { useState, useEffect } from "react";
import { useCategories } from "../hooks/useCategories";
import { useTags } from "../hooks/useTags";

const typeContratOptions = ["CDI", "CDD", "FREELANCE", "STAGE", "ALTERNANCE"];

export type OffreModalData = {
  titre: string;
  description: string;
  entreprise: string;
  lieu: string;
  salaireMin?: number;
  salaireMax?: number;
  typeContrat: "CDI" | "CDD" | "FREELANCE" | "STAGE" | "ALTERNANCE";
  teletravail: boolean;
  dateExpiration?: string;
  urlPostulation?: string;
  categoryIds?: number[];
  tagIds?: number[];
};

type OffreModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: OffreModalData) => void;
  initialData?: Partial<OffreModalData>;
};

const steps = [
  "Informations principales",
  "Détails optionnels",
  "Catégories & Tags",
];

const OffreModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: OffreModalProps) => {
  const { categories } = useCategories();
  const { tags: allTags } = useTags();
  const [step, setStep] = useState(0);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [lieu, setLieu] = useState("");
  const [salaireMin, setSalaireMin] = useState<number | "">("");
  const [salaireMax, setSalaireMax] = useState<number | "">("");
  const [typeContrat, setTypeContrat] = useState<
    "CDI" | "CDD" | "FREELANCE" | "STAGE" | "ALTERNANCE"
  >("CDI");
  const [teletravail, setTeletravail] = useState(false);
  const [dateExpiration, setDateExpiration] = useState("");
  const [urlPostulation, setUrlPostulation] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});

  useEffect(() => {
    setTitre(initialData?.titre || "");
    setDescription(initialData?.description || "");
    setEntreprise(initialData?.entreprise || "");
    setLieu(initialData?.lieu || "");
    setSalaireMin(initialData?.salaireMin ?? "");
    setSalaireMax(initialData?.salaireMax ?? "");
    setTypeContrat(initialData?.typeContrat || "CDI");
    setTeletravail(initialData?.teletravail ?? false);
    setDateExpiration(
      initialData?.dateExpiration
        ? initialData.dateExpiration.slice(0, 10)
        : "",
    );
    setUrlPostulation(initialData?.urlPostulation || "");
    setSelectedCategories(initialData?.categoryIds || []);
    setSelectedTags(initialData?.tagIds || []);
    setStep(0);
    setTouched({});
  }, [initialData, open]);

  if (!open) return null;

  // Validation par étape
  const validateStep = () => {
    if (step === 0) {
      return (
        !!titre && !!description && !!entreprise && !!lieu && !!typeContrat
      );
    }
    return true;
  };

  const handleNext = () => {
    setTouched({
      titre: true,
      description: true,
      entreprise: true,
      lieu: true,
      typeContrat: true,
    });
    if (validateStep()) setStep((s) => s + 1);
  };
  const handlePrev = () => setStep((s) => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      titre,
      description,
      entreprise,
      lieu,
      salaireMin: salaireMin === "" ? undefined : Number(salaireMin),
      salaireMax: salaireMax === "" ? undefined : Number(salaireMax),
      typeContrat,
      teletravail,
      dateExpiration: dateExpiration
        ? new Date(dateExpiration).toISOString()
        : undefined,
      urlPostulation: urlPostulation || undefined,
      categoryIds: selectedCategories,
      tagIds: selectedTags,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadein">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-lg relative animate-fadein">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold"
          aria-label="Fermer"
        >
          ×
        </button>
        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center gap-1">
              <div
                className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold border-2 ${step === i ? "bg-blue-600 text-white border-blue-600" : "bg-gray-200 text-gray-700 border-gray-300"} transition`}
              >
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className="w-8 h-1 rounded bg-gray-300" />
              )}
            </div>
          ))}
        </div>
        <h2 className="text-xl font-bold mb-4 text-center">{steps[step]}</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {step === 0 && (
            <>
              <input
                type="text"
                placeholder="Titre du poste"
                className={`px-4 py-2 rounded border ${touched.titre && !titre ? "border-red-500" : "border-gray-300"} dark:bg-gray-800 dark:border-gray-700`}
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                required
              />
              <textarea
                placeholder="Description du poste"
                className={`px-4 py-2 rounded border ${touched.description && !description ? "border-red-500" : "border-gray-300"} dark:bg-gray-800 dark:border-gray-700`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Entreprise"
                className={`px-4 py-2 rounded border ${touched.entreprise && !entreprise ? "border-red-500" : "border-gray-300"} dark:bg-gray-800 dark:border-gray-700`}
                value={entreprise}
                onChange={(e) => setEntreprise(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Lieu"
                className={`px-4 py-2 rounded border ${touched.lieu && !lieu ? "border-red-500" : "border-gray-300"} dark:bg-gray-800 dark:border-gray-700`}
                value={lieu}
                onChange={(e) => setLieu(e.target.value)}
                required
              />
              <select
                className={`px-4 py-2 rounded border ${touched.typeContrat && !typeContrat ? "border-red-500" : "border-gray-300"} dark:bg-gray-800 dark:border-gray-700`}
                value={typeContrat}
                onChange={(e) =>
                  setTypeContrat(e.target.value as typeof typeContrat)
                }
                required
              >
                {typeContratOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={teletravail}
                  onChange={(e) => setTeletravail(e.target.checked)}
                />
                Télétravail
              </label>
            </>
          )}
          {step === 1 && (
            <>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Salaire min (optionnel)"
                  className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700 w-1/2"
                  value={salaireMin}
                  onChange={(e) =>
                    setSalaireMin(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  min={0}
                />
                <input
                  type="number"
                  placeholder="Salaire max (optionnel)"
                  className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700 w-1/2"
                  value={salaireMax}
                  onChange={(e) =>
                    setSalaireMax(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  min={0}
                />
              </div>
              <label className="text-sm 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'">
                Date D&apos;expiration
              </label>
              <input
                type="date"
                placeholder="Date D'expiration"
                className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700"
                value={dateExpiration}
                onChange={(e) => setDateExpiration(e.target.value)}
              />
              <input
                type="url"
                placeholder="URL de postulation (optionnel)"
                className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700"
                value={urlPostulation}
                onChange={(e) => setUrlPostulation(e.target.value)}
              />
            </>
          )}
          {step === 2 && (
            <>
              <div>
                <label className="block mb-1 font-medium">Catégories</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      className={`px-3 py-1 rounded-full border text-sm font-semibold transition
                        ${
                          selectedCategories.includes(cat.id)
                            ? "bg-blue-600 text-white border-blue-600 shadow"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                        }
                      `}
                      onClick={() => {
                        setSelectedCategories(
                          selectedCategories.includes(cat.id)
                            ? selectedCategories.filter((id) => id !== cat.id)
                            : [...selectedCategories, cat.id],
                        );
                      }}
                    >
                      {cat.nom}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      type="button"
                      key={tag.id}
                      className={`px-3 py-1 rounded-full border text-sm font-semibold transition
                        ${
                          selectedTags.includes(tag.id)
                            ? "bg-green-600 text-white border-green-600 shadow"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                        }
                      `}
                      onClick={() => {
                        setSelectedTags(
                          selectedTags.includes(tag.id)
                            ? selectedTags.filter((id) => id !== tag.id)
                            : [...selectedTags, tag.id],
                        );
                      }}
                    >
                      {tag.nom}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          <div className="flex justify-between mt-6">
            {step > 0 && (
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                onClick={handlePrev}
              >
                Précédent
              </button>
            )}
            {step < steps.length - 1 && (
              <button
                type="button"
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                onClick={handleNext}
              >
                Suivant
              </button>
            )}
            {step === steps.length - 1 && (
              <button
                type="submit"
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                {initialData ? "Modifier" : "Ajouter"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OffreModal;
