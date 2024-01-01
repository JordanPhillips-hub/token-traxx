import { createAxisLabel, createBarDataset, createGraphLabel, createLineDataset } from "./utils";
import { useAppSelector } from "@/app/store/hooks";

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    "y-axis-1": {
      display: false,
      ticks: {
        display: false,
      },
    },
    "y-axis-2": {
      display: false,
      ticks: {
        display: false,
      },
    },
  },
};

export function useChartData() {
  const { marketChart, compareCharts, coinMarkets } = useAppSelector((state) => state);
  const { prices, priceDates, priceVolumes, volumeDates } = marketChart;
  const { comparedCoins, comparedPrices, comparedVolumes } = compareCharts;
  const { coins, currencySymbol } = coinMarkets;

  const defaultLineDataset = {
    labels: createAxisLabel(priceDates),
    datasets: [
      createLineDataset("Prices", prices, "hsl(240, 93%, 73%)", "y-axis-1"),
    ],
  };

  const comparedLineDataset = {
    labels: createAxisLabel(priceDates),
    datasets: [
      createLineDataset(
        createGraphLabel(comparedCoins, 1, comparedCoins[0], coins, currencySymbol, "current_price", "min"),
        comparedPrices[0],
        "hsl(240, 93%, 73%)",
        "y-axis-1"
      ),
      createLineDataset(
        createGraphLabel(comparedCoins, 2, comparedCoins[1], coins, currencySymbol, "current_price", "min"),
        comparedPrices[1],
        "hsl(284, 93%, 73%)",
        "y-axis-2"
      ),
    ],
  };

  const defaultBarDataset = {
    labels: createAxisLabel(volumeDates),
    datasets: [
      createBarDataset("Volumes", priceVolumes, "y-axis-1", {
        backgroundColor: "hsla(284, 93%, 73%, 0.5)",
      }),
    ],
  };

  const comparedBarDataset = {
    labels: createAxisLabel(volumeDates),
    datasets: [
      createBarDataset(
        createGraphLabel(comparedCoins, 1, comparedCoins[0], coins, currencySymbol, "total_volume", "bin"),
        comparedVolumes[0],
        "y-axis-1",
        {
          backgroundColor: "hsla(284, 93%, 73%, 0.5)",
        }
      ),
      createBarDataset(
        createGraphLabel(comparedCoins, 2, comparedCoins[1], coins, currencySymbol, "total_volume", "bin"),
        comparedVolumes[1],
        "y-axis-2",
        {
          backgroundColor: "hsla(240, 93%, 73%, 0.5)",
        }
      ),
    ],
  };

  return {
    defaultLineDataset,
    comparedLineDataset,
    defaultBarDataset,
    comparedBarDataset,
  };
}