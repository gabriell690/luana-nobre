import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-900",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",

    ghost:
      "hover:bg-gray-100 text-gray-700",
  };

  return (
    <button
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-lg
        px-4
        py-2
        font-medium
        transition-colors
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}