import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  const defaultClass = "bg-purple700 rounded-xl";
  const mergedClass = className ? `${defaultClass} ${className}` : defaultClass;

  return <div className={mergedClass}>{children}</div>;
}
