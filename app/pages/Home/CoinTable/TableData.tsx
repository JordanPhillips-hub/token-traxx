import Image from "next/image";
import TableStatBar from "./TableStatBar";
import PageLink from "@/app/components/UI/Links/PageLink";
import Price from "@/app/components/UI/Price";
import PriceChange from "@/app/components/UI/PriceChange";
import Sparkline from "@/app/components/Charts/Sparkline";
import { setCoinSummaryId } from "@/app/store/features/pageLinkSlice";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { formatCoinName } from "@/app/utils/generalHelpers";

export default function TableData() {
  const dispatch = useAppDispatch();
  const { tableCoins } = useAppSelector((state) => state.tableCoins);

  function handleActiveLink(id: string) {
    dispatch(setCoinSummaryId(id));
  }

  function renderName(image: string, id: string, symbol: string) {
    return (
      <>
        <Image src={image} alt={`${id} icon`} width={32} height={32} />
        <PageLink
          href="./pages/CoinSummary"
          id={id}
          onClick={() => handleActiveLink(id)}
        >
          {formatCoinName(id, symbol)}
        </PageLink>
      </>
    );
  }

  function renderPriceChange(percentage: number) {
    return <PriceChange percentage={percentage} />;
  }

  function renderStatBar(data1: number, data2: number) {
    return <TableStatBar data1={data1} data2={data2} />;
  }

  return tableCoins.map(
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
      <tr className="bg-background text-foreground card-shadow" key={id}>
        <td className="pl-3 py-5">{index + 1}</td>
        <td className="flex gap-1 py-5">{renderName(image, id, symbol)}</td>
        <td>
          <Price price={current_price} hasCode={false} />
        </td>
        <td>{renderPriceChange(changeIn1h)}</td>
        <td>{renderPriceChange(changeIn24h)}</td>
        <td>{renderPriceChange(changeIn7d)}</td>
        <td>{renderStatBar(total_volume, market_cap)}</td>
        <td>{renderStatBar(circ_supply, total_supply)}</td>
        <td className="max-w-[150px] pr-3">
          <Sparkline sparklinePrice={sparkline.price} />
        </td>
      </tr>
    )
  );
}
