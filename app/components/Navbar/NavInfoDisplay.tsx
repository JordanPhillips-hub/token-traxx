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

  const {
    active_cryptocurrencies: activeCurrencies,
    markets,
    market_cap_change_percentage_24h_usd: marketCapChangeIn24h,
    total_market_cap: marketCap,
    market_cap_percentage: marketCapPercent,
  } = data;

  useEffect(() => {
    if (coinGlobals) {
      dispatch(setCoinGlobals({ data: coinGlobals.data }));
    }
  }, [coinGlobals, dispatch]);

  return (
    <div className="bg-purple700 flex items-center justify-center gap-8 mb-6 px-16 py-4 border-b-[1px] border-white border-opacity-[0.1]">
      <CoinInfo
        name="Coins"
        icon="coin"
        data={activeCurrencies}
        completed={0}
        changePercent={0}
      />
      <CoinInfo
        name="Exchange"
        icon="exchange"
        data={markets}
        completed={0}
        changePercent={0}
      />
      <CoinInfo
        data=""
        completed={0}
        hasPriceChange={true}
        changePercent={marketCapChangeIn24h}
      />
      <CoinInfo
        data={`$${formatNum3_2(marketCap.btc)} ${checkNumberScale(
          marketCap.btc
        )}`}
        completed={0}
        changePercent={0}
      />
      <CoinInfo
        name="BTC"
        data={`${Math.floor(marketCapPercent.btc)}%`}
        hasStatBar={true}
        completed={Math.floor(marketCapPercent.btc)}
        changePercent={0}
      />
      <CoinInfo
        name="ETH"
        data={`${Math.floor(marketCapPercent.eth)}%`}
        hasStatBar={true}
        completed={Math.floor(marketCapPercent.eth)}
        changePercent={0}
      />
    </div>
  );
}
