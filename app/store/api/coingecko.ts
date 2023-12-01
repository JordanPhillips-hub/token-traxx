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
    getMarkets: builder.query<[], []>({
      query: () => `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`,
    }),
    getGlobals: builder.query<{}, {}>({
      query: () => `/global`,
    }),
  }),
});

export const { useGetMarketChartQuery, useGetMarketsQuery, useGetGlobalsQuery } = coingeckoApi;