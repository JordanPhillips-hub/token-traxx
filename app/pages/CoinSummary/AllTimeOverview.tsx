import Icon from "@/app/components/UI/Icon";
import Price from "@/app/components/UI/Price";
import { useAppSelector } from "@/app/store/hooks";
import { formatDateString } from "@/app/utils/dateAndTime";

type AllTimeOverviewProps = { allTime: string };

export default function AllTimeOverview({ allTime }: AllTimeOverviewProps) {
  const { coinMarkets, coinSummary } = useAppSelector((state) => state);
  const { summaryCoin } = coinSummary;
  const { currency } = coinMarkets;
  const { ath, atl, ath_date, atl_date } = summaryCoin.market_data;
  const allTimeIsHigh = allTime === "high";
  const iconClass = allTimeIsHigh ? "text-green500" : "text-red500 rotate-180";

  return (
    <div className="mt-7">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center">
            <Icon className={iconClass} iconVariant="triangle" />
            <p className="text-xl ml-4">All time {allTime}:</p>
          </div>
          <p className="text-gray200 ml-8">{formatDateString(allTimeIsHigh ? ath_date[currency] : atl_date[currency])}</p>
        </div>

        <div>
          <Price className="text-2xl font-medium" price={allTimeIsHigh ? ath[currency] : atl[currency]} hasCode={false} />
        </div>
      </div>
    </div>
  );
}
