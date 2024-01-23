import { useEffect, useState } from "react";
import { CurrencyItem } from "./types";
import { convertCurrencyCodes } from "./utils";
import Dropdown from "@/app/components/UI/Dropdown/Dropdown";
import { DropdownOpener } from "@/app/components/UI/Dropdown/DropdownOpener";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useGetMarketsQuery } from "@/app/store/api/coingecko";
import {
  setCoinMarkets,
  setCurrency,
  setCurrencySymbol,
} from "@/app/store/features/coinMarketSlice";

export default function CurrencyDropdown() {
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { currency, currencySymbol } = useAppSelector(
    (state) => state.coinMarkets
  );

  const { data: markets } = useGetMarketsQuery({
    page: 1,
    currency: currency,
  });

  function handleCurrencyChange(currency: string, symbol: string) {
    dispatch(setCurrency(currency));
    dispatch(setCurrencySymbol(symbol));
    setIsDropdownOpen(false);
  }

  function renderCurrencyItem(item: CurrencyItem) {
    return <span>{`${item.symbol} ${item.id}`}</span>;
  }

  useEffect(() => {
    if (markets) {
      dispatch(setCoinMarkets(markets));
    }
  }, [markets, currency, dispatch]);

  return (
    <Dropdown
      containerClass="flex flex-wrap w-[270px] gap-2 right-0"
      itemClass="p-1 rounded-none"
      isOpen={isDropdownOpen}
      items={convertCurrencyCodes()}
      renderItem={(item) => renderCurrencyItem(item)}
      onItemClick={(name, symbol) => handleCurrencyChange(name, symbol)}
    >
      <DropdownOpener
        className="dark:bg-blue800 font-normal h-full px-3 "
        isOpen={isDropdownOpen}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="text-lg">{currencySymbol}</span>
      </DropdownOpener>
    </Dropdown>
  );
}
