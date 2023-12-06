import ProgressBar from "@ramonak/react-progress-bar";
import { checkNumberScale, formatNum3_2 } from "@/app/utils/numberFormatting";

type StatusBarProps = {
  symbol: string;
  data1: number;
  data2: number;
  baseColor: string;
  bgColor: string;
  width: string;
};

export default function StatusBar({
  symbol,
  data1,
  data2,
  baseColor,
  bgColor,
  width,
}: StatusBarProps) {
  return (
    <>
      <div className="flex justify-between max-w-[90%]">
        <span>{`${symbol}${formatNum3_2(data1)} ${checkNumberScale(
          data1
        )}`}</span>
        <span>{`${symbol}${formatNum3_2(data2)} ${checkNumberScale(
          data2
        )}`}</span>
      </div>
      <ProgressBar
        completed={data1}
        maxCompleted={data2}
        animateOnRender={true}
        labelColor="transparent"
        baseBgColor={baseColor}
        bgColor={bgColor}
        height="5px"
        width={width}
      />
    </>
  );
}
