import Icon from "./UI/Icon";
import { useAppSelector } from "@/app/store/hooks";
import { formatPrice } from "@/app/utils/numberFormatting";
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

  const iconClass = allTimeIsHigh
    ? "text-accent100"
    : "text-accent200 rotate-180";

  return (
    <div className="mt-7">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center">
            <Icon className={iconClass} iconVariant="triangle" />
            <p className="text-xl ml-4">All time {allTime}:</p>
          </div>
          <p className="text-neutral600 ml-8">
            {allTimeIsHigh
              ? formatDateString(athDate.usd)
              : formatDateString(atlDate.usd)}
          </p>
        </div>

        <div>
          <span className="text-2xl	font-medium">
            {allTimeIsHigh
              ? `$${formatPrice(ath.usd)}`
              : `$${formatPrice(atl.usd)}`}
          </span>
        </div>
      </div>
    </div>
  );
}
