import { useEffect, useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import Dropdown from "@/app/components/UI/Dropdown/Dropdown";
import { DropdownOpener } from "@/app/components/UI/Dropdown/DropdownOpener";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useGetMarketsQuery } from "@/app/store/api/coingecko";
import {
  setCoinMarkets,
  setCurrency,
  setCurrencySymbol,
} from "@/app/store/features/coinMarketSlice";

const currencyCodes = [
  "AED",
  "ARS",
  "AUD",
  "BDT",
  "BHD",
  "BRL",
  "CAD",
  "CHF",
  "CNY",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "HKD",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "JPY",
  "KRW",
  "KWD",
  "LKR",
  "MYR",
  "NGN",
  "NOK",
  "PHP",
  "PKR",
  "PLN",
  "RUB",
  "SAR",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "TWD",
  "UAH",
  "USD",
  "VND",
  "ZAR",
];

type CurrencyItem = {
  id: string;
  symbol: string;
};

export default function CurrencyDropdown() {
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { coinMarkets } = useAppSelector((state) => state);
  const { currency, currencySymbol } = coinMarkets;

  const { data: markets } = useGetMarketsQuery({
    page: 1,
    currency: currency,
  });

  const currencies = currencyCodes.map((code) => ({
    id: code,
    symbol: getSymbolFromCurrency(code) || "",
    name: code.toLowerCase(),
  }));

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
      items={currencies}
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
