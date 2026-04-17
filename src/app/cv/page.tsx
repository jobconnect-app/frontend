"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import Image from "next/image";
import { Award, Headphones, ChevronRight } from "lucide-react";

export default function CVPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-base)",
        color: "var(--text-primary)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          padding: "60px 24px",
        }}
      >
        {/* Header Section */}
        <div style={{ marginBottom: "48px" }}>
          <div className="section-label">Service Expert</div>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              marginBottom: "16px",
              fontFamily: "var(--font-display)",
            }}
          >
            Service CV <span className="text-gradient">Professionnel</span>
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "18px",
              lineHeight: "1.7",
              maxWidth: "600px",
            }}
          >
            Boostez votre carrière avec un CV moderne, parfaitement adapté aux
            algorithmes de recrutement et à votre secteur d’activité.
          </p>
        </div>

        {/* Modèles de CV */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "56px",
          }}
        >
          {[
            {
              title: "Modèle Moderne",
              img: "/cv-template-1.png",
              tag: "Populaire",
            },
            {
              title: "Modèle Classique",
              img: "/cv-template-2.png",
              tag: "Exécutif",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="glass-card glass-card-hover"
              style={{ padding: "24px", textAlign: "center" }}
            >
              <div
                style={{
                  background: "var(--bg-surface)",
                  borderRadius: "var(--radius-md)",
                  padding: "20px",
                  marginBottom: "20px",
                  border: "1px solid var(--border-subtle)",
                  position: "relative", // Requis pour les images Next.js
                  height: "280px", // On fixe une hauteur au conteneur
                }}
              >
                {/* 2. Utilisation de <Image /> au lieu de <img> */}
                <Image
                  src={item.img}
                  alt={item.title}
                  fill // Remplit le conteneur parent
                  style={{
                    objectFit: "contain",
                    borderRadius: "4px",
                    padding: "10px",
                  }}
                />
              </div>
              <div
                className="badge badge-green"
                style={{ marginBottom: "12px" }}
              >
                {item.tag}
              </div>
              <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Tarifs et Services */}
        <div
          className="glass-card"
          style={{
            padding: "40px",
            borderLeft: "4px solid var(--accent-primary)",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Award color="var(--accent-primary)" /> Tarifs & Accompagnement
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "32px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid var(--border-subtle)",
                  paddingBottom: "8px",
                }}
              >
                <span style={{ color: "var(--text-secondary)" }}>
                  CV Personnalisé
                </span>
                <span
                  style={{ fontWeight: "700", color: "var(--accent-primary)" }}
                >
                  49€
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid var(--border-subtle)",
                  paddingBottom: "8px",
                }}
              >
                <span style={{ color: "var(--text-secondary)" }}>
                  Pack CV + Lettre
                </span>
                <span
                  style={{ fontWeight: "700", color: "var(--accent-primary)" }}
                >
                  69€
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid var(--border-subtle)",
                  paddingBottom: "8px",
                }}
              >
                <span style={{ color: "var(--text-secondary)" }}>
                  Coaching Entretien
                </span>
                <span
                  style={{ fontWeight: "700", color: "var(--accent-primary)" }}
                >
                  39€/h
                </span>
              </div>
            </div>

            <div
              style={{
                background: "var(--bg-glass)",
                padding: "20px",
                borderRadius: "var(--radius-md)",
                fontSize: "14px",
                color: "var(--text-secondary)",
              }}
            >
              <p style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                <ChevronRight size={16} color="var(--accent-primary)" />{" "}
                Optimisation mots-clés ATS
              </p>
              <p style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                <ChevronRight size={16} color="var(--accent-primary)" /> Formats
                PDF & Word inclus
              </p>
              <p style={{ display: "flex", gap: "8px" }}>
                <ChevronRight size={16} color="var(--accent-primary)" />{" "}
                Révision illimitée (7 jours)
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <Link href="/contact" className="btn-primary">
              Demander un devis personnalisé
            </Link>
            <button className="btn-secondary">
              <Headphones size={18} /> Parler à un expert
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
