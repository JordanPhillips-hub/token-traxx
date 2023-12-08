import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CoinMarketState = {
  coins: any[];
  isMarketsLoading: boolean;
  marketsHasError: boolean;
  coinId: string;
};

const initialState: CoinMarketState = {
  coins: [],
  isMarketsLoading: false,
  marketsHasError: false,
  coinId: 'bitcoin',
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
    setIsMarketsLoading(state, action: PayloadAction<boolean>) {
      state.isMarketsLoading = action.payload
    },
    setMarketsHasError(state, action: PayloadAction<boolean>) {
      state.marketsHasError = action.payload
    }
  }
});

export const { setCoinMarkets, setIsMarketsLoading, setMarketsHasError, setCoinId } = coinMarketSlice.actions;
export default coinMarketSlice.reducer;