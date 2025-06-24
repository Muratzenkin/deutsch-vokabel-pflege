import { useState } from "react";
import { Link } from "react-router-dom";
import vokabelnData from "../data/vokabeln.json";
import { Helmet } from "react-helmet-async";


export default function VokabelCard() {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  if (vokabelnData.length === 0) {
    return <div className="text-center mt-10">Vokabeln verisi bulunamadı.</div>;
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
    <>
    <Helmet>
    <title>Vokabel Card | 2 Nomaden</title>
  </Helmet>
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 px-4 py-6 relative">
      
      {/* Sol üst logo/link */}
      <Link
        to="/"
        className="absolute top-4 left-4 text-indigo-600 font-bold text-xl hover:underline"
      >
PflegeVokabel
</Link>

      {/* Kart */}
      <div className="max-w-xl mx-auto mt-12 bg-white rounded-3xl shadow-2xl p-8 text-center">
        
        {/* Kelime / Anlam */}
        <div className="text-4xl font-bold text-gray-800 mb-4 min-h-[3rem] transition-all duration-300">
          {showBack ? current.bedeutung : current.wort}
        </div>

        {/* Kartı çevir */}
        <button
          onClick={() => setShowBack(!showBack)}
          className="mb-6 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition rounded-full text-white font-medium shadow"
        >
          Karte {showBack ? "zurück" : "umdrehen"}
        </button>

        {/* Örnek cümle */}
        <p className="italic text-gray-600 mb-8">
          Beispiel: {current.beispiel}
        </p>

        {/* Butonlar */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleSpeak}
            className="px-5 py-2 bg-green-400 hover:bg-green-500 rounded-full text-white font-semibold shadow"
          >
            🔊 Anhören
          </button>
          <button
            onClick={handlePrevious}
            className="px-5 py-2 bg-gray-400 hover:bg-gray-500 rounded-full text-white font-semibold shadow"
          >
            ⬅️ Geri
          </button>
          <button
            onClick={handleNext}
            className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold shadow"
          >
            ➡️ Nächste
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
