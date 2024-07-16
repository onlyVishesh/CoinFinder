"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ChartCard() {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--primary))",
    },
  };

  const [timeRange, setTimeRange] = useState(0);
  const chartData = [
    { month: "January", price: 186 },
    { month: "February", price: 305 },
    { month: "March", price: 237 },
    { month: "April", price: 73 },
    { month: "May", price: 209 },
    { month: "June", price: 214 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="my-2 flex justify-center text-3xl">
          3213423
        </CardTitle>
        <CardDescription className="flex items-center justify-center divide-x-2 divide-gray-400">
          <span className="px-4">+$12345</span>
          <span className="px-4">+20%</span>
          <span className="px-4">Past 1 day</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
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
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={10}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="price"
              type="natural"
              stroke="var(--color-desktop)"
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
              "bg-zinc-600 text-primary": timeRange === 0,
              "hover:cursor-pointer hover:bg-zinc-700": timeRange !== 0,
            },
          )}
          onClick={() => {
            setTimeRange(0);
          }}
        >
          1 H
        </div>
        <div
          className={cn(
            "flex size-9 select-none items-center justify-center rounded-full font-semibold shadow-sm duration-200",
            {
              "bg-zinc-600 text-primary": timeRange === 1,
              "hover:cursor-pointer hover:bg-zinc-700": timeRange !== 1,
            },
          )}
          onClick={() => {
            setTimeRange(1);
          }}
        >
          1 D
        </div>
        <div
          className={cn(
            "flex size-9 select-none items-center justify-center rounded-full font-semibold shadow-sm duration-200",
            {
              "bg-zinc-600 text-primary": timeRange === 7,
              "hover:cursor-pointer hover:bg-zinc-700": timeRange !== 7,
            },
          )}
          onClick={() => {
            setTimeRange(7);
          }}
        >
          1 W
        </div>
        <div
          className={cn(
            "flex size-9 select-none items-center justify-center rounded-full font-semibold shadow-sm duration-200",
            {
              "bg-zinc-600 text-primary": timeRange === 30,
              "hover:cursor-pointer hover:bg-zinc-700": timeRange !== 30,
            },
          )}
          onClick={() => {
            setTimeRange(30);
          }}
        >
          1 M
        </div>
        <div
          className={cn(
            "flex size-9 select-none items-center justify-center rounded-full font-semibold shadow-sm duration-200",
            {
              "bg-zinc-600 text-primary": timeRange === 365,
              "hover:cursor-pointer hover:bg-zinc-700": timeRange !== 365,
            },
          )}
          onClick={() => {
            setTimeRange(365);
          }}
        >
          1 Y
        </div>
      </CardFooter>
    </Card>
  );
}
