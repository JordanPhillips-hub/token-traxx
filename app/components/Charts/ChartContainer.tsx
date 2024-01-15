import { Heading } from "../UI/Heading";
import { ChartContainerProps } from "./types";
import { useAppSelector } from "@/app/store/hooks";

export default function ChartContainer({
  children,
  name,
  price,
  date,
  type,
  location,
}: ChartContainerProps) {
  const { isComparing } = useAppSelector((state) => state.compareCharts);

  return (
    <div
      className={`bg-white100 ${
        type === "line" ? "dark:bg-blue600" : "dark:bg-purple700"
      } w-full h-auto max-h-[465px] p-4 rounded-xl`}
    >
      <div className="mb-3">
        {!isComparing && <p className="text-3xl">{price}</p>}
        {(!isComparing || location === "convertor") && (
          <Heading textClass="font-normal" size={2} text={name} />
        )}
        {isComparing && (
          <p className="text-gray100 text-sm">
            Please select currency to view statistics
          </p>
        )}

        <p className={`${isComparing ? "text-3xl mb-1" : "text-base"}`}>
          {date}
        </p>
      </div>
      <div className="h-4/5">{children}</div>
    </div>
  );
}
