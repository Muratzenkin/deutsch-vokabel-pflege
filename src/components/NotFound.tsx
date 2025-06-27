import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1e1e3f] to-[#2c2c54]">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-2">Seite nicht gefunden</p>
      <p className="text-md text-gray-600 mb-6">
        Die Seite, die du suchst, existiert nicht oder wurde verschoben.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
};

export default NotFound;
