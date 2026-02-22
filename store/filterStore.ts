import { create } from "zustand";

type FilterState = {
  rangeDays: number;
  search: string;
  setRangeDays: (days: number) => void;
  setSearch: (value: string) => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  rangeDays: 7,
  search: "",
  setRangeDays: (days) => set({ rangeDays: days }),
  setSearch: (value) => set({ search: value }),
}));
