import { twMerge } from "tailwind-merge";
import Icon from "@/app/components/UI/Icon";

type CloseButtonProps = {
  onClose: () => void;
  className?: string;
};

export default function CloseButton({ onClose, className }: CloseButtonProps) {
  const defaultStyles =
    "bg-blue700 focus:bg-purple500 hover:bg-purple500 px-2 py-1 rounded dark:bg-blue700 dark:hover:bg-purple500 dark:focus:bg-purple500";
  return (
    <button className={twMerge(defaultStyles, className)} onClick={onClose}>
      <div className="text-white flex items-center gap-1">
        <Icon iconVariant="exit" />
        <p>Close</p>
      </div>
    </button>
  );
}
