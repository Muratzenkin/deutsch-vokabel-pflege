import React, { useState } from "react";
import vokabelnData from "../data/vokabeln.json";

type Vokabel = {
  wort: string;
  bedeutung: string;
  beispiel: string;
};

export default function VokabelCard() {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  if (vokabelnData.length === 0) {
    return <div>Vokabeln verisi bulunamadı.</div>;
  }

  const current = vokabelnData[index] || { wort: "", bedeutung: "", beispiel: "" };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % vokabelnData.length);
    setShowBack(false);
  };

  const handlePrevious = () => {
    setIndex((prev) => (prev - 1 + vokabelnData.length) % vokabelnData.length);
    setShowBack(false);
  };

  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(current.wort);
      utterance.lang = "de-DE";
      speechSynthesis.speak(utterance);
    } else {
      alert("Bu tarayıcı konuşma sentezini desteklemiyor.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 text-center">
  
        <div className="text-4xl font-semibold text-gray-800 mb-4 min-h-[3rem] transition-all duration-300">
          {showBack ? current.bedeutung : current.wort}
        </div>
  
        <button
          onClick={() => setShowBack(!showBack)}
          className="mb-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 transition rounded-full text-white font-medium shadow"
        >
          Karte {showBack ? "zurück" : "umdrehen"}
        </button>
  
        <p className="italic text-gray-600 mb-6">Beispiel: {current.beispiel}</p>
  
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