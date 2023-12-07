import { configureStore } from "@reduxjs/toolkit";
import { coingeckoApi } from "./api/coingecko";
import activeLinkReducer from './features/pageLinkSlice';
import marketChartReducer from './features/charts/marketChartSlice';
import timePeriodReducer from './features/charts/timePeriodSlice';
import compareChartsReducer from './features/charts/compareChartSlice'
import coinsReducer from './features/coinMarketSlice';
import tableCoinsReducer from './features/coinTableSlice';
import globalsReducer from './features/globalSlice';

export const store = configureStore({
  reducer: {
    [coingeckoApi.reducerPath]: coingeckoApi.reducer,
    activeLink: activeLinkReducer,
    marketChart: marketChartReducer,
    coinMarkets: coinsReducer,
    tableCoins: tableCoinsReducer,
    chartTimePeriod: timePeriodReducer,
    globals: globalsReducer,
    compareCharts: compareChartsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coingeckoApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;