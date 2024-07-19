import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
}

export const useCurrencyStore = create<CurrencyContextType>()(
  persist(
    (set) => ({
      currency: "usd",
      setCurrency: (currency: string) => set({ currency }),
    }),
    {
      name: "currency-storage",
    },
  ),
);
