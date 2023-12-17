"use client";
import { Provider } from "react-redux";
import MainCard from "./MainCard";
import { store } from "@/app/store/store";
import { useAppSelector } from "@/app/store/hooks";
import { useGetCoinQuery } from "@/app/store/api/coingecko";

export default function CoinSummary() {
  const { coinSummaryId } = useAppSelector((state) => state.activeLink);
  const { data: coinInfo, isError } = useGetCoinQuery({ id: coinSummaryId });

  if (coinInfo) {
    console.log(coinInfo);
  }

  return (
    <Provider store={store}>
      {coinInfo && (
        <main className="container mx-auto">
          <section>
            <MainCard
              header={`${coinInfo.name} (${coinInfo.symbol.toUpperCase()})`}
              site={coinInfo.links.homepage[0]}
              image={coinInfo.image.small}
            />
          </section>

          <hr />

          <section></section>
        </main>
      )}
    </Provider>
  );
}
