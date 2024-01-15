export const options = {
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