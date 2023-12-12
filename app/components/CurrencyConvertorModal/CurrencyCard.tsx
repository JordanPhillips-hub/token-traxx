import { useState } from "react";
import Image from "next/image";
import { useAppSelector } from "@/app/store/hooks";
import { formatCoinName } from "@/app/pages/Home/utils";
import Icon from "../UI/Icon";
import { formatPrice } from "@/app/utils/numberFormatting";

type CurrencyCardProps = {
  cardType: string;
};

export default function CurrencyCard({ cardType }: CurrencyCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [coinId, setCoinId] = useState<string>("bitcoin");
  const { coins } = useAppSelector((state) => state.coinMarkets);
  const selectedCoin = coins.find((coin) => coin.id === coinId);

  function handleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }
  return (
    <div className="container bg-primary600 p-6 rounded-2xl">
      <p className="text-sm text-neutral400 mb-10">{cardType}</p>

      <div className="relative">
        <div>
          <button
            className="text-xl font-medium flex items-center gap-2 mb-4"
            onClick={handleDropdown}
          >
            <Image
              src={selectedCoin.image}
              alt={selectedCoin.name}
              width={30}
              height={30}
            />
            <p>
              {formatCoinName(selectedCoin.id ?? "", selectedCoin.symbol ?? "")}
            </p>
            <div className={`${isDropdownOpen ? "rotate-180" : ""}`}>
              <Icon iconVariant="chevDown" />
            </div>
          </button>
        </div>

        <div
          className={`${
            isDropdownOpen
              ? "text-sm absolute bg-primary600 mt-3 px-4 rounded"
              : "hidden"
          }`}
        >
          {coins.map((coin) => (
            <button
              key={coin.id}
              className="flex items-center gap-2 mb-3 hover:text-base hover:font-medium"
              onClick={() => {
                setCoinId(coin.id);
                setIsDropdownOpen(false);
              }}
            >
              <Image src={coin.image} alt={coin.name} width={25} height={25} />
              <p> {formatCoinName(coin.id ?? "", coin.symbol ?? "")}</p>
            </button>
          ))}
        </div>
      </div>
      <hr />
      <p className="text-sm p-2">
        <span className="text-neutral400">
          1 {selectedCoin.symbol.toUpperCase()} =
        </span>
        <span> ${formatPrice(selectedCoin.current_price)}</span>
      </p>
    </div>
  );
}
