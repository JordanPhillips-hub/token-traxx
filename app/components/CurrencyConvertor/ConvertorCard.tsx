import {
  setNumToSell,
  setSellPrice,
} from "@/app/store/features/convertorSlice";
import { useAppDispatch, useAppSelector } from "../Charts/imports";
import ConvertorDropdown from "./ConvertorDropdown";
import { ChangeEvent } from "react";
import Legend from "./Legend";

type ConvertorCardProps = {
  cardType: string;
  cardName: string;
};

export default function ConvertorCard({
  cardType,
  cardName,
}: ConvertorCardProps) {
  const dispatch = useAppDispatch();

  const { buyCoinId, sellCoinId, sellPrice, numToSell } = useAppSelector(
    (state) => state.convertor
  );

  const { coins, currencySymbol } = useAppSelector(
    (state) => state.coinMarkets
  );

  const selectedBuyCoin = coins.find((coin) => coin.id === buyCoinId);
  const selectedSellCoin = coins.find((coin) => coin.id === sellCoinId);
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = parseFloat(e.target.value);
    const price = inputValue * selectedSellCoin.current_price;
    dispatch(setNumToSell(inputValue));
    dispatch(setSellPrice(price));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <div className="container bg-blue600 p-6 rounded-2xl" id={cardType}>
      <p className="text-sm text-gray100 mb-10">{cardName}</p>

      <div className="flex justify-between mb-1">
        <div className="relative">
          {cardType === "buy" ? (
            <ConvertorDropdown cardType="buy" {...selectedBuyCoin} />
          ) : (
            <ConvertorDropdown cardType="sell" {...selectedSellCoin} />
          )}
        </div>

        {cardType === "buy" && (
          <p>{Math.floor(sellPrice / selectedBuyCoin.current_price)}</p>
        )}

        {cardType === "sell" && (
          <form onSubmit={handleSubmit}>
            <input
              className=" p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-purple500"
              type="number"
              name="toSell"
              id="toSell"
              onChange={handleInputChange}
              value={numToSell}
              min={1}
            />
          </form>
        )}
      </div>

      <hr />

      <Legend
        symbol={
          cardType === "buy" ? selectedBuyCoin.symbol : selectedSellCoin.symbol
        }
        currencySymbol={currencySymbol}
        price={
          cardType === "buy"
            ? selectedBuyCoin.current_price
            : selectedSellCoin.current_price
        }
      />
    </div>
  );
}
