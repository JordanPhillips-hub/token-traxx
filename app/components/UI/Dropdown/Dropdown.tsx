import { twMerge } from "tailwind-merge";
import PrimaryButton from "@/app/components/UI/Buttons/PrimaryButton";

type DropdownProps<T extends { id: string }> = {
  children?: React.ReactNode;
  isOpen: boolean;
  items: T[];
  containerClass?: string;
  itemClass?: string;
  onItemClick: (itemId: string, symbol: string, name: string) => void;
  renderItem: (item: T) => React.ReactNode;
};

export default function Dropdown<
  T extends { id: string; symbol: string; name: string }
>({
  children,
  isOpen,
  items,
  containerClass,
  itemClass,
  onItemClick,
  renderItem,
}: DropdownProps<T>) {
  const itemStyles = "rounded-none";
  const containerStyles = isOpen
    ? "text-sm absolute bg-blue800 mt-3 p-4 rounded z-50"
    : "hidden";

  return (
    <div className="relative">
      {children}
      <ul
        className={twMerge(
          containerStyles,
          isOpen ? containerClass : containerStyles
        )}
      >
        {items.map((item) => (
          <li key={item.id}>
            <PrimaryButton
              className={twMerge(itemStyles, itemClass)}
              onClick={() => onItemClick(item.id, item.symbol, item.name)}
            >
              {renderItem(item)}
            </PrimaryButton>
          </li>
        ))}
      </ul>
    </div>
  );
}
