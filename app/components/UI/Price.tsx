import { useAppSelector } from "@/app/store/hooks";
import { formatCurrency } from "@/app/utils/numberFormatting";

type PriceProps = {
  price: number;
  hasCode: boolean;
};

export default function Price({ price, hasCode }: PriceProps) {
  const { currency, currencySymbol } = useAppSelector(
    (state) => state.coinMarkets
  );

  return (
    <p>
      {hasCode
        ? `${currencySymbol}${formatCurrency(price)} ${currency.toUpperCase()}`
        : `${currencySymbol}${formatCurrency(price)}`}
    </p>
  );
}
