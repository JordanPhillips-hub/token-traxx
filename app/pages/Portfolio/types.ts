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

export type PersonalOverviewProps = {
  id: string;
  image: string;
  symbol: string;
  amountPurchased: number;
  currentPrice: number;
  priceAtPurchase: number;
  purchaseDate: string;
  currency: string;
};