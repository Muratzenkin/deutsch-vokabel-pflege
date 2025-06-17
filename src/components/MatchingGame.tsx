import React, { useEffect, useState } from "react";
import data from "../data/vokabeln2.json";

type Card = {
  id: string;
  text: string;
  matched: boolean;
};

export default function MatchingGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [lockBoard, setLockBoard] = useState(false);

  useEffect(() => {
    // Vokabel verisini kartlara dönüştür
    const shuffled = shuffleCards(data);
    setCards(shuffled);
  }, []);

  const shuffleCards = (vokabeln: any[]) => {
    let cardList: Card[] = [];

    vokabeln.forEach((item, index) => {
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

  return (
    <div className="grid grid-cols-4 gap-4 p-8 max-w-3xl mx-auto">
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => handleClick(card)}
          className={`cursor-pointer h-20 flex items-center justify-center border text-lg font-semibold rounded shadow ${
            flipped.includes(card.id) || card.matched
              ? "bg-green-100"
              : "bg-blue-200"
          }`}
        >
          {flipped.includes(card.id) || card.matched ? card.text : "❓"}
        </div>
      ))}
    </div>
  );
}
