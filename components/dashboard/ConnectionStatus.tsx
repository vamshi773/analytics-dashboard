"use client";

import { useRealtimeStore } from "@/store/realtimeStore";

export default function ConnectionStatus() {
  const connected = useRealtimeStore((s) => s.connected);

  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        className={`h-2 w-2 rounded-full ${
          connected ? "bg-green-500" : "bg-red-500"
        }`}
      />
      <span className="text-muted-foreground">
        {connected ? "Live: Connected" : "Live: Disconnected"}
      </span>
    </div>
  );
}
