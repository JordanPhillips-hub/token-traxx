"use client";
import { useEffect } from "react";
import { Provider } from "react-redux";
import MainCard from "./MainCard";
import StatCard from "./StatCard";
import DescriptionOverview from "./DescriptionOverview";
import { store } from "@/app/store/store";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useGetCoinQuery } from "@/app/store/api/coingecko";
import { setSummaryCoin } from "@/app/store/features/coinSummarySlice";

export default function CoinSummary() {
  const dispatch = useAppDispatch();
  const { activeLink, coinSummary, coinMarkets } = useAppSelector(
    (state) => state
  );

  const { currency } = coinMarkets;
  const {
    total_volume: volume,
    mcap_to_tvl_ratio: ratio,
    market_cap: cap,
    market_cap_change_24h: changeIn24h,
    fully_diluted_valuation: dilutedVal,
    max_supply: max,
    circulating_supply: circulating,
  } = coinSummary.summaryCoin.market_data;

  const {
    data: coinInfo,
    isLoading,
    isError,
  } = useGetCoinQuery({ id: activeLink.coinSummaryId });

  const percentage = (circulating / max) * 100;
  const stats = {
    volume: {
      "Total Volume": volume[currency],
      "Volume/Market": ratio,
    },
    supply: { "Max Supply": max, "Circulating Supply": circulating },
    market: {
      "Market Cap Change": changeIn24h,
      "Market Cap": cap[currency],
      "Fully Diluted Valuation": dilutedVal[currency],
    },
  };

  useEffect(() => {
    if (coinInfo) {
      dispatch(setSummaryCoin(coinInfo));
    }
  });

  if (isLoading) return <p className="text-xl text-center">Loading...</p>;
  if (isError) return <p className="text-xl text-center">Error</p>;
  return (
    <Provider store={store}>
      {coinInfo && (
        <main className="container mx-auto">
          <section className="grid grid-cols-2 gap-8 mb-8">
            <MainCard />
            <DescriptionOverview />
          </section>
          <hr />
          <section className="grid grid-cols-2 gap-6 my-8">
            <StatCard stats={stats.market} />
            <StatCard
              stats={stats.supply}
              hasStatusBar={true}
              completed={percentage}
            />
            <StatCard stats={stats.volume} />
          </section>
        </main>
      )}
    </Provider>
  );
}
