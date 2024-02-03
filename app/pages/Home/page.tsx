"use client";
import { useEffect, useState } from "react";
import CurrencySelector from "./CurrencySelector";
import CoinTable from "./CoinTable/CoinTable";
import ChartContainer from "@/app/components/Charts/ChartContainer";
import Chart from "@/app/components/Charts/Chart";
import CurrencyConvertor from "@/app/components/CurrencyConvertor/CurrencyConvertor";
import PrimaryButton from "@/app/components/UI/Buttons/PrimaryButton";
import CoinConvertorButton from "@/app/components/UI/Buttons/CoinConvertorButton";
import Icon from "@/app/components/UI/Icon";
import TimePeriodSelector from "@/app/components/UI/TimePeriodSelector";
import { formatCurrency } from "@/app/utils/numberFormatting";
import { formatCoinName } from "@/app/utils/generalHelpers";
import { useFindSelectedCoin } from "@/app/hooks/helpers";
import { useGetMarketsQuery } from "@/app/store/api/coingecko";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setChartTimePeriod } from "@/app/store/features/charts/timePeriodSlice";
import { setTableCoins } from "@/app/store/features/coinTableSlice";
import { setIsComparing, setComparedCoins } from "@/app/store/features/charts/compareChartSlice";
import { setCoinMarkets, setIsMarketsLoading, setMarketsHasError } from "@/app/store/features/coinMarketSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { timePeriod } = useAppSelector((state) => state.chartTimePeriod);
  const { isComparing, comparedCoins } = useAppSelector((state) => state.compareCharts);
  const { coinId, currency, currencySymbol } = useAppSelector((state) => state.coinMarkets);

  const {
    data: coinMarkets,
    isLoading,
    isError,
  } = useGetMarketsQuery({ page: 1, currency: currency });

  const {
    id: selectedCoinId,
    symbol: selectedCoinSymbol,
    current_price,
    total_volume,
  } = useFindSelectedCoin(coinId) || {};

  useEffect(() => {
    dispatch(setIsMarketsLoading(isLoading));
    dispatch(setMarketsHasError(isError));

    if (coinMarkets) {
      dispatch(setCoinMarkets(coinMarkets));
      dispatch(setTableCoins(coinMarkets));
    }
  }, [coinMarkets, isError, isLoading, currency, dispatch]);

  useEffect(() => {
    if (!isComparing) {
      const resetComparedCoins = [...comparedCoins];
      resetComparedCoins.splice(0, 2, "bitcoin");
      dispatch(setComparedCoins(resetComparedCoins));
    }
  }, [isComparing]);

  const charts = [
    {
      type: "line",
      name: formatCoinName(selectedCoinId ?? "", selectedCoinSymbol ?? ""),
      err: "Prices not available",
      loading: "Loading Price",
      value: `${formatCurrency(current_price) ?? ""} min`,
      date: new Date().toDateString(),
    },
    {
      type: "bar",
      name: "Volume 24hr",
      err: "Volumes not available",
      loading: "Loading Volumes",
      value: `${formatCurrency(total_volume) ?? ""} bin`,
      date: new Date().toDateString(),
    },
  ];

  const convertorButtons = {
    coins: { type: "Coins", clickEvent: () => setIsModalOpen(false) },
    convertor: { type: "Convertor", clickEvent: () => setIsModalOpen(true) },
  };

  return (
    <>
      <main className="bg-grey100 dark:bg-slate700 max-w-8xl mx-auto px-24">
        <section className="container mx-auto">
          <div className="bg-blue800 text-1xl flex w-1/3 mb-10 py-1 px-1 rounded-md">
            {Object.keys(convertorButtons).map((key) => {
              const { type, clickEvent } =
                convertorButtons[key as keyof typeof convertorButtons];
              return (
                <CoinConvertorButton
                  key={key}
                  isModalOpen={isModalOpen}
                  text={type}
                  activeStyles={type}
                  onClick={clickEvent}
                />
              );
            })}
          </div>
        </section>

        {isModalOpen ? (
          <aside>
            <CurrencyConvertor
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                dispatch(setIsComparing(false));
              }}
            />
          </aside>
        ) : (
          <>
            <section className="container relative mx-auto mb-4">
              <div className="flex mb-6">
                <div>
                  <PrimaryButton
                    className="text-sm py-3 px-6"
                    text={isComparing ? "Exit Comparison" : "Compare"}
                    onClick={() => dispatch(setIsComparing(!isComparing))}
                  >
                    <Icon iconVariant={isComparing ? "exit" : "graph"} />
                  </PrimaryButton>
                </div>
              </div>
              <CurrencySelector />
            </section>

            <section className=" container flex-col mb-16 mx-auto">
              <div className="flex gap-8">
                {charts.map((chart) => {
                  const { name, value, date, type, loading, err } = chart;
                  return (
                    <ChartContainer
                      location="home"
                      key={name}
                      name={isLoading ? loading : isError ? err : name}
                      price={isLoading ? "" : `${currencySymbol}${value}`}
                      date={date}
                      type={type}
                    >
                      <Chart
                        chartType={type}
                        coinId={coinId}
                        days={timePeriod}
                      />
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
          </>
        )}
      </main>
    </>
  );
}
