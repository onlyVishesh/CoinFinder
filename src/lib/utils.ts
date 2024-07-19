import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title,
  description,
  image,
  icons,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
} = {}): Metadata {
  title = title || "CoinFinder - Real-Time Cryptocurrency Tracker";
  description = description || "CoinFinder provides real-time tracking of cryptocurrencies with up-to-date prices and market data. Stay informed with the latest trends and make smarter investment decisions.";
  image = image || "/thumbnail.png";
  icons = icons || "/logo.svg";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@onlyVishesh14",
    },
    icons,
    metadataBase: new URL("https://coinfinder.vercel.app"),
  };
}