import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ChartTimePeriodState = {
  timePeriod: number;
};

const initialState: ChartTimePeriodState = {
  timePeriod: 14,
};

const timePeriodSlice = createSlice({
  name: 'chartTimePeriod',
  initialState,
  reducers: {
    setChartTimePeriod(state, action: PayloadAction<number>) {
      state.timePeriod = action.payload
    }
  }
});

export const { setChartTimePeriod } = timePeriodSlice.actions;
export default timePeriodSlice.reducer;