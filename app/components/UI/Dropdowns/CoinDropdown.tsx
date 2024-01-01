import { twMerge } from "tailwind-merge";
import { useAppSelector } from "@/app/store/hooks";
import CoinName from "@/app/components/UI/CoinName";
import Icon from "@/app/components/UI/Icon";

type CoinDropdownProps = {
  img: string;
  imgWidth: number;
  imgHeight: number;
  id: string;
  symbol: string;
  className: string;
  isOpen: boolean;
  onClick: () => void;
  onItemClick: (coinId: string) => void;
};

export default function CoinDropdown({
  img,
  imgWidth,
  imgHeight,
  id,
  symbol,
  className,
  isOpen,
  onClick,
  onItemClick,
}: CoinDropdownProps) {
  const { coins, currency } = useAppSelector((state) => state.coinMarkets);
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
        <li>
          {coins.map((coin) => (
            <button key={coin.id} onClick={() => onItemClick(coin.id)}>
              <CoinName
                img={coin.image}
                imgWidth={25}
                imgHeight={25}
                id={coin.id}
                symbol={coin.symbol}
              />
            </button>
          ))}
        </li>
      </ul>
    </div>
  );
}
