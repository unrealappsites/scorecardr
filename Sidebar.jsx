import { X, Home, Trophy, Dice5, Settings as SettingsIcon } from "lucide-react";
import { INK, AMBER, CREAM } from "./theme";

const NAV = [
  { key: "home", label: "Home", icon: Home },
  { key: "inplay", label: "In Play", icon: Trophy },
  { key: "games", label: "Games", icon: Dice5 },
  { key: "settings", label: "Settings", icon: SettingsIcon },
];

export default function Sidebar({ open, onClose, active, onNavigate, onSignOut }) {
  return (
    <div className={"fixed inset-0 z-50 flex " + (open ? "" : "pointer-events-none")}>
      <div
        className="w-[280px] h-full flex flex-col px-5 pt-6 transition-transform duration-300 ease-out"
        style={{ backgroundColor: INK, transform: open ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: AMBER }} />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="transition-transform active:scale-90 hover:opacity-70"
          >
            <X size={22} color={CREAM} />
          </button>
        </div>

        <p className="tracking-[0.18em] text-[11px] font-medium uppercase mb-3" style={{ color: "#8890A0" }}>
          My Scorecardr
        </p>

        <nav className="flex flex-col gap-1">
          {NAV.map(({ key, label, icon: Icon }) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                onClick={() => onNavigate(key)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-left font-semibold transition-all active:scale-[0.98]"
                style={{
                  backgroundColor: isActive ? AMBER : "transparent",
                  color: isActive ? INK : CREAM,
                }}
              >
                <Icon size={18} />
                {label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto mb-8">
          <button onClick={onSignOut} className="font-semibold transition-opacity hover:opacity-70" style={{ color: CREAM }}>
            Sign out
          </button>
        </div>
      </div>
      <div
        className="flex-1 h-full bg-black transition-opacity duration-300"
        style={{ opacity: open ? 0.3 : 0 }}
        onClick={onClose}
      />
    </div>
  );
}
