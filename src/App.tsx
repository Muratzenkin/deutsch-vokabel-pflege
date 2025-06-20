import { useState } from "react";
import HangmanGame from "./components/HangmanGame";
import VokabelCard from "./components/VokabelCard";
import MatchingGame from "./components/MatchingGame";
import AbkuerzungCard from "./components/AbkürzungCard";

export default function App() {
  const [activeTab, setActiveTab] = useState<"karten" | "hangman" | "matching" | "abkuerzung">("karten");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <nav className="flex justify-center space-x-4 bg-white shadow p-4 sticky top-0 z-10">
        <button
          onClick={() => setActiveTab("karten")}
          className={`px-4 py-2 rounded font-medium ${
            activeTab === "karten" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
          }`}
        >
          🧠 Vokabelkarten
        </button>
        <button
          onClick={() => setActiveTab("hangman")}
          className={`px-4 py-2 rounded font-medium ${
            activeTab === "hangman" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
          }`}
        >
          🎯 Hangman
        </button>
        <button
          onClick={() => setActiveTab("matching")}
          className={`px-4 py-2 rounded font-medium ${
            activeTab === "matching" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
          }`}
        >
          🎴 Matching Game
        </button>
        <button
          onClick={() => setActiveTab("abkuerzung")}
          className={`px-4 py-2 rounded font-medium ${
            activeTab === "abkuerzung" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
          }`}
        >
          🩺 Abkürzungen
        </button>
      </nav>

      <main className="py-6 px-4">
        {activeTab === "karten" && <VokabelCard />}
        {activeTab === "hangman" && <HangmanGame />}
        {activeTab === "matching" && <MatchingGame />}
        {activeTab === "abkuerzung" && <AbkuerzungCard />}
      </main>
    </div>
  );
}
