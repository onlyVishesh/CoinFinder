"use client";

import Card from "@/components/Card";
import CardShimmer from "@/components/CardShimmer";
import { trendingApi } from "@/config/api";
import axios from "axios";
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
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoins>([]);

  const getTrendingCoins = async () => {
    const response = await axios.get(trendingApi);
    setTrendingCoins(response.data.coins);
    console.log(response.data.coins);
  };

  useEffect(() => {
    getTrendingCoins();
  }, []);

  return (
    <div className="mx-auto my-6 flex w-[95%] flex-wrap justify-center gap-5 rounded-md sm:gap-10 md:w-[80%]">
      {trendingCoins.length === 0
        ? new Array(15).fill(null).map((_, index) => <CardShimmer key={index} />)
        : trendingCoins.map((coin) => (
            <Card key={coin.item.id} item={coin.item} />
          ))}
    </div>
  );
}
