import React, { ChangeEvent, FormEvent } from "react";
import { useGetSelectedCoin } from "./hooks";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import {
  setNumToSell,
  setSellPrice,
} from "@/app/store/features/convertorSlice";

export default function SellForm({ cardType }: { cardType: string }) {
  const dispatch = useAppDispatch();
  const { numToSell } = useAppSelector((state) => state.convertor);
  const currentPrice = useGetSelectedCoin(cardType)?.current_price;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = parseFloat(e.target.value);
    const price = inputValue * currentPrice;
    dispatch(setNumToSell(inputValue));
    dispatch(setSellPrice(price));
  }

  return (
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
  );
}
