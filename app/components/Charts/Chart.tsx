import {
  useEffect,
  Line,
  Bar,
  useTheme,
  useAppDispatch,
  useAppSelector,
  ChartProps,
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
  useDefaultDatasets,
  useComparedDatasets,
  chartOptions,
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

  if (isLoading) return <p>Chart Loading</p>;
  if (isError) return <p>Chart error, please try again later</p>;
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
