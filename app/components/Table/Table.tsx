import { twMerge } from "tailwind-merge";
import TableHead from "./TableHead";

type TableProps = {
  headers: string[];
  children: React.ReactNode;
  className?: string;
};

const defaultStyles = "border-separate border-spacing-y-2 text-sm";
export default function Table({ headers, children, className }: TableProps) {
  return (
    <table className={twMerge(defaultStyles, className)}>
      <TableHead headers={headers} />
      <tbody>{children}</tbody>
    </table>
  );
}
