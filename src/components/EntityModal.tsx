import React, { useState, useEffect } from "react";

export type EntityField = {
  name:     string;
  label:    string;
  type?:    string;
  required?: boolean;
  options?:  string[];
  disabled?: boolean;
};

type EntityModalProps = {
  open:       boolean;
  onClose:    () => void;
  onSubmit:   (data: Record<string, string | number | undefined>) => void;
  fields:     EntityField[];
  initialData?: Record<string, string | number | undefined>;
  title:      string;
  loading?:   boolean;
};

const EntityModal = ({ open, onClose, onSubmit, fields, initialData, title, loading }: EntityModalProps) => {
  const [form, setForm] = useState<Record<string, string | number | undefined>>({});

  useEffect(() => { setForm(initialData || {}); }, [initialData, open]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        {/* Header */}
        <div style={{
          display:       "flex",
          justifyContent:"space-between",
          alignItems:    "center",
          marginBottom:  24,
        }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize:   18,
            fontWeight: 700,
            color:      "var(--text-primary)",
          }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background:   "var(--bg-glass)",
              border:       "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-sm)",
              width:        30,
              height:       30,
              display:      "flex",
              alignItems:   "center",
              justifyContent: "center",
              cursor:       "pointer",
              color:        "var(--text-muted)",
              fontSize:     14,
              transition:   "all 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
              (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
              (e.currentTarget as HTMLElement).style.background = "var(--bg-glass)";
            }}
          >✕</button>
        </div>

        {/* Divider */}
        <div className="divider" style={{ marginBottom: 24 }} />

        {/* Form */}
        <form
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
          onSubmit={e => { e.preventDefault(); onSubmit(form); onClose(); }}
        >
          {fields.map(field => {
            if (field.type === "hidden") return null;
            return (
              <div key={field.name}>
                <label style={{
                  display:    "block",
                  fontSize:   12,
                  fontWeight: 600,
                  color:      "var(--text-muted)",
                  marginBottom: 6,
                  fontFamily: "var(--font-display)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}>
                  {field.label}
                  {field.required && <span style={{ color: "var(--accent-primary)", marginLeft: 4 }}>*</span>}
                </label>

                {field.options ? (
                  <select
                    className="input-field"
                    value={form[field.name] || ""}
                    onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))}
                    required={field.required}
                    disabled={field.disabled}
                    style={{ opacity: field.disabled ? 0.6 : 1, cursor: field.disabled ? "not-allowed" : "auto" }}
                  >
                    <option value="" disabled>Sélectionner {field.label.toLowerCase()}</option>
                    {field.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    placeholder={`Entrer ${field.label.toLowerCase()}`}
                    className="input-field"
                    value={form[field.name] || ""}
                    onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))}
                    required={field.required}
                    disabled={field.disabled}
                    style={{ opacity: field.disabled ? 0.6 : 1, cursor: field.disabled ? "not-allowed" : "auto" }}
                  />
                )}
              </div>
            );
          })}

          <div style={{ marginTop: 8, display: "flex", gap: 10 }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ flex: 1, justifyContent: "center" }}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ flex: 1, justifyContent: "center", opacity: loading ? 0.6 : 1 }}
            >
              {loading ? "..." : (initialData && Object.keys(initialData).length ? "Modifier" : "Ajouter")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntityModal;