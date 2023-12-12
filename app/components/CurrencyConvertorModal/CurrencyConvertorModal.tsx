import { useLayoutEffect, useRef } from "react";
import Icon from "@/app/components/UI/Icon";
import { getDateTime24H } from "@/app/utils/dateAndTime";
import CurrencyCard from "./CurrencyCard";

type ConvertorProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CurrencyConvertorModal({
  isOpen,
  onClose,
}: ConvertorProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    if (isOpen && !ref.current?.open) {
      ref.current?.showModal();
    } else if (!isOpen && ref.current?.open) {
      ref.current.close();
    }
  }, [isOpen]);

  return (
    <dialog
      className="container bg-transparent w-full h-full mt-[270px] relative"
      ref={ref}
    >
      <button
        className="bg-primary700 focus:bg-primary500 hover:bg-primary500 absolute right-0 px-2 py-1 rounded"
        onClick={onClose}
      >
        <div className="flex items-center gap-1">
          <Icon iconVariant="exit" />
          <p>Close</p>
        </div>
      </button>

      <header className="mb-6">
        <h3 className="text-xl font-medium">Online currency convertor</h3>
        <p className="text-neutral500">{getDateTime24H()}</p>
      </header>

      <section>
        <div className="flex gap-3">
          <CurrencyCard cardType="You Sell" />
          <CurrencyCard cardType="You Buy" />
        </div>
      </section>
    </dialog>
  );
}
