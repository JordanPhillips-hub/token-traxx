import { formatPrice } from "@/app/utils/numberFormatting";
import { optionalCapitalize } from "@/app/utils/optionalCapitalize";
import { LineDataset, BarDataset } from "./types";

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

export function setCompareData(arr: number[][], secondIndex: number[]) {
  const newComparedArr = [...arr];
  newComparedArr.push(secondIndex);

  if (newComparedArr.length > 2) {
    newComparedArr.shift();
  }
  return newComparedArr;
};

export function createLineDataset(
  label: string,
  data: number[],
  borderColor: string,
  yAxisID: string,
  additionalOptions: Partial<LineDataset> = {}
): LineDataset {
  return {
    label,
    data,
    borderColor,
    yAxisID,
    fill: true,
    pointStyle: "circle",
    pointRadius: 4,
    tension: 0.4,
    ...additionalOptions,
  };
};

export function createBarDataset(
  label: string,
  data: number[],
  yAxisID: string,
  additionalOptions: Partial<BarDataset> = {}
): BarDataset {
  return {
    fill: true,
    label,
    data,
    yAxisID,
    ...additionalOptions,
  };
};