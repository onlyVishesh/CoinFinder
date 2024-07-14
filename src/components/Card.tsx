import React from "react";

type CoinProps = {
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
  return (
    <div className="flex gap-5 rounded-md border-2 border-zinc-800 px-4 py-2 w-[300px] sm:w-[400px] justify-between items-center hover:bg-zinc-900/95 hover:cursor-pointer">
      <div className="text-sm sm:text-lg font-semibold text-zinc-500">
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
      <img src={item.large} className="size-28 sm:size-32 rounded-full p-1 border-2 border-zinc-400" alt={item.name} />
    </div>
  );
};

export default Card;
