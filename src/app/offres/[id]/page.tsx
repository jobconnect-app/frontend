"use client";
import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import CVRecommandeSection from "../../../components/CVRecommandeSection";
import SimilarJobsSection from "../../../components/SimilarJobsSection";
import CandidatureModal from "../../../components/CandidatureModal";
import { Briefcase, MapPin, Banknote, Calendar, ChevronLeft, Share2 } from "lucide-react";
import Link from "next/link";

// Données mockées (à remplacer par un fetch via params.id plus tard)
const mockJob = {
  title: "Développeur Fullstack JS",
  company: "TechCorp",
  location: "Paris, France",
  salary: "45-55k€",
  type: "CDI",
  postedAt: "Il y a 2 jours",
  tags: ["React", "Node.js", "TypeScript", "Remote Friendly"],
  description: `Nous recherchons un développeur fullstack passionné pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants en React et Node.js, dans un environnement agile et bienveillant.\n\nCompétences requises :\n- React & Node.js expert\n- Maîtrise des API REST & GraphQL\n- Esprit d'équipe et rigueur\n\nAvantages :\n- Télétravail flexible\n- Mutuelle premium\n- Budget formation annuel`,
};

export default function JobDetailPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const job = mockJob;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <Navbar />
      
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px" }}>
        
        {/* Retour et Actions */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px" }}>
          <Link href="/offres" style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)", fontSize: "14px" }}>
            <ChevronLeft size={18} /> Retour aux offres
          </Link>
          <button className="btn-ghost">
            <Share2 size={18} /> Partager
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "32px", alignItems: "start" }}>
          
          {/* Colonne Gauche : Détails */}
          <div className="animate-fade-up">
            <div style={{ marginBottom: "24px" }}>
              <div className="badge badge-blue" style={{ marginBottom: "16px" }}>{job.type}</div>
              <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", marginBottom: "16px" }}>{job.title}</h1>
              
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", color: "var(--text-secondary)", fontSize: "15px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><Briefcase size={18} color="var(--accent-primary)" /> {job.company}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><MapPin size={18} color="var(--accent-primary)" /> {job.location}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><Banknote size={18} color="var(--accent-primary)" /> {job.salary}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><Calendar size={18} color="var(--accent-primary)" /> {job.postedAt}</span>
              </div>
            </div>

            <div className="glass-card" style={{ padding: "32px", marginBottom: "32px" }}>
              <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>Description du poste</h2>
              <div style={{ 
                whiteSpace: "pre-line", 
                color: "var(--text-secondary)", 
                lineHeight: "1.8",
                fontSize: "16px"
              }}>
                {job.description}
              </div>

              <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {job.tags.map(tag => (
                  <span key={tag} className="badge badge-gray">{tag}</span>
                ))}
              </div>
            </div>

            <CVRecommandeSection />
            <SimilarJobsSection />
          </div>

          {/* Colonne Droite : Sidebar Action */}
          <aside className="animate-fade-up delay-100" style={{ position: "sticky", top: "100px" }}>
            <div className="glass-card" style={{ padding: "24px", textAlign: "center", border: "1px solid var(--border-accent)" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "16px" }}>Prêt à postuler ?</h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px" }}>
                Répondez à cette offre en quelques clics. Votre profil sera transmis directement aux recruteurs.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", padding: "14px" }}
              >
                Postuler maintenant
              </button>
              
              <div style={{ marginTop: "20px", fontSize: "12px", color: "var(--text-muted)" }}>
                Réponse moyenne : 48h
              </div>
            </div>
          </aside>
        </div>

        <CandidatureModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </main>
      <Footer />
    </div>
  );
}