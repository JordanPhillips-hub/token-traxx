import Image from "next/image";
import TableStatBar from "./TableStatBar";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import Sparkline from "@/app/components/Charts/Sparkline";
import PriceChange from "@/app/components/UI/PriceChange";
import PageLink from "@/app/components/UI/Links/PageLink";
import InfiniteLoader from "@/app/components/UI/InfiniteLoader";
import { Heading } from "@/app/components/UI/Heading";
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

export default function CoinTable() {
  const dispatch = useAppDispatch();
  let { tableCoins, coinPage } = useAppSelector((state) => state.tableCoins);
  const { currency, currencySymbol } = useAppSelector(
    (state) => state.coinMarkets
  );

  const { data: updatedCoins, isError } = useGetMarketsQuery({
    page: coinPage,
    currency: currency,
  });

  function handleActiveLink(id: string) {
    dispatch(setCoinSummaryId(id));
  }

  function handleLoaderNext() {
    if (updatedCoins && !isError) {
      setTimeout(() => {
        dispatch(setCoinPage(coinPage + 1));
        dispatch(setTableCoins(tableCoins.concat(updatedCoins)));
      }, 5000);
    }
  }

  return (
    <InfiniteLoader
      length={tableCoins.length}
      next={handleLoaderNext}
      err={isError}
    >
      <table className="min-w-full border-separate border-spacing-y-2 text-sm">
        <thead className="text-left text-sm text-gray100">
          <tr>
            {tableHeaders.map((header) => (
              <th className="pl-3" key={header}>
                <Heading size={4} text={header} />
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
                circulating_supply: circ_supply,
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
                <td>{`${currencySymbol}${formatCurrency(current_price)}`}</td>
                <td>
                  <PriceChange percentage={changeIn1h} />
                </td>
                <td>
                  <PriceChange percentage={changeIn24h} />
                </td>
                <td>
                  <PriceChange percentage={changeIn7d} />
                </td>
                <td>
                  <TableStatBar data1={total_volume} data2={market_cap} />
                </td>
                <td>
                  <TableStatBar data1={circ_supply} data2={total_supply} />
                </td>
                <td className="max-w-[150px] pr-3">
                  <Sparkline sparklinePrice={sparkline.price} />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </InfiniteLoader>
  );
}
