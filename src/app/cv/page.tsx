import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CVPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center">
      <Navbar />
      <main className="w-full max-w-3xl px-4 py-10 flex flex-col gap-8">
        <h1 className="text-3xl font-bold mb-4">Service CV Professionnel</h1>
        <p className="mb-4">
          Boostez votre carrière avec un CV moderne, adapté à votre secteur et à
          vos ambitions. Découvrez nos modèles et bénéficiez d’un accompagnement
          personnalisé.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center">
            <img
              src="/cv-template.png"
              alt="Modèle CV 1"
              className="w-32 h-40 object-contain mb-2"
            />
            <span className="font-semibold">Modèle Moderne</span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center">
            <img
              src="/cv-template.png"
              alt="Modèle CV 2"
              className="w-32 h-40 object-contain mb-2"
            />
            <span className="font-semibold">Modèle Classique</span>
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 mt-6">
          <h2 className="text-xl font-bold mb-2">Tarifs</h2>
          <ul className="list-disc list-inside">
            <li>CV personnalisé : 49€</li>
            <li>Pack CV + Lettre de motivation : 69€</li>
            <li>Coaching entretien : 39€/h</li>
          </ul>
        </div>
        <a
          href="/contact"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition self-start"
        >
          Demander un devis
        </a>
      </main>
      <Footer />
    </div>
  );
}
