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
  const { coins, isMarketsLoading, marketsHasError, currency, currencySymbol } =
    useAppSelector((state) => state.coinMarkets);

  function handleComparison(id: string) {
    dispatch(setCoinId(id));
    if (comparedCoins.length < 2) {
      dispatch(setComparedCoins([...comparedCoins, id]));
    } else if (comparedCoins.length === 2) {
      dispatch(setComparedCoins([comparedCoins[1], id]));
    }
  }

  if (marketsHasError) return "";
  return (
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
              <PrimaryButton
                className="p-4 w-full"
                onClick={() => handleComparison(id)}
              >
                <div>
                  <Image
                    src={image}
                    alt={`${id} icon`}
                    width={32}
                    height={32}
                  />
                </div>

                <div className="text-sm flex-col">
                  <p className="font-medium text-left">{name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-left">
                      {`${currencySymbol}${formatCurrency(
                        price
                      )} ${currency.toUpperCase()}`}
                    </p>
                    <PriceChange percentage={priceChange} />
                  </div>
                </div>
              </PrimaryButton>
            </div>
          </SwiperSlide>
        )
      )}
    </Carousel>
  );
}
