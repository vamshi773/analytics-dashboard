import { create } from "zustand";

type UIState = {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  hydrate: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,

  setSidebarCollapsed: (v) => {
    set({ sidebarCollapsed: v });
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebarCollapsed", JSON.stringify(v));
    }
  },

  hydrate: () => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("sidebarCollapsed");
    if (!raw) return;
    try {
      set({ sidebarCollapsed: JSON.parse(raw) });
    } catch {}
  },
}));