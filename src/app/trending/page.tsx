"use client";

import Card from "@/components/Card";
import CardShimmer from "@/components/CardShimmer";
import { useToast } from "@/components/ui/use-toast";
import { trendingApi } from "@/config/api";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

type TrendingCoins = Array<{
  item: {
    id: string;
    score: number;
    name: string;
    symbol: string;
    large: string;
    market_cap_rank: number;
    data: {
      price: number;
    };
  };
}>;

export default function Page() {
  const { toast } = useToast();
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoins>([]);

  const getTrendingCoins = async () => {
    try {
      const response = await axios.get(trendingApi);
      setTrendingCoins(response.data.coins);
    } catch (error) {
      let errorMessage = "An unknown error occurred";

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const errorCode = axiosError.response
          ? axiosError.response.status
          : "Unknown status";
        const errorData = axiosError.response?.data as any;
        const errorStatusText = errorData?.status?.error_message
          ? errorData.status.error_message.split(".")[0]
          : "Unknown status";
        const errorType = axiosError.name || "Unknown error type";
        errorMessage = `
        ${errorCode} ${errorStatusText} (${errorType})
        Try Again Later`;
      } else if (error instanceof Error) {
        errorMessage = `
        ${error.name}: ${error.message}
        Try Again Later`;
      }

      toast({
        variant: "destructive",
        title: "Error Occurred",
        description: errorMessage,
      });
    }
  };

  useEffect(() => {
    getTrendingCoins();
  }, []);

  return (
    <div className="mx-auto my-6 flex w-[95%] flex-wrap justify-center gap-5 rounded-md sm:gap-10 md:w-[80%]">
      {trendingCoins.length === 0
        ? new Array(15)
            .fill(null)
            .map((_, index) => <CardShimmer key={index} />)
        : trendingCoins.map((coin) => (
            <Card key={coin.item.id} item={coin.item} />
          ))}
    </div>
  );
}
