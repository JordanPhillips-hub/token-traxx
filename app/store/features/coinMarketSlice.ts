import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CoinMarketState = {
  coins: any[];
  coinId: string;
};

const initialState: CoinMarketState = {
  coins: [],
  coinId: 'bitcoin',
};

const coinMarketSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setCoinMarkets(state, action: PayloadAction<[]>) {
      state.coins = action.payload
    },
    setCoinId(state, action: PayloadAction<string>) {
      state.coinId = action.payload
    }
  }
});

export const { setCoinMarkets, setCoinId } = coinMarketSlice.actions;
export default coinMarketSlice.reducer;