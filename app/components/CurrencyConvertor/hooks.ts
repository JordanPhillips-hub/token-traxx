import { useAppSelector } from "@/app/store/hooks";

export function useGetSelectedCoin(type: string) {
  const { convertor, coinMarkets } = useAppSelector((state) => state);
  const { coins } = coinMarkets;
  const { buyCoinId, sellCoinId } = convertor;
  return coins.find((coin) => coin.id === (type === "buy" ? buyCoinId : sellCoinId))
}