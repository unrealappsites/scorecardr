import { Github } from "lucide-react";
import { INK, CREAM, SLATE, SERIF } from "./theme";

export default function SignIn({ onSignedIn }) {
  return (
    <div className="min-h-screen w-full flex justify-center" style={{ backgroundColor: CREAM }}>
      <div className="w-full max-w-sm px-6 pt-14 pb-16">
        <p className="tracking-[0.18em] text-[11px] font-medium uppercase mb-3" style={{ color: SLATE }}>
          Scorecardr Access
        </p>
        <h1 className="font-bold leading-[1.05] mb-4" style={{ fontFamily: SERIF, fontSize: "40px", color: INK }}>
          Every point,
          <br />
          on the record.
        </h1>
        <p className="text-sm mb-10" style={{ color: SLATE }}>
          Sign in with GitHub to keep your games synced.
        </p>

        <button
          onClick={onSignedIn}
          className="w-full rounded-2xl py-4 font-bold text-base flex items-center justify-center gap-2 mb-4 transition-transform active:scale-[0.98] hover:brightness-95"
          style={{ backgroundColor: INK, color: CREAM }}
        >
          <Github size={18} /> Continue with GitHub
        </button>

        <p className="text-xs leading-relaxed" style={{ color: SLATE }}>
          Email sign-in is coming later — it needs a backend to store accounts
          (like Turso), which isn't wired up yet.
        </p>
      </div>
    </div>
  );
}
