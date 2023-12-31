import { useEffect } from "react";
import SellCard from "./SellCard";
import BuyCard from "./BuyCard";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { setChartTimePeriod } from "@/app/store/features/charts/timePeriodSlice";
import { setIsComparing } from "@/app/store/features/charts/compareChartSlice";
import Modal from "@/app/components/UI/Modal";
import ChartContainer from "@/app/components/Charts/ChartContainer";
import Chart from "@/app/components/Charts/Chart";
import TimePeriodSelector from "@/app/components/UI/TimePeriodSelector";
import CloseButton from "@/app/components/UI/Buttons/CloseButton";
import { getDateTime24H } from "@/app/utils/dateAndTime";
import { formatCoinName } from "@/app/utils/generalHelpers";

type ConvertorProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CurrencyConvertorModal({
  isOpen,
  onClose,
}: ConvertorProps) {
  const dispatch = useAppDispatch();
  const { coins, coinId } = useAppSelector((state) => state.coinMarkets);
  const { sellCoinId, buyCoinId } = useAppSelector((state) => state.convertor);
  const { timePeriod } = useAppSelector((state) => state.chartTimePeriod);
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

      <header className="mb-6">
        <h3 className="text-xl font-medium">Online currency convertor</h3>
        <p className="text-gray500">{getDateTime24H()}</p>
      </header>

      <section>
        <div className="flex gap-3">
          <SellCard />
          <BuyCard />
        </div>
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
