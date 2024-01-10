import { useEffect } from "react";
import { ConvertorProps } from "./types";
import ConvertorCard from "./ConvertorCard";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { setChartTimePeriod } from "@/app/store/features/charts/timePeriodSlice";
import { setIsComparing } from "@/app/store/features/charts/compareChartSlice";
import { Heading } from "@/app/components/UI/Heading";
import Modal from "@/app/components/UI/Modal";
import ChartContainer from "@/app/components/Charts/ChartContainer";
import Chart from "@/app/components/Charts/Chart";
import TimePeriodSelector from "@/app/components/UI/TimePeriodSelector";
import CloseButton from "@/app/components/UI/Buttons/CloseButton";
import { getDateTime24H } from "@/app/utils/dateAndTime";
import { formatCoinName } from "@/app/utils/generalHelpers";

export default function CurrencyConvertorModal({
  isOpen,
  onClose,
}: ConvertorProps) {
  const dispatch = useAppDispatch();
  const { coinMarkets, convertor, chartTimePeriod } = useAppSelector(
    (state) => state
  );

  const { coins, coinId } = coinMarkets;
  const { sellCoinId, buyCoinId } = convertor;
  const { timePeriod } = chartTimePeriod;
  const compareCoin = findCoinById(coinId);
  const sellCoin = findCoinById(sellCoinId);
  const buyCoin = findCoinById(buyCoinId);

  function generateName(id: string, symbol: string) {
    return formatCoinName(id ?? "", symbol ?? "");
  }

  function findCoinById(id: string) {
    return coins.find((coin) => coin.id === id);
  }

  useEffect(() => {
    dispatch(setIsComparing(true));
  });

  return (
    <Modal
      className="container bg-transparent w-full h-full mt-[270px] relative"
      isOpen={isOpen}
      onClose={onClose}
    >
      <CloseButton className="absolute right-0" onClose={onClose} />

      <Heading size={1} text="Online currency convertor">
        <p className="text-gray500">{getDateTime24H()}</p>
      </Heading>

      <section className="flex gap-3 mt-2">
        <ConvertorCard cardType="sell" cardName="You Sell" />
        <ConvertorCard cardType="buy" cardName="You Buy" />
      </section>

      <section className="mt-10">
        <ChartContainer
          location="convertor"
          type="line"
          name={`${generateName(
            sellCoin?.id,
            sellCoin?.symbol
          )} to ${generateName(buyCoin?.id, buyCoin?.symbol)}`}
        >
          <Chart chartType="line" coinId={compareCoin.id} days={timePeriod} />
        </ChartContainer>

        <TimePeriodSelector
          onTimePeriodChange={(timePeriod: number) =>
            dispatch(setChartTimePeriod(timePeriod))
          }
        />
      </section>
    </Modal>
  );
}
