"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";
import SearchBar from "../components/SearchBar";
import PopularCategories from "../components/PopularCategories";
import {
  TrustIndicators,
  HowItWorks,
  FeaturedJobs,
  CVProSection,
  Testimonials,
  Newsletter,
} from "../components/sections";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <Navbar />

      <HeroBanner />

      {/* SearchBar */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", marginTop: -24 }}>
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