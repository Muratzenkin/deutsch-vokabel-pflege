import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import data from "../data/vokabeln2.json";

type Vokabel = {
  wort: string;
  bedeutung: string;
};

type Card = {
  id: string;
  text: string;
  matched: boolean;
};

export default function MatchingGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [lockBoard, setLockBoard] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const shuffled = shuffleCards(data as Vokabel[]);
    setCards(shuffled);
  }, []);

  useEffect(() => {
    let timer: number;
    if (isRunning) {
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setIsRunning(false);
    }
  }, [cards]);

  const shuffleCards = (vokabeln: Vokabel[]): Card[] => {
    const selected = [...vokabeln].sort(() => Math.random() - 0.5).slice(0, 6);
    const pairList: Card[] = [];

    selected.forEach((item, index) => {
      pairList.push({ id: `${index}-wort`, text: item.wort, matched: false });
      pairList.push({ id: `${index}-bedeutung`, text: item.bedeutung, matched: false });
    });

    return pairList.sort(() => Math.random() - 0.5);
  };

  const handleClick = (card: Card) => {
    if (lockBoard || flipped.includes(card.id) || card.matched) return;

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setLockBoard(true);
      setTimeout(() => checkMatch(newFlipped), 800);
    }
  };

  const checkMatch = ([id1, id2]: string[]) => {
    const [card1, card2] = [cards.find((c) => c.id === id1), cards.find((c) => c.id === id2)];
    if (!card1 || !card2) return;

    const sameIndex = id1.split("-")[0] === id2.split("-")[0];
    if (sameIndex) {
      const updated = cards.map((card) =>
        card.id === card1.id || card.id === card2.id
          ? { ...card, matched: true }
          : card
      );
      setCards(updated);
    }

    setFlipped([]);
    setLockBoard(false);
  };

  const allMatched = cards.length > 0 && cards.every((card) => card.matched);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 px-4 py-6 relative flex items-center justify-center">
      {/* Sol üst logo/link */}
      <Link
        to="/"
        className="absolute top-4 left-4 text-gray-300 font-bold text-xl hover:underline cursor-pointer"
      >
        PflegeVokabel
      </Link>

      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-blue-800">Zuordnungsspiel</h2>

        <p className="text-center text-sm text-gray-600 mb-4">Zeit: {seconds} Sekunden</p>

        {allMatched ? (
          <div className="text-center text-green-700 text-xl font-semibold mt-6">
            Herzlichen Glückwunsch! Sie haben alle Karten in {seconds} Sekunden zugeordnet!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleClick(card)}
                className={`cursor-pointer h-20 sm:h-24 flex items-center justify-center border text-lg font-semibold rounded-xl shadow transition duration-200 ${
                  flipped.includes(card.id) || card.matched
                    ? "bg-green-100 text-gray-900"
                    : "bg-blue-200 hover:bg-blue-300 text-blue-900"
                }`}
              >
                {flipped.includes(card.id) || card.matched ? card.text : "❓"}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}