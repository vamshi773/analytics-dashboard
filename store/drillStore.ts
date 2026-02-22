import { create } from "zustand";

type DrillState = {
  selectedCategory: string | null;
  setSelectedCategory: (v: string | null) => void;

  showRevenue: boolean;
  showCategory: boolean;
  toggleRevenue: () => void;
  toggleCategory: () => void;
};

export const useDrillStore = create<DrillState>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (v) => set({ selectedCategory: v }),

  showRevenue: true,
  showCategory: true,
  toggleRevenue: () => set((s) => ({ showRevenue: !s.showRevenue })),
  toggleCategory: () => set((s) => ({ showCategory: !s.showCategory })),
}));
