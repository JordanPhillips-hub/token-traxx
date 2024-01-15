import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { SparklineProps } from "./types";
import { sparklineOptions } from "./data";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function Sparkline({ sparklinePrice }: SparklineProps) {
  const data = {
    labels: sparklinePrice,
    datasets: [
      {
        data: sparklinePrice,
        borderColor: "hsla(284, 93%, 73%, 0.5)",
        pointRadius: 0,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  return (
    <Line width={150} height={30} options={sparklineOptions} data={data} />
  );
}
