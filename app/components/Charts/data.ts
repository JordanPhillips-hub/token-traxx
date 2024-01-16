export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
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
    "y-axis-1": {
      display: false,
      ticks: {
        display: false,
      },
    },
    "y-axis-2": {
      display: false,
      ticks: {
        display: false,
      },
    },
  },
};

export const sparklineOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: { display: false },
    y: { display: false },
  },
};