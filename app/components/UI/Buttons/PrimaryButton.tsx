import React, { ForwardedRef } from "react";

type PrimaryButtonProps = {
  text?: string;
  size: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

function PrimaryButton(
  { text, size, children, onClick }: PrimaryButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const defaultStyles = `bg-primary700 focus:bg-primary500 text-neutral100 w-full rounded-md focus:outline-none shadow-md focus:shadow-indigo-500/50`;

  let buttonClass = `${defaultStyles}`;

  switch (size) {
    case "lrg":
      buttonClass += " py-3 px-12";
      break;
    case "med":
      buttonClass += " py-3 px-6";
      break;
    case "xl":
      buttonClass += " p-4";
      break;
    default:
      buttonClass += "";
  }

  return (
    <button ref={ref} className={buttonClass} onClick={onClick}>
      {text}
      {children}
    </button>
  );
}

export default React.forwardRef(PrimaryButton);
