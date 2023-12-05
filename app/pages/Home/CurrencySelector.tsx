import { useEffect } from "react";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import { useGetMarketsQuery } from "@/app/store/api/coingecko";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setComparedCoins } from "@/app/store/features/charts/compareChartSlice";
import {
  setCoinMarkets,
  setCoinId,
} from "@/app/store/features/coinMarketSlice";
import Carousel from "@/app/components/UI/Carousel";
import PrimaryButton from "@/app/components/UI/Buttons/PrimaryButton";
import PriceChange from "@/app/components/UI/PriceChange";

export default function CurrencySelector() {
  const dispatch = useAppDispatch();
  const { data: coinMarkets, isLoading, isError } = useGetMarketsQuery([]);
  const { comparedCoins } = useAppSelector((state) => state.compareCharts);
  const { coins } = useAppSelector((state) => state.coinMarkets);

  useEffect(() => {
    if (coinMarkets) {
      dispatch(setCoinMarkets(coinMarkets));
    }
  }, [coinMarkets, dispatch]);

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
      {isError ? (
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
                          {isLoading ? "Loading Coin" : name}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-left">{price} USD</p>
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
