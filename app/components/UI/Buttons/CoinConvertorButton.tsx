type Props = {
  isModalOpen: boolean;
  text: string;
  activeStyles: string;
  onClick?: () => void;
};

export default function CoinConvertorButton({
  isModalOpen,
  text,
  activeStyles,
  onClick,
}: Props) {
  const defaultStyles =
    "bg-primary700 text-neutral100 w-full p-4 rounded-md focus:outline-none shadow-md";

  let buttonClass = `${defaultStyles}`;

  switch (activeStyles) {
    case "Coins":
      buttonClass += `${
        isModalOpen
          ? " bg-primary700"
          : " bg-primary500 shadow-md shadow-indigo-500/50"
      }`;
      break;
    case "Convertor":
      buttonClass += `${
        isModalOpen
          ? " bg-primary500 shadow-md shadow-indigo-500/50"
          : " bg-primary700"
      }`;
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
}
