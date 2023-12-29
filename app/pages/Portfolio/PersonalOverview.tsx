import Image from "next/image";
import PriceChange from "@/app/components/UI/PriceChange";
import { formatCoinName } from "@/app/utils/generalHelpers";
import {
  formatCurrency,
  calcPercentageChange,
} from "@/app/utils/numberFormatting";

type PersonalOverviewProps = {
  id: string;
  image: string;
  symbol: string;
  amountPurchased: number;
  currentPrice: number;
  priceAtPurchase: number;
  purchaseDate: string;
  currency: string;
};

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
  return (
    <div className="flex rounded-xl w-2/5" key={id}>
      <div>
        <div className="flex items-center gap-2 mb-8">
          <Image src={image} alt={`${id} icon`} width={32} height={32} />
          <p className="text-2xl font-bold">{formatCoinName(id, symbol)}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p>Total Value</p>

          <div className="flex items-center gap-5">
            <div className="flex">
              <span className="text-3xl font-bold">{currency}</span>
              <p className="text-3xl font-bold">
                {formatCurrency(amountPurchased * currentPrice)}
              </p>
            </div>

            <PriceChange
              percentage={calcPercentageChange(currentPrice, priceAtPurchase)}
            />
          </div>

          <p className="text-sm text-gray100">{`${amountPurchased} Purchased On ${purchaseDate}`}</p>
        </div>
      </div>
    </div>
  );
}
