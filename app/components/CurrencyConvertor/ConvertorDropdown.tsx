import { useState } from "react";
import Dropdown from "@/app/components/UI/Dropdown";
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
  id,
  symbol,
}: DropdownProps) {
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { comparedCoins } = useAppSelector((state) => state.compareCharts);
  const { coins } = useAppSelector((state) => state.coinMarkets);

  function handleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleCoinComparison(id: string) {
    dispatch(setCoinId(id));
    if (componentType === "sell" || componentType === "buy") {
      const updatedComparedCoins = [...comparedCoins];
      updatedComparedCoins[componentType === "sell" ? 0 : 1] = id;
      dispatch(setComparedCoins(updatedComparedCoins));
    }
  }

  function handleCoinSelect(id: string) {
    componentType === "sell"
      ? dispatch(setSellCoinId(id))
      : dispatch(setBuyCoinId(id));

    dispatch(setNumToSell(0));
    dispatch(setSellPrice(0));
    setIsDropdownOpen(false);
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
