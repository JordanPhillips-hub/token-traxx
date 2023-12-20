export function formatPrice(price: number | undefined) {
  if (price === undefined || price === null) {
    return "N/A";
  };
  const formattedPrice = price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedPrice;
};

export function formatNum3_2(num: number) {
  let baseNum = Math.floor(num);
  let decimal = num - baseNum;
  let formattedNum =
    baseNum.toString().slice(0, 3) +
    (decimal > 0 ? "." + decimal.toString().slice(2, 4) : "");
  return formattedNum;
};

export function checkNumberScale(num: number) {
  if (num >= 1e12) {
    return "T";
  } else if (num >= 1e9) {
    return "B";
  } else if (num >= 1e6) {
    return "M";
  } else {
    return "";
  };
};