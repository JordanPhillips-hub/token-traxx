import ProgressBar from "@ramonak/react-progress-bar";
import Icon from "../UI/Icon";
import PriceChange from "../UI/PriceChange";

type CoinInfoProps = {
  icon?: string;
  name?: string;
  data: number | string;
  hasProgressBar?: boolean;
  completed: number;
  hasPriceChange?: boolean;
  changePercent: number;
};

export default function CoinInfo({
  icon,
  name,
  data,
  hasProgressBar,
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

          {hasProgressBar && (
            <ProgressBar
              completed={completed}
              animateOnRender={true}
              labelColor="transparent"
              baseBgColor="hsla(0, 0%, 100%, 0.5)"
              bgColor={`${name === "BTC" ? "#F7931A" : "#7D9EFF"}`}
              height="5px"
            />
          )}
        </div>
      )}
    </>
  );
}
