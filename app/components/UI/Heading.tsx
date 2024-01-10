import { twMerge } from "tailwind-merge";

type HeadingProps = {
  size: number;
  text: string;
  children?: React.ReactNode;
  textClass?: string;
  containerClass?: string;
};

export function Heading({
  size,
  text,
  children,
  textClass,
  containerClass,
}: HeadingProps) {
  const defaultContainerStyles = "mb-2";
  let defaultTextStyles = "";
  switch (size) {
    case 1:
      defaultTextStyles = "text-2xl font-bold";
      break;
    case 2:
      defaultTextStyles = "text-xl font-semibold";
      break;
    case 3:
      defaultTextStyles = "text-lg font-medium";
      break;
    default:
      "text-base font-normal";
      break;
  }

  const Header = `h${Math.max(
    1,
    Math.min(6, size)
  )}` as keyof JSX.IntrinsicElements;

  return (
    <header className={twMerge(defaultContainerStyles, containerClass)}>
      <Header className={twMerge(defaultTextStyles, textClass)}>{text}</Header>
      {children}
    </header>
  );
}
