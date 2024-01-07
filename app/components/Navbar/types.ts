export type CoinInfoProps = {
  icon?: string;
  name?: string;
  data: number | string;
  hasStatBar?: boolean;
  completed: number;
  hasPriceChange?: boolean;
  changePercent: number;
};

export type CurrencyItem = {
  id: string;
  symbol: string;
};

export type PageLinkItem = {
  id: string;
  name: string;
};