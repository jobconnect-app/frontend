import React from "react";

const TrustIndicators = () => (
  <section className="w-full max-w-6xl mt-16 px-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-b border-gray-200 dark:border-gray-700">
      <div className="text-center">
        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">10K+</div>
        <div className="text-gray-600 dark:text-gray-300">Offres d&apos;emploi</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-green-600 dark:text-green-400">5K+</div>
        <div className="text-gray-600 dark:text-gray-300">Entreprises</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">50K+</div>
        <div className="text-gray-600 dark:text-gray-300">Candidats</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">98%</div>
        <div className="text-gray-600 dark:text-gray-300">Satisfaction</div>
      </div>
    </div>
  </section>
);

export default TrustIndicators;