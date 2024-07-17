"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useToast } from "@/components/ui/use-toast";
import { coinGraphDataApi } from "@/config/api";
import { formatCurrency } from "@/config/constant";
import { useCurrencyStore } from "@/context/currencyContext";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type MarketData = {
  current_price: { [currency: string]: number };
  price_change_24h_in_currency: { [currency: string]: number };
  price_change_percentage_1h_in_currency: { [currency: string]: number };
  price_change_percentage_24h_in_currency: { [currency: string]: number };
  price_change_percentage_7d_in_currency: { [currency: string]: number };
  price_change_percentage_30d_in_currency: { [currency: string]: number };
  price_change_percentage_1y_in_currency: { [currency: string]: number };
  [key: string]: any;
};

type OverviewProps = {
  data: {
    id: string;
    marketData: MarketData;
  };
};

export default function ChartCard({ data }: OverviewProps) {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--primary))",
    },
  };

  const { toast } = useToast();

  const { currency } = useCurrencyStore();
  const { id, marketData } = data;

  const [timeRange, setTimeRange] = useState("1h");
  const [dynamicProperty, setDynamicProperty] = useState(
    "price_change_percentage_1h_in_currency",
  );

  const [tempChartData, setTempChartData] = useState([]);
  const [chartData, setChartData] = useState<{ date: string; price: number; }[]>([]);

  useEffect(() => {
    setDynamicProperty(`price_change_percentage_${timeRange}_in_currency`);
  }, [timeRange]);

  const [from, setFrom] = useState(Math.floor(Date.now() / 1000) - 3600);
  const [to] = useState(Math.floor(Date.now() / 1000));

  const getCoinChartData = async (
    coinId: string,
    currency: string,
    from: number,
    to: number,
  ) => {
    try {
      const response = await axios.get(
        coinGraphDataApi(coinId, currency, from, to),
      );
      setTempChartData(response.data.prices);
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
    getCoinChartData(id, currency, from, to);
  }, [currency,from]);
  useEffect(() => {
    if (tempChartData.length > 0) {
      const formattedChartData = tempChartData.map(([timestamp, price]) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return {
          date: `${year}-${month}-${day} ${hours}:${minutes}`,
          price: Math.round(price * 100) / 100,
        };
      });
      setChartData(formattedChartData);
      console.log(formattedChartData);
    }

  }, [tempChartData]);

  if (chartData.length === 0) return;

  return (
    <Card className="flex-1 self-auto lg:self-stretch">
      <CardHeader>
        <CardTitle className="my-2 flex justify-center text-3xl">
          {marketData?.current_price === null
            ? "NA"
            : marketData?.current_price[currency].toLocaleString("en-US", {
                style: "currency",
                currency: currency,
              })}
        </CardTitle>
        <CardDescription className="flex items-center justify-center divide-x-2 divide-gray-400">
          <span className="px-4">
            <span
              className={cn("text-zinc-400", {
                "text-red-500":
                  marketData.price_change_24h_in_currency[currency] < 0,
                "text-green-500":
                  marketData.price_change_24h_in_currency[currency] > 0,
              })}
            >
              {marketData.price_change_24h_in_currency[currency] > 0 && "+"}
              {marketData?.price_change_24h_in_currency[
                currency
              ].toLocaleString("en-US", {
                style: "currency",
                currency: currency,
              })}
            </span>
          </span>
          <span className="px-4">
            <span
              className={cn("text-zinc-400", {
                "text-red-500": marketData[dynamicProperty][currency] < 0,
                "text-green-500": marketData[dynamicProperty][currency] > 0,
              })}
            >
              {marketData[dynamicProperty][currency] > 0 && "+"}
              {marketData[dynamicProperty][currency]}
            </span>
          </span>
          <span className="px-4">
            Past{" "}
            {timeRange === "1h"
              ? "1 hour"
              : timeRange === "24h"
                ? "1 day"
                : timeRange === "7d"
                  ? "1 week"
                  : timeRange === "30d"
                    ? "1 month"
                    : timeRange === "1y"
                      ? "1 year"
                      : null}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[50vw] w-full lg:h-[500px]"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[100px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                  }}
                  formatter={(value) => formatCurrency(Number(value), currency)}
                />
              }
            />

            <YAxis
              domain={["auto", "auto"]}
              tickFormatter={(value) => formatCurrency(value, currency)}
            />
            <Line
              dataKey="price"
              type="monotone"
              stroke={`var(--color-desktop)`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-10 text-sm text-zinc-400">
        <div
          className={cn(
            "flex size-9 select-none items-center justify-center rounded-full font-semibold shadow-sm duration-200",
            {
              "bg-zinc-600 text-primary": timeRange === "1h",
              "hover:cursor-pointer hover:bg-zinc-700": timeRange !== "1h",
            },
          )}
          onClick={() => {
            setTimeRange("1h");
            setFrom(to - 3600);
          }}
        >
          1 H
        </div>
        <div
          className={cn(
            "flex size-9 select-none items-center justify-center rounded-full font-semibold shadow-sm duration-200",
            {
              "bg-zinc-600 text-primary": timeRange === "24h",
              "hover:cursor-pointer hover:bg-zinc-700": timeRange !== "24h",
            },
          )}
          onClick={() => {
            setTimeRange("24h");
            setFrom(to - 24 * 60 * 60);
          }}
        >
          1 D
        </div>
        <div
          className={cn(
            "flex size-9 select-none items-center justify-center rounded-full font-semibold shadow-sm duration-200",
            {
              "bg-zinc-600 text-primary": timeRange === "7d",
              "hover:cursor-pointer hover:bg-zinc-700": timeRange !== "7d",
            },
          )}
          onClick={() => {
            setTimeRange("7d");
            setFrom(to - 7 * 24 * 60 * 60);
          }}
        >
          1 W
        </div>
        <div
          className={cn(
            "flex size-9 select-none items-center justify-center rounded-full font-semibold shadow-sm duration-200",
            {
              "bg-zinc-600 text-primary": timeRange === "30d",
              "hover:cursor-pointer hover:bg-zinc-700": timeRange !== "30d",
            },
          )}
          onClick={() => {
            setTimeRange("30d");
            setFrom(to - 30 * 24 * 60 * 60);
          }}
        >
          1 M
        </div>
        <div
          className={cn(
            "flex size-9 select-none items-center justify-center rounded-full font-semibold shadow-sm duration-200",
            {
              "bg-zinc-600 text-primary": timeRange === "1y",
              "hover:cursor-pointer hover:bg-zinc-700": timeRange !== "1y",
            },
          )}
          onClick={() => {
            setTimeRange("1y");
            setFrom(to - 365 * 24 * 60 * 60);
          }}
        >
          1 Y
        </div>
      </CardFooter>
    </Card>
  );
}
