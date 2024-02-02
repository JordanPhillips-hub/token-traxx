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
    setConvertorData(state, action: PayloadAction<Partial<ConvertorState>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setConvertorData } = convertorSlice.actions
export default convertorSlice.reducer;