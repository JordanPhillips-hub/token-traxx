import { useState, useEffect } from "react";
import { CoinDropdownProps, DropdownItem } from "./types";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setSelectedCoinId } from "@/app/store/features/portfolioSlice";
import Dropdown from "@/app/components/UI/Dropdown/Dropdown";
import { DropdownOpener } from "@/app/components/UI/Dropdown/DropdownOpener";
import CoinName from "@/app/components/UI/CoinName";

export default function CoinDropdown({
  image,
  id,
  symbol,
  onSelectedCoinChange,
}: CoinDropdownProps) {
  const dispatch = useAppDispatch();
  const [isSelectingCoin, setIsSelectingCoin] = useState<boolean>(false);
  const { coins } = useAppSelector((state) => state.coinMarkets);
  const { selectedCoinId } = useAppSelector((state) => state.portfolio);

  useEffect(() => {
    onSelectedCoinChange(selectedCoinId);
  }, [selectedCoinId, onSelectedCoinChange]);

  function handleSelectedCoin(coinId: string) {
    dispatch(setSelectedCoinId(coinId));
    setIsSelectingCoin(false);
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
      itemClass="justify-center mb-1 p-1 dark:bg-transparent dark:text-gray100 dark:hover:text-white"
      isOpen={isSelectingCoin}
      items={coins}
      renderItem={(item) => renderDropdownItem(item)}
      onItemClick={(id) => handleSelectedCoin(id)}
    >
      <DropdownOpener
        className="text-sm w-full p-2 m-0 border-[1px] border-gray-300"
        onClick={() => setIsSelectingCoin(!isSelectingCoin)}
        isOpen={isSelectingCoin}
      >
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
