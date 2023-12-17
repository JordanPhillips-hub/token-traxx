import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LinkState = {
  value: string;
  coinSummaryId: string;
};

const initialState: LinkState = {
  value: 'coinsLink',
  coinSummaryId: 'bitcoin',
};

const activeLinkSlice = createSlice({
  name: 'activeLink',
  initialState,
  reducers: {
    setActiveLink(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    setCoinSummaryId(state, action: PayloadAction<string>) {
      state.coinSummaryId = action.payload;
    },
  },
});

export const { setActiveLink, setCoinSummaryId } = activeLinkSlice.actions;
export default activeLinkSlice.reducer;
