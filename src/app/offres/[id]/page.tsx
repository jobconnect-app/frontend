"use client";
import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import CVRecommandeSection from "../../../components/CVRecommandeSection";
import SimilarJobsSection from "../../../components/SimilarJobsSection";
import CandidatureModal from "../../../components/CandidatureModal";

// Pour l'instant, données mockées
const mockJob = {
  title: "Développeur Fullstack JS",
  company: "TechCorp",
  location: "Paris, France",
  salary: "45-55k€",
  tags: ["CDI", "Remote", "React", "Node.js"],
  description: `Nous recherchons un développeur fullstack passionné pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants en React et Node.js, dans un environnement agile et bienveillant.\n\nCompétences requises :\n- React\n- Node.js\n- API REST\n- Travail en équipe\n\nAvantages :\n- Télétravail possible\n- Mutuelle\n- Tickets restaurant`,
};

export default function JobDetailPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const job = mockJob;
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center">
      <Navbar />
      <main className="w-full max-w-3xl px-4 py-10 flex flex-col gap-6">
        <h1 className="text-3xl font-bold mb-2 animate-fadein">{job.title}</h1>
        <div className="flex flex-wrap gap-4 items-center text-gray-500 dark:text-gray-300 text-sm animate-fadein">
          <span>{job.company}</span>
          <span>•</span>
          <span>{job.location}</span>
          <span>•</span>
          <span className="text-blue-600 font-semibold">{job.salary}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2 animate-fadein">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-4 whitespace-pre-line animate-fadein">
          {job.description}
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition self-start animate-fadein"
        >
          Postuler
        </button>
        <CVRecommandeSection />
        <SimilarJobsSection />
        <CandidatureModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </main>
      <Footer />
      {/* Animation fade-in CSS */}
      <style jsx global>{`
        .animate-fadein {
          animation: fadein 0.7s ease;
        }
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
