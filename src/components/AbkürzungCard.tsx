import abkuerzungenData from "../data/medizinische_abkuerzungen.json";
//           >
import { useState } from "react";

export default function AbkuerzungCard() {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  if (abkuerzungenData.length === 0) {
    return <div>Keine Abkürzungen gefunden.</div>;
  }

  const current = abkuerzungenData[index] || {
    abkürzung: "",
    bedeutung: "",
    erklaerung: ""
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % abkuerzungenData.length);
    setShowBack(false);
  };

  const handlePrevious = () => {
    setIndex((prev) => (prev - 1 + abkuerzungenData.length) % abkuerzungenData.length);
    setShowBack(false);
  };

  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(current.abkürzung);
      utterance.lang = "de-DE";
      speechSynthesis.speak(utterance);
    } else {
      alert("Dein Browser unterstützt keine Sprachausgabe.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 text-center">
        <div className="text-4xl font-semibold text-gray-800 mb-4 min-h-[3rem] transition-all duration-300">
          {showBack
            ? <>
                <div className="text-xl text-blue-800 font-bold mb-2">{current.bedeutung}</div>
                <div className="text-gray-700">{current.erklaerung}</div>
              </>
            : current.abkürzung}
        </div>

        <button
          onClick={() => setShowBack(!showBack)}
          className="mb-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 transition rounded-full text-white font-medium shadow"
        >
          Karte {showBack ? "zurück" : "umdrehen"}
        </button>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleSpeak}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-full text-white shadow font-semibold"
          >
            🔊 Anhören
          </button>
          <button
            onClick={handlePrevious}
            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded-full text-white shadow font-semibold"
          >
            ⬅️ Geri
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-full text-white shadow font-semibold"
          >
            ➡️ Nächste
          </button>
        </div>
      </div>
    </div>
  );
}
