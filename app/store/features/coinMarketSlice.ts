import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CoinMarketState = {
  coins: any[];
  isMarketsLoading: boolean;
  marketsHasError: boolean;
  coinId: string;
  coinPage: number;
};

const initialState: CoinMarketState = {
  coins: [],
  isMarketsLoading: false,
  marketsHasError: false,
  coinId: 'bitcoin',
  coinPage: 2,
};

const coinMarketSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setCoinMarkets(state, action: PayloadAction<any[]>) {
      state.coins = action.payload
    },
    setCoinId(state, action: PayloadAction<string>) {
      state.coinId = action.payload
    },
    setCoinPage(state, action: PayloadAction<number>) {
      state.coinPage = action.payload
    },
    setIsMarketsLoading(state, action: PayloadAction<boolean>) {
      state.isMarketsLoading = action.payload
    },
    setMarketsHasError(state, action: PayloadAction<boolean>) {
      state.marketsHasError = action.payload
    }
  }
});

export const { setCoinMarkets, setIsMarketsLoading, setMarketsHasError, setCoinId, setCoinPage } = coinMarketSlice.actions;
export default coinMarketSlice.reducer;