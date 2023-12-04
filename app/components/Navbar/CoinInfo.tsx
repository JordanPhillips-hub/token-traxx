import ProgressBar from "@ramonak/react-progress-bar";
import Icon from "../UI/Icon";
import PriceChange from "../UI/PriceChange";

type CoinInfoProps = {
  icon?: string;
  name?: string;
  data: number | string;
  hasProgressBar?: boolean;
  completed: number | string;
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
        <div className="text-xs">
          <PriceChange percentage={changePercent} />
        </div>
      ) : (
        <div className="font-medium flex items-center gap-1">
          <div className="flex items-center gap-1">
            {icon && <Icon iconVariant={icon} />}
            <div className="text-xs">
              <span className="text-neutral400 mr-2">{name}</span>
              <span>{data}</span>
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
