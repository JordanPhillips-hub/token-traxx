import { useState } from "react";
import { DropdownProps, DropdownItem } from "./types";
import Dropdown from "@/app/components/UI/Dropdown/Dropdown";
import { DropdownOpener } from "@/app/components/UI/Dropdown/DropdownOpener";
import CoinName from "@/app/components/UI/CoinName";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { setCoinId } from "@/app/store/features/coinMarketSlice";
import { setComparedCoins } from "@/app/store/features/charts/compareChartSlice";
import { setConvertorData } from "@/app/store/features/convertorSlice";

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
    dispatch(setConvertorData({numToSell: 0, sellPrice: 0}));
    setIsDropdownOpen(false);
  }

  function handleCoinSelect(id: string) {
    cardType === "sell"
      ? dispatch(setConvertorData({sellCoinId: id}))
      : dispatch(setConvertorData({buyCoinId: id}));
    handleCoinComparison(id);
    handleDropdownReset();
  }

  function renderDropdownItem(item: DropdownItem) {
    return (
      <CoinName
        image={item.image}
        imageWidth={20}
        imageHeight={20}
        id={item.id}
        symbol={item.symbol}
      />
    );
  }

  return (
    <Dropdown
      itemClass="text-xs rounded-none w-full justify-center mb-1 p-1"
      isOpen={isDropdownOpen}
      items={coins}
      renderItem={(item) => renderDropdownItem(item)}
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