import { useState } from "react";
import { Link } from "react-router-dom";
import vokabelnData from "../data/vokabeln.json";
import { FiVolume2, FiArrowLeft, FiArrowRight, FiRefreshCw, FiCheck } from "react-icons/fi";

export default function VokabelCard() {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [knownWords, setKnownWords] = useState<string[]>([]); // Bilinen kelimeleri takip etmek için

  if (vokabelnData.length === 0) {
    return <div className="text-center mt-10">Vokabeln verisi bulunamadı.</div>;
  }

  // Filtrelenmiş kelimeler
  const filteredData = vokabelnData.filter((word) => !knownWords.includes(word.wort));
  const current = filteredData[index] || { wort: "", bedeutung: "", beispiel: "" };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % filteredData.length);
    setShowBack(false);
  };

  const handlePrevious = () => {
    setIndex((prev) => (prev - 1 + filteredData.length) % filteredData.length);
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

  const handleMarkAsKnown = () => {
    setKnownWords((prev) => [...prev, current.wort]);
    handleNext(); // Bir sonraki kelimeye geç
  };

  const handleResetKnownWords = () => {
    setKnownWords([]);
    setIndex(0);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 px-4 py-6 relative flex items-center justify-center">
        {/* Sol üst logo/link */}
        <Link
          to="/"
          className="absolute top-4 left-4 text-gray-300 font-bold text-xl hover:underline"
        >
          PflegeVokabel
        </Link>

        {/* Kart */}
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          {/* Kelime / Anlam */}
          <div className="text-4xl font-bold text-gray-800 mb-4 h-16 flex items-center justify-center">
            {showBack ? current.bedeutung : current.wort}
          </div>

          {/* Kartı çevir */}
          <button
            onClick={() => setShowBack(!showBack)}
            className="mb-6 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition rounded-full text-white font-medium shadow flex items-center justify-center gap-2 mx-auto"
          >
            <FiRefreshCw size={20} />
            Karte {showBack ? "zurück" : "umdrehen"}
          </button>

          {/* Örnek cümle */}
          <p className="italic text-gray-600 mb-8">
            <span className="font-semibold text-gray-800">Beispiel:</span> {current.beispiel}
          </p>

          {/* Butonlar */}
          <div className="flex flex-wrap justify-center gap-4 ">
            <button
              onClick={handleSpeak}
              className="cursor-pointer px-5 py-2 bg-green-500 hover:bg-green-600 rounded-full text-white font-semibold shadow flex items-center justify-center gap-2"
            >
              <FiVolume2 size={24} />
              Anhören
            </button>
            <button
              onClick={handlePrevious}
              className="cursor-pointer px-5 py-2 bg-gray-500 hover:bg-gray-600 rounded-full text-white font-semibold shadow flex items-center justify-center gap-2"
            >
              <FiArrowLeft size={24} />
              Vorherige
            </button>
            <button
              onClick={handleNext}
              className="cursor-pointer px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold shadow flex items-center justify-center gap-2"
            >
              <FiArrowRight size={24} />
              Nächste
            </button>
            <button
              onClick={handleMarkAsKnown}
              className="cursor-pointer px-5 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-full text-white font-semibold shadow flex items-center justify-center gap-2"
            >
              <FiCheck size={24} />
              Gelernt
            </button>
          </div>

          {/* Reset Butonu */}
          <button
            onClick={handleResetKnownWords}
            className="cursor-pointer mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 rounded-full text-white font-semibold shadow flex items-center justify-center gap-2 mx-auto"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}