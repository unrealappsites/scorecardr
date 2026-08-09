import { Menu } from "lucide-react";
import { INK, CREAM, AMBER, SLATE, LINE, SERIF } from "./theme";

export default function HistoryScreen({ onOpenMenu, log, round }) {
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
          This Game
        </p>
        <h1 className="font-bold leading-tight mb-8" style={{ fontFamily: SERIF, fontSize: "30px", color: INK }}>
          Round history
        </h1>

        {log.length === 0 ? (
          <div className="rounded-2xl px-4 py-8 text-center" style={{ backgroundColor: "#FFFFFF", border: `1px dashed ${LINE}` }}>
            <p className="font-semibold mb-1" style={{ color: INK }}>No rounds logged yet</p>
            <p className="text-sm" style={{ color: SLATE }}>
              Tap "Start round {round + 1}" on Today to save round {round}'s scores here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {[...log].reverse().map((entry) => (
              <div key={entry.round} className="rounded-2xl px-4 py-4" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${LINE}` }}>
                <p className="text-[11px] uppercase tracking-wide font-semibold mb-2" style={{ color: SLATE }}>
                  Round {entry.round}
                </p>
                <div className="flex flex-col gap-1">
                  {entry.scores.map((s) => (
                    <div key={s.name} className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: INK }}>{s.name}</span>
                      <span className="text-sm font-bold tabular-nums" style={{ color: INK }}>{s.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
