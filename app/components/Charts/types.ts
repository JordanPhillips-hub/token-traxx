export type ChartContainerProps = {
  children: React.ReactNode;
  name: string | React.ReactNode;
  price?: number | string;
  date?: string;
  type: string;
  location: string;
};

export type ChartProps = {
  chartType: string;
  coinId: string;
  days: number;
};

export type SparklineProps = {
  sparklinePrice: number[];
};

export type GradientContext = {
  chart: {
    chartArea?: {
      top: number;
      bottom: number;
    };
    ctx?: CanvasRenderingContext2D;
  };
};

export type LineDataset = {
  label: string;
  data: number[];
  borderColor: string;
  yAxisID: string;
  fill: boolean;
  pointStyle?: string;
  pointRadius?: number;
  tension?: number;
};

export type BarDataset = {
  fill: boolean;
  label: string;
  data: number[];
  yAxisID: string;
  backgroundColor?: ((context: GradientContext) => string) | string;
};