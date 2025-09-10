import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center">
      <Navbar />
      <main className="w-full max-w-2xl px-4 py-10 flex flex-col gap-6">
        <h1 className="text-3xl font-bold mb-4">Foire aux questions</h1>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">
            Comment postuler à une offre ?
          </h2>
          <p>
            Il suffit de cliquer sur le bouton "Postuler" sur la page de
            l’offre. Vous pouvez envoyer votre candidature directement via le
            formulaire intégré.
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">
            Comment créer un CV professionnel ?
          </h2>
          <p>
            Rendez-vous sur la page "CV" pour découvrir nos modèles et demander
            un devis personnalisé.
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">
            Comment contacter l’équipe ?
          </h2>
          <p>
            Utilisez le formulaire de la page "Contact" pour toute question ou
            demande d’assistance.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
