import Icon from "../Icon/Icon";

type PriceChangeProps = { percentage: number };

export default function PriceChange({ percentage }: PriceChangeProps) {
  const negative = percentage < 0;
  const textColor = negative ? "text-accent200" : "text-accent100";

  function formatPercent(percentage: number) {
    if (negative) {
      return percentage.toString().substring(1);
    }
    return percentage;
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
