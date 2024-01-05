import { useEffect, useState } from "react";
import Dropdown from "@/app/components/UI/Dropdown/Dropdown";
import { DropdownOpener } from "@/app/components/UI/Dropdown/DropdownOpener";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useGetMarketsQuery } from "@/app/store/api/coingecko";
import {
  setCoinMarkets,
  setCurrency,
  setCurrencySymbol,
} from "@/app/store/features/coinMarketSlice";

const currencies = [
  { id: "AED", symbol: "د.إ", name: "aed" },
  { id: "ARS", symbol: "AR$", name: "ars" },
  { id: "AUD", symbol: "$", name: "aud" },
  { id: "BDT", symbol: "৳", name: "bdt" },
  { id: "BHD", symbol: "ب.د", name: "bhd" },
  { id: "BRL", symbol: "R$", name: "brl" },
  { id: "CAD", symbol: "$", name: "cad" },
  { id: "CHF", symbol: "CHF", name: "chf" },
  { id: "CNY", symbol: "¥", name: "cny" },
  { id: "CZK", symbol: "Kč", name: "czk" },
  { id: "DKK", symbol: "kr", name: "dkk" },
  { id: "EUR", symbol: "€", name: "eur" },
  { id: "GBP", symbol: "£", name: "gbp" },
  { id: "HKD", symbol: "HK$", name: "hkd" },
  { id: "HUF", symbol: "Ft", name: "huf" },
  { id: "IDR", symbol: "Rp", name: "idr" },
  { id: "ILS", symbol: "₪", name: "ils" },
  { id: "INR", symbol: "₹", name: "inr" },
  { id: "JPY", symbol: "¥", name: "jpy" },
  { id: "KRW", symbol: "₩", name: "krw" },
  { id: "KWD", symbol: "د.ك", name: "kwd" },
  { id: "LKR", symbol: "₨", name: "lkr" },
  { id: "MYR", symbol: "RM", name: "myr" },
  { id: "NGN", symbol: "₦", name: "ngn" },
  { id: "NOK", symbol: "kr", name: "nok" },
  { id: "PHP", symbol: "₱", name: "php" },
  { id: "PKR", symbol: "₨", name: "pkr" },
  { id: "PLN", symbol: "zł", name: "pln" },
  { id: "RUB", symbol: "₽", name: "rub" },
  { id: "SAR", symbol: "ر.س", name: "sar" },
  { id: "SEK", symbol: "kr", name: "sek" },
  { id: "SGD", symbol: "$", name: "sgd" },
  { id: "THB", symbol: "฿", name: "thb" },
  { id: "TRY", symbol: "₺", name: "try" },
  { id: "TWD", symbol: "NT$", name: "twd" },
  { id: "UAH", symbol: "₴", name: "uah" },
  { id: "USD", symbol: "$", name: "usd" },
  { id: "VND", symbol: "₫", name: "vnd" },
  { id: "ZAR", symbol: "R", name: "zar" },
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

  function handleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  useEffect(() => {
    if (markets) {
      dispatch(setCoinMarkets(markets));
    }
  }, [markets, currency, dispatch]);

  function handleCurrencyChange(currency: string, symbol: string) {
    dispatch(setCurrency(currency));
    dispatch(setCurrencySymbol(symbol));
    setIsDropdownOpen(false);
  }

  function renderCurrencyItem(item: CurrencyItem) {
    return <span>{`${item.symbol} ${item.id}`}</span>;
  }

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
        onClick={handleDropdown}
      >
        <span className="text-lg">{currencySymbol}</span>
      </DropdownOpener>
    </Dropdown>
  );
}
