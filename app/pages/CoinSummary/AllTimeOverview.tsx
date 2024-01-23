import Icon from "../../components/UI/Icon";
import { useAppSelector } from "@/app/store/hooks";
import { formatCurrency } from "@/app/utils/numberFormatting";
import { formatDateString } from "@/app/utils/dateAndTime";

type AllTimeOverviewProps = { allTime: string };

export default function AllTimeOverview({ allTime }: AllTimeOverviewProps) {
  const { coinMarkets, coinSummary } = useAppSelector((state) => state);
  const { summaryCoin } = coinSummary;
  const { currency, currencySymbol } = coinMarkets;

  const {
    ath,
    atl,
    ath_date: athDate,
    atl_date: atlDate,
  } = summaryCoin.market_data;

  const allTimeIsHigh = allTime === "high";
  const iconClass = allTimeIsHigh ? "text-green500" : "text-red500 rotate-180";

  function createPrice(allTimePrice: number) {
    return `${currencySymbol}${formatCurrency(allTimePrice)}`;
  }

  return (
    <div className="mt-7">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center">
            <Icon className={iconClass} iconVariant="triangle" />
            <p className="text-xl ml-4">All time {allTime}:</p>
          </div>
          <p className="text-gray200 ml-8">
            {allTimeIsHigh
              ? formatDateString(athDate[currency])
              : formatDateString(atlDate[currency])}
          </p>
        </div>

        <div>
          <p className="text-2xl	font-medium">
            {allTimeIsHigh
              ? createPrice(ath[currency])
              : createPrice(atl[currency])}
          </p>
        </div>
      </div>
    </div>
  );
}
