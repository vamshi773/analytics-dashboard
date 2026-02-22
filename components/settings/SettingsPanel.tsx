"use client";

import { useState } from "react";
import { useTheme } from "next-themes";

export default function SettingsPanel() {
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState("Sandeep Jukuri");
  const [email, setEmail] = useState("sandeep@example.com");
  const [notify, setNotify] = useState(true);
  const [compact, setCompact] = useState(false);

  return (
    <div className="space-y-4">
      {/* Profile */}
      <div className="border rounded-lg p-4 space-y-3">
        <div className="font-semibold">Profile</div>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Name</div>
            <input
              className="border rounded-md px-3 py-2 text-sm bg-background w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Email</div>
            <input
              className="border rounded-md px-3 py-2 text-sm bg-background w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <button className="border px-3 py-2 rounded-md text-sm">Save Profile</button>
      </div>

      {/* Theme */}
      <div className="border rounded-lg p-4 space-y-3">
        <div className="font-semibold">Theme</div>
        <div className="flex gap-2 flex-wrap">
          {["light", "dark", "system"].map((t) => (
            <button
              key={t}
              className={`border px-3 py-2 rounded-md text-sm ${
                theme === t ? "bg-accent" : ""
              }`}
              onClick={() => setTheme(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          Current: <span className="font-medium">{theme}</span>
        </div>
      </div>

      {/* Preferences */}
      <div className="border rounded-lg p-4 space-y-3">
        <div className="font-semibold">Preferences</div>

        <label className="flex items-center justify-between gap-3">
          <span className="text-sm">Enable notifications</span>
          <input
            type="checkbox"
            checked={notify}
            onChange={(e) => setNotify(e.target.checked)}
            className="h-4 w-4"
          />
        </label>

        <label className="flex items-center justify-between gap-3">
          <span className="text-sm">Compact layout</span>
          <input
            type="checkbox"
            checked={compact}
            onChange={(e) => setCompact(e.target.checked)}
            className="h-4 w-4"
          />
        </label>

        <div className="text-xs text-muted-foreground">
          (These toggles are UI-only demo settings. We can persist them with Zustand if you want.)
        </div>
      </div>
    </div>
  );
}
