import { configureStore } from "@reduxjs/toolkit";
import { coingeckoApi } from './api/coingecko';
import activeLinkReducer from './features/pageLinkSlice/pageLinkSlice';
import marketChartReducer from './features/charts/marketChartSlice';
import coinsReducer from './features/coinMarketSlice/coinMarketSlice';
import timePeriodReducer from './features/charts/timePeriodSlice';
import globalsReducer from './features/globalSlice/globalSlice';
import compareChartsReducer from './features/charts/compareChartsSlice'

export const store = configureStore({
  reducer: {
    [coingeckoApi.reducerPath]: coingeckoApi.reducer,
    activeLink: activeLinkReducer,
    marketChart: marketChartReducer,
    coinMarkets: coinsReducer,
    chartTimePeriod: timePeriodReducer,
    globals: globalsReducer,
    compareCharts: compareChartsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coingeckoApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;