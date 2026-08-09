import { useState } from "react";
import { Github, ArrowRight } from "lucide-react";
import { INK, CREAM, AMBER, SLATE, LINE, SERIF } from "./theme";

export default function SignIn({ onSignedIn }) {
  const [tab, setTab] = useState("signin"); // "signin" | "create"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen w-full flex justify-center" style={{ backgroundColor: CREAM }}>
      <div className="w-full max-w-sm px-6 pt-14 pb-16">
        <p className="tracking-[0.18em] text-[11px] font-medium uppercase mb-3" style={{ color: SLATE }}>
          Scorecardr Access
        </p>
        <h1
          className="font-bold leading-[1.05] mb-8"
          style={{ fontFamily: SERIF, fontSize: "40px", color: INK }}
        >
          Every point,
          <br />
          on the record.
        </h1>

        <div className="flex gap-6 mb-1">
          <button
            onClick={() => setTab("signin")}
            className="font-semibold pb-2 text-base"
            style={{ color: tab === "signin" ? INK : SLATE }}
          >
            Sign in
          </button>
          <button
            onClick={() => setTab("create")}
            className="font-semibold pb-2 text-base"
            style={{ color: tab === "create" ? INK : SLATE }}
          >
            Create account
          </button>
        </div>
        <div className="h-[2px] w-full mb-8" style={{ backgroundColor: LINE }}>
          <div
            className="h-full transition-all"
            style={{
              width: "50%",
              backgroundColor: AMBER,
              marginLeft: tab === "create" ? "50%" : 0,
            }}
          />
        </div>

        <label className="text-[11px] uppercase tracking-wide font-medium" style={{ color: SLATE }}>
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full mt-1 mb-4 rounded-xl px-4 py-3 outline-none"
          style={{ backgroundColor: "#fff", border: `1px solid ${INK}`, color: INK }}
        />

        <label className="text-[11px] uppercase tracking-wide font-medium" style={{ color: SLATE }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          className="w-full mt-1 mb-6 rounded-xl px-4 py-3 outline-none"
          style={{ backgroundColor: "#fff", border: `1px solid ${INK}`, color: INK }}
        />

        <button
          onClick={onSignedIn}
          className="w-full rounded-2xl py-4 font-bold text-base flex items-center justify-center gap-2 mb-6"
          style={{ backgroundColor: AMBER, color: INK }}
        >
          {tab === "signin" ? "Sign in" : "Create account"} <ArrowRight size={18} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1" style={{ backgroundColor: LINE }} />
          <span className="text-xs" style={{ color: SLATE }}>OR</span>
          <div className="h-px flex-1" style={{ backgroundColor: LINE }} />
        </div>

        <button
          onClick={onSignedIn}
          className="w-full rounded-2xl py-4 font-semibold text-base flex items-center justify-center gap-2"
          style={{ border: `1px solid ${INK}`, color: INK }}
        >
          <Github size={18} /> Continue with GitHub
        </button>
      </div>
    </div>
  );
}
