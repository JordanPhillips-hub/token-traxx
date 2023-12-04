export type ChartContainerProps = {
  children: React.ReactNode;
  name: string;
  price: number | string;
  date: string;
  type: string;
};

export type ChartProps = {
  chartType: string;
  coinId: string;
  days: number;
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