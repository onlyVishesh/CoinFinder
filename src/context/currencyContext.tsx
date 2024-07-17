import { create } from "zustand";

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
}

export const useCurrencyStore = create<CurrencyContextType>()((set) => ({
  currency: "usd",
  setCurrency: (currency: string) => set({ currency }),
}));
