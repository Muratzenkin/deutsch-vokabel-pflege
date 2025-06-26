import { useState } from "react";
import { Link } from "react-router-dom";
import abkuerzungenData from "../data/medizinische_abkuerzungen.json";
import { FiArrowLeft, FiArrowRight, FiRefreshCw, FiCheck } from "react-icons/fi";

export default function AbkuerzungCard() {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [knownAbkuerzungen, setKnownAbkuerzungen] = useState<string[]>([]); 

  if (abkuerzungenData.length === 0) {
    return <div className="text-center mt-10 text-red-600 font-bold">Keine Abkürzungen gefunden.</div>;
  }

  // Filtrelenmiş kısaltmalar
  const filteredData = abkuerzungenData.filter((item) => !knownAbkuerzungen.includes(item.abkürzung));
  const current = filteredData[index] || {
    abkürzung: "",
    bedeutung: "",
    erklaerung: ""
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % filteredData.length);
    setShowBack(false);
  };

  const handlePrevious = () => {
    setIndex((prev) => (prev - 1 + filteredData.length) % filteredData.length);
    setShowBack(false);
  };

  const handleMarkAsKnown = () => {
    setKnownAbkuerzungen((prev) => [...prev, current.abkürzung]);
  };

  const handleResetKnownAbkuerzungen = () => {
    setKnownAbkuerzungen([]);
    setIndex(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 px-4 py-6 relative flex items-center justify-center">
      {/* Sol üst logo */}
      <Link
        to="/"
        className="absolute top-4 left-4 text-gray-300 font-bold text-xl hover:underline cursor-pointer"
      >
        PflegeVokabel
      </Link>

      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-700">Medizinische Abkürzungen</h2>

        <div className="text-4xl font-bold text-gray-800 mb-6 min-h-[4rem] transition-all duration-300">
          {showBack ? (
            <>
              <div className="text-xl text-indigo-700 font-semibold mb-2">
                {current.bedeutung}
              </div>
              <div className="text-gray-600 text-base">{current.erklaerung}</div>
            </>
          ) : (
            current.abkürzung
          )}
        </div>

        {/* Karte umdrehen butonu */}
        <button
          onClick={() => setShowBack(!showBack)}
          className="cursor-pointer mb-6 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition rounded-full text-white font-medium shadow flex items-center justify-center gap-2 mx-auto"
        >
          <FiRefreshCw size={20} />
          Karte {showBack ? "zurück" : "umdrehen"}
        </button>

        {/* Butonlar */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handlePrevious}
            className="cursor-pointer px-5 py-2 bg-gray-500 hover:bg-gray-600 rounded-full text-white shadow font-semibold flex items-center justify-center gap-2"
          >
            <FiArrowLeft size={24} />
            Vorherige
          </button>
          <button
            onClick={handleNext}
            className="cursor-pointer px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white shadow font-semibold flex items-center justify-center gap-2"
          >
            <FiArrowRight size={24} />
            Nächste
          </button>
          <button
            onClick={handleMarkAsKnown}
            className="cursor-pointer px-5 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-full text-white shadow font-semibold flex items-center justify-center gap-2"
          >
            <FiCheck size={24} />
            Gelernt
          </button>
        </div>

        {/* Reset Butonu */}
        <button
          onClick={handleResetKnownAbkuerzungen}
          className="cursor-pointer mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 rounded-full text-white font-semibold shadow flex items-center justify-center gap-2 mx-auto"
        >
          Reset
        </button>
      </div>
    </div>
  );
}