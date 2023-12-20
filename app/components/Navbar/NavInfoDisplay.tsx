import { useEffect } from "react";
import CoinInfo from "./CoinInfo";
import { useGetGlobalsQuery } from "@/app/store/api/coingecko";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { setCoinGlobals } from "@/app/store/features/globalSlice";
import { formatNum3_2, checkNumberScale } from "@/app/utils/numberFormatting";

export default function NavInfoDisplay() {
  const dispatch = useAppDispatch();
  const { data: coinGlobals } = useGetGlobalsQuery<any>({});
  const { data } = useAppSelector((state) => state.globals);

  useEffect(() => {
    if (coinGlobals) {
      dispatch(
        setCoinGlobals({
          data: {
            active_cryptocurrencies: coinGlobals.data.active_cryptocurrencies,
            markets: coinGlobals.data.markets,
            market_cap_change_percentage_24h_usd:
              coinGlobals.data.market_cap_change_percentage_24h_usd,
            total_market_cap: {
              btc: coinGlobals.data.total_market_cap.btc,
              eth: coinGlobals.data.total_market_cap.eth,
            },
            market_cap_percentage: {
              btc: coinGlobals.data.market_cap_percentage.btc,
              eth: coinGlobals.data.market_cap_percentage.eth,
            },
          },
        })
      );
    }
  }, [coinGlobals, dispatch]);

  return (
    <div className="bg-purple700 flex items-center justify-center gap-8 mb-6 px-16 py-4 border-b-[1px] border-white border-opacity-[0.1]">
      <CoinInfo
        name="Coins"
        icon="coin"
        data={data.active_cryptocurrencies}
        completed={0}
        changePercent={0}
      />
      <CoinInfo
        name="Exchange"
        icon="exchange"
        data={data.markets}
        completed={0}
        changePercent={0}
      />
      <CoinInfo
        data=""
        completed={0}
        hasPriceChange={true}
        changePercent={parseFloat(
          data.market_cap_change_percentage_24h_usd.toFixed(2)
        )}
      />
      <CoinInfo
        data={`$${formatNum3_2(data.total_market_cap.btc)} ${checkNumberScale(
          data.total_market_cap.btc
        )}`}
        completed={0}
        changePercent={0}
      />
      <CoinInfo
        name="BTC"
        data={`${Math.floor(data.market_cap_percentage.btc)}%`}
        hasProgressBar={true}
        completed={Math.floor(data.market_cap_percentage.btc)}
        changePercent={0}
      />
      <CoinInfo
        name="ETH"
        data={`${Math.floor(data.market_cap_percentage.eth)}%`}
        hasProgressBar={true}
        completed={Math.floor(data.market_cap_percentage.eth)}
        changePercent={0}
      />
    </div>
  );
}
