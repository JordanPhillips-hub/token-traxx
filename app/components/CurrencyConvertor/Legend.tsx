import { formatCurrency } from "@/app/utils/numberFormatting";

type LegendProps = {
  symbol: string;
  price: number;
};

export default function Legend({ symbol, price }: LegendProps) {
  return (
    <>
      <p className="text-sm p-2">
        <span className="text-gray100">{`1 ${symbol.toUpperCase()} = `}</span>
        <span>{`$${formatCurrency(price)}`}</span>
      </p>
    </>
  );
}
