import React, { ChangeEvent } from "react";
import { useGetSelectedCoin } from "./hooks";
import FormInput from "@/app/components/Form/FormInput";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { setConvertorData } from "@/app/store/features/convertorSlice";

export default function SellInput({ cardType }: { cardType: string }) {
  const dispatch = useAppDispatch();
  const { numToSell } = useAppSelector((state) => state.convertor);
  const currentPrice = useGetSelectedCoin(cardType)?.current_price;

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = parseFloat(e.target.value);
    const price = inputValue * currentPrice;
    dispatch(setConvertorData({numToSell: inputValue, sellPrice: price}));
  }

  return (
    <FormInput
      className="bg-transparent p-2"
      label="You Sell"
      id="toSell"
      name="toSell"
      type="number"
      value={numToSell}
      min={1}
      onChange={handleInputChange}
    />
  );
}