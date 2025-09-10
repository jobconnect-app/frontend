import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center">
      <Navbar />
      <main className="w-full max-w-md px-4 py-10 flex flex-col gap-6">
        <h1 className="text-3xl font-bold mb-4">Contact</h1>
        <form className="flex flex-col gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
          <input
            type="text"
            placeholder="Nom"
            className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-900 dark:border-gray-700"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-900 dark:border-gray-700"
            required
          />
          <textarea
            placeholder="Votre message"
            className="px-4 py-2 rounded border border-gray-300 dark:bg-gray-900 dark:border-gray-700 min-h-[80px]"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Envoyer
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
