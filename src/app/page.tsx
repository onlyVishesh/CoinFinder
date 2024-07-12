"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  market_cap_rank: number;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
};

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [coinData, setCoinData] = useState<Coin[]>([]);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const [perPage, setPerPage] = useState(10);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const getCoins = async () => {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/list`,
    );
    setCoins(response.data);
  };
  const getCoinData = async (coinId: string) => {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}&per_page=10`,
    );
    setCoinData(response.data);
    console.log(coinData);
  };
  const getCoinsData = async () => {
    const data = coins.slice(perPage * page - perPage, perPage * page);
    console.log(data);
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${data.map((coin) => coin.id).join("%2C")}&per_page=${perPage}&page=${page}&price_change_percentage=1h%2C24h%2C7d&precision=2`,
    );
    setCoinData(response.data);
    console.log(coinData);
  };

  useEffect(()=>{
    getCoins();
  },[])

  useEffect(() => {
    getCoinsData();
  }, [page, currency, perPage]);

  return (
    <>
      <div className="mx-auto my-10 flex w-[95%] flex-col items-center rounded-md md:w-[80%]">
        <div className="relative flex">
          <Input
            className="w-96"
            placeholder="Search Any Coin"
            value={searchValue}
            onFocus={() => {
              setShowSearch(true);
            }}
            onBlur={() => {
              setShowSearch(false);
            }}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <Search
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 opacity-0 duration-100 hover:cursor-pointer",
              {
                "opacity-0": showSearch,
                "opacity-100": !showSearch,
              },
            )}
          />

          <div
            className={cn(
              "absolute -top-full z-10 w-96 translate-y-1/4 flex-col gap-1 rounded-b-md bg-zinc-900/95 px-4 py-2 duration-1000",
              {
                hidden: !showSearch || searchValue.length === 0,
                flex: showSearch && searchValue.length !== 0,
              },
            )}
          >
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
          </div>
        </div>
      </div>

      <div className="mx-auto my-10 flex w-[95%] flex-col items-center gap-5 rounded-md border-2 border-zinc-900 md:w-[80%]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[125px] text-lg font-bold sm:w-[200px] md:w-[250px] lg:w-[300px]">
                Coin
              </TableHead>
              <TableHead className="text-right text-lg font-bold">
                Price
              </TableHead>
              <TableHead className="text-right text-lg font-bold">
                Rank
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
              : coinData.map((coin) => (
                  <TableRow key={coin?.id} className="hover:cursor-pointer">
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
                      {coin?.current_price.toLocaleString("en-US", {
                        style: "currency",
                        currency: currency,
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {coin.market_cap_rank}
                    </TableCell>
                    <TableCell
                      className={cn("text-right", {
                        "text-green-500":
                          coin.price_change_percentage_1h_in_currency > 0,
                        "text-red-500":
                          coin.price_change_percentage_1h_in_currency < 0,
                        "text-zinc-500":
                          coin.price_change_percentage_1h_in_currency === 0,
                      })}
                    >
                      {Math.round(
                        coin.price_change_percentage_1h_in_currency * 100,
                      ) / 100}
                    </TableCell>
                    <TableCell
                      className={cn("text-right", {
                        "text-green-500":
                          coin.price_change_percentage_24h_in_currency > 0,
                        "text-red-500":
                          coin.price_change_percentage_24h_in_currency < 0,
                        "text-zinc-500":
                          coin.price_change_percentage_24h_in_currency === 0,
                      })}
                    >
                      {Math.round(
                        coin.price_change_percentage_24h_in_currency * 100,
                      ) / 100}
                    </TableCell>
                    <TableCell
                      className={cn("text-right", {
                        "text-green-500":
                          coin.price_change_percentage_7d_in_currency > 0,
                        "text-red-500":
                          coin.price_change_percentage_7d_in_currency < 0,
                        "text-zinc-500":
                          coin.price_change_percentage_7d_in_currency === 0,
                      })}
                    >
                      {Math.round(
                        coin.price_change_percentage_7d_in_currency * 100,
                      ) / 100}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
