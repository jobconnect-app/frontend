import React from "react";

const HeroBanner = () => (
  <section className="w-full bg-gradient-to-br from-blue-600 to-green-400 py-16 px-4 flex flex-col items-center text-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">JobConnect</h1>
    <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
      La plateforme moderne pour trouver un emploi et créer un CV professionnel.
    </p>
    <a
      href="/cv"
      className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-50 transition"
    >
      Découvrir le service CV Pro
    </a>
  </section>
);

export default HeroBanner;
