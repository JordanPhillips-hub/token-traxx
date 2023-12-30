import {
  useEffect,
  useCallback,
  Line,
  Bar,
  useTheme,
  useAppDispatch,
  useAppSelector,
  ChartProps,
  useGetMarketChartQuery,
  setPriceDates,
  setPriceVolumes,
  setPrices,
  setVolumeDates,
  setComparedPrices,
  setComparedVolumes,
  setCompareData,
  flattenNumberArray,
  filterIntegers,
  filterNonIntegers,
  useChartData,
  options,
} from "./imports";

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
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const getCompareChartState = useAppSelector((state) => state.compareCharts);

  const {
    data: chartData,
    isError,
    isLoading,
  } = useGetMarketChartQuery({
    coinId: coinId,
    days: days,
    prices: [],
    total_volumes: [],
  });

  const { isComparing, comparedPrices, comparedVolumes } = getCompareChartState;
  const priceArr = flattenNumberArray(chartData?.prices);
  const volumeArr = flattenNumberArray(chartData?.total_volumes);

  const updateChartData = useCallback(() => {
    const newPrices = filterNonIntegers(priceArr);
    const newPriceDates = filterIntegers(priceArr);
    const newVolumes = filterNonIntegers(volumeArr);
    const newVolumeDates = filterIntegers(volumeArr);

    if (chartData) {
      if (chartType === "line") {
        dispatch(setPrices(newPrices));
        dispatch(setPriceDates(newPriceDates));
        dispatch(setComparedPrices(setCompareData(comparedPrices, newPrices)));
      } else {
        dispatch(setPriceVolumes(newVolumes));
        dispatch(setVolumeDates(newVolumeDates));
        dispatch(
          setComparedVolumes(setCompareData(comparedVolumes, newVolumes))
        );
      }
    }
  }, [chartData, chartType]);

  const {
    defaultLineDataset,
    comparedLineDataset,
    defaultBarDataset,
    comparedBarDataset,
  } = useChartData();

  useEffect(() => {
    updateChartData();
  }, [updateChartData]);

  return (
    <div className="h-full">
      {isLoading && <p>Chart Loading</p>}
      {isError && <p>Chart error, please try again later</p>}

      {chartType === "line" && (
        <Line
          data={isComparing ? comparedLineDataset : defaultLineDataset}
          options={options}
        />
      )}

      {chartType === "bar" && (
        <Bar
          data={isComparing ? comparedBarDataset : defaultBarDataset}
          options={options}
        />
      )}
    </div>
  );
}
