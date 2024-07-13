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
import { coinListApi, coinsDataApi, searchApi } from "@/config/api";
import { cn } from "@/lib/utils";
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  Search,
  StepBack,
} from "lucide-react";

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
  const [coins, setCoins] = useState<Coin[]>([]);
  const [coinData, setCoinData] = useState<Coin[]>([]);
  const [currency, setCurrency] = useState("inr");
  const [inputCurrency, setInputCurrency] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [inputPerPage, setInputPerPage] = useState<number | string>();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<Coin[]>([]);

  const getCoins = async () => {
    const response = await axios.get(coinListApi);
    setCoins(response.data);
  };

  const getCoinsData = async () => {
    // const data = coins.slice(perPage * page - perPage, perPage * page);
    const response = await axios.get(
      coinsDataApi(currency, perPage, page, filter),
    );
    setCoinData(response.data);
  };

  const getSearchData = async (query: string) => {
    try {
      const response = await axios(searchApi(query));
      const data = response.data.coins;
      setSearchResult(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching search data:", error);
      setSearchResult([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getSearchData(searchValue);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    getCoins();
  }, []);

  useEffect(() => {
    getCoinsData();
  }, [currency, perPage, page, filter]);

  return (
    <>
      <div className="mx-auto my-4 flex w-[95%] flex-col items-center rounded-md md:w-[80%]">
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
              "absolute right-2 top-1/2 -translate-y-1/2 opacity-0 duration-200 hover:cursor-pointer",
              {
                "opacity-0": showSearch,
                "opacity-100": !showSearch,
              },
            )}
          />

          <div
            className={cn(
              "absolute top-full z-10 mt-2 w-96 flex-col gap-1 rounded-b-md bg-zinc-900/95",
              {
                hidden: !showSearch || searchValue.length === 0,
                flex: showSearch && searchValue.length !== 0,
              },
            )}
          >
            {searchResult.length === 0 ? (
              <div>
                <div className="flex justify-between px-4 py-2">
                  No result found
                </div>
              </div>
            ) : searchResult.length > 10 ? (
              searchResult.slice(0, 9).map((result) => (
                <div
                  key={result.id}
                  className="flex justify-between px-4 py-2 text-sm hover:cursor-pointer hover:bg-zinc-800"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={result?.thumb}
                      alt={result?.name}
                      className="size-7"
                    />
                    <div className="flex flex-col">
                      <div>{result.name}</div>
                      <div className="text-xs">{result?.symbol}</div>
                    </div>
                  </div>
                  <div>{result?.market_cap_rank}</div>
                </div>
              ))
            ) : (
              searchResult.map((result) => (
                <div
                  key={result.id}
                  className="flex justify-between px-4 py-2 text-sm hover:cursor-pointer hover:bg-zinc-800"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={result?.thumb}
                      alt={result?.name}
                      className="size-7"
                    />
                    <div className="flex flex-col">
                      <div>{result?.name}</div>
                      <div className="text-xs">{result?.symbol}</div>
                    </div>
                  </div>
                  <div>
                    {result.market_cap_rank === null
                      ? "NA"
                      : result.market_cap_rank}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

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
            placeholder="10"
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
              }
            }}
            type="number"
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <div>Currency</div>
          <Input
            className="w-14 placeholder:text-zinc-500"
            placeholder="USD"
            value={inputCurrency}
            onChange={(e) => {
              setInputCurrency(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                {
                  setCurrency(inputCurrency);
                }
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
          {Math.round(coins.length / perPage) > page + 1 ? (
            <div
              className="flex size-9 select-none items-center justify-center rounded-full bg-zinc-800 hover:cursor-pointer"
              onClick={() => {
                page <= Math.round(coins.length / perPage) && setPage(page + 1);
              }}
            >
              {page + 1}
            </div>
          ) : null}
          {Math.round(coins.length / perPage) > page + 5 ? (
            <div className="select-none">...</div>
          ) : null}

          {Math.round(coins.length / perPage) > page ? (
            <div
              className="flex size-9 select-none items-center justify-center rounded-full bg-zinc-800 hover:cursor-pointer"
              onClick={() => {
                setPage(Math.round(coins.length / perPage));
              }}
            >
              {Math.round(coins.length / perPage)}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
