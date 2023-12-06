import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type MarketChart = {
  coinId: string;
  days: number;
  prices: number[];
  total_volumes: number[];
};

export const coingeckoApi = createApi({
  reducerPath: 'coingeckoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3/' }),
  endpoints: (builder) => ({
    getMarketChart: builder.query<MarketChart, MarketChart>({
      query: ({ coinId, days }) => `coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
    }),
    getMarkets: builder.query({
      query: (args: { page: number }) => `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${args.page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en`,
    }),
    getGlobals: builder.query<{}, {}>({
      query: () => `/global`,
    }),
  }),
});

export const { useGetMarketChartQuery, useGetMarketsQuery, useGetGlobalsQuery } = coingeckoApi;