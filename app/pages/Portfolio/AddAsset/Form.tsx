import { ChangeEvent, FormEvent, useState } from "react";
import CoinDropdown from "./CoinDropdown";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useGetCoinHistoryQuery } from "@/app/store/api/coingecko";
import FormInput from "@/app/components/Form/FormInput";
import PrimaryButton from "@/app/components/UI/Buttons/PrimaryButton";
import { formatDateToDDMMYYYY } from "@/app/utils/dateAndTime";
import {
  setPurchaseAmount,
  setPurchaseDate,
  setSelectedCoinId,
} from "@/app/store/features/portfolioSlice";

type FormProps = {
  onClose: () => void;
};

export default function Form({ onClose }: FormProps) {
  const dispatch = useAppDispatch();
  const [localSelectedCoinId, setLocalSelectedCoinId] = useState("");
  const { coins, currency, currencySymbol } = useAppSelector(
    (state) => state.coinMarkets
  );

  const [formInputs, setFormInputs] = useState({
    formAmount: "",
    formDate: "",
  });

  const { purchaseDate, selectedCoinId } = useAppSelector(
    (state) => state.portfolio
  );

  const { data: coinHistory } = useGetCoinHistoryQuery({
    id: selectedCoinId,
    date: purchaseDate,
  });

  const selectedCoin = coins.find((coin) => coin.id === selectedCoinId);
  const { formAmount, formDate } = formInputs;
  const {
    id,
    current_price,
    symbol,
    image,
    price_change_percentage_24h: priceChange24h,
    total_volume,
    market_cap,
    max_supply,
    circulating_supply,
  } = selectedCoin;

  function handleChange({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>) {
    setFormInputs((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  function handleSelectedCoinChange(coinId: string) {
    setLocalSelectedCoinId(coinId);
  }

  function resetLocalState() {
    setLocalSelectedCoinId("");
    setFormInputs({ formAmount: "", formDate: "" });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setSelectedCoinId(localSelectedCoinId));
    dispatch(setPurchaseDate(formatDateToDDMMYYYY(formDate)));
    dispatch(setPurchaseAmount(formAmount));

    const existingAssets = localStorage.getItem("Assets");
    let coinAssets = existingAssets ? JSON.parse(existingAssets) : [];
    const asset = {
      id: localSelectedCoinId,
      amount_purchased: formAmount,
      purchase_date: formatDateToDDMMYYYY(formDate),
      price_at_purchase: coinHistory.market_data.current_price[currency],
      current_price: current_price,
      symbol: symbol,
      image: image,
      price_change_24H: priceChange24h,
      volume: total_volume,
      market_cap: market_cap,
      max_supply: max_supply,
      circ_supply: circulating_supply,
      currency: currencySymbol,
    };

    coinAssets.push(asset);
    localStorage.setItem("Assets", JSON.stringify(coinAssets));
    resetLocalState();
    onClose();
  }

  return (
    <div className="flex flex-col gap-4">
      <CoinDropdown
        image={image}
        id={id}
        symbol={symbol}
        onSelectedCoinChange={handleSelectedCoinChange}
      />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} action="">
        <FormInput
          className="dark:bg-blue700 p-2 w-full placeholder:text-white"
          label="Purchased Amount"
          placeholder="Purchased Amount"
          type="number"
          name="formAmount"
          value={formAmount}
          onChange={handleChange}
          min={0}
        />
        <FormInput
          className="dark:bg-blue700 p-2 w-full"
          label="Purchased Date"
          type="date"
          name="formDate"
          defaultValue={formatDateToDDMMYYYY(new Date())}
          max={formatDateToDDMMYYYY(new Date())}
          onChange={handleChange}
        />

        <div className="flex w-full justify-between gap-4">
          <PrimaryButton
            className="justify-center w-1/2 p-3"
            text="Cancel"
            onClick={() => onClose()}
          />
          <PrimaryButton
            className="bg-purple500 justify-center w-1/2 p-3"
            text="Save And Continue"
            type="submit"
            onClick={() => handleSubmit}
            isDisabled={
              Number(formAmount) < 1 ||
              formDate === "" ||
              localSelectedCoinId === ""
            }
          />
        </div>
      </form>
    </div>
  );
}
