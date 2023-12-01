import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LinkState = {
  value: string;
};

const initialState: LinkState = {
  value: 'coinsLink',
};

const activeLinkSlice = createSlice({
  name: 'activeLink',
  initialState,
  reducers: {
    setActiveLink(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { setActiveLink } = activeLinkSlice.actions;
export default activeLinkSlice.reducer;
