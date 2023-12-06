"use client";
import ChartContainer from "./ChartContainer";
import CoinChart from "./CoinChart";
import CurrencySelector from "./CurrencySelector";
import CoinTable from "./CoinTable";
import { formatCoinName } from "./utils";
import { useGetMarketsQuery } from "@/app/store/api/coingecko";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setChartTimePeriod } from "@/app/store/features/charts/timePeriodSlice";
import { setIsComparing } from "@/app/store/features/charts/compareChartSlice";
import PrimaryButton from "@/app/components/UI/Buttons/PrimaryButton";
import Icon from "@/app/components/UI/Icon";
import TimePeriodSelector from "@/app/components/UI/TimePeriodSelector";
import { formatPrice } from "@/app/utils/numberFormatting";

export default function Home() {
  const dispatch = useAppDispatch();
  const { isLoading, isError } = useGetMarketsQuery({ page: 0 });
  const { timePeriod } = useAppSelector((state) => state.chartTimePeriod);
  const { isComparing } = useAppSelector((state) => state.compareCharts);
  const { coins, coinId } = useAppSelector((state) => state.coinMarkets);
  const selectedCoin = coins.find((coin) => coin.id === coinId);

  const charts = [
    {
      type: "line",
      name: formatCoinName(selectedCoin?.id ?? "", selectedCoin?.symbol ?? ""),
      err: "Prices not available",
      loading: "Loading Price",
      value: `${formatPrice(selectedCoin?.current_price) ?? ""} min`,
      date: new Date().toDateString(),
    },
    {
      type: "bar",
      name: "Volume 24hr",
      err: "Volumes not available",
      loading: "Loading Volumes",
      value: `${formatPrice(selectedCoin?.total_volume) ?? ""} bin`,
      date: new Date().toDateString(),
    },
  ];

  return (
    <main className="bg-grey100 dark:bg-slate700 max-w-8xl mx-auto px-24 pt-20">
      <section className="container mx-auto relative">
        <div className="flex mb-6">
          <div>
            <PrimaryButton
              size="med"
              onClick={() => dispatch(setIsComparing(!isComparing))}
            >
              <div className="text-sm flex items-center gap-2">
                <Icon iconVariant={isComparing ? "exit" : "graph"} />
                {isComparing ? "Exit Comparison" : "Compare"}
              </div>
            </PrimaryButton>
          </div>
        </div>

        <CurrencySelector />
      </section>

      <section className="container flex-col mb-16 mx-auto">
        <div className="flex gap-8">
          {charts.map((chart) => {
            const { name, value, date, type } = chart;
            return (
              <ChartContainer
                key={name}
                name={isLoading ? "Loading" : isError ? "Error Occurred" : name}
                price={isLoading || isError ? "" : `$${value}`}
                date={date}
                type={type}
              >
                <CoinChart chartType={type} coinId={coinId} days={timePeriod} />
              </ChartContainer>
            );
          })}
        </div>

        <TimePeriodSelector
          onTimePeriodChange={(timePeriod: number) =>
            dispatch(setChartTimePeriod(timePeriod))
          }
        />
      </section>

      <section className="container mx-auto">
        <CoinTable />
      </section>
    </main>
  );
}
