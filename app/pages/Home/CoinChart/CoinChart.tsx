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
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useGetMarketChartQuery } from "../../../store/api/coingecko";
import {
  setPriceVolumes,
  setPriceDates,
  setPrices,
  setVolumeDates,
} from "../../../store/features/charts/marketChartSlice";
import {
  setComparedPrices,
  setComparedVolumes,
} from "../../../store/features/charts/compareChartSlice";
import { filterMonthData } from "../../../utils/filterMonthData";
import { optionalCapitalize } from "../../../utils/optionalCapitalize";
import { formatPrice } from "../../../utils/numberFormatting";

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

type ChartProps = {
  chartType: string;
  coinId: string;
  days: number;
};

type GradientContext = {
  chart: {
    chartArea?: {
      top: number;
      bottom: number;
    };
    ctx?: CanvasRenderingContext2D;
  };
};

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

  function createGraphLabel(
    len: number,
    coinId: string,
    priceType: "current_price" | "total_volume",
    unit: string
  ) {
    const isGreaterThan = comparedCoins.length >= len;
    const coinName = optionalCapitalize(coinId);
    const findCoin = coins.find((coin) => coin.id === coinId);
    const currentPrice = formatPrice(findCoin?.[priceType]);
    return isGreaterThan ? `${coinName} $${currentPrice} ${unit}` : "";
  }

  function createAxisLabel(arr: number[]) {
    const label = arr.map((date: string | number | Date) =>
      new Date(date).getDate()
    );
    return label;
  }

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
        label: createGraphLabel(1, comparedCoins[0], "current_price", "min"),
        data: comparedPrices[0],
        borderColor: "hsl(240, 93%, 73%)",
        backgroundColor: "hsla(240, 93%, 73%, 0.5)",
      },
      {
        label: createGraphLabel(2, comparedCoins[1], "current_price", "min"),
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
        label: createGraphLabel(1, comparedCoins[0], "total_volume", "bin"),
        data: comparedVolumes[0],
        backgroundColor: (context: GradientContext) =>
          getGradientBackgroundColor(context, lineBackgroundColors),
      },
      {
        fill: true,
        label: createGraphLabel(2, comparedCoins[1], "total_volume", "bin"),
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
