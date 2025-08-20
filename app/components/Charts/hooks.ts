import {
  createAxisLabel,
  createBarDataset,
  createGraphLabel,
  createLineDataset,
} from "./utils";
import { useAppSelector } from "@/app/store/hooks";
import { useGetMarketChartQuery } from "@/app/store/api/coingecko";

export function useChartData(coinId: string, days: number) {
  const {
    data: chartData,
    isLoading,
    isError,
  } = useGetMarketChartQuery({
    coinId: coinId,
    days: days,
    prices: [],
    total_volumes: [],
  });
  return { chartData, isLoading, isError };
}

export function useDefaultDatasets() {
  const { prices, priceVolumes, priceDates, volumeDates } = useAppSelector(
    (state) => state.marketChart
  );

  const defaultLineDataset = {
    labels: createAxisLabel(priceDates),
    datasets: [
      createLineDataset("Prices", prices, "hsl(240, 93%, 73%)", "y-axis-1"),
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
  return { defaultLineDataset, defaultBarDataset };
}

export function useComparedDatasets() {
  const { priceDates, volumeDates } = useAppSelector(
    (state) => state.marketChart
  );
  const { coins, currencySymbol } = useAppSelector(
    (state) => state.coinMarkets
  );
  const { comparedCoins, comparedPrices, comparedVolumes } = useAppSelector(
    (state) => state.compareCharts
  );

  const comparedLineDataset = {
    labels: createAxisLabel(priceDates),
    datasets: [
      createLineDataset(
        createGraphLabel(
          comparedCoins,
          1,
          comparedCoins[0],
          coins,
          currencySymbol,
          "current_price",
          "min"
        ),
        comparedPrices[0],
        "hsl(240, 93%, 73%)",
        "y-axis-1"
      ),
      createLineDataset(
        createGraphLabel(
          comparedCoins,
          2,
          comparedCoins[1],
          coins,
          currencySymbol,
          "current_price",
          "min"
        ),
        comparedPrices[1],
        "hsl(284, 93%, 73%)",
        "y-axis-2"
      ),
    ],
  };

  const comparedBarDataset = {
    labels: createAxisLabel(volumeDates),
    datasets: [
      createBarDataset(
        createGraphLabel(
          comparedCoins,
          1,
          comparedCoins[0],
          coins,
          currencySymbol,
          "total_volume",
          "bin"
        ),
        comparedVolumes[0],
        "y-axis-1",
        {
          backgroundColor: "hsla(284, 93%, 73%, 0.5)",
        }
      ),
      createBarDataset(
        createGraphLabel(
          comparedCoins,
          2,
          comparedCoins[1],
          coins,
          currencySymbol,
          "total_volume",
          "bin"
        ),
        comparedVolumes[1],
        "y-axis-2",
        {
          backgroundColor: "hsla(240, 93%, 73%, 0.5)",
        }
      ),
    ],
  };
  return { comparedLineDataset, comparedBarDataset };
}
