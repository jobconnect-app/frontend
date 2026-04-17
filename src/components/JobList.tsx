import React from "react";
import JobCard from "./JobCard";
import Link from "next/link";

const jobs = [
  {
    id: "1",
    title: "Développeur Fullstack JS",
    company: "TechCorp",
    location: "Paris, France",
    salary: "45-55k€",
    tags: ["CDI", "Remote", "React"],
    featured: true, // Pour tester le nouveau badge
  },
  {
    id: "2",
    title: "Chef de projet Marketing",
    company: "MarketPlus",
    location: "Lyon, France",
    salary: "38-45k€",
    tags: ["CDI", "Marketing"],
    featured: true,
  },
  {
    id: "3",
    title: "Infirmier(ère) diplômé(e)",
    company: "Clinique Santé+",
    location: "Marseille, France",
    salary: "30-38k€",
    tags: ["CDI", "Santé"],
    featured: false,
  },
  {
    id: "4",
    title: "UX/UI Designer",
    company: "Designify",
    location: "Remote",
    salary: "40-50k€",
    tags: ["FREELANCE", "Design"],
    featured: false,
  },
];

const JobList = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
    {jobs.map((job) => (
      <Link 
        key={job.id} 
        href={`/offres/${job.id}`}
        style={{ textDecoration: 'none', display: 'block', height: '100%' }}
      >
        <JobCard {...job} />
      </Link>
    ))}
  </div>
);

export default JobList;