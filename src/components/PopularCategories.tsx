import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptopCode,
  faBullhorn,
  faHeartbeat,
  faChartLine,
  faGraduationCap,
  faHardHat,
  faUserFriends,
  faPaintBrush,
} from "@fortawesome/free-solid-svg-icons";

const categories = [
  {
    name: "Tech",
    color: "bg-blue-100 text-blue-800",
    icon: <FontAwesomeIcon icon={faLaptopCode} className="w-5 h-5 mr-2" />,
  },
  {
    name: "Marketing",
    color: "bg-green-100 text-green-800",
    icon: <FontAwesomeIcon icon={faBullhorn} className="w-5 h-5 mr-2" />,
  },
  {
    name: "Santé",
    color: "bg-pink-100 text-pink-800",
    icon: <FontAwesomeIcon icon={faHeartbeat} className="w-5 h-5 mr-2" />,
  },
  {
    name: "Finance",
    color: "bg-yellow-100 text-yellow-800",
    icon: <FontAwesomeIcon icon={faChartLine} className="w-5 h-5 mr-2" />,
  },
  {
    name: "Éducation",
    color: "bg-purple-100 text-purple-800",
    icon: <FontAwesomeIcon icon={faGraduationCap} className="w-5 h-5 mr-2" />,
  },
  {
    name: "BTP",
    color: "bg-orange-100 text-orange-800",
    icon: <FontAwesomeIcon icon={faHardHat} className="w-5 h-5 mr-2" />,
  },
  {
    name: "RH",
    color: "bg-teal-100 text-teal-800",
    icon: <FontAwesomeIcon icon={faUserFriends} className="w-5 h-5 mr-2" />,
  },
  {
    name: "Design",
    color: "bg-red-100 text-red-800",
    icon: <FontAwesomeIcon icon={faPaintBrush} className="w-5 h-5 mr-2" />,
  },
];

const PopularCategories = () => (
  <section className="w-full max-w-5xl mt-12 px-4">
    <h2 className="text-2xl font-bold mb-6">Catégories populaires</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((cat) => (
        <a
          key={cat.name}
          href="#"
          className={`rounded-lg p-4 font-semibold flex items-center justify-center shadow hover:scale-105 hover:shadow-lg transition cursor-pointer ${cat.color}`}
        >
          {cat.icon}
          {cat.name}
        </a>
      ))}
    </div>
  </section>
);

export default PopularCategories;
