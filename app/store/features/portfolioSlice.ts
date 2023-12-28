import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { formatDateToDDMMYYYY } from "@/app/utils/dateAndTime";

type PortfolioState = {
  selectedCoinId: string;
  purchaseAmount: string;
  purchaseDate: string;
};

const initialState: PortfolioState = {
  selectedCoinId: "bitcoin",
  purchaseAmount: "0",
  purchaseDate: `${formatDateToDDMMYYYY(new Date())}`,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setSelectedCoinId(state, action: PayloadAction<string>) {
      state.selectedCoinId = action.payload;
    },
    setPurchaseAmount(state, action: PayloadAction<string>) {
      state.purchaseAmount = action.payload;
    },
    setPurchaseDate(state, action: PayloadAction<string>) {
      state.purchaseDate = action.payload;
    },
  },
});


export const { setSelectedCoinId, setPurchaseAmount, setPurchaseDate } =
  portfolioSlice.actions;
export default portfolioSlice.reducer;
