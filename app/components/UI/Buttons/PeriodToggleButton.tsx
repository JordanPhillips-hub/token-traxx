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

  return (
    <button
      className="bg-blue700 focus:bg-purple500 text-white text-sm py-2 px-5 rounded focus:outline-none"
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
