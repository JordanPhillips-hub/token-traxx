import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CoinTableState = {
  tableCoins: any[];
  coinPage: number;
};

const initialState: CoinTableState = {
  tableCoins: [],
  coinPage: 2,
};

const coinTableSlice = createSlice({
  name: 'tableCoins',
  initialState,
  reducers: {
    setTableCoins(state, action: PayloadAction<any[]>) {
      state.tableCoins = action.payload
    },
    setCoinPage(state, action: PayloadAction<number>) {
      state.coinPage = action.payload
    },
  }
});

export const { setTableCoins, setCoinPage } = coinTableSlice.actions;
export default coinTableSlice.reducer;