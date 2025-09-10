import React from "react";

const CVProSection = () => (
  <section className="w-full max-w-4xl mt-16 px-4 mb-20">
    <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
      <div>
        <h3 className="text-2xl font-bold mb-2">
          Créez un CV professionnel en quelques clics
        </h3>
        <p className="mb-4 max-w-md">
          Découvrez nos modèles de CV modernes, adaptés à tous les secteurs, et
          bénéficiez d’un accompagnement personnalisé pour booster votre
          carrière.
        </p>
        <a
          href="/cv"
          className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-50 transition"
        >
          Voir les modèles de CV
        </a>
      </div>
      <img
        src="/cv-template.png"
        alt="Exemple de CV"
        className="w-48 h-64 object-contain rounded-xl border border-white shadow-md bg-white"
      />
    </div>
  </section>
);

export default CVProSection;
