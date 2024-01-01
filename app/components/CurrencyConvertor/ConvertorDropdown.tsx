import { useState } from "react";
import CoinDropdown from "@/app/components/UI/Dropdowns/CoinDropdown";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { setCoinId } from "@/app/store/features/coinMarketSlice";
import { setComparedCoins } from "@/app/store/features/charts/compareChartSlice";
import {
  setSellCoinId,
  setBuyCoinId,
  setNumToSell,
  setSellPrice,
} from "@/app/store/features/convertorSlice";

type DropdownProps = {
  cardType: string;
  image: string;
  name: string;
  id: string;
  symbol: string;
};

export default function ConvertorDropdown({
  cardType,
  image,
  id,
  symbol,
}: DropdownProps) {
  const dispatch = useAppDispatch();
  const { comparedCoins } = useAppSelector((state) => state.compareCharts);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  function handleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleCoinComparison(id: string) {
    dispatch(setCoinId(id));
    if (cardType === "sell" || cardType === "buy") {
      const updatedComparedCoins = [...comparedCoins];
      const targetIndex = cardType === "sell" ? 0 : 1;
      updatedComparedCoins[targetIndex] = id;
      dispatch(setComparedCoins(updatedComparedCoins));
    }
  }

  function handleDropdownReset() {
    dispatch(setNumToSell(0));
    dispatch(setSellPrice(0));
    setIsDropdownOpen(false);
  }

  function handleCoinSelect(id: string) {
    cardType === "sell"
      ? dispatch(setSellCoinId(id))
      : dispatch(setBuyCoinId(id));
    handleCoinComparison(id);
    handleDropdownReset();
  }

  return (
    <CoinDropdown
      className="text-xl"
      img={image}
      imgWidth={30}
      imgHeight={30}
      id={id}
      symbol={symbol}
      isOpen={isDropdownOpen}
      onClick={() => handleDropdown()}
      onItemClick={(id) => handleCoinSelect(id)}
    />
  );
}
