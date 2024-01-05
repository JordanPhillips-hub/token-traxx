import Icon from "../Icon";
import { useAppSelector } from "@/app/store/hooks";
import { twMerge } from "tailwind-merge";

type DropdownOpenerProps = {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
  onClick: () => void;
};

export function DropdownOpener({
  children,
  isOpen,
  className,
  onClick,
}: DropdownOpenerProps) {
  const { currency } = useAppSelector((state) => state.coinMarkets);
  const defaultStyles = "font-medium flex items-center gap-2 mb-4";

  return (
    <button className={twMerge(defaultStyles, className)} onClick={onClick}>
      {children}
      {currency.toUpperCase()}
      <div className={`${isOpen ? "rotate-180" : ""}`}>
        <Icon iconVariant="chevDown" />
      </div>
    </button>
  );
}
