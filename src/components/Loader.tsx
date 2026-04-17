import React from "react";

const Loader = ({ size = 32, fullPage = false }: { size?: number; fullPage?: boolean }) => {
  const spinner = (
    <div style={{
      width:        size,
      height:       size,
      border:       `2px solid var(--border-default)`,
      borderTop:    `2px solid var(--accent-primary)`,
      borderRadius: "50%",
      animation:    "spin 0.7s linear infinite",
    }} />
  );

  if (fullPage) {
    return (
      <div style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        minHeight:      200,
        gap:            16,
      }}>
        {spinner}
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Chargement...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      {spinner}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
};

export const FullPageLoader = () => (
  <div style={{
    position:       "fixed",
    inset:          0,
    background:     "rgba(7,11,18,0.85)",
    backdropFilter: "blur(8px)",
    zIndex:         9999,
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    flexDirection:  "column",
    gap:            20,
  }}>
    <Loader size={40} />
    <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>Chargement en cours...</p>
  </div>
);

export default Loader;