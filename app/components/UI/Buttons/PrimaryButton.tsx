import { twMerge } from "tailwind-merge";

type PrimaryButtonProps = {
  children?: React.ReactNode;
  text?: string;
  onClick: () => void;
} & React.ComponentProps<"button">;

const defaultStyles =
  "bg-blue700 text-white flex items-center gap-2 rounded-md cursor-pointer hover:bg-purple500 focus:outline-none shadow-md focus:shadow-indigo-500/50 focus:bg-purple500";

export default function PrimaryButton({
  className,
  disabled,
  children,
  text,
  onClick,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={twMerge(defaultStyles, className)}
      {...props}
      onClick={onClick}
    >
      {children}
      {text}
    </button>
  );
}
