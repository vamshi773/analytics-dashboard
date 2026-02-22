import { create } from "zustand";

type LiveEvent = {
  type: string;
  message: string;
  time: string;
};

type RealtimeState = {
  connected: boolean;
  events: LiveEvent[];
  setConnected: (v: boolean) => void;
  addEvent: (e: LiveEvent) => void;
};

export const useRealtimeStore = create<RealtimeState>((set) => ({
  connected: false,
  events: [],
  setConnected: (v) => set({ connected: v }),
  addEvent: (e) =>
    set((s) => ({
      events: [e, ...s.events].slice(0, 10),
    })),
}));
