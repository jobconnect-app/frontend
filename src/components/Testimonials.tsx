import React from "react";

const Testimonials = () => (
  <section className="w-full max-w-6xl mt-20 px-4 mb-16">
    <h2 className="text-3xl font-bold text-center mb-12">Ils nous font confiance</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
            JD
          </div>
          <div>
            <h4 className="font-semibold">Jean Dupont</h4>
            <p className="text-sm text-gray-500">Développeur web</p>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          "J'ai trouvé mon emploi actuel grâce à JobConnect. Le processus de candidature est simple et efficace."
        </p>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
            ML
          </div>
          <div>
            <h4 className="font-semibold">Marie Laurent</h4>
            <p className="text-sm text-gray-500">Responsable RH</p>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          "JobConnect nous a permis de trouver des candidats qualifiés rapidement. La qualité des CV est exceptionnelle."
        </p>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
            PL
          </div>
          <div>
            <h4 className="font-semibold">Pierre Leroy</h4>
            <p className="text-sm text-gray-500">Designer UX</p>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          "Les modèles de CV sont modernes et personnalisables. J'ai reçu des compliments sur mon CV à plusieurs entretiens."
        </p>
      </div>
    </div>
  </section>
);

export default Testimonials;