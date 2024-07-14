import { useRouter } from "next/navigation";
import React from "react";

type CoinProps = {
  id: string;
  score: number;
  name: string;
  symbol: string;
  large: string;
  market_cap_rank: number;
  data: {
    price: number;
  };
};

const Card: React.FC<{ item: CoinProps }> = ({ item }) => {
  const router = useRouter();
  return (
    <div
      className="flex w-[300px] items-center justify-between gap-5 rounded-md border-2 border-zinc-800 px-4 py-2 hover:cursor-pointer hover:bg-zinc-900/95 sm:w-[400px]"
      onClick={() => router.push(`/coin/${item.id}`)}
    >
      <div className="text-sm font-semibold text-zinc-500 sm:text-lg">
        <p>
          Trending No:{" "}
          <span className="font-normal text-zinc-300">{item.score + 1}</span>
        </p>
        <h2>
          Name: <span className="font-normal text-zinc-300">{item.name}</span>
        </h2>
        <p>
          Symbol:{" "}
          <span className="font-normal text-zinc-300">{item.symbol}</span>
        </p>
        <p>
          Rank:{" "}
          <span className="font-normal text-zinc-300">
            {item.market_cap_rank}
          </span>
        </p>
        <p>
          Price:{" "}
          <span className="font-normal text-zinc-300">
            ${Math.round(item.data.price * 100000) / 100000}
          </span>
        </p>
      </div>
      <img
        src={item.large}
        className="size-28 rounded-full border-2 border-zinc-400 p-1 sm:size-32"
        alt={item.name}
      />
    </div>
  );
};

export default Card;
