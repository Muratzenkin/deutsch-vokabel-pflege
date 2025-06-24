import { useState } from "react";
import { Link } from "react-router-dom";
import abkuerzungenData from "../data/medizinische_abkuerzungen.json";

export default function AbkuerzungCard() {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  if (abkuerzungenData.length === 0) {
    return <div className="text-center mt-10">Keine Abkürzungen gefunden.</div>;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-6 relative">

      {/* Sol üst logo */}
      <Link
        to="/"
        className="absolute top-4 left-4 text-indigo-600 font-bold text-xl hover:underline"
      >
        2Goecebe
      </Link>

      <div className="w-full max-w-xl mx-auto mt-16 bg-white shadow-2xl rounded-3xl p-8 text-center">
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

        <button
          onClick={() => setShowBack(!showBack)}
          className="mb-6 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition rounded-full text-white font-medium shadow"
        >
          Karte {showBack ? "zurück" : "umdrehen"}
        </button>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={handlePrevious}
            className="px-5 py-2 bg-gray-400 hover:bg-gray-500 rounded-full text-white shadow font-semibold"
          >
            ⬅️ Geri
          </button>
          <button
            onClick={handleNext}
            className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white shadow font-semibold"
          >
            ➡️ Nächste
          </button>
        </div>
      </div>
    </div>
  );
}
