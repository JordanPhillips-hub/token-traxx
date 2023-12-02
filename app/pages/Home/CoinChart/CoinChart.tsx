import { useEffect, useCallback } from "react";
import { Line, Bar } from "react-chartjs-2";
import { useTheme } from "next-themes";
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
import { ChartProps, GradientContext } from "./types";
import { createGraphLabel, createAxisLabel } from "./utils";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useGetMarketChartQuery } from "@/app/store/api/coingecko";
import {
  setPriceVolumes,
  setPriceDates,
  setPrices,
  setVolumeDates,
} from "@/app/store/features/charts/marketChartSlice";
import {
  setComparedPrices,
  setComparedVolumes,
} from "@/app/store/features/charts/compareChartSlice";
import { filterMonthData } from "@/app/utils/filterMonthData";

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

const options = {
  responsive: true,
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
  },
};

const lineBackgroundColors = ["#474794", "#2D2D5E", "#1F1F3D"];
const barBackgroundColors = ["#935CCC", "#664491", "#392955"];

function createGradient(
  ctx: CanvasRenderingContext2D,
  top: number,
  bottom: number,
  colors: string[]
): CanvasGradient {
  const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
  gradientBg.addColorStop(0, colors[0]);
  gradientBg.addColorStop(0.7, colors[1]);
  gradientBg.addColorStop(1, colors[2]);
  return gradientBg;
}

function getGradientBackgroundColor(
  context: GradientContext,
  colors: string[]
): CanvasGradient | undefined {
  if (!context.chart.chartArea) {
    return;
  }
  const {
    ctx,
    chartArea: { top, bottom },
  } = context.chart;
  return createGradient(ctx!, top, bottom, colors);
}

export default function CoinChart({ chartType, coinId, days }: ChartProps) {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

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

  const { coins } = useAppSelector((state) => state.coinMarkets);
  const { prices, priceDates, priceVolumes, volumeDates } = useAppSelector(
    (state) => state.marketChart
  );
  const { isComparing, comparedCoins, comparedPrices, comparedVolumes } =
    useAppSelector((state) => state.compareCharts);

  function setComparedData(arr: number[][], secondIndex: number[]) {
    const newComparedArr = [...arr];
    newComparedArr.push(secondIndex);

    if (newComparedArr.length > 2) {
      newComparedArr.shift();
    }

    return newComparedArr;
  }

  const setLineData = useCallback(
    (firstIndex: number[], secondIndex: number[]) => {
      if (chartType === "line") {
        dispatch(setPriceDates(firstIndex));
        dispatch(setPrices(secondIndex));
        dispatch(
          setComparedPrices(setComparedData(comparedPrices, secondIndex))
        );
      }
    },
    [chartType, dispatch, comparedPrices]
  );

  const setBarData = useCallback(
    (firstIndex: number[], secondIndex: number[]) => {
      if (chartType === "bar") {
        dispatch(setVolumeDates(firstIndex));
        dispatch(setPriceVolumes(secondIndex));
        dispatch(
          setComparedVolumes(setComparedData(comparedVolumes, secondIndex))
        );
      }
    },
    [chartType, dispatch, comparedVolumes]
  );

  const updateChartData = useCallback(() => {
    if (chartData) {
      let { firstIndex, secondIndex } = filterMonthData(
        chartType === "line" ? chartData.prices : chartData.total_volumes
      );

      setLineData(firstIndex, secondIndex);
      setBarData(firstIndex, secondIndex);
    }
  }, [chartData, chartType]);

  useEffect(() => {
    updateChartData();
  }, [updateChartData]);

  const defaultLineDataset = {
    labels: createAxisLabel(priceDates),
    datasets: [
      {
        fill: true,
        label: "Prices",
        data: prices,
        borderColor: "hsl(240, 93%, 73%)",
        pointStyle: "circle",
        pointRadius: 4,
        tension: 0.4,
        backgroundColor: (context: GradientContext) =>
          getGradientBackgroundColor(context, lineBackgroundColors),
      },
    ],
  };

  const comparedLineDataset = {
    labels: createAxisLabel(priceDates),
    datasets: [
      {
        label: createGraphLabel(
          comparedCoins,
          1,
          comparedCoins[0],
          coins,
          "current_price",
          "min"
        ),
        data: comparedPrices[0],
        borderColor: "hsl(240, 93%, 73%)",
        backgroundColor: "hsla(240, 93%, 73%, 0.5)",
      },
      {
        label: createGraphLabel(
          comparedCoins,
          2,
          comparedCoins[1],
          coins,
          "current_price",
          "min"
        ),
        data: comparedPrices[1],
        borderColor: "hsl(284, 93%, 73%)",
        backgroundColor: "hsla(284, 93%, 73%, 0.5)",
      },
    ],
  };

  const defaultBarDataset = {
    labels: createAxisLabel(volumeDates),
    datasets: [
      {
        fill: true,
        label: "Volumes",
        data: priceVolumes,
        backgroundColor: (context: GradientContext) =>
          getGradientBackgroundColor(context, barBackgroundColors),
      },
    ],
  };

  const comparedBarDataset = {
    labels: createAxisLabel(volumeDates),
    datasets: [
      {
        fill: true,
        label: createGraphLabel(
          comparedCoins,
          1,
          comparedCoins[0],
          coins,
          "total_volume",
          "bin"
        ),
        data: comparedVolumes[0],
        backgroundColor: (context: GradientContext) =>
          getGradientBackgroundColor(context, lineBackgroundColors),
      },
      {
        fill: true,
        label: createGraphLabel(
          comparedCoins,
          2,
          comparedCoins[1],
          coins,
          "total_volume",
          "bin"
        ),
        data: comparedVolumes[1],
        backgroundColor: (context: GradientContext) =>
          getGradientBackgroundColor(context, barBackgroundColors),
      },
    ],
  };

  return (
    <div className="h-full">
      {isLoading ? (
        <p>Chart Loading</p>
      ) : isError ? (
        <p>chart error please try again later</p>
      ) : chartType === "line" ? (
        <Line
          data={isComparing ? comparedLineDataset : defaultLineDataset}
          options={options}
        />
      ) : (
        <Bar
          data={isComparing ? comparedBarDataset : defaultBarDataset}
          options={options}
        />
      )}
    </div>
  );
}
