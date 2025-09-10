import React from "react";
import JobCard from "./JobCard";

const jobs = [
  {
    title: "Développeur Fullstack JS",
    company: "TechCorp",
    location: "Paris, France",
    salary: "45-55k€",
    tags: ["CDI", "Remote", "React", "Node.js"],
  },
  {
    title: "Chef de projet Marketing",
    company: "MarketPlus",
    location: "Lyon, France",
    salary: "38-45k€",
    tags: ["CDI", "Marketing", "Communication"],
  },
  {
    title: "Infirmier(ère) diplômé(e)",
    company: "Clinique Santé+",
    location: "Marseille, France",
    salary: "30-38k€",
    tags: ["CDI", "Santé", "Jour"],
  },
  {
    title: "UX/UI Designer",
    company: "Designify",
    location: "Remote",
    salary: "40-50k€",
    tags: ["Freelance", "Design", "Figma"],
  },
];

const JobList = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    {jobs.map((job, idx) => (
      <JobCard key={idx} {...job} />
    ))}
  </div>
);

export default JobList;
