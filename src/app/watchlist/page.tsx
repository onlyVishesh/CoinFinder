"use client";

import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { watchCoinDataApi } from "@/config/api";
import { supportedCurrencies } from "@/config/constant";
import { useCoinStore } from "@/context/coinsContext";
import { useCurrencyStore } from "@/context/currencyContext";
import { cn } from "@/lib/utils";
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  StepBack,
} from "lucide-react";
import { useRouter } from "next/navigation";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  market_cap_rank: number | null;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  thumb: string;
};

export default function Home() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { coinIds } = useCoinStore();

  const [coinData, setCoinData] = useState<Coin[]>([]);
  const { currency, setCurrency } = useCurrencyStore();
  const [inputCurrency, setInputCurrency] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [inputPerPage, setInputPerPage] = useState<number | string>();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  const getCoinsData = async () => {
    try {
      console.log(coinIds);
      console.log(watchCoinDataApi(coinIds, currency, perPage, page, filter));
      const response = await axios.get(
        watchCoinDataApi(coinIds, currency, perPage, page, filter),
      );
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

  useEffect(() => {
    getCoinsData();
  }, [currency, perPage, page, filter]);

  return (
    <>
      <div className="mx-auto my-4 flex w-[95%] flex-col items-center gap-5 rounded-md border-2 border-zinc-900 md:w-[80%]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[125px] text-lg font-bold hover:cursor-pointer sm:w-[200px] md:w-[250px] lg:w-[300px]"
                onClick={() => {
                  filter !== "id_desc" && setFilter("id_desc");
                  filter !== "id_asc" && setFilter("id_asc");
                }}
              >
                <div className="flex items-center justify-start gap-2">
                  Coins{" "}
                  {filter === "id_asc" ? (
                    <ArrowDownWideNarrow className="size-5" />
                  ) : filter === "id_desc" ? (
                    <ArrowUpWideNarrow className="size-5" />
                  ) : (
                    <ArrowDownUp className="size-5" />
                  )}
                </div>
              </TableHead>
              <TableHead className="text-right text-lg font-bold">
                Price
              </TableHead>
              <TableHead
                className="text-right text-lg font-bold hover:cursor-pointer"
                onClick={() => {
                  filter !== "market_cap_desc" && setFilter("market_cap_desc");
                  filter !== "market_cap_asc" && setFilter("market_cap_asc");
                }}
              >
                <div className="flex items-center justify-end gap-2">
                  Rank{" "}
                  {filter === "market_cap_asc" ? (
                    <ArrowDownWideNarrow className="size-5" />
                  ) : filter === "market_cap_desc" ? (
                    <ArrowUpWideNarrow className="size-5" />
                  ) : (
                    <ArrowDownUp className="size-5" />
                  )}
                </div>
              </TableHead>
              <TableHead className="text-right text-lg font-bold">1H</TableHead>
              <TableHead className="text-right text-lg font-bold">
                24H
              </TableHead>
              <TableHead className="text-right text-lg font-bold">7D</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coinData.length === 0
              ? new Array(perPage).fill(null).map((_, index) => (
                  <TableRow key={index} className="animate-pulse">
                    <TableCell className="flex items-center gap-5 font-medium">
                      <div className="size-9 rounded-full bg-zinc-800" />
                      <div className="flex flex-col gap-2">
                        <div className="h-4 w-32 rounded-md bg-zinc-800 md:w-48"></div>
                        <div className="h-3 w-20 rounded-md bg-zinc-800"></div>
                      </div>
                    </TableCell>
                    <TableCell className="relative">
                      <div className="absolute right-0 top-1/2 h-3 w-9 -translate-y-1/2 rounded-md bg-zinc-800 md:w-16 lg:w-20"></div>
                    </TableCell>
                    <TableCell className="relative">
                      <div className="absolute right-0 top-1/2 h-3 w-9 -translate-y-1/2 rounded-md bg-zinc-800 md:w-16 lg:w-20"></div>
                    </TableCell>
                    <TableCell className="relative">
                      <div className="absolute right-0 top-1/2 h-3 w-9 -translate-y-1/2 rounded-md bg-zinc-800 md:w-14 lg:w-20"></div>
                    </TableCell>
                    <TableCell className="relative">
                      <div className="absolute right-0 top-1/2 h-3 w-9 -translate-y-1/2 rounded-md bg-zinc-800 md:w-14 lg:w-20"></div>
                    </TableCell>
                    <TableCell className="relative">
                      <div className="absolute right-0 top-1/2 h-3 w-9 -translate-y-1/2 rounded-md bg-zinc-800 md:w-14 lg:w-20"></div>
                    </TableCell>
                  </TableRow>
                ))
              : coinData.map((coin, index) => (
                  <TableRow
                    key={coin.id}
                    className="hover:cursor-pointer"
                    onClick={() => handleCoinClick(coin.id)}
                  >
                    <TableCell className="flex items-center gap-5 font-medium">
                      <img
                        src={coin?.image}
                        alt={coin?.name}
                        className="size-7"
                      />
                      <div className="flex flex-col gap-1">
                        <div>
                          {coin?.name.slice(0, 1).toUpperCase() +
                            coin?.name.slice(1)}
                        </div>
                        <div>{coin?.symbol.toUpperCase()}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {coin?.current_price === null
                        ? "NA"
                        : coin?.current_price.toLocaleString("en-US", {
                            style: "currency",
                            currency: currency,
                          })}
                    </TableCell>
                    <TableCell className="text-right">
                      {coin.market_cap_rank === null
                        ? "NA"
                        : coin.market_cap_rank}
                    </TableCell>
                    <TableCell
                      className={cn("text-right text-zinc-300", {
                        "text-green-500":
                          coin.price_change_percentage_1h_in_currency > 0,
                        "text-red-500":
                          coin.price_change_percentage_1h_in_currency < 0,
                      })}
                    >
                      {Math.round(
                        coin.price_change_percentage_1h_in_currency * 100,
                      ) / 100}
                      %
                    </TableCell>
                    <TableCell
                      className={cn("text-right text-zinc-300", {
                        "text-green-500":
                          coin.price_change_percentage_24h_in_currency > 0,
                        "text-red-500":
                          coin.price_change_percentage_24h_in_currency < 0,
                      })}
                    >
                      {Math.round(
                        coin.price_change_percentage_24h_in_currency * 100,
                      ) / 100}
                      %
                    </TableCell>
                    <TableCell
                      className={cn("text-right text-zinc-300", {
                        "text-green-500":
                          coin.price_change_percentage_7d_in_currency > 0,
                        "text-red-500":
                          coin.price_change_percentage_7d_in_currency < 0,
                      })}
                    >
                      {Math.round(
                        coin.price_change_percentage_7d_in_currency * 100,
                      ) / 100}
                      %
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center justify-center gap-2">
          <div>Per Page</div>
          <Input
            className="w-14 placeholder:text-zinc-500"
            placeholder={perPage.toString()}
            value={inputPerPage}
            onChange={(e) => {
              setInputPerPage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (
                  inputPerPage === "" ||
                  (Number(inputPerPage) >= 1 && Number(inputPerPage) <= 100)
                ) {
                  setPerPage(
                    Number(inputPerPage) === 0 ? 10 : Number(inputPerPage),
                  );
                }
                setInputPerPage("");
              }
            }}
            type="number"
          />
        </div>
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

        <div className="flex items-center justify-center gap-3 text-sm">
          <StepBack
            onClick={() => {
              page - 1 > 0 && setPage(1);
            }}
          />
          {page - 1 > 0 ? (
            <div
              className="flex size-9 select-none items-center justify-center rounded-full bg-zinc-800 hover:cursor-pointer"
              onClick={() => {
                page - 1 > 0 && setPage(page - 1);
              }}
            >
              {page - 1}
            </div>
          ) : null}
          <div className="flex size-9 select-none items-center justify-center rounded-full bg-primary">
            {page}
          </div>
          {Math.round(coinIds.length / perPage) > page + 1 ? (
            <div
              className="flex size-9 select-none items-center justify-center rounded-full bg-zinc-800 hover:cursor-pointer"
              onClick={() => {
                page <= Math.round(coinIds.length / perPage) &&
                  setPage(page + 1);
              }}
            >
              {page + 1}
            </div>
          ) : null}
          {Math.round(coinIds.length / perPage) > page + 5 ? (
            <div className="select-none">...</div>
          ) : null}

          {Math.round(coinIds.length / perPage) > page ? (
            <div
              className="flex size-9 select-none items-center justify-center rounded-full bg-zinc-800 hover:cursor-pointer"
              onClick={() => {
                setPage(Math.round(coinIds.length / perPage));
              }}
            >
              {Math.round(coinIds.length / perPage)}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
