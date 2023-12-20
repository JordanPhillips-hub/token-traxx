import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setComparedCoins } from "@/app/store/features/charts/compareChartSlice";
import { setCoinId } from "@/app/store/features/coinMarketSlice";
import Carousel from "@/app/components/UI/Carousel";
import PrimaryButton from "@/app/components/UI/Buttons/PrimaryButton";
import PriceChange from "@/app/components/UI/PriceChange";
import { formatCurrency } from "@/app/utils/numberFormatting";

export default function CurrencySelector() {
  const dispatch = useAppDispatch();
  const { comparedCoins } = useAppSelector((state) => state.compareCharts);
  const { coins, isMarketsLoading, marketsHasError } = useAppSelector(
    (state) => state.coinMarkets
  );

  function handleComparison(id: string) {
    dispatch(setCoinId(id));
    if (comparedCoins.length < 2) {
      dispatch(setComparedCoins([...comparedCoins, id]));
    } else if (comparedCoins.length === 2) {
      dispatch(setComparedCoins([comparedCoins[1], id]));
    }
  }

  return (
    <>
      {marketsHasError ? (
        <p>
          We are experiencing technical difficulties. Please try again later
        </p>
      ) : (
        <Carousel>
          {coins.map(
            ({
              id,
              image,
              name,
              current_price: price,
              price_change_percentage_24h: priceChange,
            }) => (
              <SwiperSlide key={id}>
                <div className="max-w-[250px]">
                  <PrimaryButton size="xl" onClick={() => handleComparison(id)}>
                    <div className="flex items-center gap-4 pointer-events-none">
                      <div>
                        <Image
                          src={image}
                          alt={`${id} icon`}
                          width={32}
                          height={32}
                        />
                      </div>

                      <div className="text-sm flex-col">
                        <p className="font-medium text-left">
                          {isMarketsLoading ? "Loading Coin" : name}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-left">
                            {`$${formatCurrency(price)}`} USD
                          </p>
                          <PriceChange
                            percentage={parseFloat(priceChange.toFixed(2))}
                          />
                        </div>
                      </div>
                    </div>
                  </PrimaryButton>
                </div>
              </SwiperSlide>
            )
          )}
        </Carousel>
      )}
    </>
  );
}
