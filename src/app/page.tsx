import React from "react";
import HeroBanner from "../components/HeroBanner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import PopularCategories from "../components/PopularCategories";
import CVProSection from "../components/CVProSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center">
      <Navbar />
      <HeroBanner />
      <div className="w-full max-w-2xl mt-[-2rem] z-10">
        <SearchBar />
      </div>
      <PopularCategories />
      <CVProSection />
      <Footer />
    </div>
  );
}
