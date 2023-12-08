import { useLayoutEffect, useRef } from "react";
import Icon from "@/app/components/UI/Icon";

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
    <dialog ref={ref}>
      <button onClick={onClose}>
        <Icon iconVariant="exit" />
      </button>

      <section>
        <p>This is a modal</p>
      </section>
    </dialog>
  );
}
