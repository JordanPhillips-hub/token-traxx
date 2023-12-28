import { twMerge } from "tailwind-merge";

type PrimaryButtonProps = {
  children?: React.ReactNode;
  text?: string;
  isDisabled?: boolean;
  onClick: () => void;
} & React.ComponentProps<"button">;

const defaultStyles =
  "bg-blue700 text-white flex items-center gap-2 rounded-md cursor-pointer hover:bg-purple500 focus:outline-none shadow-md focus:shadow-indigo-500/50 focus:bg-purple500 disabled:opacity-25 disabled:cursor-not-allowed";

export default function PrimaryButton({
  className,
  children,
  text,
  isDisabled,
  onClick,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={twMerge(defaultStyles, className)}
      {...props}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
      {text}
    </button>
  );
}
