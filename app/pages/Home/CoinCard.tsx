import Image from "next/image";
import Sparkline from "./Sparkline";
import { formatCoinName } from "./utils";
import { useAppSelector } from "@/app/store/hooks";
import StatusBar from "@/app/components/UI/StatusBar";
import PriceChange from "@/app/components/UI/PriceChange";
import { formatPrice } from "@/app/utils/numberFormatting";

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

export default function CoinCard() {
  const { coins } = useAppSelector((state) => state.coinMarkets);

  return (
    <table className="min-w-full border-separate border-spacing-y-2 text-sm">
      <thead className="text-left text-sm text-neutral400">
        <tr>
          {tableHeaders.map((header, index) => (
            <th key={index}>{header}</th>
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
            <tr className="bg-primary800 rounded-2xl p-3 " key={id}>
              <td className="py-2 pl-3">{index + 1}</td>
              <td className="flex gap-2 mt-3">
                <Image src={image} alt={`${id} icon`} width={32} height={32} />
                <button>{formatCoinName(id, symbol)}</button>
              </td>
              <td>{`$${formatPrice(current_price)}`}</td>
              <td>{createPriceChange(changeIn1h)}</td>
              <td>{createPriceChange(changeIn24h)}</td>
              <td>{createPriceChange(changeIn7d)}</td>
              <td>{createStatusBar(total_volume, market_cap)}</td>
              <td>{createStatusBar(circulating_supply, total_supply)}</td>
              <td className="max-w-[120px]">
                <Sparkline sparklinePrice={sparkline.price} />
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
