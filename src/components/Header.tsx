import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="flex justify-center space-x-4 bg-white shadow p-4 sticky top-0 z-10">
      <Link to="/" className="px-4 py-2 rounded font-medium bg-blue-100 text-blue-700">
        🧠 Vokabelkarten
      </Link>
      <Link to="/hangman" className="px-4 py-2 rounded font-medium bg-blue-100 text-blue-700">
        🎯 Hangman
      </Link>
      <Link to="/matching" className="px-4 py-2 rounded font-medium bg-blue-100 text-blue-700">
        🎴 Matching Game
      </Link>
      <Link to="/abkuerzung" className="px-4 py-2 rounded font-medium bg-blue-100 text-blue-700">
        🩺 Abkürzungen
      </Link>
      <Link to="/mandarinen" className="px-4 py-2 rounded font-medium bg-blue-100 text-blue-700">
        🩺 Mandarinen
      </Link>
      <Link to="/language" className="px-4 py-2 rounded font-medium bg-blue-100 text-blue-700">
        🩺 Language
      </Link>
    </nav>
  );
}