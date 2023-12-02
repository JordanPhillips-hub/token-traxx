"use client";
import { useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useGetMarketsQuery } from "./store/api/coingecko";
import { setChartTimePeriod } from "./store/features/charts/timePeriodSlice";
import {
  setCoinMarkets,
  setCoinId,
} from "./store/features/coinMarketSlice/coinMarketSlice";
import {
  setIsComparing,
  setComparedCoins,
} from "./store/features/charts/compareChartSlice";
import ChartContainer from "./components/Charts/ChartContainer";
import CurrencySelectChart from "./components/Charts/CurrencySelectChart";
import Carousel from "./components/Carousel/Carousel";
import CurrencySelector from "./components/CurrencySelector/CurrencySelector";
import PrimaryButton from "./components/Buttons/PrimaryButton";
import Icon from "./components/Icon/Icon";
import TimePeriodSelector from "./components/TimePeriodSelector/TimePeriodSelector";
import { optionalCapitalize } from "./utils/optionalCapitalize";
import { formatPrice } from "./utils/numberFormatting";

export default function Home() {
  const dispatch = useAppDispatch();
  const { data: coinMarkets, isLoading, isError } = useGetMarketsQuery([]);
  const { coins, coinId } = useAppSelector((state) => state.coinMarkets);
  const selectedCoin = coins.find((coin) => coin.id === coinId);
  const { timePeriod } = useAppSelector((state) => state.chartTimePeriod);
  const { isComparing, comparedCoins } = useAppSelector(
    (state) => state.compareCharts
  );

  const charts = [
    {
      name: `${optionalCapitalize(
        selectedCoin?.id
      )} (${selectedCoin?.symbol.toUpperCase()})`,
      err: "Prices not available",
      loading: "Loading Price",
      value: `${formatPrice(selectedCoin?.current_price) ?? ""} min`,
      date: new Date().toDateString(),
      type: "line",
    },
    {
      name: "Volume 24hr",
      err: "Volumes not available",
      loading: "Loading Volumes",
      value: `${formatPrice(selectedCoin?.total_volume) ?? ""} bin`,
      date: new Date().toDateString(),
      type: "bar",
    },
  ];

  function handleChartData(id: string) {
    dispatch(setCoinId(id));
    if (comparedCoins.length < 2) {
      dispatch(setComparedCoins([...comparedCoins, id]));
    } else if (comparedCoins.length === 2) {
      dispatch(setComparedCoins([comparedCoins[1], id]));
    }
  }

  useEffect(() => {
    if (coinMarkets) {
      dispatch(setCoinMarkets(coinMarkets));
    }
  }, [coinMarkets, isComparing, dispatch]);

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

        {isError ? (
          <p>
            We are having trouble fetching the coin data. Please try again later
          </p>
        ) : (
          <Carousel>
            {coins.map((coin) => {
              const {
                id,
                image,
                symbol,
                current_price: price,
                price_change_percentage_24h: priceChange,
              } = coin;

              return (
                <SwiperSlide key={id}>
                  {isLoading ? (
                    <p>Loading Coin</p>
                  ) : (
                    <CurrencySelector
                      img={image}
                      name={`${optionalCapitalize(
                        id
                      )} (${symbol.toUpperCase()})`}
                      price={formatPrice(price)}
                      percentage={parseFloat(priceChange.toFixed(2))}
                      onClick={() => handleChartData(id)}
                    />
                  )}
                </SwiperSlide>
              );
            })}
          </Carousel>
        )}
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
                <CurrencySelectChart
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
      {/* TABLE HERE */}
    </main>
  );
}
