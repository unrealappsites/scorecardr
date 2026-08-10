import { useState } from "react";
import { Plus, Minus, X, Trophy, RotateCcw, UserPlus, Menu, Pencil, Check } from "lucide-react";
import { INK, CREAM, AMBER, AMBER_DARK, SLATE, LINE, SERIF } from "./theme";

export default function InPlayScreen({
  onOpenMenu, players, setPlayers, round, setRound, onLogRound, gameName, setGameName,
}) {
  const [editingGameName, setEditingGameName] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState(null);
  const [newPlayer, setNewPlayer] = useState("");
  const [amounts, setAmounts] = useState({}); // per-player typed number

  const leaderId = players.length
    ? players.reduce((a, b) => (b.score > (a?.score ?? -Infinity) ? b : a), null)?.id
    : null;

  function getAmount(id) {
    const n = parseInt(amounts[id], 10);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }

  function adjustScore(id, sign) {
    const delta = sign * getAmount(id);
    setPlayers((ps) => ps.map((p) => (p.id === id ? { ...p, score: Math.max(0, p.score + delta) } : p)));
  }

  function renamePlayer(id, name) {
    setPlayers((ps) => ps.map((p) => (p.id === id ? { ...p, name } : p)));
  }

  function addPlayer() {
    const name = newPlayer.trim();
    if (!name) return;
    setPlayers((ps) => [...ps, { id: Date.now(), name, score: 0 }]);
    setNewPlayer("");
  }

  function removePlayer(id) {
    setPlayers((ps) => ps.filter((p) => p.id !== id));
  }

  function resetGame() {
    setRound(1);
    setPlayers((ps) => ps.map((p) => ({ ...p, score: 0 })));
  }

  function startNextRound() {
    onLogRound(round, players);
    setRound((r) => r + 1);
  }

  return (
    <div className="min-h-screen w-full flex justify-center" style={{ backgroundColor: CREAM }}>
      <div className="w-full max-w-sm px-6 pt-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onOpenMenu} aria-label="Open menu">
            <Menu size={22} color={INK} />
          </button>
          <span className="text-lg font-bold" style={{ fontFamily: SERIF, color: INK }}>
            scorecardr<span style={{ color: AMBER }}>.</span>
          </span>
          <button
            onClick={resetGame}
            className="flex items-center gap-1 text-[11px] uppercase tracking-wider font-medium transition-opacity hover:opacity-60"
            style={{ color: SLATE }}
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>

        <div className="h-px w-full mb-6" style={{ backgroundColor: LINE }} />

        <p className="tracking-[0.18em] text-[11px] font-medium uppercase mb-1" style={{ color: SLATE }}>
          Round {round}
        </p>

        <div className="flex items-center gap-2 mb-8">
          {editingGameName ? (
            <>
              <input
                autoFocus
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setEditingGameName(false)}
                className="flex-1 bg-transparent border-none outline-none font-bold leading-tight"
                style={{ fontFamily: SERIF, fontSize: "30px", color: INK }}
              />
              <button onClick={() => setEditingGameName(false)} aria-label="Save game name" className="transition-transform active:scale-90">
                <Check size={20} color={AMBER_DARK} />
              </button>
            </>
          ) : (
            <>
              <h1 className="font-bold leading-tight" style={{ fontFamily: SERIF, fontSize: "30px", color: INK }}>
                {gameName}
              </h1>
              <button onClick={() => setEditingGameName(true)} aria-label="Rename game" className="transition-transform active:scale-90 hover:opacity-70">
                <Pencil size={16} color={SLATE} />
              </button>
            </>
          )}
        </div>

        {players.length === 0 ? (
          <div className="rounded-2xl px-4 py-8 text-center mb-6" style={{ backgroundColor: "#FFFFFF", border: `1px dashed ${LINE}` }}>
            <p className="font-semibold mb-1" style={{ color: INK }}>No players yet</p>
            <p className="text-sm" style={{ color: SLATE }}>Add everyone playing tonight below to start keeping score.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mb-6">
            {players.map((p) => {
              const isLeader = p.id === leaderId && p.score > 0;
              const isEditing = editingPlayerId === p.id;
              return (
                <div
                  key={p.id}
                  className="rounded-2xl px-4 py-4"
                  style={{ backgroundColor: "#FFFFFF", border: isLeader ? `2px solid ${AMBER}` : `1px solid ${LINE}` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-col min-w-0 flex-1 mr-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        {isLeader && <Trophy size={13} color={AMBER_DARK} />}
                        {isEditing ? (
                          <input
                            autoFocus
                            value={p.name}
                            onChange={(e) => renamePlayer(p.id, e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && setEditingPlayerId(null)}
                            onBlur={() => setEditingPlayerId(null)}
                            className="font-semibold bg-transparent outline-none border-b min-w-0"
                            style={{ color: INK, fontSize: "15px", borderColor: AMBER }}
                          />
                        ) : (
                          <button
                            onClick={() => setEditingPlayerId(p.id)}
                            className="font-semibold truncate text-left transition-opacity hover:opacity-70"
                            style={{ color: INK, fontSize: "15px" }}
                          >
                            {p.name}
                          </button>
                        )}
                      </div>
                      <span className="text-2xl font-bold tabular-nums" style={{ fontFamily: SERIF, color: INK }}>
                        {p.score}
                      </span>
                    </div>
                    <button
                      onClick={() => removePlayer(p.id)}
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all active:scale-90 hover:bg-black/5"
                      style={{ color: SLATE }}
                      aria-label={`Remove ${p.name}`}
                    >
                      <X size={13} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={amounts[p.id] ?? ""}
                      onChange={(e) => setAmounts((a) => ({ ...a, [p.id]: e.target.value }))}
                      placeholder="1"
                      className="w-16 rounded-lg px-2 py-2 text-sm text-center outline-none"
                      style={{ border: `1px solid ${LINE}`, color: INK }}
                      aria-label={`Points to add or subtract for ${p.name}`}
                    />
                    <button
                      onClick={() => adjustScore(p.id, -1)}
                      className="flex-1 h-9 rounded-lg flex items-center justify-center gap-1 text-sm font-semibold transition-all active:scale-95 hover:brightness-95"
                      style={{ backgroundColor: CREAM, color: INK }}
                    >
                      <Minus size={14} /> Minus
                    </button>
                    <button
                      onClick={() => adjustScore(p.id, 1)}
                      className="flex-1 h-9 rounded-lg flex items-center justify-center gap-1 text-sm font-semibold transition-all active:scale-95 hover:brightness-95"
                      style={{ backgroundColor: AMBER, color: INK }}
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div
          className="rounded-2xl px-4 py-3 flex items-center gap-2 mb-8"
          style={{ backgroundColor: "#FFFFFF", border: `1px solid ${LINE}` }}
        >
          <UserPlus size={16} color={SLATE} />
          <input
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addPlayer()}
            placeholder="Add a player"
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: INK }}
          />
          <button onClick={addPlayer} className="text-xs font-semibold uppercase tracking-wide transition-opacity hover:opacity-70" style={{ color: AMBER_DARK }}>
            Add
          </button>
        </div>

        <button
          onClick={startNextRound}
          disabled={players.length === 0}
          className="w-full rounded-2xl py-4 font-bold text-base transition-all active:scale-[0.98] hover:brightness-95 disabled:cursor-not-allowed"
          style={{ backgroundColor: players.length === 0 ? LINE : AMBER, color: players.length === 0 ? SLATE : INK }}
        >
          Start round {round + 1} →
        </button>

        <p className="text-center text-[11px] mt-4" style={{ color: SLATE }}>
          Type a number, then tap Add or Minus to apply it.
        </p>
      </div>
    </div>
  );
}
