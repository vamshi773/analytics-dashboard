"use client";

import { useEffect } from "react";
import { useRealtimeStore } from "@/store/realtimeStore";
import { getSocket } from "@/lib/socket";

function isMockMode() {
  // Use env var if set (recommended for Vercel)
  const mode = process.env.NEXT_PUBLIC_SOCKET_MODE;
  if (mode === "mock") return true;

  // Fallback: if not localhost, assume production => mock
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host !== "localhost" && host !== "127.0.0.1") return true;
  }

  return false;
}

export function useSocket() {
  const setConnected = useRealtimeStore((s) => s.setConnected);
  const addEvent = useRealtimeStore((s) => s.addEvent);

  useEffect(() => {
    // ✅ MOCK MODE (Vercel): simulate realtime events
    if (isMockMode()) {
      setConnected(true);
      addEvent({
        type: "system_alert",
        message: "Mock realtime enabled (production) ✅",
        time: new Date().toISOString(),
      });

      const timer = setInterval(() => {
        addEvent({
          type: "new_sale",
          message: `New sale: ₹${Math.floor(Math.random() * 900) + 50}`,
          time: new Date().toISOString(),
        });

        addEvent({
          type: "order_updated",
          message: `Order ${Math.random().toString(16).slice(2, 10)} → ${
            ["Pending", "Completed", "Cancelled"][Math.floor(Math.random() * 3)]
          }`,
          time: new Date().toISOString(),
        });

        addEvent({
          type: "user_registered",
          message: `New user registered: ${
            ["Sandeep", "Vamshi", "Sai", "Kiran"][Math.floor(Math.random() * 4)]
          }`,
          time: new Date().toISOString(),
        });
      }, 5000);

      return () => clearInterval(timer);
    }

    // ✅ LOCAL MODE: real Socket.IO (localhost:4000)
    const socket = getSocket();

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("system_alert", (p: any) =>
      addEvent({
        type: "system_alert",
        message: p.message,
        time: new Date().toISOString(),
      })
    );

    socket.on("new_sale", (p: any) =>
      addEvent({
        type: "new_sale",
        message: `New sale: ₹${p.amount}`,
        time: p.time,
      })
    );

    socket.on("order_updated", (p: any) =>
      addEvent({
        type: "order_updated",
        message: `Order ${p.orderId} → ${p.status}`,
        time: p.time,
      })
    );

    socket.on("user_registered", (p: any) =>
      addEvent({
        type: "user_registered",
        message: `New user registered: ${p.name}`,
        time: p.time,
      })
    );

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("system_alert");
      socket.off("new_sale");
      socket.off("order_updated");
      socket.off("user_registered");
    };
  }, [setConnected, addEvent]);
}
