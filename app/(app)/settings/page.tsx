"use client";

import dynamic from "next/dynamic";

const SettingsPanel = dynamic(() => import("@/components/settings/SettingsPanel"), { ssr: false });

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">Profile, preferences and theme</p>
      </div>
      <SettingsPanel />
    </div>
  );
}
