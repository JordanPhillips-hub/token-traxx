import { useAppSelector } from "../../store/hooks";

type ChartContainerProps = {
  children: React.ReactNode;
  name: string;
  price: number | string;
  date: string;
  type: string;
};

export default function ChartContainer({
  children,
  name,
  price,
  date,
  type,
}: ChartContainerProps) {
  const { isComparing } = useAppSelector((state) => state.compareCharts);

  return (
    <div
      className={`bg-white100 ${
        type === "line" ? "dark:bg-primary600" : "dark:bg-primary400"
      } w-full max-w-3xl h-auto max-h-[465px] p-4 rounded-xl`}
    >
      <div className="mb-3">
        <p className="text-xl">{!isComparing && name}</p>
        <p className="text-3xl">{!isComparing && price}</p>
        <p className={`${isComparing ? "text-3xl mb-1" : "text-base"}`}>
          {date}
        </p>
        {isComparing && (
          <p className="text-neutral400 text-sm">
            Please select currency to view statistics
          </p>
        )}
      </div>
      <div className="h-4/5">{children}</div>
    </div>
  );
}
