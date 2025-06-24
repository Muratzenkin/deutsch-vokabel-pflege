import React from "react";
import { Link } from "react-router-dom";

const LanguageMagazinePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fdfaf6] py-10 px-4 text-gray-800 font-serif relative">

      {/* Sol üst geri linki */}
      <Link
        to="/"
        className="absolute top-4 left-4 text-indigo-600 font-bold text-lg hover:underline"
      >
        2Goecebe
      </Link>

      {/* Sayfa kutusu */}
      <div className="bg-white shadow-2xl rounded-xl max-w-5xl mx-auto p-8 md:p-12 relative">

        {/* Üst Bilgi: Dergi Adı + Tarih */}
        <div className="flex justify-between items-center border-b pb-3 mb-8 text-xs uppercase tracking-widest text-gray-500 font-sans">
          <span>Sprachmagazin</span>
          <span>Woche 25 / 2025</span>
        </div>

        {/* İçerik Alanı */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Görsel ve Başlık */}
          <div>
            <div className="rounded-xl overflow-hidden shadow w-full aspect-[4/3]">
              <img
                src="/mandarinen.jpg"
                alt="Mandarinen"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4">
              <span className="text-xs text-green-600 font-semibold uppercase tracking-wide">
                leicht erklärt
              </span>
              <h2 className="text-2xl font-extrabold mt-2 font-sans leading-snug">
                Was macht Mandarinen sprachlich interessant?
              </h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed">
                Auf Märkten gibt es eine große sprachliche Dynamik. Die Berliner
                Linguistin Heike Wiese hat festgestellt, dass ein Markt in Neukölln
                sogar eine eigene Grammatik hat. So auch bei diesem Angebot:
                „Man darin, zwei Kiste, acht!“ Die acht ist der Preis in Euro. Wiese
                sagt, „<i>Mandarine</i> darf nicht in der Mitte stehen. Kiste muss
                direkt hinter dem Zahlwort stehen. Euro kann man weglassen.“
              </p>
            </div>
          </div>

          {/* Metinsel Alan + Dekoratif Rakam */}
          <div className="relative">
            <div className="absolute text-[8rem] text-green-100 font-extrabold -top-12 -left-4 z-0 select-none">
              5
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold font-sans leading-snug">
                Ist eine Person dumm, wenn sie oft Wörter wie{" "}
                <span className="text-purple-600">äh</span> und{" "}
                <span className="italic font-extrabold">ähm</span> benutzt?
              </h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed">
                <span className="font-bold text-green-700">Füllwörter</span> wie äh
                oder ähm haben in der deutschen Sprache ein schlechtes Image. Der
                Duden erklärt sie als Wörter mit „Aussetzern“. Manche Menschen
                versuchen sie zu vermeiden – dabei helfen sie oft, Zeit zu gewinnen,
                Gedanken zu ordnen und natürlicher zu sprechen.
              </p>
            </div>
          </div>
        </div>

        {/* Alt Bilgi Kutucukları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 text-sm font-sans">
          <div className="bg-indigo-50 text-indigo-900 p-4 rounded shadow-sm">
            <p><span className="font-semibold">feststellen</span> = erkennen</p>
            <p><span className="font-semibold">sogar</span> = zusätzlich / auch</p>
          </div>
          <div className="bg-pink-100 text-pink-900 p-4 rounded shadow-sm">
            <p><span className="font-semibold">Kiste, acht</span> = Preisstruktur</p>
            <p><span className="font-semibold">weglassen</span> = auslassen, nicht sagen</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageMagazinePage;
