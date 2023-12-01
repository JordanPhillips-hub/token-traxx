import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MarketChartState = {
  prices: number[],
  priceDates: number[],
  priceVolumes: number[],
  volumeDates: number[],
};

const initialState: MarketChartState = {
  prices: [],
  priceDates: [],
  priceVolumes: [],
  volumeDates: [],
};

const createChartReducer = <ChartKey extends keyof MarketChartState>(key: ChartKey) => (
  state: MarketChartState,
  action: PayloadAction<number[]>
) => {
  state[key] = action.payload;
};

const marketChartSlice = createSlice({
  name: 'marketChart',
  initialState,
  reducers: {
    setPrices: createChartReducer('prices'),
    setPriceDates: createChartReducer('priceDates'),
    setPriceVolumes: createChartReducer('priceVolumes'),
    setVolumeDates: createChartReducer('volumeDates'),
  }
});

export const { setPrices, setPriceDates, setPriceVolumes, setVolumeDates } = marketChartSlice.actions;
export default marketChartSlice.reducer;