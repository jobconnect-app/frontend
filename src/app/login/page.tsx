"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import React, { useState } from "react";
import { api } from "../../lib/api";
import { LoginResponse } from "../../lib/types";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isLogin) {
        const res = await api.post<LoginResponse>("/auth/login", {
          email,
          motDePasse: password,
        });
        login(res.data.access_token, { email, role: "ADMIN" }); // ou récupérer le vrai rôle depuis le backend si possible
        localStorage.setItem("refresh_token", res.data.refresh_token);
        window.location.href = "/admin/dashboard";
      } else {
        await api.post("/auth/register", {
          nom,
          prenom,
          email,
          motDePasse: password,
        });
        // Connexion automatique après inscription
        const res = await api.post<LoginResponse>("/auth/login", {
          email,
          motDePasse: password,
        });
        login(res.data.access_token, { email, role: "ADMIN" }); // ou récupérer le vrai rôle depuis le backend si possible
        localStorage.setItem("refresh_token", res.data.refresh_token);
        window.location.href = "/admin/dashboard";
      }
    } catch {
      setError(
        isLogin
          ? "Identifiants invalides ou erreur serveur."
          : "Erreur lors de l'inscription ou email déjà utilisé.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center">
      <Navbar />
      <main className="w-full max-w-md px-4 py-10 flex flex-col gap-6">
        <h1 className="text-3xl font-bold mb-4">
          {isLogin ? "Connexion" : "Inscription"}
        </h1>
        <form
          className="flex flex-col gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow"
          onSubmit={handleSubmit}
        >
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Nom"
                className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-900 dark:border-gray-700"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
              <input
                type="text"
                placeholder="Prénom"
                className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-900 dark:border-gray-700"
                required
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-900 dark:border-gray-700"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-900 dark:border-gray-700"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading
              ? isLogin
                ? "Connexion..."
                : "Inscription..."
              : isLogin
                ? "Se connecter"
                : "S’inscrire"}
          </button>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 hover:underline self-center"
        >
          {isLogin ? "Créer un compte" : "Déjà inscrit ? Connexion"}
        </button>
      </main>
      <Footer />
    </div>
  );
}
