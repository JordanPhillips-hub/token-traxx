import { twMerge } from "tailwind-merge";
import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  const defaultClass = "bg-purple700 rounded-xl";
  return <div className={twMerge(defaultClass, className)}>{children}</div>;
}
