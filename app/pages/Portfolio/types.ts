export type MarketStatProps = {
  stat: string;
  statValue?: number | string;
  percentChange?: boolean;
  percentage?: number;
  hasStatBar?: boolean;
  hasStatusBar?: boolean;
  completed?: number;
  maxCompleted?: number;
};

export type Asset = {
  id: string;
  price_at_purchase: number;
  amount_purchased: number;
  purchase_date: string;
  current_price: number;
  image: string;
  symbol: string;
  price_change_24H: number;
  market_cap: number;
  volume: number;
  circ_supply: number;
  max_supply: number;
  currency: string;
};