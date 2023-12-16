export function optionalCapitalize(string: string | undefined) {
  if (string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  };
};

export function formatCoinName(name: string, symbol: string) {
  return `${optionalCapitalize(name)} (${symbol.toUpperCase()})`;
}

