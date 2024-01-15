import React, { ChangeEvent, FormEvent } from "react";
import { ConvertorCardProps } from "./types";
import ConvertorDropdown from "./ConvertorDropdown";
import Legend from "./Legend";
import { Heading } from "@/app/components/UI/Heading";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import {
  setNumToSell,
  setSellPrice,
} from "@/app/store/features/convertorSlice";

export default function ConvertorCard({
  cardType,
  cardName,
}: ConvertorCardProps) {
  const dispatch = useAppDispatch();
  const { convertor, coinMarkets } = useAppSelector((state) => state);
  const { buyCoinId, sellCoinId, sellPrice, numToSell } = convertor;
  const { coins, currencySymbol } = coinMarkets;

  const getSelectedCoin = (type: string) =>
    coins.find((coin) => coin.id === (type === "buy" ? buyCoinId : sellCoinId));

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = parseFloat(e.target.value);
    const price = inputValue * getSelectedCoin(cardType)?.current_price;
    dispatch(setNumToSell(inputValue));
    dispatch(setSellPrice(price));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="container bg-blue600 p-6 rounded-2xl" id={cardType}>
      <Heading
        containerClass="mb-10"
        textClass="text-gray100"
        size={2}
        text={cardName}
      />

      <div className="flex justify-between mb-1">
        <div className="relative">
          <ConvertorDropdown
            cardType={cardType}
            {...getSelectedCoin(cardType)}
          />
        </div>

        {cardType === "buy" && (
          <p>
            {Math.floor(sellPrice / getSelectedCoin(cardType)?.current_price)}
          </p>
        )}

        {cardType === "sell" && (
          <form onSubmit={handleSubmit}>
            <input
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-purple500"
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
        symbol={getSelectedCoin(cardType)?.symbol}
        currencySymbol={currencySymbol}
        price={getSelectedCoin(cardType)?.current_price}
      />
    </div>
  );
}
