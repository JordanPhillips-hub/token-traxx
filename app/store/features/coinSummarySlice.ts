import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CoinSummaryState = {
  summaryCoin: { id: string, name: string, symbol: string, links: { homepage: string }, image: { small: string } };
};

const initialState: CoinSummaryState = {
  summaryCoin: { id: '', name: '', symbol: '', links: { homepage: '' }, image: { small: '' } }
};

const coinSummarySlice = createSlice({
  name: 'coinSummary',
  initialState,
  reducers: {
    setSummaryCoin(state, action: PayloadAction<{ id: string, name: string, symbol: string, links: { homepage: string }, image: { small: string } }>) {
      state.summaryCoin = action.payload;
    },
  }
});

export const { setSummaryCoin } = coinSummarySlice.actions;
export default coinSummarySlice.reducer;