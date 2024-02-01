import Image from "next/image";
import { PersonalOverviewProps } from "./types";
import Price from "@/app/components/UI/Price";
import PriceChange from "@/app/components/UI/PriceChange";
import { formatCoinName } from "@/app/utils/generalHelpers";
import { Heading } from "@/app/components/UI/Heading";
import { calcPercentageChange } from "@/app/utils/numberFormatting";

export default function PersonalOverview({
  id,
  image,
  symbol,
  amountPurchased,
  currentPrice,
  priceAtPurchase,
  purchaseDate,
  currency,
}: PersonalOverviewProps) {
  const changePercent = calcPercentageChange(currentPrice, priceAtPurchase);
  const totalValue = amountPurchased * currentPrice;
  
  return (
    <div className="flex rounded-xl w-2/5" key={id}>
      <div>
        <Heading
          size={2}
          containerClass="flex flex-row-reverse justify-end items-center gap-2 mb-8"
          textClass="text-2xl"
          text={formatCoinName(id, symbol)}
        >
          <Image src={image} alt={`${id} icon`} width={32} height={32} />
        </Heading>

        <div className="flex flex-col gap-2">
          <p>Total Value</p>

          <div className="flex items-center gap-5">
            <div className="flex">
              <Price className="text-3xl font-bold" 
                storedCurrency={currency} 
                price={totalValue} 
                hasCode={false}
              />
            </div>
            <PriceChange className="text-base" percentage={changePercent}/>
          </div>

          <p className="text-sm text-gray100">{`${amountPurchased} Purchased On ${purchaseDate}`}</p>
        </div>
      </div>
    </div>
  );
}
