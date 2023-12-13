import { ChangeEvent } from "react";
import ConvertorDropdown from "./ConvertorDropdown";
import Legend from "./Legend";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  setNumToSell,
  setSellPrice,
} from "@/app/store/features/convertorSlice";

export default function SellCard() {
  const dispatch = useAppDispatch();
  const { sellCoinId, numToSell } = useAppSelector((state) => state.convertor);
  const { coins } = useAppSelector((state) => state.coinMarkets);
  const selectedCoin = coins.find((coin) => coin.id === sellCoinId);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = parseFloat(e.target.value);
    const price = inputValue * selectedCoin.current_price;
    dispatch(setNumToSell(inputValue));
    dispatch(setSellPrice(price));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="container bg-primary600 p-6 rounded-2xl">
      <p className="text-sm text-neutral400 mb-10">You Sell</p>

      <div className="flex justify-between mb-1">
        {selectedCoin && (
          <div className="relative">
            <ConvertorDropdown componentType="sell" {...selectedCoin} />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className=" p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-primary500"
            type="number"
            name="toSell"
            id="toSell"
            onChange={handleInputChange}
            value={numToSell}
            min={1}
          />
        </form>
      </div>

      <hr />

      {selectedCoin && (
        <Legend
          symbol={selectedCoin.symbol}
          price={selectedCoin.current_price}
        />
      )}
    </div>
  );
}
