import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CoinContextType {
  coinIds: string[];
  addCoin: (coinId: string) => void;
  removeCoin: (coinId: string) => void;
}

export const useCoinStore = create(
  persist<CoinContextType>(
    (set) => ({
      coinIds: [],
      addCoin: (coinId: string) =>
        set((state) => ({
          coinIds: [coinId, ...state.coinIds],
        })),
      removeCoin: (coinId: string) =>
        set((state) => ({
          coinIds: state.coinIds.filter((id) => id !== coinId),
        })),
    }),
    {
      name: "coin-storage",
    },
  ),
);
