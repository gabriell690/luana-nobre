import type { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className,
}: Props) {
  return (
    <div
      className={clsx(
        "rounded-3xl bg-white transition-all duration-300 shadow-sm hover:-translate-y-1 hover:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}