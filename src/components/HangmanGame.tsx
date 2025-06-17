import { useState } from "react";
import vokabeln from "../data/vokabeln.json";
import img0 from "../assets/hangman/0.jpg";
import img1 from "../assets/hangman/1.jpg";
import img2 from "../assets/hangman/2.jpg";
import img3 from "../assets/hangman/3.jpg";
import img4 from "../assets/hangman/4.jpg";
import img5 from "../assets/hangman/5.jpg";
import img6 from "../assets/hangman/6.jpg";

const images = [img0, img1, img2, img3, img4, img5, img6];
const maxMistakes = 6;

function getRandomWord(): string {
  const words = vokabeln.map((v) => v.wort.toLowerCase().replace(/[^a-zäöüß]/gi, ""));
  return words[Math.floor(Math.random() * words.length)];
}

const HangmanGame = () => {
  const [word, setWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter)) return;
    setGuessedLetters([...guessedLetters, letter]);
    if (!word.includes(letter)) {
      setMistakes(mistakes + 1);
    }
  };

  const displayWord = word
    .split("")
    .map((l) => (guessedLetters.includes(l) ? l : "_"))
    .join(" ");

  const isWinner = !displayWord.includes("_");
  const isGameOver = mistakes >= maxMistakes;

  const resetGame = () => {
    setWord(getRandomWord());
    setGuessedLetters([]);
    setMistakes(0);
  };

  const ALPHABET = "abcdefghijklmnopqrstuvwxyzäöüß".split("");

  return (
    <div className="text-center p-6 bg-white rounded-xl shadow-xl max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">🎯 Adam Asmaca</h2>

      <img src={images[mistakes]} alt="Hangman" className="w-48 mx-auto mb-4" />
      <p className="text-lg text-red-500 mb-2">Fehler: {mistakes} / {maxMistakes}</p>

      <p className="text-3xl tracking-widest mb-4 font-mono">{displayWord}</p>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {ALPHABET.map((letter) => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter) || isWinner || isGameOver}
            className="w-8 h-8 text-white rounded bg-blue-500 hover:bg-blue-600 disabled:opacity-30"
          >
            {letter}
          </button>
        ))}
      </div>

      {(isWinner || isGameOver) && (
        <div className="mt-4">
          {isWinner && <p className="text-green-600 text-xl font-bold">✅ Bravo! Kelimeyi bildin!</p>}
          {isGameOver && <p className="text-red-600 text-xl font-bold">❌ Kaybettin! Kelime: {word}</p>}
          <button
            onClick={resetGame}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded shadow"
          >
            🔄 Yeni Oyun
          </button>
        </div>
      )}
    </div>
  );
};

export default HangmanGame;
