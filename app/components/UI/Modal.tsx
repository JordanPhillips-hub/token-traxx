import { useLayoutEffect, useRef } from "react";

type ConvertorProps = {
  isOpen: boolean;
  onClose: () => void;
  className: string;
  children: React.ReactNode;
};

export default function CurrencyConvertorModal({
  isOpen,
  onClose,
  className,
  children,
}: ConvertorProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    const modal = modalRef.current;
    if (modal) {
      isOpen ? modal.showModal() : modal.close();
    }
  }, [isOpen]);

  return (
    <dialog className={className} ref={modalRef} onClose={onClose}>
      {children}
    </dialog>
  );
}
