import { useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { useTheme } from "next-themes";
import { setCompareData } from "./utils";
import { chartOptions } from "./data";
import { ChartProps } from "./types";
import { useChartData, useDefaultDatasets, useComparedDatasets } from "./hooks";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  setPriceDates,
  setPriceVolumes,
  setPrices,
  setVolumeDates,
} from "@/app/store/features/charts/marketChartSlice";
import {
  setComparedPrices,
  setComparedVolumes,
} from "@/app/store/features/charts/compareChartSlice";
import {
  flattenNumberArray,
  filterIntegers,
  filterNonIntegers,
} from "@/app/utils/arrayHelpers";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend
);

export default function Chart({ chartType, coinId, days }: ChartProps) {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const { chartData, isLoading, isError } = useChartData(coinId, days);
  const { defaultLineDataset, defaultBarDataset } = useDefaultDatasets();
  const { comparedLineDataset, comparedBarDataset } = useComparedDatasets();
  const getCompareChartState = useAppSelector((state) => state.compareCharts);
  const { isComparing, comparedPrices, comparedVolumes } = getCompareChartState;
  const priceArr = flattenNumberArray(chartData?.prices);
  const volumeArr = flattenNumberArray(chartData?.total_volumes);

  function setLineStates() {
    dispatch(setPrices(filterNonIntegers(priceArr)));
    dispatch(setPriceDates(filterIntegers(priceArr)));
    dispatch(
      setComparedPrices(
        setCompareData(comparedPrices, filterNonIntegers(priceArr))
      )
    );
  }

  function setBarStates() {
    dispatch(setPriceVolumes(filterNonIntegers(volumeArr)));
    dispatch(setVolumeDates(filterIntegers(volumeArr)));
    dispatch(
      setComparedVolumes(
        setCompareData(comparedVolumes, filterNonIntegers(volumeArr))
      )
    );
  }

  useEffect(() => {
    if (chartData) {
      chartType === "line" ? setLineStates() : setBarStates();
    }
  }, [chartData, chartType]);

  if (isLoading) return <p className="text-gray100">Chart Loading</p>;
  if (isError)
    return <p className="text-gray100">Chart error, please try again later</p>;
  return (
    <div className="h-full">
      {chartType === "line" && (
        <Line
          data={isComparing ? comparedLineDataset : defaultLineDataset}
          options={chartOptions}
        />
      )}

      {chartType === "bar" && (
        <Bar
          data={isComparing ? comparedBarDataset : defaultBarDataset}
          options={chartOptions}
        />
      )}
    </div>
  );
}
