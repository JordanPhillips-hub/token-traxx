import Icon from "./UI/Icon";
import { useAppSelector } from "@/app/store/hooks";
import { formatCurrency } from "@/app/utils/numberFormatting";
import { formatDateString } from "@/app/utils/dateAndTime";

type AllTimeOverviewProps = { allTime: string };

export default function AllTimeOverview({ allTime }: AllTimeOverviewProps) {
  const { summaryCoin } = useAppSelector((state) => state.coinSummary);
  const {
    ath,
    atl,
    ath_date: athDate,
    atl_date: atlDate,
  } = summaryCoin.market_data;

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
          <p className="text-gray200 ml-8">
            {allTimeIsHigh
              ? formatDateString(athDate.usd)
              : formatDateString(atlDate.usd)}
          </p>
        </div>

        <div>
          <span className="text-2xl	font-medium">
            {allTimeIsHigh
              ? `$${formatCurrency(ath.usd)}`
              : `$${formatCurrency(atl.usd)}`}
          </span>
        </div>
      </div>
    </div>
  );
}
