import { useState } from "react";
import Image from "next/image";
import Icon from "@/app/components/UI/Icon";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { setCoinId } from "@/app/store/features/coinMarketSlice";
import { setComparedCoins } from "@/app/store/features/charts/compareChartSlice";
import { formatCoinName } from "@/app/utils/generalHelpers";
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
  const { coinMarkets, compareCharts } = useAppSelector((state) => state);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { coins, currency } = coinMarkets;
  const { comparedCoins } = compareCharts;

  function handleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleCoinSelect(id: string) {
    cardType === "sell"
      ? dispatch(setSellCoinId(id))
      : dispatch(setBuyCoinId(id));

    dispatch(setNumToSell(0));
    dispatch(setSellPrice(0));
    setIsDropdownOpen(false);
  }

  function handleCoinComparison(id: string) {
    dispatch(setCoinId(id));
    if (cardType === "sell" || cardType === "buy") {
      const updatedComparedCoins = [...comparedCoins];
      const targetIndex = componentType === "sell" ? 0 : 1;
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
    componentType === "sell"
      ? dispatch(setSellCoinId(id))
      : dispatch(setBuyCoinId(id));
    handleDropdownReset();
    handleCoinComparison(id);
  }

  return (
    <Dropdown
      className="text-xl"
      img={image}
      imgWidth={30}
      imgHeight={30}
      id={id}
      symbol={symbol}
      isOpen={isDropdownOpen}
      onClick={() => handleDropdown()}
    >
      {coins.map((coin) => (
        <button key={coin.id} onClick={() => handleCoinSelect(coin.id)}>
          <CoinName
            img={coin.image}
            imgWidth={25}
            imgHeight={25}
            id={coin.id}
            symbol={coin.symbol}
          />
        </button>
      ))}
    </Dropdown>
  );
}
