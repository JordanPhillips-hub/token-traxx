import { LegendProps } from "./types";
import { formatCurrency } from "@/app/utils/numberFormatting";

export default function Legend({ symbol, price, currencySymbol }: LegendProps) {
  return (
    <p className="text-sm p-2">
      <span className="text-blue900 dark:text-gray100">{`1 ${symbol.toUpperCase()} = `}</span>
      <span>{`${currencySymbol} ${formatCurrency(price)}`}</span>
    </p>
  );
}
