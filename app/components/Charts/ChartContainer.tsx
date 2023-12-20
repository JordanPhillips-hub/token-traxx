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
        <p className="text-xl">
          {(!isComparing || location === "convertor") && name}
        </p>
        <p className="text-3xl">{!isComparing && price}</p>
        <p className={`${isComparing ? "text-3xl mb-1" : "text-base"}`}>
          {date}
        </p>
        {isComparing && (
          <p className="text-gray100 text-sm">
            Please select currency to view statistics
          </p>
        )}
      </div>
      <div className="h-4/5">{children}</div>
    </div>
  );
}
