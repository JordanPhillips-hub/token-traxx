import { formatCurrency } from "@/app/utils/numberFormatting";

type LegendProps = {
  symbol: string;
  price: number;
  currencySymbol: string;
};

export default function Legend({ symbol, price, currencySymbol }: LegendProps) {
  return (
    <>
      <p className="text-sm p-2">
        <span className="text-gray100">{`1 ${symbol.toUpperCase()} = `}</span>

        <span>{`${currencySymbol} ${formatCurrency(price)}`}</span>
      </p>
    </>
  );
}
