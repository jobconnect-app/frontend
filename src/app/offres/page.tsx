import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import JobFilters from "../../components/JobFilters";
import JobList from "../../components/JobList";

export default function OffresPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center">
      <Navbar />
      <main className="w-full max-w-6xl px-4 py-10 flex flex-col gap-8">
        <h1 className="text-3xl font-bold mb-4">Offres d'emploi</h1>
        <JobFilters />
        <JobList />
      </main>
      <Footer />
    </div>
  );
}
