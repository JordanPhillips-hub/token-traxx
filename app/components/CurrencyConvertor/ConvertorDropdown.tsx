import { useState } from "react";
import { DropdownProps, DropdownItem } from "./types";
import Dropdown from "@/app/components/UI/Dropdowns/Dropdown";
import { DropdownOpener } from "@/app/components/UI/Dropdowns/DropdownOpener";
import CoinName from "@/app/components/UI/CoinName";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { setCoinId } from "@/app/store/features/coinMarketSlice";
import { setComparedCoins } from "@/app/store/features/charts/compareChartSlice";
import {
  setSellCoinId,
  setBuyCoinId,
  setNumToSell,
  setSellPrice,
} from "@/app/store/features/convertorSlice";

export default function ConvertorDropdown({
  cardType,
  image,
  id,
  symbol,
}: DropdownProps) {
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { compareCharts, coinMarkets } = useAppSelector((state) => state);
  const { comparedCoins } = compareCharts;
  const { coins } = coinMarkets;

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

  function dropdownItem(item: DropdownItem) {
    return (
      <CoinName
        image={item.image}
        imageWidth={25}
        imageHeight={25}
        id={item.id}
        symbol={item.symbol}
      />
    );
  }

  return (
    <Dropdown
      isOpen={isDropdownOpen}
      items={coins}
      renderItem={(item) => dropdownItem(item)}
      onItemClick={(id) => handleCoinSelect(id)}
    >
      <DropdownOpener onClick={handleDropdown} isOpen={isDropdownOpen}>
        <CoinName
          image={image}
          imageWidth={30}
          imageHeight={30}
          id={id}
          symbol={symbol}
        />
      </DropdownOpener>
    </Dropdown>
  );
}
