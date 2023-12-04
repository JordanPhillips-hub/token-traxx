import PeriodToggleButton from "./Buttons/PeriodToggleButton";

type TimePeriodSelectorProps = {
  onTimePeriodChange: (timePeriod: number) => void;
};

const timePeriods = ["1D", "7D", "14D", "1M", "3M"];

export default function TimePeriodSelector({
  onTimePeriodChange,
}: TimePeriodSelectorProps) {
  const handleClick = (timePeriod: number) => {
    onTimePeriodChange(timePeriod);
  };

  return (
    <div className="bg-primary700 flex w-fit mt-10 rounded-md">
      {timePeriods.map((timePeriod) => (
        <PeriodToggleButton
          key={timePeriod}
          text={timePeriod}
          onClick={handleClick}
        />
      ))}
    </div>
  );
}
