import React, { useState, useEffect } from "react";

export type EntityField = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  options?: string[]; // pour les select
  disabled?: boolean;
};

type EntityModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, string | number | undefined>) => void;
  fields: EntityField[];
  initialData?: Record<string, string | number | undefined>;
  title: string;
  loading?: boolean;
};

const EntityModal = ({
  open,
  onClose,
  onSubmit,
  fields,
  initialData,
  title,
  loading,
}: EntityModalProps) => {
  const [form, setForm] = useState<Record<string, string | number | undefined>>(
    {},
  );

  useEffect(() => {
    setForm(initialData || {});
  }, [initialData, open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadein">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 md:p-10 w-full max-w-md relative animate-fadein">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold"
          aria-label="Fermer"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
            onClose();
          }}
        >
          {fields.map((field) => {
            const baseClass =
              field.type === "hidden"
                ? ""
                : "px-4 py-3 rounded border border-gray-300 w-full dark:border-gray-700";
            const normalBg = "bg-white dark:bg-gray-800";
            const disabledClass =
              "opacity-80 italic cursor-not-allowed bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
            const finalClass =
              field.type === "hidden"
                ? ""
                : `${baseClass} ${normalBg} ${field.disabled ? disabledClass : "dark:bg-gray-800"} `;

            return (
              <div key={field.name}>
                {field.options ? (
                  <select
                    className={finalClass + " px-4 py-2"}
                    value={form[field.name] || ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, [field.name]: e.target.value }))
                    }
                    required={field.required}
                    disabled={field.disabled}
                  >
                    <option value="" disabled>
                      Sélectionner {field.label.toLowerCase()}
                    </option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    placeholder={field.label}
                    className={finalClass}
                    value={form[field.name] || ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, [field.name]: e.target.value }))
                    }
                    required={field.required}
                    disabled={field.disabled}
                  />
                )}
              </div>
            );
          })}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {initialData ? "Modifier" : "Ajouter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EntityModal;
