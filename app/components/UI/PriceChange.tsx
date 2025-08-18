import { twMerge } from "tailwind-merge";
import Icon from "./Icon";

type PriceChangeProps = { percentage?: number; className?: string };

export default function PriceChange({
  percentage,
  className,
}: PriceChangeProps) {
  const negative = percentage && percentage < 0;
  const lightColor = negative ? "text-red500" : "text-purple500";
  const darkColor = negative ? "text-red500" : "text-green500";
  const defaultStyles = "text-sm flex items-center gap-1";

  if (percentage === undefined) {
    return <div>N/A</div>;
  }

  function formatPercent(percentage: number) {
    if (negative) {
      return percentage.toFixed(2).toString().substring(1);
    }
    return percentage.toFixed(2);
  }

  return (
    <div className={twMerge(defaultStyles, className)}>
      <Icon
        iconVariant={negative ? "chevDown" : "chevUp"}
        className={`${lightColor} dark:${darkColor}`}
      />
      <span className={`${lightColor} dark:${darkColor}`}>
        {formatPercent(percentage)}%
      </span>
    </div>
  );
}
