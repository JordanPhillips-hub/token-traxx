import TableData from "./TableData";
import InfiniteLoader from "@/app/components/UI/InfiniteLoader";
import Table from "@/app/components/Table/Table";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useGetMarketsQuery } from "@/app/store/api/coingecko";
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
  const { tableCoins, coinPage } = useAppSelector((state) => state.tableCoins);
  const { currency } = useAppSelector((state) => state.coinMarkets);

  const { data: updatedCoins, isError } = useGetMarketsQuery({
    page: coinPage,
    currency: currency,
  });

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
      <Table headers={tableHeaders}>
        <TableData />
      </Table>
    </InfiniteLoader>
  );
}
