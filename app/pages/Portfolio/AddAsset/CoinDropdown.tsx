import { useState, useEffect } from "react";
import Icon from "@/app/components/UI/Icon";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setSelectedCoinId } from "@/app/store/features/portfolioSlice";
import { optionalCapitalize } from "@/app/utils/generalHelpers";

type CoinDropdownProps = {
  onSelectedCoinChange: (coinId: string) => void;
};

export default function CoinDropdown({
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

  return (
    <div className="bg-blue700 p-2 relative rounded">
      <button
        className="flex items-center justify-between w-full"
        onClick={() => setIsSelectingCoin(!isSelectingCoin)}
      >
        {selectedCoinId ? optionalCapitalize(selectedCoinId) : "Select Coin"}
        <Icon iconVariant="chevDown" />
      </button>

      {isSelectingCoin && (
        <div className="bg-blue700 absolute left-0 w-1/2">
          <ul className="text-sm p-4">
            {coins.map((coin) => (
              <li key={coin.name}>
                <button
                  className="hover:text-base"
                  onClick={() => handleSelectedCoin(coin.id)}
                >
                  {optionalCapitalize(coin.id)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
