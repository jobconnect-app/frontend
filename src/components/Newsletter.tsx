import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'inscription à la newsletter
    console.log("Email inscrit:", email);
    setEmail("");
  };

  return (
    <section className="w-full max-w-4xl mt-20 px-4 mb-16">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Restez informé des nouvelles offres</h2>
        <p className="mb-6 max-w-md mx-auto">
          Inscrivez-vous à notre newsletter pour recevoir les offres d'emploi qui correspondent à votre profil.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Votre email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;