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
  const [guess, setGuess] = useState(""); 

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter)) return;
    setGuessedLetters([...guessedLetters, letter]);
    if (!word.includes(letter)) {
      setMistakes((m) => m + 1);
    }
  };

  const handleWordGuess = () => {
    if (guess.toLowerCase() === word.toLowerCase()) {
      alert("Herzlichen Glückwunsch! Sie haben das Wort erraten!");
      setGuessedLetters(word.split(""));
    } else {
      alert("Falsche Vermutung!");
      setMistakes((m) => m + 1);
    }
    setGuess(""); 
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
      alert("Alle Wörter wurden gespielt! Herzlichen Glückwunsch ");
    }
  };

  const ALPHABET = "abcdefghijklmnopqrstuvwxyzäöüß".split("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 px-4 py-6 relative flex items-center justify-center">
      {/* Sol üst logo */}
      <Link
        to="/"
        className="absolute top-4 left-4 text-gray-300 font-bold text-xl hover:underline cursor-pointer"
      >
        PflegeVokabel
      </Link>

      {/* Ana kutu */}
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-700">Hangman (Galgenmännchen)</h2>

        <img src={images[mistakes]} alt="Hangman" className="w-40 mx-auto mb-4" />

        <p className="text-md text-red-600 mb-2 font-semibold">Fehler: {mistakes} / {maxMistakes}</p>

        <p className="text-3xl tracking-widest mb-6 font-mono">{displayWord}</p>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {ALPHABET.map((letter) => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter) || isWinner || isGameOver}
              className="w-9 h-9 text-white rounded-full bg-blue-500 hover:bg-blue-600 disabled:opacity-30 transition cursor-pointer"
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Kelime tahmin etme */}
        <div className="mt-4">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Wort raten..."
            className="px-4 py-2 border rounded-lg shadow w-full mb-2"
          />
          <button
            onClick={handleWordGuess}
            className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow transition cursor-pointer"
          >
            Wort raten
          </button>
        </div>

        {(isWinner || isGameOver) && (
          <div className="mt-4">
            {isWinner && <p className="text-green-600 text-xl font-bold">Herzlichen Glückwunsch! Sie haben das Wort erraten!</p>}
            {isGameOver && <p className="text-red-600 text-xl font-bold">Sie haben verloren! Das Wort war: <span className="underline">{word}</span></p>}
            <button
              onClick={resetGame}
              className="mt-3 px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full shadow transition cursor-pointer"
            >
              Neues Spiel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HangmanGame;