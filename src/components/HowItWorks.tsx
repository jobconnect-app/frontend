import React from "react";

const HowItWorks = () => (
  <section className="w-full max-w-6xl mt-20 px-4 mb-16">
    <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">Créez votre CV</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Utilisez nos modèles professionnels pour créer un CV qui attire l&apos;attention des recruteurs.
        </p>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">Postulez facilement</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Trouvez des offres qui correspondent à votre profil et postulez en quelques clics.
        </p>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">Suivez vos candidatures</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Gardez une trace de toutes vos candidatures et recevez des notifications personnalisées.
        </p>
      </div>
    </div>
  </section>
);

export default HowItWorks;