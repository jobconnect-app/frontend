'use client';

import React, { useState, useEffect } from "react";
import HeroBanner from "../components/HeroBanner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import PopularCategories from "../components/PopularCategories";
import CVProSection from "../components/CVProSection";
import HowItWorks from "../components/HowItWorks";
import FeaturedJobs from "../components/FeaturedJobs";
import Testimonials from "../components/Testimonials";
import TrustIndicators from "../components/TrustIndicators";
import Newsletter from "../components/Newsletter";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center overflow-x-hidden">
      <Navbar/>
      
      <HeroBanner />
      
      <div className="w-full max-w-4xl mt-[-2rem] z-10 px-4">
        <SearchBar />
      </div>
      
      <TrustIndicators />
      
      <PopularCategories />
      
      <HowItWorks />
      
      <FeaturedJobs />
      
      <CVProSection />
      
      <Testimonials />
      
      <Newsletter />
      
      <Footer />
    </div>
  );
}