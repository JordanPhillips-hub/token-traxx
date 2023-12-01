import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CompareChartState = {
  isComparing: boolean;
  comparedCoins: string[];
  comparedPrices: number[][],
  comparedVolumes: number[][],
};

const initialState: CompareChartState = {
  isComparing: false,
  comparedCoins: [],
  comparedPrices: [],
  comparedVolumes: [],
};

const compareChartsSlice = createSlice({
  name: 'compareCharts',
  initialState,
  reducers: {
    setIsComparing(state, action: PayloadAction<boolean>) {
      state.isComparing = action.payload
    },
    setComparedCoins(state, action: PayloadAction<string[]>) {
      state.comparedCoins = action.payload
    },
    setComparedPrices(state, action: PayloadAction<number[][]>) {
      state.comparedPrices = action.payload
    },
    setComparedVolumes(state, action: PayloadAction<number[][]>) {
      state.comparedVolumes = action.payload
    },
  }
});

export const { setIsComparing, setComparedCoins, setComparedPrices, setComparedVolumes } = compareChartsSlice.actions;
export default compareChartsSlice.reducer;