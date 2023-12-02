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