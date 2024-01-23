import getSymbolFromCurrency from "currency-symbol-map";
import { currencyCodes } from "./data";

export function convertCurrencyCodes() {
  const currencies = currencyCodes.map((code) => ({
    id: code,
    symbol: getSymbolFromCurrency(code) || "",
    name: code.toLowerCase(),
  }));
  return currencies;
};