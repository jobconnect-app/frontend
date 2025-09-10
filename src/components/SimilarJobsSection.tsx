import React from "react";
import JobCard from "./JobCard";

const similarJobs = [
  {
    title: "Développeur Frontend React",
    company: "WebInnov",
    location: "Paris, France",
    salary: "40-50k€",
    tags: ["CDI", "React", "Remote"],
  },
  {
    title: "Développeur Backend Node.js",
    company: "DataSoft",
    location: "Lyon, France",
    salary: "45-55k€",
    tags: ["CDI", "Node.js", "API"],
  },
];

const SimilarJobsSection = () => (
  <section className="w-full mt-12 animate-fadein">
    <h3 className="text-xl font-bold mb-4">Offres similaires</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {similarJobs.map((job, idx) => (
        <JobCard key={idx} {...job} />
      ))}
    </div>
  </section>
);

export default SimilarJobsSection;
