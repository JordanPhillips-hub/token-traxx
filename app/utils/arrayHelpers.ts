export function flattenNumberArray(arr?: number[]): number[] {
  return arr?.flat() || [];
};

export function filterIntegers(arr: number[]) {
  return arr.filter((number) => Number.isInteger(number));
};

export function filterNonIntegers(arr: number[]) {
  return arr.filter((number) => !Number.isInteger(number));
};