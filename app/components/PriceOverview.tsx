import { useAppSelector } from "@/app/store/hooks";
import PriceChange from "@/app/components/UI/PriceChange";
import { formatCurrency } from "@/app/utils/numberFormatting";

export default function PriceOverview() {
  const { summaryCoin } = useAppSelector((state) => state.coinSummary);
  const {
    current_price,
    price_change_percentage_1h_in_currency: oneHourChangePercentage,
  } = summaryCoin.market_data;

  return (
    <div className="flex gap-4 my-9">
      <p className="text-3xl font-bold">{`$${formatCurrency(
        current_price.usd
      )}`}</p>
      <PriceChange percentage={oneHourChangePercentage.usd} />
    </div>
  );
}
