import { Menu, Bell, User, Trash2 } from "lucide-react";
import { INK, CREAM, AMBER, SLATE, LINE, SERIF } from "./theme";

export default function SettingsScreen({ onOpenMenu }) {
  const rows = [
    { icon: User, label: "Account details" },
    { icon: Bell, label: "Notifications" },
    { icon: Trash2, label: "Delete account" },
  ];

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
          Preferences
        </p>
        <h1 className="font-bold leading-tight mb-8" style={{ fontFamily: SERIF, fontSize: "30px", color: INK }}>
          Settings
        </h1>

        <div className="flex flex-col gap-3">
          {rows.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="rounded-2xl px-4 py-4 flex items-center gap-3 text-left"
              style={{ backgroundColor: "#FFFFFF", border: `1px solid ${LINE}` }}
            >
              <Icon size={18} color={INK} />
              <span className="font-semibold" style={{ color: INK }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
