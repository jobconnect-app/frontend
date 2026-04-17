"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import JobFilters from "../../components/JobFilters";
import JobList from "../../components/JobList";
import { Search } from "lucide-react";

export default function OffresPage() {
  return (
    <div>
    <div style={{ 
      minHeight: "100vh", 
      background: "var(--bg-base)", 
      color: "var(--text-primary)",
      display: "flex",
      flexDirection: "column"
    }}>
      <Navbar />

      <main style={{ 
        flex: 1,
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "60px 24px"
      }}>
        {/* Header de la page */}
        <div style={{ marginBottom: "48px" }}>
          <div className="section-label">Opportunités</div>
          <h1 style={{ 
            fontSize: "clamp(32px, 5vw, 48px)", 
            marginBottom: "16px",
            fontFamily: "var(--font-display)"
          }}>
            Explorez les <span className="text-gradient">offres d&apos;emploi</span>
          </h1>
          <p style={{ 
            color: "var(--text-secondary)", 
            fontSize: "18px", 
            maxWidth: "600px",
            fontWeight: 300 
          }}>
            Trouvez le poste qui correspond à vos ambitions parmi nos 10K+ opportunités actives.
          </p>
        </div>

        {/* Section Filtres avec effet Glassmorphism */}
        <div className="glass-card" style={{ 
          padding: "24px", 
          marginBottom: "32px",
          border: "1px solid var(--border-strong)"
        }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "12px", 
            marginBottom: "20px",
            color: "var(--accent-primary)"
          }}>
            <Search size={20} />
            <span style={{ fontWeight: 600, fontFamily: "var(--font-display)", fontSize: "14px", uppercase: "true" }}>
              Affiner votre recherche
            </span>
          </div>
          <JobFilters />
        </div>

        {/* Liste des jobs et Statistiques rapides */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 300px", 
          gap: "32px",
          alignItems: "start" 
        }}>
          {/* Colonne principale : Liste */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <JobList />
          </div>

          {/* Colonne latérale : Widgets / Infos */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Widget Alerte Emploi */}
            <div className="glass-card" style={{ padding: "24px", background: "var(--accent-primary-dim)" }}>
              <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Alerte Emploi</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px" }}>
                Recevez les nouvelles offres directement dans votre boîte mail.
              </p>
              <input 
                type="email" 
                placeholder="votre@email.com" 
                className="input-field" 
                style={{ marginBottom: "12px" }}
              />
              <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                S&apos;abonner
              </button>
            </div>

            {/* Statistiques du marché */}
            <div className="glass-card" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "16px", marginBottom: "16px" }}>Marché actuel</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Offres Full-time</span>
                  <span className="badge badge-blue">8.4K</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Télétravail</span>
                  <span className="badge badge-purple">2.1K</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Nouveautés (24h)</span>
                  <span className="badge badge-green">+142</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>


    </div>
    <Footer />
    </div>
  );
}