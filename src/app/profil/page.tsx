import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ProfilPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center">
      <Navbar />
      <main className="w-full max-w-2xl px-4 py-10 flex flex-col gap-8">
        <h1 className="text-3xl font-bold mb-4">Mon profil</h1>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Favoris</h2>
          <ul className="list-disc list-inside">
            <li>Développeur Fullstack JS chez TechCorp</li>
            <li>Chef de projet Marketing chez MarketPlus</li>
          </ul>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Mes candidatures</h2>
          <ul className="list-disc list-inside">
            <li>Infirmier(ère) diplômé(e) chez Clinique Santé+ (En attente)</li>
            <li>UX/UI Designer chez Designify (Acceptée)</li>
          </ul>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition self-start">
          Modifier mon profil
        </button>
      </main>
      <Footer />
    </div>
  );
}
