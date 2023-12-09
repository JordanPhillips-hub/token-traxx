"use client";
import { useEffect, useState } from "react";
import ChartContainer from "./ChartContainer";
import CoinChart from "./CoinChart";
import CurrencySelector from "./CurrencySelector";
import CoinTable from "./CoinTable";
import { formatCoinName } from "./utils";
import { useGetMarketsQuery } from "@/app/store/api/coingecko";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setChartTimePeriod } from "@/app/store/features/charts/timePeriodSlice";
import { setIsComparing } from "@/app/store/features/charts/compareChartSlice";
import {
  setCoinMarkets,
  setIsMarketsLoading,
  setMarketsHasError,
} from "@/app/store/features/coinMarketSlice";
import CurrencyConvertorModal from "@/app/components/CurrencyConvertorModal/CurrencyConvertorModal";
import PrimaryButton from "@/app/components/UI/Buttons/PrimaryButton";
import CoinConvertorButton from "@/app/components/UI/Buttons/CoinConvertorButton";
import Icon from "@/app/components/UI/Icon";
import TimePeriodSelector from "@/app/components/UI/TimePeriodSelector";
import { formatPrice } from "@/app/utils/numberFormatting";
import { setTableCoins } from "@/app/store/features/coinTableSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { timePeriod } = useAppSelector((state) => state.chartTimePeriod);
  const { isComparing } = useAppSelector((state) => state.compareCharts);
  const { coins, coinId } = useAppSelector((state) => state.coinMarkets);
  const selectedCoin = coins.find((coin) => coin.id === coinId);

  const {
    data: coinMarkets,
    isLoading,
    isError,
  } = useGetMarketsQuery({ page: 1 });

  useEffect(() => {
    dispatch(setIsMarketsLoading(isLoading));
    dispatch(setMarketsHasError(isError));
    if (coinMarkets) {
      dispatch(setCoinMarkets(coinMarkets));
      dispatch(setTableCoins(coinMarkets));
    }
  }, [coinMarkets, isError, isLoading, dispatch]);

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
    <main className="bg-grey100 dark:bg-slate700 max-w-8xl mx-auto px-24">
      <section className="container mx-auto">
        <div className="bg-primary800 text-1xl flex w-1/3 mb-10 py-1 px-1 rounded-md">
          <CoinConvertorButton
            isModalOpen={isModalOpen}
            text="Coins"
            activeStyles="Coins"
          />
          <CoinConvertorButton
            isModalOpen={isModalOpen}
            text="Convertor"
            activeStyles="Convertor"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </section>

      <section className=" container relative mx-auto mb-4">
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

      <section className=" container flex-col mb-16 mx-auto">
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

      <aside>
        <CurrencyConvertorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </aside>
    </main>
  );
}
