import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiEye,
  FiEyeOff,
  FiBookOpen,
  FiCheckCircle
} from "react-icons/fi";
import hiimg from "../assets/hi.jpg";

interface AuthPageProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthPage: React.FC<AuthPageProps> = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // sadece register için kullanılır
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      navigate("/welcome");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:3001/api/auth/login", {
          username,
          password,
        });
        const token = res.data.token;
        if (rememberMe) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }
        setIsAuthenticated(true);
        navigate("/welcome");
      } else {
        const res = await axios.post("http://localhost:3001/api/auth/register", {
          username,
          email,
          password,
        });
        alert(res.data.message);
        setIsLogin(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Fehler vom Server.");
      } else {
        alert("Unerwarteter Fehler.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* SOL PANEL */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex flex-col justify-center items-center p-10 relative overflow-hidden">
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-2 mb-4">
            <FiBookOpen className="animate-bounce" />
            Willkommen beim Sprachkurs 🎓
          </h1>
          <p className="text-lg max-w-md mb-4">
            Lerne Sprachen mit interaktiven Karten, Spielen und Übungen. Dein Weg zur Sprachkompetenz beginnt hier!
          </p>
          <ul className="text-left space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FiCheckCircle className="text-green-300" />
              Interaktive Vokabelkarten
            </li>
            <li className="flex items-center gap-2">
              <FiCheckCircle className="text-green-300" />
              Medizinisches Fachvokabular
            </li>
            <li className="flex items-center gap-2">
              <FiCheckCircle className="text-green-300" />
              Lernen mit Spaß & Quiz
            </li>
          </ul>
          <img
            src={hiimg}
            alt="Sprachen lernen"
            className="w-60 h-60 mt-6 mx-auto hover:scale-105 transition-transform duration-300"
          />
          <p className="mt-4 text-sm italic animate-pulse text-indigo-100">
            Jeden Tag ein neues Wort entdecken ✨
          </p>
        </div>
      </div>

      {/* SAĞ PANEL */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {isLogin ? "Anmelden" : "Registrieren"}
          </h2>

          {/* Username */}
          <input
            type="text"
            placeholder="Benutzername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Email nur wenn registrieren */}
          {!isLogin && (
            <input
              type="email"
              placeholder="E-Mail-Adresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          )}

          {/* Passwort */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md pr-10 focus:ring-2 focus:ring-blue-400"
              required
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
          </div>

          {/* Angemeldet bleiben */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm text-gray-600">Angemeldet bleiben</label>
          </div>

          {/* Buton */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
          >
            {isLogin ? "Anmelden" : "Registrieren"}
          </button>

          <p className="text-center text-sm text-gray-500">
            {isLogin ? "Noch kein Konto?" : "Schon registriert?"}{" "}
            <span
              className="text-indigo-600 cursor-pointer hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Jetzt registrieren" : "Jetzt anmelden"}
            </span>
          </p>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center text-sm text-gray-400">
          <p className="mb-2">Folge uns:</p>
          <div className="flex justify-center gap-4 text-gray-600 text-xl">
            <a href="#"><i className="fab fa-facebook"></i> Facebook</a>
            <a href="#"><i className="fab fa-instagram"></i> Instagram</a>
            <a href="#"><i className="fab fa-linkedin"></i> LinkedIn</a>
          </div>
          <p className="mt-4 text-xs">Kontakt: kontakt@sprachkurs.de</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
