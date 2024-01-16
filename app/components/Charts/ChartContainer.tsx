import { twMerge } from "tailwind-merge";
import { ChartContainerProps } from "./types";
import { Heading } from "@/app/components/UI/Heading";
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
  const containerClass = `w-full h-auto max-h-[465px] p-4 rounded-xl`;
  const lineBg = "bg-blue600";
  const barBg = "bg-purple700";

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
        <p className="text-gray100 text-sm">
          Please select currency to view statistics
        </p>
      );
    }
  }

  return (
    <div className={twMerge(containerClass, type === "line" ? lineBg : barBg)}>
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
