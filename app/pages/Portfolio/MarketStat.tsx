import { MarketStatProps } from "./types";
import PriceChange from "@/app/components/UI/PriceChange";
import StatBar from "@/app/components/UI/StatBar";

export default function MarketStat({
  stat,
  statValue,
  percentChange,
  percentage,
  hasStatusBar,
  completed,
}: MarketStatProps) {
  return (
    <div className="py-3 px-6 rounded-lg shadow-lg ring-1 ring-gray-300 dark:shadow-xl dark:ring-gray-700">
      {!percentChange && !hasStatusBar && <p>{statValue}</p>}
      {percentChange && (
        <PriceChange className="text-base" percentage={percentage} />
      )}
      {hasStatusBar && completed !== undefined && (
        <div className="relative mt-8">
          <p className="text-purple500 dark:text-green500 text-xs absolute bottom-2 left-0">
            {completed && isFinite(completed)
              ? Math.floor(completed) + "%"
              : "N/A"}
          </p>
          <StatBar completed={completed} />
        </div>
      )}
      <p className="text-sm mt-2">{stat}</p>
    </div>
  );
}
