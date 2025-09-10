import React from "react";

const CVRecommandeSection = () => (
  <section className="w-full mt-10 animate-fadein">
    <div className="bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-md">
      <img
        src="/cv-template.png"
        alt="CV recommandé"
        className="w-32 h-40 object-contain rounded-lg border border-white shadow bg-white hidden md:block"
      />
      <div>
        <h3 className="text-xl font-bold mb-2">
          Boostez votre candidature avec un CV professionnel
        </h3>
        <p className="mb-3 max-w-md">
          Un CV moderne et percutant augmente vos chances d&apos;être
          sélectionné. Découvrez nos modèles et conseils personnalisés.
        </p>
        <a
          href="/cv"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Découvrir le service CV Pro
        </a>
      </div>
    </div>
  </section>
);

export default CVRecommandeSection;
