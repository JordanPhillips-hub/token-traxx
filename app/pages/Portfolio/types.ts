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