export const coinListApi = "https://api.coingecko.com/api/v3/coins/list";

export const coinDataApi = (coinId: string) =>
  `https://api.coingecko.com/api/v3/coins/${coinId}&per_page=10`;


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

export const coinsDataApi = (
  currency: string,
  perPage: number,
  page: number,
  filter: string,
) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=${perPage}&page=${page}&order=${filter}&price_change_percentage=1h%2C24h%2C7d&precision=2`;

export const searchApi = (query: string) =>
  `https://api.coingecko.com/api/v3/search?query=${query}`;