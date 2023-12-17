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
  const { data: coinInfo, isError } = useGetCoinQuery({ id: coinSummaryId });

  useEffect(() => {
    if (coinInfo) {
      dispatch(setSummaryCoin(coinInfo));
      console.log(summaryCoin);
    }
  });

  return (
    <Provider store={store}>
      {summaryCoin && (
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
