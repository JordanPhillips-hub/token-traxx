import { formatPrice } from "@/app/utils/numberFormatting";

type LegendProps = {
  symbol: string;
  price: number;
};

export default function Legend({ symbol, price }: LegendProps) {
  return (
    <>
      <p className="text-sm p-2">
        <span className="text-neutral400">{`1 ${symbol.toUpperCase()} = `}</span>
        <span>{`$${formatPrice(price)}`}</span>
      </p>
    </>
  );
}
