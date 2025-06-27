import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HangmanGame from "./components/HangmanGame";
import VokabelCard from "./components/VokabelCard";
import MatchingGame from "./components/MatchingGame";
import AbkuerzungCard from "./components/AbkürzungCard";
import LanguagePage from "./components/LanguagePage";
import WelcomePage from "./components/WelcomePage";
import NotFound from "./components/NotFound";
import AuthPage from "./components/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? "/welcome" : "/auth"} />} />
      
      {/* Giriş yapmamışlar için auth sayfası */}
      {!isAuthenticated && (
        <Route path="/auth" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
      )}

      {/* Korumalı rotalar */}
      <Route
        path="/welcome"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <WelcomePage setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />

      {/* Diğer korunan oyun rotaları */}
      <Route
        path="/karten"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <VokabelCard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hangman"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <HangmanGame />
          </ProtectedRoute>
        }
      />
      <Route
        path="/matching"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <MatchingGame />
          </ProtectedRoute>
        }
      />
      <Route
        path="/abkuerzung"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AbkuerzungCard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/language"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <LanguagePage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}