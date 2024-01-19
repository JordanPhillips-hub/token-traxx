import ConvertorDropdown from "./ConvertorDropdown";
import SellInput from "./SellInput";
import Legend from "./Legend";
import { ConvertorCardProps } from "./types";
import { useGetSelectedCoin } from "./hooks";
import { Heading } from "@/app/components/UI/Heading";
import { useAppSelector } from "@/app/store/hooks";

export default function ConvertorCard({
  cardType,
  cardName,
}: ConvertorCardProps) {
  const { convertor, coinMarkets } = useAppSelector((state) => state);
  const currentPrice = useGetSelectedCoin(cardType)?.current_price;
  const { sellPrice } = convertor;
  const { currencySymbol } = coinMarkets;
  const isBuyCard = cardType === "buy";
  const isSellCard = cardType === "sell";

  return (
    <div className="container bg-blue600 p-6 rounded-2xl" id={cardType}>
      <Heading
        containerClass="mb-10"
        textClass="text-gray100"
        size={2}
        text={cardName}
      />

      <div className="flex justify-between mb-1">
        <ConvertorDropdown
          cardType={cardType}
          {...useGetSelectedCoin(cardType)}
        />
        {isBuyCard && <p>{Math.floor(sellPrice / currentPrice)}</p>}
        {isSellCard && <SellInput cardType={cardType} />}
      </div>

      <hr />

      <Legend
        symbol={useGetSelectedCoin(cardType)?.symbol}
        currencySymbol={currencySymbol}
        price={currentPrice}
      />
    </div>
  );
}
