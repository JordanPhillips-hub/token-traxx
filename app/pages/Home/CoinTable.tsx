import Image from "next/image";
import Sparkline from "./Sparkline";
import { formatCoinName } from "./utils";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import StatusBar from "@/app/components/UI/StatusBar";
import PriceChange from "@/app/components/UI/PriceChange";
import { formatPrice } from "@/app/utils/numberFormatting";
import { useGetMarketsQuery } from "@/app/store/api/coingecko";
import {
  setCoinMarkets,
  setCoinPage,
} from "@/app/store/features/coinMarketSlice";
import InfiniteScroll from "react-infinite-scroll-component";

const tableHeaders = [
  "#",
  "Name",
  "Price",
  "1h%",
  "24h%",
  "7d%",
  "24h Volume / Market cap",
  "Circulating / Total supply",
  "Last 7d",
];

function createPriceChange(priceChange: number) {
  return <PriceChange percentage={parseFloat(priceChange.toFixed(2))} />;
}

function createStatusBar(data1: number, data2: number) {
  return (
    <StatusBar
      symbol="$"
      data1={data1}
      data2={data2}
      baseColor="hsla(0, 0%, 100%)"
      bgColor="hsl(284, 93%, 73%)"
      width="90%"
    />
  );
}

export default function CoinTable() {
  const dispatch = useAppDispatch();
  let { coins, coinPage } = useAppSelector((state) => state.coinMarkets);

  const { data: updatedCoins, isError } = useGetMarketsQuery({
    page: coinPage,
  });

  return (
    <InfiniteScroll
      dataLength={coins.length}
      next={() => {
        if (updatedCoins && !isError) {
          setTimeout(() => {
            dispatch(setCoinPage(coinPage + 1));
            console.log(updatedCoins);
            dispatch(setCoinMarkets(coins.concat(updatedCoins)));
          }, 7000);
        }
      }}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <table className="min-w-full border-separate border-spacing-y-2 text-sm">
        <thead className="text-left text-sm text-neutral400">
          <tr>
            {tableHeaders.map((header, index) => (
              <th className="pl-3" key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {coins.map(
            (
              {
                id,
                image,
                symbol,
                current_price,
                price_change_percentage_1h_in_currency: changeIn1h,
                price_change_percentage_24h_in_currency: changeIn24h,
                price_change_percentage_7d_in_currency: changeIn7d,
                total_volume,
                market_cap,
                circulating_supply,
                total_supply,
                sparkline_in_7d: sparkline,
              },
              index
            ) => (
              <tr className="bg-primary800" key={Math.random()}>
                <td className="pl-3 py-5">{index + 1}</td>
                <td>
                  <Image
                    className="inline"
                    src={image}
                    alt={`${id} icon`}
                    width={32}
                    height={32}
                  />

                  <button className="ml-1.5">
                    {formatCoinName(id, symbol)}
                  </button>
                </td>
                <td>{`$${formatPrice(current_price)}`}</td>
                <td>{createPriceChange(changeIn1h)}</td>
                <td>{createPriceChange(changeIn24h)}</td>
                <td>{createPriceChange(changeIn7d)}</td>
                <td>{createStatusBar(total_volume, market_cap)}</td>
                <td>{createStatusBar(circulating_supply, total_supply)}</td>
                <td className="max-w-[150px] pr-3">
                  <Sparkline sparklinePrice={sparkline.price} />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </InfiniteScroll>
  );
}
