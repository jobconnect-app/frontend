import React from "react";
import Link from "next/link";
/* ─── FeaturedJobs ─── */
import JobCard from "../JobCard";
 
const featuredJobs = [
  {
    title:    "Développeur Fullstack JS",
    company:  "TechCorp",
    location: "Paris, France",
    salary:   "45-55k€",
    tags:     ["CDI", "Remote", "React", "Node.js"],
    featured: true,
  },
  {
    title:    "Chef de projet Marketing",
    company:  "MarketPlus",
    location: "Lyon, France",
    salary:   "38-45k€",
    tags:     ["CDI", "Marketing"],
    featured: true,
  },
  {
    title:    "UX/UI Designer",
    company:  "Designify",
    location: "Remote",
    salary:   "40-50k€",
    tags:     ["FREELANCE", "Design"],
    featured: true,
  },
];
 
export const FeaturedJobs = () => (
  <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
      <div>
        <div className="section-label" style={{ marginBottom: 12 }}>Offres à la une</div>
        <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800 }}>
          Opportunités du moment
        </h2>
      </div>
      <Link href="/offres">
        <button className="btn-secondary" style={{ fontSize: 13 }}>
          Voir toutes les offres →
        </button>
      </Link>
    </div>
 
    <div style={{
      display:             "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap:                 16,
    }}>
      {featuredJobs.map((job, i) => (
        <JobCard key={i} {...job} />
      ))}
    </div>
  </section>
);
