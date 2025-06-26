import React from "react";
import { Link } from "react-router-dom";

const LanguageMagazinePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 py-10 px-4 text-gray-300 font-serif relative flex items-center justify-center">
      {/* Sol üst geri linki */}
      <Link
        to="/"
        className="absolute top-4 left-4 text-gray-300 font-bold text-xl hover:underline cursor-pointer"
      >
        PflegeVokabel
      </Link>

      {/* Sayfa kutusu */}
      <div className="bg-white shadow-2xl rounded-3xl max-w-5xl mx-auto p-8 md:p-12 text-gray-800">
        {/* Üst Bilgi: Dergi Adı + Tarih */}
        <div className="flex justify-between items-center border-b pb-3 mb-8 text-xs uppercase tracking-widest text-gray-500 font-sans">
          <span>Pflegemagazin</span>
          <span>1 / 2025</span>
        </div>

        {/* İçerik Alanı */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Görsel ve Başlık */}
          <div>
            <div className="rounded-xl overflow-hidden shadow w-full aspect-[4/3]">
              <img
                src="/compression-socks.jpg"
                alt="Kompressionsstrümpfe"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4">
              <span className="text-xs text-green-600 font-semibold uppercase tracking-wide">
                Pflegekommunikation
              </span>
              <h2 className="text-2xl font-extrabold mt-2 font-sans leading-snug">
                Wie spricht man beim Anziehen von Kompressionsstrümpfen?
              </h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed">
                Beim Anziehen von Kompressionsstrümpfen kommt es nicht nur auf die Technik, sondern auch auf die Kommunikation an. Die Pflegekraft spricht beruhigend, erklärt jeden Schritt und achtet auf das Wohlbefinden der Patientin. Typische Fragen wie „Ist das angenehm für Sie?“ oder Anweisungen wie „Bitte strecken Sie Ihr Bein aus“ helfen beim sicheren Ablauf.
              </p>
            </div>
          </div>

          {/* Metinsel Alan + Dekoratif Rakam */}
          <div className="relative">
            <div className="absolute text-[8rem] text-green-100 font-extrabold -top-12 -left-4 z-0 select-none">
              1
            </div>
            <div className="relative z-10 space-y-8">
              <div>
                <h2 className="text-2xl font-bold font-sans leading-snug">
                  Typische Redemittel im Pflegealltag
                </h2>
                <p className="mt-4 text-[0.95rem] leading-relaxed">
                  <span className="font-bold text-green-700">„Könnten Sie sich bitte auf die Bettkante setzen?“</span> – höfliche Formulierung, die zum Mitmachen auffordert. <br />
                  <span className="font-bold text-green-700">„Ich ziehe Ihnen jetzt den rechten Strumpf an.“</span> – klare, beruhigende Kommunikation.<br />
                  <span className="font-bold text-green-700">„Sagen Sie mir bitte sofort Bescheid, wenn etwas drückt.“</span> – Sicherheit geben und Empathie zeigen.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-sans leading-snug">
                  Pflege-Reaktion verstehen
                </h2>
                <p className="mt-4 text-[0.95rem] leading-relaxed">
                  Manchmal äußern Patient:innen Unbehagen:<br />
                  <span className="font-bold text-red-600">„Der Strumpf sitzt zu eng!“</span> – dann reagiert die Pflegekraft mit Verständnis: <br />
                  <span className="font-bold text-green-700">„Ich ziehe ihn etwas lockerer, sagen Sie Bescheid, ob es besser ist.“</span><br />
                  Auch Beobachtungen wie <span className="italic">„Meine Zehen sind nicht ganz drin“</span> oder <span className="italic">„Es drückt hier ein bisschen“</span> erfordern schnelle Aufmerksamkeit.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-sans leading-snug">
                  Besuch beenden
                </h2>
                <p className="mt-4 text-[0.95rem] leading-relaxed">
                  Am Ende sagt man oft freundlich:<br />
                  <span className="font-bold text-green-700">„So, das war’s für heute. Brauchen Sie noch etwas?“</span><br />
                  Oder:<br />
                  <span className="font-bold text-green-700">„Ich gebe es gleich im Büro weiter.“</span><br />
                  Und beim Abschied:<br />
                  <span className="font-bold text-green-700">„Tschüss, bleiben Sie gesund!“</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Bilgi Kutucukları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 text-sm font-sans">
          <div className="bg-indigo-50 text-indigo-900 p-4 rounded shadow-sm">
            <p><span className="font-semibold">Bettkante</span> = Rand des Bettes</p>
            <p><span className="font-semibold">an-/ausziehen</span> = Kleidung anlegen oder entfernen</p>
            <p><span className="font-semibold">zu eng</span> = nicht locker, drückt</p>
          </div>
          <div className="bg-pink-100 text-pink-900 p-4 rounded shadow-sm">
            <p><span className="font-semibold">Bescheid sagen</span> = informieren, mitteilen</p>
            <p><span className="font-semibold">Besuch</span> = Pflegeeinsatz / Termin</p>
            <p><span className="font-semibold">drückt</span> = verursacht Druck, unbequem</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageMagazinePage;
