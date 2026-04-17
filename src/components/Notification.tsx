import React, { useEffect } from "react";

type NotificationProps = {
  message: string;
  type?:   "success" | "error" | "info";
  onClose?: () => void;
};

const configs = {
  success: { icon: "✓", color: "var(--accent-primary)",  bg: "var(--accent-primary-dim)",  border: "var(--border-accent)" },
  error:   { icon: "✕", color: "var(--accent-red)",      bg: "rgba(248,113,113,0.1)",       border: "rgba(248,113,113,0.25)" },
  info:    { icon: "i", color: "var(--accent-blue)",     bg: "var(--accent-blue-dim)",      border: "rgba(59,158,255,0.25)" },
};

const Notification = ({ message, type = "info", onClose }: NotificationProps) => {
  const cfg = configs[type];

  useEffect(() => {
    if (!onClose) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position:     "fixed",
        top:          24,
        left:         "50%",
        transform:    "translateX(-50%)",
        zIndex:       9999,
        display:      "flex",
        alignItems:   "center",
        gap:          12,
        padding:      "12px 18px 12px 14px",
        background:   "var(--bg-elevated)",
        border:       `1px solid ${cfg.border}`,
        borderRadius: "var(--radius-lg)",
        backdropFilter: "blur(16px)",
        boxShadow:    "0 8px 32px rgba(0,0,0,0.4)",
        maxWidth:     420,
        width:        "calc(100% - 40px)",
        animation:    "slide-in-right 0.3s var(--ease-smooth)",
      }}
    >
      {/* Icon */}
      <div style={{
        width:          28,
        height:         28,
        borderRadius:   "50%",
        background:     cfg.bg,
        border:         `1px solid ${cfg.border}`,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        fontSize:       12,
        fontWeight:     700,
        color:          cfg.color,
        flexShrink:     0,
      }}>
        {cfg.icon}
      </div>

      <span style={{
        flex:       1,
        fontSize:   14,
        color:      "var(--text-primary)",
        lineHeight: 1.5,
      }}>
        {message}
      </span>

      {onClose && (
        <button
          onClick={onClose}
          style={{
            background:   "transparent",
            border:       "none",
            cursor:       "pointer",
            color:        "var(--text-muted)",
            fontSize:     16,
            padding:      "2px 4px",
            lineHeight:   1,
            flexShrink:   0,
            borderRadius: "var(--radius-sm)",
            transition:   "color 0.15s",
          }}
          onMouseEnter={e => ((e.target as HTMLElement).style.color = "var(--text-primary)")}
          onMouseLeave={e => ((e.target as HTMLElement).style.color = "var(--text-muted)")}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Notification;