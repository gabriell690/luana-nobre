/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`
        w-full
        rounded-lg
        border
        border-gray-300
        bg-white
        px-4
        py-2
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
        ${className}
      `}
      {...props}
    />
  );
}