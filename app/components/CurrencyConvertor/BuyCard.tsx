import ConvertorDropdown from "./ConvertorDropdown";
import Legend from "./Legend";
import { useAppSelector } from "@/app/store/hooks";

export default function BuyCard() {
  const { buyCoinId, sellPrice } = useAppSelector((state) => state.convertor);
  const { coins } = useAppSelector((state) => state.coinMarkets);
  const selectedCoin = coins.find((coin) => coin.id === buyCoinId);

  return (
    <div className="container bg-primary600 p-6 rounded-2xl">
      <p className="text-sm text-neutral400 mb-10">You Buy</p>

      {selectedCoin && (
        <>
          <div className="flex justify-between mb-1">
            <div className="relative">
              <ConvertorDropdown componentType="buy" {...selectedCoin} />
            </div>
            <p>{Math.floor(sellPrice / selectedCoin.current_price)}</p>
          </div>

          <hr />

          <Legend
            symbol={selectedCoin.symbol}
            price={selectedCoin.current_price}
          />
        </>
      )}
    </div>
  );
}
