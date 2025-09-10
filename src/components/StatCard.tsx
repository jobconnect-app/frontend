import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface StatCardProps {
  icon: IconDefinition;
  value: string | number;
  label: React.ReactNode;
  iconColor: string;
  className?: string;
  loading?: boolean;
}

const StatCard = ({
  icon,
  value,
  label,
  iconColor,
  className = "",
  loading = false,
}: StatCardProps) => (
  <div
    className={`flex items-center gap-3 p-4 rounded-lg shadow bg-[#1e293b] border border-gray-700 transition-all duration-200 transform hover:scale-105 hover:shadow-2xl hover:border-blue-500 cursor-pointer ${className}`}
    style={{ willChange: "transform" }}
  >
    {loading ? (
      <span className="w-7 h-7 rounded-full bg-gray-700 animate-pulse block" />
    ) : (
      <span className={`text-xl ${iconColor}`}>
        <FontAwesomeIcon icon={icon} />
      </span>
    )}
    <div className="flex flex-col gap-1">
      {loading ? (
        <div className="w-16 h-5 bg-gray-700 rounded animate-pulse mb-1" />
      ) : (
        <div className="text-xl font-bold text-white leading-tight">
          {value}
        </div>
      )}
      {loading ? (
        <div className="w-20 h-3 bg-gray-700 rounded animate-pulse" />
      ) : (
        <div className="text-xs font-medium text-gray-300 leading-tight">
          {label}
        </div>
      )}
    </div>
  </div>
);

export default StatCard;
