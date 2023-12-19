import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

export default function Card({ children }: CardProps) {
  return <div className="bg-primary400 py-10 px-8 rounded-xl">{children}</div>;
}
