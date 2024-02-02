import { useAppSelector } from "@/app/store/hooks";

export function useFindSelectedCoin(selectedCoinId: string) {
  const { coins } = useAppSelector((state) => state.coinMarkets);
  const selectedCoin = coins.find((coin) => coin.id === selectedCoinId);
  return selectedCoin;
};