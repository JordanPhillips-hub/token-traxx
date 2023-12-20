import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CoinSummary = {
  id: string;
  name: string;
  symbol: string;
  links: { homepage: string[], blockchain_site: string[] };
  image: { small: string };
  description: { en: string };
  market_data: {
    current_price: { usd: number };
    price_change_percentage_1h_in_currency: { usd: number };
    ath: { usd: number };
    ath_date: { usd: string };
    atl: { usd: number };
    atl_date: { usd: string };
    total_volume: { usd: number };
    market_cap: { usd: number };
    market_cap_change_24h: number;
    fully_diluted_valuation: { usd: number };
    mcap_to_tvl_ratio: number;
    max_supply: number;
    circulating_supply: number;
  };
};

type CoinSummaryState = {
  summaryCoin: CoinSummary;
}

const initialState: CoinSummaryState = {
  summaryCoin: {
    id: '',
    name: '',
    symbol: '',
    links: { homepage: [''], blockchain_site: [] },
    image: { small: '' },
    description: { en: '' },
    market_data: {
      current_price: { usd: 0 },
      price_change_percentage_1h_in_currency: { usd: 0 },
      ath: { usd: 0 },
      ath_date: { usd: '' },
      atl: { usd: 0 },
      atl_date: { usd: '' },
      total_volume: { usd: 0 },
      market_cap: { usd: 0 },
      market_cap_change_24h: 0,
      fully_diluted_valuation: { usd: 0 },
      mcap_to_tvl_ratio: 0,
      max_supply: 0,
      circulating_supply: 0,
    }
  }
};

const coinSummarySlice = createSlice({
  name: 'coinSummary',
  initialState,
  reducers: {
    setSummaryCoin(state, action: PayloadAction<CoinSummary>) {
      state.summaryCoin = action.payload;
    },
  }
});

export const { setSummaryCoin } = coinSummarySlice.actions;
export default coinSummarySlice.reducer;