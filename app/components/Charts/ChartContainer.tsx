import { ChartContainerProps } from "./types";
import { Heading } from "@/app/components/UI/Heading";
import { useAppSelector } from "@/app/store/hooks";

export default function ChartContainer({
  children,
  name,
  price,
  date,
  location,
}: ChartContainerProps) {
  const { isComparing } = useAppSelector((state) => state.compareCharts);

  function displayHeading() {
    if (!isComparing || location === "convertor") {
      return (
        <>
          <p className="text-3xl">{price}</p>
          <Heading textClass="font-normal" size={2} text={name} />
        </>
      );
    }
  }

  function displayMessage() {
    if (isComparing) {
      return (
        <p className="text-sm">Please select currency to view statistics</p>
      );
    }
  }

  return (
    <div className="bg-background card-shadow w-full h-auto max-h-[465px] p-4 rounded-xl">
      <div className="mb-3">
        {displayHeading()}
        {displayMessage()}
        <p className={`${isComparing ? "text-3xl mb-1" : "text-base"}`}>
          {date}
        </p>
      </div>
      <div className="h-4/5">{children}</div>
    </div>
  );
}
