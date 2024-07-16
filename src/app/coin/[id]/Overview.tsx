"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import {
  formatCurrency,
  getISODate,
  nFormatter,
  supportedCurrencies,
} from "@/config/constant";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  AreaChart,
  BarChart,
  Container,
  HandCoins,
  Layers,
  Layers2,
  Lightbulb,
  Medal,
  Shapes,
} from "lucide-react";
import { useState } from "react";

type MarketData = {
  market_cap_rank: number | null;
  current_price: { [currency: string]: number };
  market_cap: { [currency: string]: number };
  market_cap_change_percentage_24h_in_currency: {
    [currency: string]: number;
  };
  fully_diluted_valuation: { [currency: string]: number };
  total_supply: number | null;
  max_supply: number | null;
  circulating_supply: number | null;
  ath: { [currency: string]: number };
  ath_change_percentage: { [currency: string]: number };
  ath_date: { [currency: string]: string };
  atl: { [currency: string]: number };
  atl_change_percentage: { [currency: string]: number };
  atl_date: { [currency: string]: string };
  high_24h: { [currency: string]: number };
  low_24h: { [currency: string]: number };
};

type OverviewProps = {
  data: {
    marketData: MarketData;
    categories: string[];
    symbol: string;
  };
};

const Overview = ({ data }: OverviewProps) => {
  const { toast } = useToast();
  const [priceRange, setPriceRange] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [inputCurrency, setInputCurrency] = useState("");
  const { marketData, categories, symbol } = data;

  const isValidCurrency = (currency: string) => {
    return supportedCurrencies.includes(currency.toLowerCase());
  };

  const handleCurrencyInput = () => {
    if (!isValidCurrency(inputCurrency)) {
      toast({
        variant: "destructive",
        title: "Invalid Currency",
        description: `"${inputCurrency}" is not a supported currency.`,
      });
      return;
    }
    setCurrency(inputCurrency);
  };

  return (
    <div className="flex flex-col gap-7 rounded-lg border-[0.5px] border-zinc-800 bg-[#1B1816] p-8 md:p-2 lg:p-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-1 justify-between">
          <h2 className="text-2xl font-semibold">About</h2>
          <div className="flex items-center justify-center gap-3 text-sm text-zinc-400">
            <div className="flex items-center justify-center gap-2">
              <div>Currency</div>
              <Input
                className="w-14 placeholder:text-zinc-500"
                placeholder={currency.toUpperCase()}
                value={inputCurrency}
                onChange={(e) => {
                  setInputCurrency(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCurrencyInput();
                    setInputCurrency("");
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="m-auto w-full text-sm lg:w-[90%] lg:text-lg">
          <ul className="flex flex-col justify-center gap-3">
            <li className="flex items-center justify-between gap-2 text-zinc-400">
              <span className="flex items-center gap-2">
                <Medal className="size-5" /> Rank :
              </span>
              <span className="text-right font-semibold text-zinc-200">
                {marketData.market_cap_rank !== null
                  ? marketData.market_cap_rank
                  : "NA"}
              </span>
            </li>
            <li className="flex items-center justify-between gap-2 text-zinc-400">
              <span className="flex items-center gap-2">
                <AreaChart className="size-5" /> Market Cap :
              </span>
              <span className="text-right font-semibold text-zinc-200">
                {formatCurrency(marketData?.market_cap[currency], currency)}{" "}
                <span
                  className={cn("text-zinc-400", {
                    "text-red-500":
                      marketData.market_cap_change_percentage_24h_in_currency[
                        currency
                      ] < 0,
                    "text-green-500":
                      marketData.market_cap_change_percentage_24h_in_currency[
                        currency
                      ] > 0,
                  })}
                >
                  (
                  {marketData.market_cap_change_percentage_24h_in_currency[
                    currency
                  ] > 0 && "+"}
                  {Math.round(
                    marketData.market_cap_change_percentage_24h_in_currency[
                      currency
                    ] * 100,
                  ) / 100}
                  %)
                </span>
              </span>
            </li>
            <li className="flex items-center justify-between gap-2 text-zinc-400">
              <span className="flex items-center gap-2">
                <HandCoins className="size-5" /> Fully Diluted Valuation :
              </span>
              <span className="text-right font-semibold text-zinc-200">
                {formatCurrency(
                  marketData?.fully_diluted_valuation[currency],
                  currency,
                )}
              </span>
            </li>
            <li className="flex items-center justify-between gap-2 text-zinc-400">
              <span className="flex items-center gap-2">
                <Container className="size-5" /> Circulation Supply :
              </span>
              <span className="text-right font-semibold text-zinc-200">
                {marketData.circulating_supply
                  ? nFormatter(marketData.circulating_supply, 2) +
                    " " +
                    symbol.toUpperCase()
                  : "--"}{" "}
                <span className="text-zinc-500">
                  {marketData.circulating_supply !== null &&
                  marketData.total_supply !== null
                    ? "(" +
                      Math.round(
                        (marketData.circulating_supply /
                          marketData.total_supply) *
                          10000,
                      ) /
                        100 +
                      "%)"
                    : null}
                </span>
              </span>
            </li>
            <li className="flex items-center justify-between gap-2 text-zinc-400">
              <span className="flex items-center gap-2">
                <Layers className="size-5" /> Total Supply :
              </span>
              <span className="text-right font-semibold text-zinc-200">
                {marketData.total_supply
                  ? nFormatter(marketData.total_supply, 2) +
                    " " +
                    symbol.toUpperCase()
                  : "--"}
              </span>
            </li>
            <li className="flex items-center justify-between gap-2 text-zinc-400">
              <span className="flex items-center gap-2">
                <Layers2 className="size-5" /> Max. Supply :
              </span>
              <span className="text-right font-semibold text-zinc-200">
                {marketData.max_supply
                  ? nFormatter(marketData.max_supply, 2) +
                    " " +
                    symbol.toUpperCase()
                  : "--"}
              </span>
            </li>
            <li className="flex items-center justify-between gap-2 text-zinc-400">
              <span className="flex items-center gap-2">
                <BarChart className="size-5" /> All Time High :
              </span>
              <span className="text-right text-sm font-semibold text-zinc-200">
                <div>
                  {formatCurrency(marketData?.ath[currency], currency)}{" "}
                  <span
                    className={cn("text-zinc-400", {
                      "text-red-500":
                        marketData.ath_change_percentage[currency] < 0,
                      "text-green-500":
                        marketData.ath_change_percentage[currency] > 0,
                    })}
                  >
                    ({marketData.ath_change_percentage[currency] > 0 && "+"}
                    {Math.round(
                      marketData.ath_change_percentage[currency] * 100,
                    ) / 100}
                    % )
                  </span>
                </div>
                <div className="text-zinc-500">
                  {getISODate(new Date(marketData.ath_date[currency]))}
                </div>
              </span>
            </li>
            <li className="flex items-center justify-between gap-2 text-zinc-400">
              <span className="flex items-center gap-2">
                <BarChart className="size-5 scale-x-[-1]" /> All Time Low :
              </span>
              <span className="text-right text-sm font-semibold text-zinc-200">
                <div>
                  {formatCurrency(marketData?.atl[currency], currency)}{" "}
                  <span
                    className={cn("text-zinc-400", {
                      "text-red-500":
                        marketData.atl_change_percentage[currency] < 0,
                      "text-green-500":
                        marketData.atl_change_percentage[currency] > 0,
                    })}
                  >
                    ({marketData.atl_change_percentage[currency] > 0 && "+"}
                    {Math.round(
                      marketData.atl_change_percentage[currency] * 100,
                    ) / 100}
                    %)
                  </span>
                </div>
                <div className="text-zinc-500">
                  {getISODate(new Date(marketData.atl_date[currency]))}
                </div>
              </span>
            </li>
            <li className="flex items-center justify-between gap-2 text-zinc-400">
              <span className="flex items-center gap-2">
                <Shapes className="size-5" /> Category :
              </span>

              {categories.length > 0 ? (
                <span className="flex gap-3 text-right font-semibold text-zinc-200">
                  {categories[0]}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">more</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="z-[99] w-full rounded-lg !bg-zinc-950 p-2 text-left">
                      {categories.slice(1).map((category) => (
                        <DropdownMenuItem key={category} className="px-2 py-1">
                          {category}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </span>
              ) : (
                "NA"
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="space-y-5">
        <div className="mx-auto flex w-full justify-between lg:w-[70%]">
          <h2 className="text-2xl font-semibold">Price range</h2>
          <div className="flex items-center justify-center gap-3 text-sm text-zinc-400">
            <div
              className={cn(
                "flex size-9 select-none items-center justify-center rounded-full bg-zinc-600 font-semibold text-primary shadow-sm duration-200",
              )}
            >
              1 D
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full flex-col gap-2 lg:w-[70%]">
          <Slider defaultValue={[100-Math.round(
                  ((marketData.high_24h[currency] -
                    marketData.current_price[currency]) /
                    (marketData.high_24h[currency] -
                    marketData.low_24h[currency])) *
                    10000,
                ) / 100]} max={100} step={1} />
          <div className="flex justify-between">
            <div>
              <div>Low</div>
              <div>
                {formatCurrency(marketData.low_24h[currency], currency)}
              </div>
            </div>
            <div className="text-right">
              <div>High</div>
              <div>
                {formatCurrency(marketData.low_24h[currency], currency)}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full justify-center lg:w-[70%]">
          <div className="flex items-center justify-center gap-2 rounded-lg bg-zinc-500/50 p-2 px-1">
            <Lightbulb className="size-6" />{" "}
            <span>
              Currently price is{" "}
              <span className="font-semibold text-zinc-50">
                {Math.round(
                  ((marketData.high_24h[currency] -
                    marketData.current_price[currency]) /
                    (marketData.high_24h[currency] -
                    marketData.low_24h[currency])) *
                    10000,
                ) / 100}
                %
              </span>{" "}
              lower than its 24 hours high price
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
