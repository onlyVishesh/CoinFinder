"use client";

import ChartCard from "@/app/coin/[id]/ChartCard";
import { useToast } from "@/components/ui/use-toast";
import { coinDataApi } from "@/config/api";
import { useCoinStore } from "@/context/coinsContext";
import axios, { AxiosError } from "axios";
import { ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import AboutCoin from "./AboutCoin";
import AboutCoinShimmer from "./AboutCoinShimmer";
import ChartCardShimmer from "./ChartCardShimmer";
import Overview from "./Overview";
import OverviewShimmer from "./OverViewShimmer";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  description: { [key: string]: string };
  links: { [key: string]: [string] | string };
  market_cap_rank: number | null;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  thumb: string;
  market_data: {
    market_cap: { [currency: string]: number };
    current_price: { [currency: string]: number };
    fully_diluted_valuation: { [currency: string]: number };
    market_cap_change_percentage_24h_in_currency: {
      [currency: string]: number;
    };
    total_supply: number;
    max_supply: number;
    circulating_supply: number;
    ath: { [currency: string]: number };
    ath_change_percentage: { [currency: string]: number };
    ath_date: { [currency: string]: string };
    atl: { [currency: string]: number };
    atl_change_percentage: { [currency: string]: number };
    atl_date: { [currency: string]: string };
    high_24h: { [currency: string]: number };
    low_24h: { [currency: string]: number };
    price_change_24h_in_currency: { [currency: string]: number };
    price_change_percentage_1h_in_currency: { [currency: string]: number };
    price_change_percentage_24h_in_currency: { [currency: string]: number };
    price_change_percentage_7d_in_currency: { [currency: string]: number };
    price_change_percentage_30d_in_currency: { [currency: string]: number };
    price_change_percentage_1y_in_currency: { [currency: string]: number };
  };
  categories: string[];
};

const Page = ({ params }: { params: { id: string } }) => {
  const { toast } = useToast();
  const [coinData, setCoinData] = useState<Coin | null>(null);
  const { coinIds, addCoin, removeCoin } = useCoinStore();

  const onToggleWatchList = (coinId: string) => {
    const isCoinInWatchlist = coinIds.includes(coinId);
    if (isCoinInWatchlist) {
      removeCoin(coinId);
    } else {
      addCoin(coinId);
    }
  };

  const getCoinData = async (coinId: string) => {
    try {
      const response = await axios.get(coinDataApi(coinId));
      setCoinData(response.data);
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
    getCoinData(params.id);
  }, [params.id]);

  if (coinData === null)
    return (
      <div className="mx-auto my-6 h-screen w-[95%] flex-wrap justify-center gap-5 rounded-md sm:gap-10 md:w-[90%] xl:w-[80%]">
        <div className="flex items-center justify-between">
          <Link href="/">
            <ArrowLeft
              strokeWidth={3}
              className="size-8 rounded-full border-2 border-zinc-400 p-1 text-zinc-300 duration-150 hover:bg-zinc-700 hover:text-zinc-100 sm:size-10"
            />
          </Link>
          <h1 className="h-10 w-60 animate-pulse rounded-lg bg-zinc-800 sm:w-80"></h1>
          <div className="size-6 animate-pulse rounded-full bg-zinc-800 sm:size-8" />
        </div>

        <div className="mb-4 mt-4 flex flex-col items-stretch gap-7 md:mt-8 lg:mt-16 lg:flex-row">
          <ChartCardShimmer />
          <OverviewShimmer />
        </div>
        <div className="flex-1">
          <AboutCoinShimmer />
        </div>
      </div>
    );

  const isCoinInWatchlist = coinIds.includes(coinData.id);

  return (
    <div className="mx-auto my-6 h-screen w-[95%] flex-wrap justify-center gap-5 rounded-md sm:gap-10 md:w-[90%] xl:w-[80%]">
      <div className="flex items-center justify-between">
        <Link href="/">
          <ArrowLeft
            strokeWidth={3}
            className="size-8 rounded-full border-2 border-zinc-400 p-1 text-zinc-300 duration-150 hover:bg-zinc-700 hover:text-zinc-100 sm:size-10"
          />
        </Link>
        <h1 className="text-3xl font-bold sm:text-4xl">
          {coinData.name} ({coinData.symbol.toUpperCase()})
        </h1>
        <Star
          strokeWidth={2}
          className={`size-6 sm:size-8 ${isCoinInWatchlist ? "fill-yellow-400 text-yellow-500" : ""}`}
          onClick={() => {
            onToggleWatchList(coinData.id);
          }}
        />
      </div>

      <div className="mb-4 mt-4 flex flex-col items-stretch gap-7 md:mt-8 lg:mt-16 lg:flex-row">
        <ChartCard
          data={{
            id: coinData.id,
            marketData: {
              current_price: coinData.market_data.current_price,
              price_change_24h_in_currency:
                coinData.market_data.price_change_24h_in_currency,
              price_change_percentage_1h_in_currency:
                coinData.market_data.price_change_percentage_1h_in_currency,
              price_change_percentage_24h_in_currency:
                coinData.market_data.price_change_percentage_24h_in_currency,
              price_change_percentage_7d_in_currency:
                coinData.market_data.price_change_percentage_7d_in_currency,
              price_change_percentage_30d_in_currency:
                coinData.market_data.price_change_percentage_30d_in_currency,
              price_change_percentage_1y_in_currency:
                coinData.market_data.price_change_percentage_1y_in_currency,
            },
          }}
        />
        <Overview
          data={{
            marketData: {
              market_cap_rank: coinData.market_cap_rank,
              current_price: coinData.market_data.current_price,
              market_cap: coinData.market_data.market_cap,
              market_cap_change_percentage_24h_in_currency:
                coinData.market_data
                  .market_cap_change_percentage_24h_in_currency,
              total_supply: coinData.market_data.total_supply,
              max_supply: coinData.market_data.max_supply,
              circulating_supply: coinData.market_data.circulating_supply,
              ath: coinData.market_data.ath,
              ath_change_percentage: coinData.market_data.ath_change_percentage,
              ath_date: coinData.market_data.ath_date,
              atl: coinData.market_data.atl,
              atl_change_percentage: coinData.market_data.atl_change_percentage,
              atl_date: coinData.market_data.atl_date,
              fully_diluted_valuation:
                coinData.market_data.fully_diluted_valuation,
              high_24h: coinData.market_data.high_24h,
              low_24h: coinData.market_data.low_24h,
            },
            categories: coinData.categories,
            symbol: coinData.symbol,
          }}
        />
      </div>
      <div className="flex-1">
        <AboutCoin
          data={{
            description: coinData.description,
            links: coinData.links,
          }}
        />
      </div>
    </div>
  );
};

export default Page;
