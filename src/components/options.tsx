"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

const Options = () => {
  const pathname = usePathname();
  return (
    <div className="flex gap-5 rounded-lg border-2 border-primary p-3">
      <Link
        href="/"
        className={cn(
          !pathname.endsWith("/")
            ? buttonVariants({ size: "xl", variant: "outline" })
            : buttonVariants({ size: "xl" }),
        )}
      >
        Coins
      </Link>
      <Link
        href="/trending"
        className={cn(
          !pathname.endsWith("/trending")
            ? buttonVariants({ size: "xl", variant: "outline" })
            : buttonVariants({ size: "xl" }),
        )}
      >
        Trending
      </Link>
      <Link
        href="/watchlist"
        className={cn(
          !pathname.endsWith("/watchlist")
            ? buttonVariants({ size: "xl", variant: "outline" })
            : buttonVariants({ size: "xl" }),
        )}
      >
        Watch List
      </Link>
    </div>
  );
};

export default Options;
