"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ChartCardShimmer() {
  return (
    <Card className="flex-1 self-auto lg:self-stretch">
      <CardHeader>
        <CardTitle className="m-auto my-2 flex h-8 w-32 animate-pulse justify-center rounded-lg bg-zinc-800 sm:w-40"></CardTitle>
        <CardDescription className="flex items-center justify-center gap-4 divide-gray-400">
          <span className="h-4 w-12 animate-pulse rounded-md bg-zinc-800 px-4"></span>
          <span className="h-4 w-12 animate-pulse rounded-md bg-zinc-800 px-4"></span>
          <span className="h-4 w-12 animate-pulse rounded-md bg-zinc-800 px-4"></span>
        </CardDescription>
      </CardHeader>
      <div className="px-2 sm:px-6">
        <div className="aspect-auto h-[50vw] w-full animate-pulse rounded-lg bg-zinc-800 lg:h-[500px]"></div>
        <div className="my-4 flex items-center justify-center gap-10">
          <div className="flex size-9 animate-pulse select-none items-center justify-center rounded-full bg-zinc-800"></div>
          <div className="flex size-9 animate-pulse select-none items-center justify-center rounded-full bg-zinc-800"></div>
          <div className="flex size-9 animate-pulse select-none items-center justify-center rounded-full bg-zinc-800"></div>
          <div className="flex size-9 animate-pulse select-none items-center justify-center rounded-full bg-zinc-800"></div>
          <div className="flex size-9 animate-pulse select-none items-center justify-center rounded-full bg-zinc-800"></div>
        </div>
      </div>
    </Card>
  );
}
