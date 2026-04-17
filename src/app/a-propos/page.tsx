"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center">
      <Navbar />
      <main className="w-full max-w-2xl px-4 py-10 flex flex-col gap-6">
        <h1 className="text-3xl font-bold mb-4">À propos de JobConnect</h1>
        <p>
          JobConnect est une plateforme dédiée à la mise en relation entre
          chercheurs d’emploi et recruteurs, avec un service de création de CV
          professionnels. Notre mission : faciliter l’accès à l’emploi et
          valoriser chaque parcours.
        </p>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Notre équipe</h2>
          <ul className="list-disc list-inside">
            <li>Développeurs passionnés</li>
            <li>Experts RH</li>
            <li>Designers UX/UI</li>
          </ul>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Nos valeurs</h2>
          <ul className="list-disc list-inside">
            <li>Accessibilité</li>
            <li>Innovation</li>
            <li>Transparence</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
