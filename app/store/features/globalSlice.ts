import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GlobalState = {
  data: {
    active_cryptocurrencies: number;
    markets: number;
    market_cap_change_percentage_24h_usd: number;
    market_cap_percentage: Record<string, number>;
    total_volume: Record<string, number>;
  };
};

const initialState: GlobalState = {
  data: {
    active_cryptocurrencies: 0,
    markets: 0,
    market_cap_change_percentage_24h_usd: 0,
    market_cap_percentage: {},
    total_volume: {},
  },
};

const globalSlice = createSlice({
  name: 'globals',
  initialState,
  reducers: {
    setCoinGlobals(state, action: PayloadAction<GlobalState>) {
      state.data = action.payload.data
    },
  },
});

export const { setCoinGlobals } = globalSlice.actions;
export default globalSlice.reducer;