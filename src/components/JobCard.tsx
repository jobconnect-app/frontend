import React from "react";

type JobCardProps = {
  title: string;
  company: string;
  location: string;
  salary: string;
  tags: string[];
};

const JobCard = ({ title, company, location, salary, tags }: JobCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col gap-2 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold">{title}</h2>
      <span className="text-blue-600 font-semibold">{salary}</span>
    </div>
    <div className="text-gray-500 dark:text-gray-300 text-sm flex gap-2">
      <span>{company}</span>
      <span>•</span>
      <span>{location}</span>
    </div>
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
        >
          {tag}
        </span>
      ))}
    </div>
    <a
      href="#"
      className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition self-end"
    >
      Voir l&apos;offre
    </a>
  </div>
);

export default JobCard;
