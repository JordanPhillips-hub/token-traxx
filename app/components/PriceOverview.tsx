import React from "react";
import { useAppSelector } from "@/app/store/hooks";
import PriceChange from "@/app/components/UI/PriceChange";
import { formatCurrency } from "@/app/utils/numberFormatting";

function PriceOverview() {
  const { summaryCoin } = useAppSelector((state) => state.coinSummary);
  const { currency, currencySymbol } = useAppSelector(
    (state) => state.coinMarkets
  );

  const {
    current_price,
    price_change_percentage_1h_in_currency: oneHourChangePercentage,
  } = summaryCoin.market_data;

  return (
    <div className="flex gap-4 my-9">
      <p className="text-3xl font-bold">
        {`${currencySymbol}${formatCurrency(current_price[currency])}`}
      </p>
      <PriceChange percentage={oneHourChangePercentage[currency]} />
    </div>
  );
}

export default PriceOverview;