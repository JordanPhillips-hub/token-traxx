import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ConvertorState = {
  sellCoinId: string;
  buyCoinId: string;
  sellPrice: number;
  numToSell: number;
};

const initialState: ConvertorState = {
  sellCoinId: 'bitcoin',
  buyCoinId: 'bitcoin',
  sellPrice: 0,
  numToSell: 0,
};

const convertorSlice = createSlice({
  name: 'convertor',
  initialState,
  reducers: {
    setSellCoinId(state, action: PayloadAction<string>) {
      state.sellCoinId = action.payload
    },
    setBuyCoinId(state, action: PayloadAction<string>) {
      state.buyCoinId = action.payload
    },
    setSellPrice(state, action: PayloadAction<number>) {
      state.sellPrice = action.payload
    },
    setNumToSell(state, action: PayloadAction<number>) {
      state.numToSell = action.payload
    },
  }
});

export const { setSellCoinId, setBuyCoinId, setSellPrice, setNumToSell } = convertorSlice.actions;
export default convertorSlice.reducer;