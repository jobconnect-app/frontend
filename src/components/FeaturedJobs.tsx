import React from "react";
import JobCard from "./JobCard";

const FeaturedJobs = () => {
  const featuredJobs = [
    {
      title: "Développeur Fullstack JS",
      company: "TechCorp",
      location: "Paris, France",
      salary: "45-55k€",
      tags: ["CDI", "Remote", "React", "Node.js"],
      featured: true
    },
    {
      title: "Chef de projet Marketing",
      company: "MarketPlus",
      location: "Lyon, France",
      salary: "38-45k€",
      tags: ["CDI", "Marketing", "Communication"],
      featured: true
    },
    {
      title: "UX/UI Designer",
      company: "Designify",
      location: "Remote",
      salary: "40-50k€",
      tags: ["Freelance", "Design", "Figma"],
      featured: true
    }
  ];

  return (
    <section className="w-full max-w-6xl mt-20 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Offres à la une</h2>
        <a href="/offres" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
          Voir toutes les offres →
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredJobs.map((job, idx) => (
          <div key={idx} className="relative">
            {job.featured && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                POPULAIRE
              </span>
            )}
            <JobCard {...job} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;