import { useEffect, useState } from "react";
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

  // Kartları yükle ve karıştır
  useEffect(() => {
    const shuffled = shuffleCards(data as Vokabel[]);
    setCards(shuffled);
  }, []);

  // Süre sayacı
  useEffect(() => {
    let timer: number;

    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  // Oyun tamamlandığında süreyi durdur
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setIsRunning(false);
    }
  }, [cards]);

  // Kartları karıştır
  const shuffleCards = (vokabeln: Vokabel[]): Card[] => {
    const shuffledVokabeln = [...vokabeln].sort(() => Math.random() - 0.5).slice(0, 6); // sadece 6 kelime çifti
  
    const cardList: Card[] = [];
  
    shuffledVokabeln.forEach((item, index) => {
      cardList.push({ id: `${index}-wort`, text: item.wort, matched: false });
      cardList.push({ id: `${index}-bedeutung`, text: item.bedeutung, matched: false });
    });
  
    return cardList.sort(() => Math.random() - 0.5);
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
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-800">🎴 Matching Game</h2>

      <p className="text-center text-sm text-gray-600 mb-4">⏱ Süre: {seconds} saniye</p>

      {allMatched ? (
        <div className="text-center text-green-700 text-xl font-semibold">
          🎉 Tebrikler! Tüm kartları {seconds} saniyede eşleştirdiniz!
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleClick(card)}
              className={`cursor-pointer h-20 flex items-center justify-center border text-lg font-semibold rounded shadow transition duration-200 ${
                flipped.includes(card.id) || card.matched
                  ? "bg-green-100"
                  : "bg-blue-200 hover:bg-blue-300"
              }`}
            >
              {flipped.includes(card.id) || card.matched ? card.text : "❓"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
