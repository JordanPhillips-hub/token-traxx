import Icon from "./Icon";

type PriceChangeProps = { percentage?: number };

export default function PriceChange({ percentage }: PriceChangeProps) {
  if (percentage === undefined) {
    return <div>N/A</div>;
  }

  const negative = percentage && percentage < 0;
  const textColor = negative ? "text-red500" : "text-green500";

  function formatPercent(percentage: number) {
    if (negative) {
      return percentage.toString().substring(1);
    }
    return percentage.toFixed(2);
  }

  return (
    <div className="flex items-center gap-1">
      <Icon
        iconVariant={negative ? "chevDown" : "chevUp"}
        className={textColor}
      />
      <span className={textColor}>{formatPercent(percentage)}%</span>
    </div>
  );
}
