import { Route, Routes } from "react-router-dom";
import HangmanGame from "./components/HangmanGame";
import VokabelCard from "./components/VokabelCard";
import MatchingGame from "./components/MatchingGame";
import AbkuerzungCard from "./components/AbkürzungCard";
import LanguagePage from "./components/LanguagePage";
import WelcomePage from "./components/WelcomePage"; 

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} /> 
        <Route path="/karten" element={<VokabelCard />} />
        <Route path="/hangman" element={<HangmanGame />} />
        <Route path="/matching" element={<MatchingGame />} />
        <Route path="/abkuerzung" element={<AbkuerzungCard />} />
        <Route path="/language" element={<LanguagePage />} />
      </Routes>
    </>
  );
}