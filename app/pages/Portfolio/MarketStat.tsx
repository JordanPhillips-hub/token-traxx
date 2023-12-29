import ProgressBar from "@ramonak/react-progress-bar";
import PriceChange from "@/app/components/UI/PriceChange";

type MarketStatProps = {
  stat: string;
  statValue?: number | string;
  percentChange?: boolean;
  percentage?: number;
  hasStatBar?: boolean;
  hasStatusBar?: boolean;
  completed?: number;
  maxCompleted?: number;
};

export default function MarketStat({
  stat,
  statValue,
  percentChange,
  percentage,
  hasStatusBar,
  completed,
}: MarketStatProps) {
  return (
    <div className="py-3 px-6 border border-solid border-[#2d2d54] rounded-lg">
      {!percentChange && !hasStatusBar && <p>{statValue}</p>}
      {percentChange && (
        <PriceChange className="text-base" percentage={percentage} />
      )}
      {hasStatusBar && completed !== undefined && (
        <div className="relative mt-8">
          <p className="text-green500 text-xs absolute bottom-2 left-0">
            {completed && isFinite(completed)
              ? Math.floor(completed) + "%"
              : "N/A"}
          </p>
          <ProgressBar
            completed={completed}
            animateOnRender={true}
            labelColor="transparent"
            baseBgColor="hsla(0, 0%, 100%, 0.5)"
            bgColor="hsl(176, 100%, 48%)"
            height="5px"
          />
        </div>
      )}
      <p className="text-sm mt-2">{stat}</p>
    </div>
  );
}
