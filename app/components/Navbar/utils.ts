import { currencyCodes } from "./data";
import getSymbolFromCurrency from "currency-symbol-map";

export function convertCurrencyCodes() {
  const currencies = currencyCodes.map((code) => ({
    id: code,
    symbol: getSymbolFromCurrency(code) || "",
    name: code.toLowerCase(),
  }));
  return currencies
}