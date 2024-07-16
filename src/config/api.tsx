export const coinListApi = "https://api.coingecko.com/api/v3/coins/list";

export const coinDataApi = (coinId: string) =>
  `https://api.coingecko.com/api/v3/coins/${coinId}?community_data=false&developer_data=false&sparkline=false`;

export const coinsDataApi = (
  currency: string,
  perPage: number,
  page: number,
  filter: string,
) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=${perPage}&page=${page}&order=${filter}&price_change_percentage=1h%2C24h%2C7d&precision=2`;

export const searchApi = (query: string) =>
  `https://api.coingecko.com/api/v3/search?query=${query}`;

export const trendingApi = "https://api.coingecko.com/api/v3/search/trending";
