import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import Sparkline from "@/app/components/Charts/Sparkline";
import StatusBar from "@/app/components/UI/StatusBar";
import PriceChange from "@/app/components/UI/PriceChange";
import PageLink from "@/app/components/UI/Links/PageLink";
import { formatCurrency } from "@/app/utils/numberFormatting";
import { formatCoinName } from "@/app/utils/generalHelpers";
import { useGetMarketsQuery } from "@/app/store/api/coingecko";
import { setCoinSummaryId } from "@/app/store/features/pageLinkSlice";
import {
  setTableCoins,
  setCoinPage,
} from "@/app/store/features/coinTableSlice";

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
  let { tableCoins, coinPage } = useAppSelector((state) => state.tableCoins);
  const { data: updatedCoins, isError } = useGetMarketsQuery({
    page: coinPage,
  });

  function handleActiveLink(id: string) {
    dispatch(setCoinSummaryId(id));
  }

  return (
    <InfiniteScroll
      dataLength={tableCoins.length}
      next={() => {
        if (updatedCoins && !isError) {
          setTimeout(() => {
            dispatch(setCoinPage(coinPage + 1));
            dispatch(setTableCoins(tableCoins.concat(updatedCoins)));
          }, 7000);
        }
      }}
      hasMore={true}
      loader={
        <h4 className="text-center mb-4">
          {isError
            ? "We are experiencing technical difficulties. Please try again later"
            : "Loading Coins..."}
        </h4>
      }
    >
      <table className="min-w-full border-separate border-spacing-y-2 text-sm">
        <thead className="text-left text-sm text-gray100">
          <tr>
            {tableHeaders.map((header, index) => (
              <th className="pl-3" key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableCoins.map(
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
              <tr className="bg-blue800" key={id}>
                <td className="pl-3 py-5">{index + 1}</td>
                <td className="flex gap-1 py-5">
                  <Image
                    src={image}
                    alt={`${id} icon`}
                    width={32}
                    height={32}
                  />

                  <PageLink
                    href="./pages/CoinSummary"
                    id={id}
                    onClick={() => handleActiveLink(id)}
                  >
                    {formatCoinName(id, symbol)}
                  </PageLink>
                </td>
                <td>{`$${formatCurrency(current_price)}`}</td>
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
