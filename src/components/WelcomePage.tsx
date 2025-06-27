import NavLinks from "./NavLinks";
import { FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface WelcomePageProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WelcomePage({ setIsAuthenticated }: WelcomePageProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
localStorage.removeItem("email");
localStorage.removeItem("password");
sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e1e3f] to-[#2c2c54] px-4">
      <div className="bg-[#1c1c2e] text-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">PflegeVokabel</h1>
        <p className="text-center text-sm md:text-base text-gray-300 mb-6">
          Willkommen! Diese Anwendung hilft Ihnen, wichtige medizinische Vokabeln für die Pflegepraxis auf Deutsch zu lernen.
        </p>

        <div className="space-y-4">
          <NavLinks />
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
        >
          Abmelden
        </button>

        <p className="text-center text-xs text-gray-500 mt-6 flex items-center justify-center gap-2">
          <FiMail /> 2goecebe@gmail.com
        </p>
      </div>
    </div>
  );
}
