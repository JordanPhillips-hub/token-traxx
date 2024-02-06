import { useAppSelector } from "@/app/store/hooks";
import PriceChange from "@/app/components/UI/PriceChange";
import { formatCurrency } from "@/app/utils/numberFormatting";
import Price from "@/app/components/UI/Price";

export default function PriceOverview() {
  const { coinSummary, coinMarkets } = useAppSelector((state) => state);
  const { summaryCoin } = coinSummary;
  const { currency } = coinMarkets;

  const {
    current_price,
    price_change_percentage_1h_in_currency: oneHourChangePercentage,
  } = summaryCoin.market_data;

  return (
    <div className="flex gap-4 my-9">
      <Price className="text-3xl font-bold" price={current_price[currency]} hasCode={false} />
      <PriceChange className="text-xl" percentage={oneHourChangePercentage[currency]} />
    </div>
  );
}
