import Icon from "@/app/components/UI/Icon";
import PriceChange from "@/app/components/UI/PriceChange";
import StatBar from "@/app/components/UI/StatBar";

type CoinInfoProps = {
  icon?: string;
  name?: string;
  data?: number | string;
  hasStatBar?: boolean;
  completed?: number;
  changePercent?: number;
};

export default function CoinInfo({
  icon,
  name,
  data,
  completed,
  changePercent,
}: CoinInfoProps) {
  return (
    <div className="font-medium flex items-center gap-1">
      {changePercent ? (
        <PriceChange className="text-xs" percentage={changePercent} />
      ) : (
        <>
          {icon && <Icon iconVariant={icon} />}
          <div className="text-xs">
            <span className="text-gray100 mr-2">{name}</span>
            <span>{data ? data : "N/A"}</span>
          </div>
          {completed !== undefined && (
            <StatBar
              completed={completed}
              bgColor={`${name === "BTC" ? "#F7931A" : "#7D9EFF"}`}
            />
          )}
        </>
      )}
    </div>
  );
}
