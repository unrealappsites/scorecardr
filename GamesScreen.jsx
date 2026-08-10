import { Menu, Dice5, Inbox } from "lucide-react";
import { INK, CREAM, AMBER, SLATE, LINE, SERIF } from "./theme";

export default function GamesScreen({ onOpenMenu }) {
  const games = []; // populated once finished games are actually saved

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
          <div style={{ width: 22 }} />
        </div>

        <div className="h-px w-full mb-6" style={{ backgroundColor: LINE }} />

        <p className="tracking-[0.18em] text-[11px] font-medium uppercase mb-1" style={{ color: SLATE }}>
          Past Games
        </p>
        <h1 className="font-bold leading-tight mb-8" style={{ fontFamily: SERIF, fontSize: "30px", color: INK }}>
          Every game, kept.
        </h1>

        {games.length === 0 ? (
          <div className="rounded-2xl px-4 py-8 text-center" style={{ backgroundColor: "#FFFFFF", border: `1px dashed ${LINE}` }}>
            <Inbox size={22} color={SLATE} className="mx-auto" />
            <p className="font-semibold mt-2 mb-1" style={{ color: INK }}>No games yet</p>
            <p className="text-sm" style={{ color: SLATE }}>Finish a game from Home and it'll show up here.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {games.map((g) => (
              <div
                key={g.name}
                className="rounded-2xl px-4 py-4 flex items-center gap-3 transition-shadow hover:shadow-md"
                style={{ backgroundColor: "#FFFFFF", border: `1px solid ${LINE}` }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: CREAM }}>
                  <Dice5 size={18} color={INK} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate" style={{ color: INK }}>{g.name}</p>
                  <p className="text-xs" style={{ color: SLATE }}>{g.players} players</p>
                </div>
                <span className="text-xs" style={{ color: SLATE }}>{g.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
