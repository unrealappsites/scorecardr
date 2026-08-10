import { useState } from "react";
import SignIn from "./src/SignIn";
import Sidebar from "./src/Sidebar";
import HomeScreen from "./src/HomeScreen";
import InPlayScreen from "./src/InPlayScreen";
import GamesScreen from "./src/GamesScreen";
import SettingsScreen from "./src/SettingsScreen";

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [screen, setScreen] = useState("home"); // home | inplay | games | settings

  const [players, setPlayers] = useState([]);
  const [round, setRound] = useState(1);
  const [log, setLog] = useState([]);
  const [gameName, setGameName] = useState("Friday Game Night");

  function logRound(roundNumber, currentPlayers) {
    setLog((l) => [
      ...l,
      { round: roundNumber, scores: currentPlayers.map((p) => ({ name: p.name, score: p.score })) },
    ]);
  }

  function newGame() {
    setPlayers([]);
    setRound(1);
    setLog([]);
    setGameName("New Game");
    setScreen("inplay");
  }

  if (!signedIn) {
    return <SignIn onSignedIn={() => setSignedIn(true)} />;
  }

  function navigate(key) {
    setScreen(key);
    setMenuOpen(false);
  }

  return (
    <>
      <Sidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        active={screen}
        onNavigate={navigate}
        onSignOut={() => setSignedIn(false)}
      />
      {screen === "home" && (
        <HomeScreen onOpenMenu={() => setMenuOpen(true)} log={log} round={round} onNewGame={newGame} />
      )}
      {screen === "inplay" && (
        <InPlayScreen
          onOpenMenu={() => setMenuOpen(true)}
          players={players}
          setPlayers={setPlayers}
          round={round}
          setRound={setRound}
          onLogRound={logRound}
          gameName={gameName}
          setGameName={setGameName}
        />
      )}
      {screen === "games" && <GamesScreen onOpenMenu={() => setMenuOpen(true)} />}
      {screen === "settings" && <SettingsScreen onOpenMenu={() => setMenuOpen(true)} />}
    </>
  );
}
