import { useEffect, useState } from "react";
import PrimaryButton from "@/app/components/UI/Buttons/PrimaryButton";
import Icon from "@/app/components/UI/Icon";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useGetMarketsQuery } from "@/app/store/api/coingecko";
import {
  setCoinMarkets,
  setCurrency,
  setCurrencySymbol,
} from "@/app/store/features/coinMarketSlice";

const currencies = {
  AED: { symbol: "د.إ" },
  ARS: { symbol: "AR$" },
  AUD: { symbol: "$" },
  BDT: { symbol: "৳" },
  BHD: { symbol: "ب.د" },
  BRL: { symbol: "R$" },
  CAD: { symbol: "$" },
  CHF: { symbol: "CHF" },
  CNY: { symbol: "¥" },
  CZK: { symbol: "Kč" },
  DKK: { symbol: "kr" },
  EUR: { symbol: "€" },
  GBP: { symbol: "£" },
  HKD: { symbol: "HK$" },
  HUF: { symbol: "Ft" },
  IDR: { symbol: "Rp" },
  ILS: { symbol: "₪" },
  INR: { symbol: "₹" },
  JPY: { symbol: "¥" },
  KRW: { symbol: "₩" },
  KWD: { symbol: "د.ك" },
  LKR: { symbol: "₨" },
  MYR: { symbol: "RM" },
  NGN: { symbol: "₦" },
  NOK: { symbol: "kr" },
  PHP: { symbol: "₱" },
  PKR: { symbol: "₨" },
  PLN: { symbol: "zł" },
  RUB: { symbol: "₽" },
  SAR: { symbol: "ر.س" },
  SEK: { symbol: "kr" },
  SGD: { symbol: "$" },
  THB: { symbol: "฿" },
  TRY: { symbol: "₺" },
  TWD: { symbol: "NT$" },
  UAH: { symbol: "₴" },
  USD: { symbol: "$" },
  VND: { symbol: "₫" },
  ZAR: { symbol: "R" },
};

export default function CurrencyDropdown() {
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { currency } = useAppSelector((state) => state.coinMarkets);

  const { data: coinMarkets } = useGetMarketsQuery({
    page: 1,
    currency: currency,
  });

  function handleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  useEffect(() => {
    if (coinMarkets) {
      dispatch(setCoinMarkets(coinMarkets));
    }
  }, [coinMarkets, currency, dispatch]);

  function handleCurrencyChange(currency: string, symbol: string) {
    dispatch(setCurrency(currency));
    dispatch(setCurrencySymbol(symbol));
    setIsDropdownOpen(false);
  }

  return (
    <div className="relative dark:bg-blue800 flex py-2.5 px-3 rounded-md">
      <button
        className="text-sm flex items-center gap-2"
        onClick={handleDropdown}
      >
        <div>
          <Icon className="text-lg" iconVariant="dollar" />
        </div>
        {currency.toUpperCase()}
        <Icon
          className={`${isDropdownOpen ? "rotate-180" : ""}`}
          iconVariant="chevDown"
        />
      </button>

      <div
        className={`${
          isDropdownOpen
            ? "text-sm absolute dark:bg-blue800 flex justify-center flex-wrap w-[300px] top-14 right-0 p-2 rounded z-50"
            : "hidden"
        }`}
      >
        {Object.entries(currencies).map(([currency, { symbol }]) => (
          <PrimaryButton
            className="w-1/4 mr-2 mb-2 p-1 justify-center rounded-none"
            key={currency}
            onClick={() => handleCurrencyChange(currency.toLowerCase(), symbol)}
          >{`${symbol} ${currency}`}</PrimaryButton>
        ))}
      </div>
    </div>
  );
}
