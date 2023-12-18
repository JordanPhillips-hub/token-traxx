"use client";
import { useEffect } from "react";
import { Provider } from "react-redux";
import MainCard from "./MainCard";
import { store } from "@/app/store/store";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useGetCoinQuery } from "@/app/store/api/coingecko";
import { setSummaryCoin } from "@/app/store/features/coinSummarySlice";

export default function CoinSummary() {
  const dispatch = useAppDispatch();
  const { coinSummaryId } = useAppSelector((state) => state.activeLink);
  const { summaryCoin } = useAppSelector((state) => state.coinSummary);
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
      {!isLoading && !isError && summaryCoin && (
        <main className="container mx-auto">
          <section>
            <MainCard />
          </section>

          <hr />

          <section></section>
        </main>
      )}
    </Provider>
  );
}
