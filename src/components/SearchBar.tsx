import React from "react";

const SearchBar = () => (
  <form
    style={{
      display:      "flex",
      background:   "var(--bg-elevated)",
      border:       "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      overflow:     "hidden",
      boxShadow:    "0 8px 40px rgba(0,0,0,0.4), var(--shadow-glow-primary)",
      transition:   "box-shadow 0.2s, border-color 0.2s",
    }}
    onFocus={e => (e.currentTarget.style.borderColor = "var(--border-accent)")}
    onBlur={e  => (e.currentTarget.style.borderColor = "var(--border-default)")}
  >
    <span style={{
      display:     "flex",
      alignItems:  "center",
      padding:     "0 16px",
      color:       "var(--text-muted)",
      fontSize:    16,
      flexShrink:  0,
    }}>
      🔍
    </span>

    <input
      type="text"
      placeholder="Recherche par métier, entreprise, ville..."
      style={{
        flex:       1,
        padding:    "16px 8px",
        background: "transparent",
        border:     "none",
        outline:    "none",
        color:      "var(--text-primary)",
        fontFamily: "var(--font-body)",
        fontSize:   15,
        minWidth:   0,
      }}
    />

    <div style={{
      width:       1,
      background:  "var(--border-subtle)",
      margin:      "12px 0",
      flexShrink:  0,
    }} />

    <button
      type="submit"
      className="btn-primary"
      style={{
        margin:       6,
        borderRadius: "var(--radius-md)",
        flexShrink:   0,
        fontSize:     14,
        padding:      "10px 24px",
      }}
    >
      Rechercher
    </button>
  </form>
);

export default SearchBar;