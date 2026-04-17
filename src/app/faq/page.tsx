"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { HelpCircle, MessageSquare, Search, Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Comment postuler à une offre ?",
    answer: "Il suffit de cliquer sur le bouton \"Postuler\" sur la page de l’offre. Vous pouvez envoyer votre candidature directement via le formulaire intégré en joignant votre CV et une lettre de motivation.",
    category: "Candidature"
  },
  {
    question: "Comment créer un CV professionnel ?",
    answer: "Rendez-vous sur la page \"CV\" pour découvrir nos modèles. Vous pouvez soit utiliser nos outils en ligne, soit demander un accompagnement personnalisé par l'un de nos experts en recrutement.",
    category: "Service CV"
  },
  {
    question: "Le service est-il gratuit pour les candidats ?",
    answer: "L'accès aux offres d'emploi et la postulation sont entièrement gratuits. Seuls nos services premium d'accompagnement et de rédaction de CV personnalisés sont payants.",
    category: "Tarifs"
  },
  {
    question: "Comment contacter l’équipe ?",
    answer: "Utilisez le formulaire de la page \"Contact\" ou notre chat en direct pour toute question technique ou demande d’assistance.",
    category: "Support"
  }
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
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
        maxWidth: "800px",
        margin: "0 auto",
        padding: "80px 24px"
      }}>
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="section-label" style={{ margin: "0 auto 16px" }}>Centre d&apos;aide</div>
          <h1 style={{ 
            fontSize: "clamp(32px, 5vw, 48px)", 
            marginBottom: "16px",
            fontFamily: "var(--font-display)"
          }}>
            Foire aux <span className="text-gradient">questions</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "17px", maxWidth: "500px", margin: "0 auto" }}>
            Tout ce que vous devez savoir sur JobConnect et nos services.
          </p>
        </div>

        {/* Barre de recherche factice (UI) */}
        <div className="glass-card" style={{ 
          display: "flex", 
          alignItems: "center", 
          padding: "12px 20px", 
          gap: "12px",
          marginBottom: "40px",
          border: "1px solid var(--border-strong)"
        }}>
          <Search size={20} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Rechercher une réponse..." 
            style={{ 
              background: "transparent", 
              border: "none", 
              outline: "none", 
              color: "var(--text-primary)",
              flex: 1,
              fontSize: "15px"
            }}
          />
        </div>

        {/* FAQ List (Accordion) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="glass-card glass-card-hover"
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              style={{ 
                padding: "24px", 
                cursor: "pointer",
                border: activeIndex === index ? "1px solid var(--accent-primary)" : "1px solid var(--border-default)",
                transition: "all 0.3s var(--ease-smooth)"
              }}
            >
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                gap: "16px" 
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <HelpCircle size={20} color={activeIndex === index ? "var(--accent-primary)" : "var(--text-muted)"} />
                  <h3 style={{ fontSize: "17px", fontWeight: "600", margin: 0 }}>{faq.question}</h3>
                </div>
                {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
              </div>

              {activeIndex === index && (
                <div style={{ 
                  marginTop: "16px", 
                  paddingTop: "16px", 
                  borderTop: "1px solid var(--border-subtle)",
                  color: "var(--text-secondary)",
                  lineHeight: "1.7",
                  fontSize: "15px",
                  animation: "fade-in 0.4s ease"
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Support Section */}
        <div className="glass-card" style={{ 
          marginTop: "60px", 
          padding: "32px", 
          textAlign: "center",
          background: "var(--accent-primary-dim)",
          border: "1px solid var(--border-accent)"
        }}>
          <MessageSquare size={32} color="var(--accent-primary)" style={{ marginBottom: "16px" }} />
          <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>Vous n&apos;avez pas trouvé votre réponse ?</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "24px", fontSize: "14px" }}>
            Notre équipe de support est disponible du lundi au vendredi pour vous aider.
          </p>
          <a href="/contact" className="btn-primary">
            Contacter le support
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}