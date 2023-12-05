import { formatPrice } from "@/app/utils/numberFormatting";
import { optionalCapitalize } from "@/app/utils/optionalCapitalize";

export function formatCoinName(name: string, symbol: string) {
  return `${optionalCapitalize(name)} (${symbol.toUpperCase()})`;
}

export function createGraphLabel(
  comparedCoins: string[],
  len: number,
  coinId: string,
  coins: any[],
  priceType: "current_price" | "total_volume",
  unit: string
) {
  const isGreaterThan = comparedCoins.length >= len;
  const coinName = optionalCapitalize(coinId);
  const findCoin = coins.find((coin: { id: string }) => coin.id === coinId);
  const currentPrice = formatPrice(findCoin?.[priceType]);
  return isGreaterThan ? `${coinName} $${currentPrice} ${unit}` : "";
}

export function createAxisLabel(arr: number[]) {
  const label = arr.map((date: string | number | Date) =>
    new Date(date).getDate()
  );
  return label;
}