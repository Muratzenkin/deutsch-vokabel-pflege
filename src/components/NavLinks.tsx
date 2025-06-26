import { Link } from "react-router-dom";

export default function NavLinks() {
  const links = [
    { to: "/karten", label: "Vokabelkarten" },
    { to: "/hangman", label: "Hangman" },
    { to: "/matching", label: "Zuordnungsspiel" },
    { to: "/abkuerzung", label: "Abkürzungen" },
    { to: "/language", label: " Pflegemagazin	" },
  ];

  // Her buton için ayrı pastel renk (Tailwind sınıfları)
  const buttonColors = [
    "bg-pink-300",
    "bg-amber-200",
    "bg-emerald-300",
    "bg-sky-300",
    "bg-lime-200",
    "bg-fuchsia-300",
  ];

  return (
    <div className="flex flex-col space-y-3">
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          className={`px-5 py-3 rounded-xl text-center ${buttonColors[index % buttonColors.length]} text-gray-900 font-semibold shadow hover:opacity-90 transition`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
