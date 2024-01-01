import StatBar from "@/app/components/UI/StatBar";
import { useAppSelector } from "@/app/store/hooks";
import { checkNumberScale, formatNum3_2 } from "@/app/utils/numberFormatting";

type TableStatBarProps = {
  data1: number;
  data2: number;
};

export default function TableStatBar({ data1, data2 }: TableStatBarProps) {
  const { currencySymbol } = useAppSelector((state) => state.coinMarkets);
  const formattedData1 = formatData(data1);
  const formattedData2 = formatData(data2);

  function formatData(data: number) {
    const formattedData = `${currencySymbol}${formatNum3_2(
      data
    )} ${checkNumberScale(data)}`;
    return formattedData;
  }

  return (
    <>
      <div className="flex justify-between max-w-[90%]">
        <span>{formattedData1}</span>
        <span>{formattedData2}</span>
      </div>
      <StatBar
        completed={data1}
        maxCompleted={data2}
        bgColor="hsl(284, 93%, 73%)"
        width="90%"
      />
    </>
  );
}
