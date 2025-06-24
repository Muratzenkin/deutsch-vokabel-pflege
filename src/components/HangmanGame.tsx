import { useState, useRef } from "react";
import { Link } from "react-router-dom";
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

function getFilteredWord(usedWords: Set<string>): string | null {
  const words = vokabeln
    .map((v) => v.wort.toLowerCase().replace(/[^a-zäöüß]/gi, ""))
    .filter((word) => !usedWords.has(word));

  if (words.length === 0) return null;

  return words[Math.floor(Math.random() * words.length)];
}

const HangmanGame = () => {
  const usedWordsRef = useRef<Set<string>>(new Set());

  const [word, setWord] = useState(() => {
    const initial = getFilteredWord(usedWordsRef.current);
    if (initial) usedWordsRef.current.add(initial);
    return initial || "";
  });

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter)) return;
    setGuessedLetters([...guessedLetters, letter]);
    if (!word.includes(letter)) {
      setMistakes((m) => m + 1);
    }
  };

  const displayWord = word
    .split("")
    .map((l) => (guessedLetters.includes(l) ? l : "_"))
    .join(" ");

  const isWinner = !displayWord.includes("_");
  const isGameOver = mistakes >= maxMistakes;

  const resetGame = () => {
    const nextWord = getFilteredWord(usedWordsRef.current);
    if (nextWord) {
      usedWordsRef.current.add(nextWord);
      setWord(nextWord);
      setGuessedLetters([]);
      setMistakes(0);
    } else {
      alert("Tüm kelimeleri bitirdin! Tebrikler 🎉");
    }
  };

  const ALPHABET = "abcdefghijklmnopqrstuvwxyzäöüß".split("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-6 relative">
      {/* Sol üst logo */}
      <Link
        to="/"
        className="absolute top-4 left-4 text-indigo-600 font-bold text-xl hover:underline"
      >
        2Goecebe
      </Link>

      {/* Ana kutu */}
      <div className="max-w-xl mx-auto mt-16 bg-white rounded-3xl shadow-2xl p-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-700">🎯 Hangman (Adam Asmaca)</h2>

        <img src={images[mistakes]} alt="Hangman" className="w-40 mx-auto mb-4" />

        <p className="text-md text-red-600 mb-2 font-semibold">Fehler: {mistakes} / {maxMistakes}</p>

        <p className="text-3xl tracking-widest mb-6 font-mono">{displayWord}</p>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {ALPHABET.map((letter) => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter) || isWinner || isGameOver}
              className="w-9 h-9 text-white rounded-full bg-blue-500 hover:bg-blue-600 disabled:opacity-30 transition"
            >
              {letter}
            </button>
          ))}
        </div>

        {(isWinner || isGameOver) && (
          <div className="mt-4">
            {isWinner && <p className="text-green-600 text-xl font-bold">✅ Bravo! Doğru bildin!</p>}
            {isGameOver && <p className="text-red-600 text-xl font-bold">❌ Kaybettin! Kelime: <span className="underline">{word}</span></p>}
            <button
              onClick={resetGame}
              className="mt-3 px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full shadow transition"
            >
              🔄 Yeni Oyun
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HangmanGame;
