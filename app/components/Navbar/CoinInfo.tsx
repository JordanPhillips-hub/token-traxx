import { CoinInfoProps } from "./types";
import Icon from "@/app/components/UI/Icon";
import PriceChange from "@/app/components/UI/PriceChange";
import StatBar from "@/app/components/UI/StatBar";

export default function CoinInfo({
  icon,
  name,
  data,
  hasStatBar,
  completed,
  hasPriceChange,
  changePercent,
}: CoinInfoProps) {
  return (
    <>
      {hasPriceChange ? (
        <PriceChange className="text-xs" percentage={changePercent} />
      ) : (
        <div className="font-medium flex items-center gap-1">
          <div className="flex items-center gap-1">
            {icon && <Icon iconVariant={icon} />}
            <div className="text-xs">
              <span className="text-gray100 mr-2">{name}</span>
              <span>{data ? data : "N/A"}</span>
            </div>
          </div>

          {hasStatBar && (
            <StatBar
              completed={completed}
              bgColor={`${name === "BTC" ? "#F7931A" : "#7D9EFF"}`}
            />
          )}
        </div>
      )}
    </>
  );
}
