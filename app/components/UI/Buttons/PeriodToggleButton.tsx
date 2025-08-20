import { twMerge } from "tailwind-merge";

type PeriodToggleButtonProps = {
  text: string;
  onClick: (buttonText: number) => void;
};

export default function PeriodToggleButton({
  text,
  onClick,
}: PeriodToggleButtonProps) {
  const handleClick = () => {
    const buttonText = text.slice(0, -1);
    let timePeriod = Number(buttonText);

    if (text.includes("M")) {
      timePeriod *= 30;
    }

    onClick(timePeriod);
  };

  const lightModeStyles =
    "bg-blue700 text-white hover:bg-purple500 hover:text-white focus:bg-purple500 focus:text-white text-sm py-2 px-5 rounded focus:outline-none";

  const darkModeStyles =
    "dark:bg-blue700 dark:text-white dark:hover:bg-purple500 dark:hover:text-white dark:focus:bg-purple500 dark:focus:text-white";

  return (
    <button
      className={twMerge(lightModeStyles, darkModeStyles)}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
