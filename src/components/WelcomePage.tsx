import NavLinks from "./NavLinks";

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e1e3f] to-[#2c2c54] px-4">
      <div className="bg-[#1c1c2e] text-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">PflegeVokabel</h1>
        <p className="text-center text-sm md:text-base text-gray-300 mb-6">
          Willkommen! Diese Anwendung hilft Ihnen, wichtige medizinische Vokabeln für die Pflegepraxis auf Deutsch zu lernen.
        </p>

        {/* Navigasyon */}
        <div className="space-y-4">
          <NavLinks />
        </div>


        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">2 Goecebe</p>
      </div>
    </div>
  );
}
