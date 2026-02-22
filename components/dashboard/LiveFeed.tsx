"use client";

import React from "react";
import { useRealtimeStore } from "@/store/realtimeStore";

function LiveFeedImpl() {
  const events = useRealtimeStore((s) => s.events);

  return (
    <div className="space-y-2">
      {events.length === 0 ? (
        <div className="text-sm text-muted-foreground">No live events yet…</div>
      ) : (
        events.map((e, idx) => (
          <div key={idx} className="text-sm flex justify-between border-b pb-1">
            <span>{e.message}</span>
            <span className="text-muted-foreground">
              {new Date(e.time).toLocaleTimeString()}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

const LiveFeed = React.memo(LiveFeedImpl);
export default LiveFeed;
