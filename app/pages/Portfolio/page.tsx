"use client";
import { useState } from "react";
import { uid } from "uid";
import AddAsset from "./AddAsset/AddAsset";
import PrimaryButton from "@/app/components/UI/Buttons/PrimaryButton";
import PersonalOverview from "./PersonalOverview";
import MarketStat from "./MarketStat";
import Card from "@/app/components/UI/Card";
import {
  formatCurrency,
  calculatePercentage,
} from "@/app/utils/numberFormatting";

type Asset = {
  id: string;
  price_at_purchase: number;
  amount_purchased: number;
  purchase_date: string;
  current_price: number;
  image: string;
  symbol: string;
  price_change_24H: number;
  market_cap: number;
  volume: number;
  circ_supply: number;
  max_supply: number;
};

export default function Portfolio() {
  const [isAddingAsset, setIsAddingAsset] = useState<boolean>(false);
  const assets = JSON.parse(localStorage.getItem("Assets") || "[]");

  return (
    <>
      {isAddingAsset && (
        <aside>
          <AddAsset
            isAddingAsset={isAddingAsset}
            onClose={() => setIsAddingAsset(false)}
          />
        </aside>
      )}
      <main className={`container mx-auto ${isAddingAsset && "blur-sm"}`}>
        <header className="flex justify-between mb-10">
          <h1 className="text-xl font-medium">Portfolio</h1>

          <PrimaryButton
            className="py-3 px-16"
            text="Add Asset"
            onClick={() => setIsAddingAsset(true)}
          />
        </header>

        {(!assets || assets.length === 0) && (
          <p>
            you have no assets available please click the add asset button to
            add an asset to your portfolio.
          </p>
        )}

        <section className="flex flex-col">
          {assets &&
            assets.map(
              ({
                id,
                price_at_purchase,
                amount_purchased,
                purchase_date,
                current_price,
                image,
                symbol,
                price_change_24H,
                market_cap,
                volume,
                circ_supply,
                max_supply,
              }: Asset) => (
                <Card className="flex bg-[191934] py-6 px-4 mb-6" key={uid()}>
                  <PersonalOverview
                    id={id}
                    priceAtPurchase={price_at_purchase}
                    amountPurchased={amount_purchased}
                    purchaseDate={purchase_date}
                    currentPrice={current_price}
                    image={image}
                    symbol={symbol}
                  />

                  <div className="grid grid-cols-2 gap-5 w-full">
                    <MarketStat
                      stat="Current Price"
                      statValue={`$${formatCurrency(current_price)}`}
                    />
                    <MarketStat
                      stat="24h%"
                      percentChange={true}
                      percentage={price_change_24H}
                    />
                    <MarketStat
                      stat="Market Cap vs Volume"
                      hasStatusBar={true}
                      completed={calculatePercentage(volume, market_cap)}
                    />
                    <MarketStat
                      stat="Circ Supply vs Max Supply"
                      hasStatusBar={true}
                      completed={calculatePercentage(circ_supply, max_supply)}
                    />
                  </div>
                </Card>
              )
            )}
        </section>
      </main>
    </>
  );
}
