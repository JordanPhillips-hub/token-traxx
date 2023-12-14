import { formatPrice } from "@/app/utils/numberFormatting";
import { optionalCapitalize } from "@/app/utils/optionalCapitalize";

export function formatCoinName(name: string, symbol: string) {
  return `${optionalCapitalize(name)} (${symbol.toUpperCase()})`;
}