import { useState } from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import {
  setSellCoinId,
  setBuyCoinId,
  setNumToSell,
  setSellPrice,
} from "@/app/store/features/convertorSlice";
import { formatCoinName } from "@/app/pages/Home/utils";
import Icon from "@/app/components/UI/Icon";

type DropdownProps = {
  componentType: string;
  image: string;
  name: string;
  id: string;
  symbol: string;
};

export default function ConvertorDropdown({
  componentType,
  image,
  name,
  id,
  symbol,
}: DropdownProps) {
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { coins } = useAppSelector((state) => state.coinMarkets);

  function handleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleCoinSelect(id: string) {
    componentType === "sell"
      ? dispatch(setSellCoinId(id))
      : dispatch(setBuyCoinId(id));

    dispatch(setNumToSell(0));
    dispatch(setSellPrice(0));
    setIsDropdownOpen(false);
  }

  return (
    <div className="relative">
      <button
        className="text-xl font-medium flex items-center gap-2 mb-4"
        onClick={handleDropdown}
      >
        <Image src={image} alt={name} width={30} height={30} />
        <p>{formatCoinName(id ?? "", symbol ?? "")}</p>
        <div className={`${isDropdownOpen ? "rotate-180" : ""}`}>
          <Icon iconVariant="chevDown" />
        </div>
      </button>

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
            onClick={() => handleCoinSelect(coin.id)}
          >
            <Image src={coin.image} alt={coin.name} width={25} height={25} />
            <p> {formatCoinName(coin.id ?? "", coin.symbol ?? "")}</p>
          </button>
        ))}
      </div>
    </div>
  );
}