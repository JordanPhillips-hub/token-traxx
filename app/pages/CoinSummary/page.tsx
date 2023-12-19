"use client";
import { useEffect } from "react";
import { Provider } from "react-redux";
import MainCard from "./MainCard";
import { store } from "@/app/store/store";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useGetCoinQuery } from "@/app/store/api/coingecko";
import { setSummaryCoin } from "@/app/store/features/coinSummarySlice";
import Card from "@/app/components/UI/Card";
import CopyLink from "@/app/components/UI/CopyLink";

export default function CoinSummary() {
  const dispatch = useAppDispatch();
  const { coinSummaryId } = useAppSelector((state) => state.activeLink);
  const { summaryCoin } = useAppSelector((state) => state.coinSummary);
  const { description } = summaryCoin;
  const { blockchain_site: siteLink } = summaryCoin.links;
  const siteLinks = [siteLink[0], siteLink[1], siteLink[2]];

  const {
    data: coinInfo,
    isLoading,
    isError,
  } = useGetCoinQuery({ id: coinSummaryId });

  useEffect(() => {
    if (coinInfo) {
      dispatch(setSummaryCoin(coinInfo));
    }
  });

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
              <p>{description.en}</p>
              <div className="flex flex-wrap gap-6 mt-6">
                {siteLinks.map((link, index) => (
                  <Card key={index} className="w-fit rounded-xl py-4 px-6">
                    <CopyLink toCopy={link} />
                  </Card>
                ))}
              </div>
            </section>
          </section>

          <hr />

          <section></section>
        </main>
      )}
    </Provider>
  );
}
