import { twMerge } from "tailwind-merge";
import { useAppSelector } from "@/app/store/hooks";
import CoinName from "@/app/components/UI/CoinName";
import Icon from "@/app/components/UI/Icon";

type DropdownProps = {
  img: string;
  imgWidth: number;
  imgHeight: number;
  id: string;
  symbol: string;
  className: string;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export default function Dropdown({
  img,
  imgWidth,
  imgHeight,
  id,
  symbol,
  className,
  onClick,
  isOpen,
  children,
}: DropdownProps) {
  const { currency } = useAppSelector((state) => state.coinMarkets);
  const defaultStyles = "font-medium flex items-center gap-2 mb-4";

  return (
    <div className="relative">
      <button className={twMerge(defaultStyles, className)} onClick={onClick}>
        <CoinName
          img={img}
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          id={id}
          symbol={symbol}
        />

        <div className={`${isOpen ? "rotate-180" : ""}`}>
          <Icon iconVariant="chevDown" />
        </div>
        {currency.toUpperCase()}
      </button>

      <ul
        className={`${
          isOpen ? "text-sm absolute bg-blue600 mt-3 px-4 rounded" : "hidden"
        }`}
      >
        <li>{children}</li>
      </ul>
    </div>
  );
}
