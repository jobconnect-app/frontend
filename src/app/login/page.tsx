"use client";

import React, { useState } from "react";
import Link from "next/link";
import { api } from "../../lib/api";
import { LoginResponse } from "../../lib/types";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const { login }    = useAuth();
  const [isLogin, setIsLogin]   = useState(true);
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom]           = useState("");
  const [prenom, setPrenom]     = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isLogin) {
        const res = await api.post<LoginResponse>("/auth/login", { email, motDePasse: password });
        login(res.data.access_token, { email, role: "ADMIN" });
        localStorage.setItem("refresh_token", res.data.refresh_token);
        window.location.href = "/admin/dashboard";
      } else {
        await api.post("/auth/register", { nom, prenom, email, motDePasse: password });
        const res = await api.post<LoginResponse>("/auth/login", { email, motDePasse: password });
        login(res.data.access_token, { email, role: "ADMIN" });
        localStorage.setItem("refresh_token", res.data.refresh_token);
        window.location.href = "/admin/dashboard";
      }
    } catch {
      setError(isLogin ? "Identifiants invalides ou erreur serveur." : "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight:      "100vh",
      background:     "var(--bg-base)",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      padding:        "24px",
      position:       "relative",
      overflow:       "hidden",
    }}>
      {/* BG glow */}
      <div style={{
        position:   "absolute",
        top:        "30%",
        left:       "50%",
        transform:  "translate(-50%, -50%)",
        width:      600,
        height:     600,
        background: "radial-gradient(circle, rgba(0,229,176,0.07), transparent 60%)",
        pointerEvents: "none",
      }} />

      <div style={{
        position:     "relative",
        zIndex:       1,
        width:        "100%",
        maxWidth:     420,
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/" style={{
            fontFamily:    "var(--font-display)",
            fontWeight:    800,
            fontSize:      24,
            letterSpacing: "-0.03em",
          }}>
            Job<span style={{ color: "var(--accent-primary)" }}>Connect</span>
          </Link>
          <p style={{ marginTop: 8, color: "var(--text-muted)", fontSize: 14 }}>
            {isLogin ? "Bienvenue, connectez-vous à votre compte" : "Créez votre compte gratuitement"}
          </p>
        </div>

        {/* Card */}
        <div className="glass-card" style={{ padding: "36px 32px" }}>
          {/* Tab switcher */}
          <div style={{
            display:      "flex",
            background:   "var(--bg-surface)",
            borderRadius: "var(--radius-md)",
            padding:      4,
            marginBottom: 28,
            gap:          4,
          }}>
            {["Connexion", "Inscription"].map((label, i) => (
              <button
                key={label}
                onClick={() => { setIsLogin(i === 0); setError(null); }}
                style={{
                  flex:         1,
                  padding:      "9px 16px",
                  borderRadius: "var(--radius-sm)",
                  border:       "none",
                  fontFamily:   "var(--font-display)",
                  fontWeight:   600,
                  fontSize:     13,
                  cursor:       "pointer",
                  transition:   "all 0.2s",
                  background:   (isLogin === (i === 0)) ? "var(--bg-elevated)" : "transparent",
                  color:        (isLogin === (i === 0)) ? "var(--text-primary)" : "var(--text-muted)",
                  boxShadow:    (isLogin === (i === 0)) ? "0 1px 4px rgba(0,0,0,0.3)" : "none",
                }}
              >{label}</button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {!isLogin && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input className="input-field" type="text" placeholder="Nom" value={nom}
                  onChange={e => setNom(e.target.value)} required />
                <input className="input-field" type="text" placeholder="Prénom" value={prenom}
                  onChange={e => setPrenom(e.target.value)} required />
              </div>
            )}

            <input
              className="input-field"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <div>
              <input
                className="input-field"
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              {isLogin && (
                <div style={{ textAlign: "right", marginTop: 6 }}>
                  <span style={{ fontSize: 12, color: "var(--accent-primary)", cursor: "pointer" }}>
                    Mot de passe oublié ?
                  </span>
                </div>
              )}
            </div>

            {error && (
              <div style={{
                padding:      "12px 16px",
                background:   "rgba(248,113,113,0.1)",
                border:       "1px solid rgba(248,113,113,0.2)",
                borderRadius: "var(--radius-md)",
                fontSize:     13,
                color:        "var(--accent-red)",
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{
                width:          "100%",
                justifyContent: "center",
                padding:        "12px",
                fontSize:       15,
                marginTop:      4,
                opacity:        loading ? 0.6 : 1,
              }}
            >
              {loading
                ? (isLogin ? "Connexion..." : "Inscription...")
                : (isLogin ? "Se connecter →" : "Créer mon compte →")
              }
            </button>
          </form>

          {/* Divider */}
          <div style={{
            display:     "flex",
            alignItems:  "center",
            gap:         12,
            margin:      "24px 0",
          }}>
            <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>ou continuer avec</span>
            <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
          </div>

          {/* Social logins */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { icon: "G", label: "Google" },
              { icon: "in", label: "LinkedIn" },
            ].map(({ icon, label }) => (
              <button
                key={label}
                className="btn-secondary"
                style={{ justifyContent: "center", fontSize: 13, padding: "10px" }}
              >
                <span style={{ fontWeight: 700 }}>{icon}</span> {label}
              </button>
            ))}
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-muted)", marginTop: 20 }}>
          {isLogin ? "Pas encore de compte ? " : "Déjà inscrit ? "}
          <span
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            style={{ color: "var(--accent-primary)", cursor: "pointer", fontWeight: 500 }}
          >
            {isLogin ? "Inscription gratuite" : "Se connecter"}
          </span>
        </p>
      </div>
    </div>
  );
}
