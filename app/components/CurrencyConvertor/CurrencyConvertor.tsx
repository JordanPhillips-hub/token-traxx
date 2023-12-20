import { useEffect, useLayoutEffect, useRef } from "react";
import SellCard from "./SellCard";
import BuyCard from "./BuyCard";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { setChartTimePeriod } from "@/app/store/features/charts/timePeriodSlice";
import { setIsComparing } from "@/app/store/features/charts/compareChartSlice";
import Icon from "@/app/components/UI/Icon";
import ChartContainer from "@/app/components/Charts/ChartContainer";
import Chart from "@/app/components/Charts/Chart";
import TimePeriodSelector from "@/app/components/UI/TimePeriodSelector";
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
  const modalRef = useRef<HTMLDialogElement>(null);
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

  useLayoutEffect(() => {
    const modal = modalRef.current;
    if (modal) {
      isOpen ? modal.showModal() : modal.close();
    }
  }, [isOpen]);

  useEffect(() => {
    dispatch(setIsComparing(true));
  });

  return (
    <dialog
      className="container bg-transparent w-full h-full mt-[270px] relative"
      ref={modalRef}
    >
      <button
        className="bg-blue700 focus:bg-purple500 hover:bg-purple500 absolute right-0 px-2 py-1 rounded"
        onClick={onClose}
      >
        <div className="flex items-center gap-1">
          <Icon iconVariant="exit" />
          <p>Close</p>
        </div>
      </button>

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
    </dialog>
  );
}
