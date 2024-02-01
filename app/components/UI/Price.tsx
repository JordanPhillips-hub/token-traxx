import { useAppSelector } from "@/app/store/hooks";
import { formatCurrency } from "@/app/utils/numberFormatting";

type PriceProps = {
  price: number;
  hasCode: boolean;
  storedCurrency?: string;
  className?: string;
};

export default function Price({ price, hasCode, storedCurrency, className }: PriceProps) {
  const { currency, currencySymbol } = useAppSelector(
    (state) => state.coinMarkets
  );

  return (
    <p className={className}>
      {hasCode
        ? `${currencySymbol}${formatCurrency(price)} ${currency.toUpperCase()}`
        : `${storedCurrency ? storedCurrency 
        : currencySymbol}${formatCurrency(price)}`}
    </p>
  );
}
