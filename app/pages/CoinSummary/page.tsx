"use client";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import MainCard from "./MainCard";
import StatCard from "./StatCard";
import { store } from "@/app/store/store";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useGetCoinQuery } from "@/app/store/api/coingecko";
import { setSummaryCoin } from "@/app/store/features/coinSummarySlice";
import Card from "@/app/components/UI/Card";
import CopyButton from "@/app/components/UI/Buttons/CopyButton";

export default function CoinSummary() {
  const dispatch = useAppDispatch();
  const [readMore, setReadMore] = useState<boolean>(false);
  const { coinSummaryId } = useAppSelector((state) => state.activeLink);
  const { summaryCoin } = useAppSelector((state) => state.coinSummary);
  const { description } = summaryCoin;
  const { blockchain_site: siteLink } = summaryCoin.links;
  const {
    total_volume: volume,
    mcap_to_tvl_ratio: ratio,
    market_cap: cap,
    market_cap_change_24h: changeIn24h,
    fully_diluted_valuation: dilutedVal,
    max_supply: max,
    circulating_supply: circulating,
  } = summaryCoin.market_data;

  const {
    data: coinInfo,
    isLoading,
    isError,
  } = useGetCoinQuery({ id: coinSummaryId });

  const siteLinks = [siteLink[0], siteLink[1], siteLink[2]];
  const percentage = (circulating / max) * 100;
  const volumeStats = { "Total Volume": volume.usd, "Volume/Market": ratio };
  const SupplyStats = { "Max Supply": max, "Circulating Supply": circulating };
  const marketStats = {
    "Market Cap Change": changeIn24h,
    "Market Cap": cap.usd,
    "Fully Diluted Valuation": dilutedVal.usd,
  };

  useEffect(() => {
    if (coinInfo) {
      dispatch(setSummaryCoin(coinInfo));
    }
  });

  function toggleReadMore() {
    setReadMore(!readMore);
  }

  return (
    <Provider store={store}>
      {isLoading && <p className="text-xl text-center">Loading...</p>}
      {isError && (
        <p className="text-xl text-center">Error loading coin information</p>
      )}
      {!isLoading && !isError && coinInfo && (
        <main className="container mx-auto">
          <section className="grid grid-cols-2 gap-8 mb-8">
            <section>
              <MainCard />
            </section>

            <section>
              <div
                className={
                  !readMore
                    ? "overflow-hidden max-h-48"
                    : "overflow-visible max-h-full"
                }
              >
                <p>{description.en}</p>
              </div>

              <button className="text-primary500" onClick={toggleReadMore}>{`${
                !readMore ? "Read More..." : "Read Less..."
              }`}</button>

              <div className="flex flex-wrap gap-6 mt-6">
                {siteLinks.map((link) => (
                  <Card key={link} className="w-fit rounded-xl py-4 px-6">
                    <CopyButton toCopy={link} />
                  </Card>
                ))}
              </div>
            </section>
          </section>

          <hr />

          <section className="grid grid-cols-2 gap-6 my-8">
            <StatCard stats={marketStats} hasStatusBar={false} />
            <StatCard
              stats={SupplyStats}
              hasStatusBar={true}
              completed={percentage}
            />
            <StatCard stats={volumeStats} hasStatusBar={false} />
          </section>
        </main>
      )}
    </Provider>
  );
}
