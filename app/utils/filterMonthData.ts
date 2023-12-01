import { timestampToDate } from './numberFormatting';

export const filterMonthData = (obj: any) => {
  const matchingData = [];

  for (const entry of obj) {
    const timestamp = entry[0];
    const date = timestampToDate(timestamp);
    const entryMonth = date.split(" ")[0];

    if (entryMonth) {
      matchingData.push(entry);
    };
  };

  const firstIndex = matchingData.map((price: [number, number]) => price[0]);
  const secondIndex = matchingData.map((price: [number, number]) => price[1]);

  return { firstIndex, secondIndex };
};
